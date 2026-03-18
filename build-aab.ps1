# ===== Android AAB Build Script =====
# Usage: powershell -ExecutionPolicy Bypass -File .\build-aab.ps1
# Put this script in the same folder as your project .zip file

$ErrorActionPreference = "Stop"
$SCRIPT_DIR = Split-Path -Parent $MyInvocation.MyCommand.Path
$WORKSPACE = "$SCRIPT_DIR\android-build"
$TOOLS_DIR = "$WORKSPACE\_tools"

function Write-Step($msg) { Write-Host "`n>>> $msg" -ForegroundColor Cyan }
function Write-Ok($msg) { Write-Host "    [OK] $msg" -ForegroundColor Green }
function Write-Skip($msg) { Write-Host "    [SKIP] $msg" -ForegroundColor Yellow }
function Write-Err($msg) { Write-Host "    [ERROR] $msg" -ForegroundColor Red }

# ===== 1. Find and extract project zip =====
Write-Step "Finding project zip..."
$zipFiles = Get-ChildItem -Path $SCRIPT_DIR -Filter "*.zip" | Where-Object { $_.Name -ne "jdk.zip" -and $_.Name -ne "cmdline-tools.zip" }
if ($zipFiles.Count -eq 0) {
    Write-Err "No zip file found. Put your project zip in the same folder as this script."
    Read-Host "Press Enter to exit"
    exit 1
} elseif ($zipFiles.Count -eq 1) {
    $zipFile = $zipFiles[0].FullName
    Write-Ok "Found: $($zipFiles[0].Name)"
} else {
    Write-Host "Multiple zip files found:" -ForegroundColor Yellow
    for ($i = 0; $i -lt $zipFiles.Count; $i++) {
        Write-Host "  [$i] $($zipFiles[$i].Name)"
    }
    $sel = Read-Host "Select file number"
    $zipFile = $zipFiles[$sel].FullName
}

$PROJECT_DIR = "$WORKSPACE\project"
if (Test-Path $PROJECT_DIR) { Remove-Item -Recurse -Force $PROJECT_DIR }
New-Item -ItemType Directory -Force -Path $PROJECT_DIR | Out-Null

Write-Step "Extracting project..."
Expand-Archive -Path $zipFile -DestinationPath $PROJECT_DIR -Force

$subDirs = Get-ChildItem -Path $PROJECT_DIR -Directory
if ($subDirs.Count -eq 1 -and -not (Test-Path "$PROJECT_DIR\build.gradle*") -and -not (Test-Path "$PROJECT_DIR\gradlew.bat")) {
    $PROJECT_DIR = $subDirs[0].FullName
}
Write-Ok "Project dir: $PROJECT_DIR"

# ===== 2. Read project config =====
Write-Step "Reading project config..."

$appBuildGradle = $null
$gradleFiles = @("$PROJECT_DIR\app\build.gradle", "$PROJECT_DIR\app\build.gradle.kts")
foreach ($f in $gradleFiles) {
    if (Test-Path $f) { $appBuildGradle = Get-Content $f -Raw; break }
}
if (-not $appBuildGradle) {
    Write-Err "Cannot find app/build.gradle - check project structure"
    Write-Host "Project dir contents:" -ForegroundColor Yellow
    Get-ChildItem $PROJECT_DIR | ForEach-Object { Write-Host "  $_" }
    Read-Host "Press Enter to exit"
    exit 1
}

$compileSdk = 34
if ($appBuildGradle -match 'compileSdk[Vv]ersion?\s*[=:]\s*(\d+)') { $compileSdk = $Matches[1] }
elseif ($appBuildGradle -match 'compileSdk\s*[=:]\s*(\d+)') { $compileSdk = $Matches[1] }

$buildTools = "$compileSdk.0.0"
if ($appBuildGradle -match "buildToolsVersion\s*[=:]\s*[`"']([^`"']+)") { $buildTools = $Matches[1] }

$minSdk = ""; $targetSdk = ""
if ($appBuildGradle -match 'minSdk[Vv]ersion?\s*[=:]\s*(\d+)') { $minSdk = $Matches[1] }
elseif ($appBuildGradle -match 'minSdk\s*[=:]\s*(\d+)') { $minSdk = $Matches[1] }
if ($appBuildGradle -match 'targetSdk[Vv]ersion?\s*[=:]\s*(\d+)') { $targetSdk = $Matches[1] }
elseif ($appBuildGradle -match 'targetSdk\s*[=:]\s*(\d+)') { $targetSdk = $Matches[1] }

