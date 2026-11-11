param([string]$ConfigPath)
$ErrorActionPreference = 'Stop'
$projectRoot = [IO.Path]::GetFullPath((Join-Path $PSScriptRoot '../..'))
if (-not $ConfigPath) { $ConfigPath = Join-Path $projectRoot 'storage/app/private/procurement-search/offload-config.json' }
$nodeRuntime = (Get-Command node.exe -ErrorAction Stop).Source
$logDirectory = Join-Path $projectRoot 'storage/logs'
[IO.Directory]::CreateDirectory($logDirectory) | Out-Null
$logPath = Join-Path $logDirectory 'procurement-offload.log'
if ((Test-Path -LiteralPath $logPath) -and (Get-Item -LiteralPath $logPath).Length -gt 5242880) {
    Move-Item -LiteralPath $logPath -Destination ($logPath + '.previous') -Force
}
& $nodeRuntime (Join-Path $projectRoot 'tools/procurement-ocr/offload.cjs') $ConfigPath 1435 >> $logPath 2>&1
exit $LASTEXITCODE
