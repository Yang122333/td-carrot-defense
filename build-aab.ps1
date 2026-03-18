# ===== Android AAB 一键打包脚本 =====
# 用法: 右键以管理员身份运行，或在 PowerShell 中执行:
#   Set-ExecutionPolicy Bypass -Scope Process; .\build-aab.ps1
#
# 前置条件: 项目 zip 文件放在同目录下

$ErrorActionPreference = "Stop"
$SCRIPT_DIR = Split-Path -Parent $MyInvocation.MyCommand.Path
$WORKSPACE = "$SCRIPT_DIR\android-build"
$TOOLS_DIR = "$WORKSPACE\_tools"

# ===== 辅助函数 =====
function Write-Step($msg) { Write-Host "`n>>> $msg" -ForegroundColor Cyan }
function Write-Ok($msg) { Write-Host "    [OK] $msg" -ForegroundColor Green }
function Write-Skip($msg) { Write-Host "    [SKIP] $msg" -ForegroundColor Yellow }
function Write-Err($msg) { Write-Host "    [ERROR] $msg" -ForegroundColor Red }

# ===== 1. 查找并解压项目 =====
Write-Step "查找项目 zip 文件..."
$zipFiles = Get-ChildItem -Path $SCRIPT_DIR -Filter "*.zip" | Where-Object { $_.Name -ne "jdk.zip" -and $_.Name -ne "cmdline-tools.zip" }
if ($zipFiles.Count -eq 0) {
    Write-Err "当前目录下没有找到 zip 文件，请把项目压缩包放在脚本同目录"
    exit 1
} elseif ($zipFiles.Count -eq 1) {
    $zipFile = $zipFiles[0].FullName
    Write-Ok "找到: $($zipFiles[0].Name)"
} else {
    Write-Host "找到多个 zip 文件:" -ForegroundColor Yellow
    for ($i = 0; $i -lt $zipFiles.Count; $i++) {
        Write-Host "  [$i] $($zipFiles[$i].Name)"
    }
    $sel = Read-Host "选择要解压的文件编号"
    $zipFile = $zipFiles[$sel].FullName
}

$PROJECT_DIR = "$WORKSPACE\project"
if (Test-Path $PROJECT_DIR) { Remove-Item -Recurse -Force $PROJECT_DIR }
New-Item -ItemType Directory -Force -Path $PROJECT_DIR | Out-Null

Write-Step "解压项目..."
Expand-Archive -Path $zipFile -DestinationPath $PROJECT_DIR -Force

# 如果解压后只有一个子目录，进入它
$subDirs = Get-ChildItem -Path $PROJECT_DIR -Directory
if ($subDirs.Count -eq 1 -and -not (Test-Path "$PROJECT_DIR\build.gradle*") -and -not (Test-Path "$PROJECT_DIR\gradlew.bat")) {
    $PROJECT_DIR = $subDirs[0].FullName
}
Write-Ok "项目目录: $PROJECT_DIR"

# ===== 2. 读取项目配置 =====
Write-Step "读取项目配置..."

# 读取 compileSdk / targetSdk / buildToolsVersion
$appBuildGradle = $null
$gradleFiles = @("$PROJECT_DIR\app\build.gradle", "$PROJECT_DIR\app\build.gradle.kts")
foreach ($f in $gradleFiles) {
    if (Test-Path $f) { $appBuildGradle = Get-Content $f -Raw; break }
}
if (-not $appBuildGradle) {
    Write-Err "找不到 app/build.gradle，项目结构可能不对"
    Write-Host "项目目录内容:" -ForegroundColor Yellow
    Get-ChildItem $PROJECT_DIR | ForEach-Object { Write-Host "  $_" }
    exit 1
}

# 提取 compileSdk
$compileSdk = 34
if ($appBuildGradle -match 'compileSdk[Vv]ersion?\s*[=:]\s*(\d+)') { $compileSdk = $Matches[1] }
elseif ($appBuildGradle -match 'compileSdk\s*[=:]\s*(\d+)') { $compileSdk = $Matches[1] }

# 提取 buildToolsVersion
$buildTools = "$compileSdk.0.0"
if ($appBuildGradle -match 'buildToolsVersion\s*[=:]\s*["\u0027]([^"\u0027]+)') { $buildTools = $Matches[1] }

