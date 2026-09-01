$projectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$clientOutput = Join-Path $projectRoot 'dist\client'
$serverOutput = Join-Path $projectRoot 'dist\server'

New-Item -ItemType Directory -Force -Path $clientOutput, $serverOutput | Out-Null
Copy-Item -LiteralPath (Join-Path $projectRoot 'index.html') -Destination $clientOutput -Force
Copy-Item -LiteralPath (Join-Path $projectRoot 'app-v2.js') -Destination $clientOutput -Force
Get-ChildItem -LiteralPath $projectRoot -Filter '*.css' -File | Copy-Item -Destination $clientOutput -Force
Copy-Item -LiteralPath (Join-Path $projectRoot 'assets') -Destination (Join-Path $clientOutput 'assets') -Recurse -Force
Copy-Item -LiteralPath (Join-Path $projectRoot 'static-worker.js') -Destination (Join-Path $serverOutput 'index.js') -Force