$gradleVersion = "8.2"
$wrapperProps = "$PROJECT_DIR\gradle\wrapper\gradle-wrapper.properties"
if (Test-Path $wrapperProps) {
    $wrapperContent = Get-Content $wrapperProps -Raw
    if ($wrapperContent -match 'gradle-(\d+\.\d+(\.\d+)?)-') { $gradleVersion = $Matches[1] }
}

$jdkVersion = 18
$gradleProps = "$PROJECT_DIR\gradle.properties"
if (Test-Path $gradleProps) {
    $gp = Get-Content $gradleProps -Raw
    if ($gp -match 'JavaVersion\.VERSION_(\d+)') { $jdkVersion = [int]$Matches[1] }
    elseif ($gp -match 'jdk.*?(\d{2})') { $jdkVersion = [int]$Matches[1] }
}

Write-Host "    Config detected:" -ForegroundColor White
Write-Host "      compileSdk:        $compileSdk"
Write-Host "      buildToolsVersion: $buildTools"
Write-Host "      minSdk:            $minSdk"
Write-Host "      targetSdk:         $targetSdk"
Write-Host "      Gradle:            $gradleVersion"
Write-Host "      JDK:               $jdkVersion"

# ===== 3. Check / Install JDK =====
Write-Step "Checking JDK..."

$javaOk = $false
try {
    $javaVer = & java -version 2>&1 | Select-Object -First 1
    if ($javaVer -match '"(\d+)') {
        $existingMajor = [int]$Matches[1]
        if ($existingMajor -ge $jdkVersion) {
            Write-Skip "JDK $existingMajor found (need >= $jdkVersion)"
            $javaOk = $true
        }
    }
} catch {}