# 提取 minSdk / targetSdk (仅显示)
$minSdk = ""; $targetSdk = ""
if ($appBuildGradle -match 'minSdk[Vv]ersion?\s*[=:]\s*(\d+)') { $minSdk = $Matches[1] }
elseif ($appBuildGradle -match 'minSdk\s*[=:]\s*(\d+)') { $minSdk = $Matches[1] }
if ($appBuildGradle -match 'targetSdk[Vv]ersion?\s*[=:]\s*(\d+)') { $targetSdk = $Matches[1] }
elseif ($appBuildGradle -match 'targetSdk\s*[=:]\s*(\d+)') { $targetSdk = $Matches[1] }

# 读取 Gradle wrapper 版本
$gradleVersion = "8.2"
$wrapperProps = "$PROJECT_DIR\gradle\wrapper\gradle-wrapper.properties"
if (Test-Path $wrapperProps) {
    $wrapperContent = Get-Content $wrapperProps -Raw
    if ($wrapperContent -match 'gradle-(\d+\.\d+(\.\d+)?)-') { $gradleVersion = $Matches[1] }
}

# 读取需要的 JDK 版本 (从 gradle.properties 或 build.gradle)
$jdkVersion = 18
$gradleProps = "$PROJECT_DIR\gradle.properties"
if (Test-Path $gradleProps) {
    $gp = Get-Content $gradleProps -Raw
    if ($gp -match 'jdk.*?(\d{2})') { $jdkVersion = [int]$Matches[1] }
}

Write-Host "    项目配置:" -ForegroundColor White
Write-Host "      compileSdk:        $compileSdk"
Write-Host "      buildToolsVersion: $buildTools"
Write-Host "      minSdk:            $minSdk"
Write-Host "      targetSdk:         $targetSdk"
Write-Host "      Gradle:            $gradleVersion"
Write-Host "      JDK:               $jdkVersion"

# ===== 3. 检测/安装 JDK =====
Write-Step "检测 JDK..."

$javaOk = $false
try {
    $javaVer = & java -version 2>&1 | Select-Object -First 1
    if ($javaVer -match '"(\d+)') {
        $existingMajor = [int]$Matches[1]
        if ($existingMajor -ge $jdkVersion) {
            Write-Skip "已有 JDK $existingMajor (需要 >= $jdkVersion)"
            $javaOk = $true
        }
    }
} catch {}

if (-not $javaOk) {
    Write-Host "    需要安装 JDK $jdkVersion..."
    New-Item -ItemType Directory -Force -Path $TOOLS_DIR | Out-Null

    # JDK 下载地址映射
    $jdkUrls = @{
        17 = "https://download.oracle.com/java/17/archive/jdk-17.0.12_windows-x64_bin.zip"
        18 = "https://download.oracle.com/java/18/archive/jdk-18.0.2.1_windows-x64_bin.zip"
        21 = "https://download.oracle.com/java/21/latest/jdk-21_windows-x64_bin.zip"
    }

    if ($jdkUrls.ContainsKey($jdkVersion)) {
        $jdkUrl = $jdkUrls[$jdkVersion]
    } else {
        Write-Host "    未预置 JDK $jdkVersion 下载地址，尝试 JDK 21..."
        $jdkUrl = $jdkUrls[21]
        $jdkVersion = 21
    }

    $jdkZip = "$TOOLS_DIR\jdk.zip"
    Write-Host "    下载中... (可能需要几分钟)"
    Invoke-WebRequest -Uri $jdkUrl -OutFile $jdkZip -UseBasicParsing
    Expand-Archive $jdkZip -DestinationPath $TOOLS_DIR -Force

    $jdkDir = Get-ChildItem $TOOLS_DIR -Directory | Where-Object { $_.Name -match '^jdk' } | Select-Object -First 1
    $env:JAVA_HOME = $jdkDir.FullName
    $env:PATH = "$($jdkDir.FullName)\bin;$env:PATH"
    Write-Ok "JDK 安装完成: $($jdkDir.FullName)"
} else {
    if (-not $env:JAVA_HOME) {
        $env:JAVA_HOME = (Get-Command java).Source | Split-Path | Split-Path
    }
}

# ===== 4. 检测/安装 Android SDK =====
Write-Step "检测 Android SDK..."

$sdkOk = $false
if ($env:ANDROID_HOME -and (Test-Path "$env:ANDROID_HOME\cmdline-tools")) {
    Write-Skip "已有 ANDROID_HOME: $env:ANDROID_HOME"
    $sdkOk = $true
} elseif ($env:ANDROID_SDK_ROOT -and (Test-Path "$env:ANDROID_SDK_ROOT\cmdline-tools")) {
    $env:ANDROID_HOME = $env:ANDROID_SDK_ROOT
    Write-Skip "已有 ANDROID_SDK_ROOT: $env:ANDROID_SDK_ROOT"
    $sdkOk = $true
}

