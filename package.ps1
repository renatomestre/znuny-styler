$ErrorActionPreference = "Stop"

$projectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$distDirectory = Join-Path $projectRoot "dist"
$stagingDirectory = Join-Path ([System.IO.Path]::GetTempPath()) "znuny-styler-package"
$archivePath = Join-Path $distDirectory "znuny-styler.zip"

try {
    if (Test-Path $stagingDirectory) {
        Remove-Item $stagingDirectory -Recurse -Force
    }

    New-Item -ItemType Directory -Path $stagingDirectory | Out-Null
    New-Item -ItemType Directory -Path (Join-Path $stagingDirectory "icons") | Out-Null
    New-Item -ItemType Directory -Path $distDirectory -Force | Out-Null

    Copy-Item (Join-Path $projectRoot "background.js") $stagingDirectory
    Copy-Item (Join-Path $projectRoot "manifest.json") $stagingDirectory
    Copy-Item (Join-Path $projectRoot "README.md") $stagingDirectory
    Copy-Item (Join-Path $projectRoot "icons\*") (Join-Path $stagingDirectory "icons") -Recurse

    if (Test-Path $archivePath) {
        Remove-Item $archivePath -Force
    }

    Compress-Archive -Path (Join-Path $stagingDirectory "*") -DestinationPath $archivePath
    Write-Output "Created $archivePath"
}
finally {
    if (Test-Path $stagingDirectory) {
        Remove-Item $stagingDirectory -Recurse -Force
    }
}