if (-not $javaOk) {
    Write-Host "    Installing JDK $jdkVersion..." -ForegroundColor White
    New-Item -ItemType Directory -Force -Path $TOOLS_DIR | Out-Null

    $jdkUrls = @{
        17 = "https://download.oracle.com/java/17/archive/jdk-17.0.12_windows-x64_bin.zip"
        18 = "https://download.oracle.com/java/18/archive/jdk-18.0.2.1_windows-x64_bin.zip"
        21 = "https://download.oracle.com/java/21/latest/jdk-21_windows-x64_bin.zip"
    }

    if ($jdkUrls.ContainsKey($jdkVersion)) {
        $jdkUrl = $jdkUrls[$jdkVersion]
    } else {
        Write-Host "    No preset URL for JDK $jdkVersion, trying JDK 21..." -ForegroundColor Yellow
        $jdkUrl = $jdkUrls[21]
        $jdkVersion = 21
    }

    $jdkZip = "$TOOLS_DIR\jdk.zip"
    Write-Host "    Downloading... (may take a few minutes)" -ForegroundColor White
    [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
    Invoke-WebRequest -Uri $jdkUrl -OutFile $jdkZip -UseBasicParsing
    Write-Host "    Extracting JDK..." -ForegroundColor White
    Expand-Archive $jdkZip -DestinationPath $TOOLS_DIR -Force

    $jdkDir = Get-ChildItem $TOOLS_DIR -Directory | Where-Object { $_.Name -match '^jdk' } | Select-Object -First 1
    $env:JAVA_HOME = $jdkDir.FullName
    $env:PATH = "$($jdkDir.FullName)\bin;$env:PATH"
    Write-Ok "JDK installed: $($jdkDir.FullName)"
} else {
    if (-not $env:JAVA_HOME) {
        $env:JAVA_HOME = (Get-Command java).Source | Split-Path | Split-Path
    }
}

# ===== 4. Check / Install Android SDK =====
Write-Step "Checking Android SDK..."

$sdkOk = $false
if ($env:ANDROID_HOME -and (Test-Path "$env:ANDROID_HOME\cmdline-tools")) {
    Write-Skip "ANDROID_HOME found: $env:ANDROID_HOME"
    $sdkOk = $true
} elseif ($env:ANDROID_SDK_ROOT -and (Test-Path "$env:ANDROID_SDK_ROOT\cmdline-tools")) {
    $env:ANDROID_HOME = $env:ANDROID_SDK_ROOT
    Write-Skip "ANDROID_SDK_ROOT found: $env:ANDROID_HOME"
    $sdkOk = $true
}

if (-not $sdkOk) {
    Write-Host "    Installing Android SDK..." -ForegroundColor White
    New-Item -ItemType Directory -Force -Path $TOOLS_DIR | Out-Null

    $ANDROID_HOME_PATH = "$TOOLS_DIR\android-sdk"
    New-Item -ItemType Directory -Force -Path "$ANDROID_HOME_PATH\cmdline-tools" | Out-Null

    $cmdToolsUrl = "https://dl.google.com/android/repository/commandlinetools-win-11076708_latest.zip"
    $cmdToolsZip = "$TOOLS_DIR\cmdline-tools.zip"
    Write-Host "    Downloading SDK command-line tools..." -ForegroundColor White
    [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
    Invoke-WebRequest -Uri $cmdToolsUrl -OutFile $cmdToolsZip -UseBasicParsing
    Expand-Archive $cmdToolsZip -DestinationPath "$ANDROID_HOME_PATH\cmdline-tools" -Force

    $extracted = Get-ChildItem "$ANDROID_HOME_PATH\cmdline-tools" -Directory | Where-Object { $_.Name -ne "latest" } | Select-Object -First 1
    if ($extracted -and $extracted.Name -ne "latest") {
        if (Test-Path "$ANDROID_HOME_PATH\cmdline-tools\latest") {
            Remove-Item -Recurse -Force "$ANDROID_HOME_PATH\cmdline-tools\latest"
        }
        Rename-Item $extracted.FullName "latest"
    }

    $env:ANDROID_HOME = $ANDROID_HOME_PATH
    $env:PATH = "$ANDROID_HOME_PATH\cmdline-tools\latest\bin;$ANDROID_HOME_PATH\platform-tools;$env:PATH"

    Write-Host "    Accepting licenses..." -ForegroundColor White
    $yesInput = ("y`n" * 30)
    $yesInput | & "$ANDROID_HOME_PATH\cmdline-tools\latest\bin\sdkmanager.bat" --licenses 2>$null

    Write-Host "    Installing SDK components (compileSdk=$compileSdk, buildTools=$buildTools)..." -ForegroundColor White
    & "$ANDROID_HOME_PATH\cmdline-tools\latest\bin\sdkmanager.bat" "platforms;android-$compileSdk" "build-tools;$buildTools" "platform-tools"

    Write-Ok "Android SDK installed: $ANDROID_HOME_PATH"
} else {
    # Check if needed components are installed
    $sdkmanager = "$env:ANDROID_HOME\cmdline-tools\latest\bin\sdkmanager.bat"
    if (Test-Path $sdkmanager) {
        $installed = & $sdkmanager --list_installed 2>$null
        if ($installed -notmatch "android-$compileSdk") {
            Write-Host "    Installing missing SDK platform android-$compileSdk..." -ForegroundColor White
            & $sdkmanager "platforms;android-$compileSdk" "build-tools;$buildTools"
        }
    }
}

# ===== 5. Keystore setup =====
Write-Step "Keystore setup..."

$keystorePath = "$PROJECT_DIR\release.keystore"
$useExisting = "N"

if (Test-Path $keystorePath) {
    Write-Host "    Found existing release.keystore. Use it? (Y/N)" -ForegroundColor Yellow
    $useExisting = Read-Host "    Choice"
}

if ($useExisting -eq "Y" -or $useExisting -eq "y") {
    $storePass = Read-Host "    Keystore password"
    $keyAlias = Read-Host "    Key alias"
    $keyPass = Read-Host "    Key password (Enter if same as keystore)"
    if ([string]::IsNullOrEmpty($keyPass)) { $keyPass = $storePass }
} else {
    Write-Host "    Creating new keystore..." -ForegroundColor White
    $storePass = Read-Host "    Set keystore password (min 6 chars)"
    $keyAlias = Read-Host "    Set key alias (e.g. myapp)"
    $keyPass = Read-Host "    Set key password (Enter if same as keystore)"
    if ([string]::IsNullOrEmpty($keyPass)) { $keyPass = $storePass }

    $cnName = Read-Host "    Your name (CN, e.g. Van Yang)"
    $orgUnit = Read-Host "    Org unit (OU, e.g. Dev, Enter to skip)"
    $org = Read-Host "    Organization (O, e.g. MyCompany, Enter to skip)"
    $city = Read-Host "    City (L, Enter to skip)"
    $state = Read-Host "    State/Province (ST, Enter to skip)"
    $country = Read-Host "    Country code (C, e.g. CN)"

    if ([string]::IsNullOrEmpty($cnName)) { $cnName = "Developer" }
    if ([string]::IsNullOrEmpty($country)) { $country = "CN" }

    $dname = "CN=$cnName"
    if ($orgUnit) { $dname += ", OU=$orgUnit" }
    if ($org) { $dname += ", O=$org" }
    if ($city) { $dname += ", L=$city" }
    if ($state) { $dname += ", ST=$state" }
    $dname += ", C=$country"

    $keytoolPath = "$env:JAVA_HOME\bin\keytool.exe"
    if (-not (Test-Path $keytoolPath)) { $keytoolPath = "keytool" }

    & $keytoolPath -genkeypair -v `
        -keystore $keystorePath `
        -alias $keyAlias `
        -keyalg RSA -keysize 2048 -validity 10000 `
        -storepass $storePass -keypass $keyPass `
        -dname $dname

    if ($LASTEXITCODE -ne 0) {
        Write-Err "Keystore creation failed!"
        Read-Host "Press Enter to exit"
        exit 1
    }
    Write-Ok "Keystore created: $keystorePath"
}

# ===== 6. Configure signing in build.gradle =====
Write-Step "Configuring signing..."

$keystoreRelPath = "release.keystore"
$signingBlock = @"

    signingConfigs {
        release {
            storeFile file("$keystoreRelPath")
            storePassword "$storePass"
            keyAlias "$keyAlias"
            keyPassword "$keyPass"
        }
    }
"@

$buildTypeBlock = @"
            signingConfig signingConfigs.release
"@

# Read current build.gradle
$bgPath = $null
foreach ($f in $gradleFiles) {
    if (Test-Path $f) { $bgPath = $f; break }
}
$bgContent = Get-Content $bgPath -Raw

# Inject signingConfigs if not present
if ($bgContent -notmatch 'signingConfigs') {
    # Insert after "android {"
    $bgContent = $bgContent -replace '(android\s*\{)', "`$1`n$signingBlock"
    Write-Ok "Injected signingConfigs"
}

# Add signingConfig to release buildType if not present
if ($bgContent -notmatch 'signingConfig\s+signingConfigs\.release') {
    $bgContent = $bgContent -replace '(buildTypes\s*\{[\s\S]*?release\s*\{)', "`$1`n$buildTypeBlock"
    Write-Ok "Injected release signing"
}

Set-Content $bgPath $bgContent -Encoding UTF8
Write-Ok "build.gradle updated"

# ===== 7. Build AAB =====
Write-Step "Building AAB..."

Set-Location $PROJECT_DIR

if (-not (Test-Path "gradlew.bat")) {
    Write-Err "gradlew.bat not found in project!"
    Read-Host "Press Enter to exit"
    exit 1
}

# Set Gradle JDK
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

Write-Host "    Running bundleRelease... (this may take a while)" -ForegroundColor White
& .\gradlew.bat bundleRelease --no-daemon --stacktrace

if ($LASTEXITCODE -ne 0) {
    Write-Err "Build failed! Check errors above."
    Read-Host "Press Enter to exit"
    exit 1
}

# ===== 8. Find AAB output =====
Write-Step "Finding AAB output..."
$aabFiles = Get-ChildItem -Path $PROJECT_DIR -Recurse -Filter "*.aab"
if ($aabFiles.Count -gt 0) {
    foreach ($aab in $aabFiles) {
        $destName = "output-$(Get-Date -Format 'yyyyMMdd-HHmmss').aab"
        Copy-Item $aab.FullName "$SCRIPT_DIR\$destName"
        Write-Ok "AAB ready: $SCRIPT_DIR\$destName"
        Write-Host "    Source: $($aab.FullName)" -ForegroundColor Gray
        Write-Host "    Size: $([math]::Round($aab.Length / 1MB, 2)) MB" -ForegroundColor Gray
    }
} else {
    Write-Err "No AAB file found. Check build log."
}

Write-Host "`n===== DONE =====" -ForegroundColor Green
Read-Host "Press Enter to exit"