if (-not $sdkOk) {
    Write-Host "    安装 Android SDK 命令行工具..."
    $sdkDir = "$TOOLS_DIR\android-sdk"
    New-Item -ItemType Directory -Force -Path "$sdkDir\cmdline-tools" | Out-Null

    $cmdToolsUrl = "https://dl.google.com/android/repository/commandlinetools-win-11076708_latest.zip"
    Invoke-WebRequest -Uri $cmdToolsUrl -OutFile "$TOOLS_DIR\cmdline-tools.zip" -UseBasicParsing
    Expand-Archive "$TOOLS_DIR\cmdline-tools.zip" -DestinationPath "$sdkDir\cmdline-tools" -Force

    # 重命名为 latest
    $extracted = Get-ChildItem "$sdkDir\cmdline-tools" -Directory | Where-Object { $_.Name -ne "latest" } | Select-Object -First 1
    if ($extracted -and $extracted.Name -ne "latest") {
        if (Test-Path "$sdkDir\cmdline-tools\latest") { Remove-Item -Recurse -Force "$sdkDir\cmdline-tools\latest" }
        Rename-Item $extracted.FullName "latest"
    }

    $env:ANDROID_HOME = $sdkDir
    $env:PATH = "$sdkDir\cmdline-tools\latest\bin;$sdkDir\platform-tools;$env:PATH"

    # 同意 licenses
    Write-Host "    同意 SDK licenses..."
    $yesInput = ("y`n" * 20)
    $yesInput | & "$sdkDir\cmdline-tools\latest\bin\sdkmanager.bat" --licenses 2>$null

    # 安装需要的组件
    Write-Host "    安装 SDK 组件 (platforms;android-$compileSdk, build-tools;$buildTools)..."
    & "$sdkDir\cmdline-tools\latest\bin\sdkmanager.bat" "platforms;android-$compileSdk" "build-tools;$buildTools" "platform-tools"

    Write-Ok "Android SDK 安装完成"
}

# 写入 local.properties
$localProps = "$PROJECT_DIR\local.properties"
$sdkPath = $env:ANDROID_HOME -replace '\\', '/'
Set-Content -Path $localProps -Value "sdk.dir=$sdkPath"
Write-Ok "local.properties 已写入"

# ===== 5. 创建签名文件 =====
Write-Step "创建签名文件..."

$keystorePath = "$PROJECT_DIR\release.keystore"

if (Test-Path $keystorePath) {
    Write-Host "    已存在 release.keystore，是否使用现有的？(Y/N)" -ForegroundColor Yellow
    $useExisting = Read-Host
    if ($useExisting -eq "Y" -or $useExisting -eq "y") {
        $storePass = Read-Host "输入 keystore 密码"
        $keyAlias = Read-Host "输入 key alias"
        $keyPass = Read-Host "输入 key 密码"
    }
}

if (-not $storePass) {
    Write-Host ""
    Write-Host "    请输入签名信息:" -ForegroundColor White
    $keyAlias   = Read-Host "    Key alias (如: my-app-key)"
    $storePass  = Read-Host "    Keystore 密码 (至少6位)"
    $keyPass    = Read-Host "    Key 密码 (至少6位，可与 keystore 密码相同)"
    $cnName     = Read-Host "    你的名字 (CN, 如: Van Yang)"
    $orgUnit    = Read-Host "    组织单位 (OU, 如: Dev, 可回车跳过)"
    $org        = Read-Host "    组织 (O, 如: MyCompany, 可回车跳过)"
    $city       = Read-Host "    城市 (L, 可回车跳过)"
    $state      = Read-Host "    省份 (ST, 可回车跳过)"
    $country    = Read-Host "    国家代码 (C, 如: CN)"

    if (-not $orgUnit) { $orgUnit = "Dev" }
    if (-not $org) { $org = "Personal" }
    if (-not $city) { $city = "Unknown" }
    if (-not $state) { $state = "Unknown" }
    if (-not $country) { $country = "CN" }

    $dname = "CN=$cnName, OU=$orgUnit, O=$org, L=$city, ST=$state, C=$country"

    $keytoolPath = "$env:JAVA_HOME\bin\keytool.exe"
    if (-not (Test-Path $keytoolPath)) { $keytoolPath = "keytool" }

    & $keytoolPath -genkeypair -v `
        -keystore $keystorePath `
        -alias $keyAlias `
        -keyalg RSA -keysize 2048 -validity 10000 `
        -storepass $storePass -keypass $keyPass `
        -dname $dname

    Write-Ok "签名文件已创建: $keystorePath"
}

# ===== 6. 配置签名到 build.gradle =====
Write-Step "配置签名..."

$signingConfig = @"

android {
    signingConfigs {
        release {
            storeFile file('../release.keystore')
            storePassword '$storePass'
            keyAlias '$keyAlias'
            keyPassword '$keyPass'
        }
    }
    buildTypes {
        release {
            signingConfig signingConfigs.release
        }
    }
}
"@

# 检查是否已有 signingConfigs
if ($appBuildGradle -notmatch 'signingConfigs') {
    # 注入签名配置到 app/build.gradle
    $appGradlePath = $gradleFiles | Where-Object { Test-Path $_ } | Select-Object -First 1
    $content = Get-Content $appGradlePath -Raw

    # 在 android { 块内注入 signingConfigs
    $storeFileRel = "release.keystore" -replace '\\', '/'
    $injection = @"
    signingConfigs {
        release {
            storeFile file('../release.keystore')
            storePassword '$storePass'
            keyAlias '$keyAlias'
            keyPassword '$keyPass'
        }
    }
"@

    # 在 buildTypes 前插入 signingConfigs，并给 release buildType 加上 signingConfig
    if ($content -match '(?s)(buildTypes\s*\{.*?release\s*\{)') {
        $content = $content -replace '(buildTypes\s*\{.*?release\s*\{)', "`$1`n            signingConfig signingConfigs.release"
        $content = $content -replace '(android\s*\{)', "`$1`n$injection"
    } else {
        # fallback: 追加到文件末尾
        $content += "`n$signingConfig"
    }

    Set-Content -Path $appGradlePath -Value $content -Encoding UTF8
    Write-Ok "签名配置已注入 build.gradle"
} else {
    Write-Skip "build.gradle 已有签名配置"
}

# ===== 7. Gradle Sync + 打包 AAB =====
Write-Step "Gradle 同步 & 打包 AAB (这步可能需要 10-30 分钟)..."

Set-Location $PROJECT_DIR

# 确保 gradlew 可执行
if (-not (Test-Path "gradlew.bat")) {
    Write-Err "找不到 gradlew.bat，项目可能缺少 Gradle wrapper"
    exit 1
}

# 设置 Gradle JDK
$gpFile = "$PROJECT_DIR\gradle.properties"
$javaHomePath = $env:JAVA_HOME -replace '\\', '/'
if (Test-Path $gpFile) {
    $gpContent = Get-Content $gpFile -Raw
    if ($gpContent -notmatch 'org\.gradle\.java\.home') {
        Add-Content $gpFile "`norg.gradle.java.home=$javaHomePath"
    }
} else {
    Set-Content $gpFile "org.gradle.java.home=$javaHomePath"
}

# 打包
Write-Host "    开始 bundleRelease..." -ForegroundColor White
& .\gradlew.bat bundleRelease --no-daemon --stacktrace

if ($LASTEXITCODE -ne 0) {
    Write-Err "打包失败！请检查上面的错误信息"
    exit 1
}

# ===== 8. 找到 AAB 文件 =====
Write-Step "查找 AAB 输出..."
$aabFiles = Get-ChildItem -Path $PROJECT_DIR -Recurse -Filter "*.aab"
if ($aabFiles.Count -gt 0) {
    foreach ($aab in $aabFiles) {
        # 复制到脚本目录方便取用
        $destName = "output-$(Get-Date -Format 'yyyyMMdd-HHmmss').aab"
        Copy-Item $aab.FullName "$SCRIPT_DIR\$destName"
        Write-Ok "AAB 已生成: $SCRIPT_DIR\$destName"
        Write-Host "    原始路径: $($aab.FullName)" -ForegroundColor Gray
        Write-Host "    大小: $([math]::Round($aab.Length / 1MB, 2)) MB" -ForegroundColor Gray
    }
} else {
    Write-Err "未找到 AAB 文件，请检查构建日志"
}

Write-Host "`n===== 完成！=====" -ForegroundColor Green
Write-Host "按任意键退出..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
