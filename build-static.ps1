$projectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$clientOutput = Join-Path $projectRoot 'dist\client'
$serverOutput = Join-Path $projectRoot 'dist\server'
$hostingOutput = Join-Path $projectRoot 'dist\.openai'

if (Test-Path -LiteralPath $clientOutput) { Remove-Item -LiteralPath $clientOutput -Recurse -Force }
if (Test-Path -LiteralPath $serverOutput) { Remove-Item -LiteralPath $serverOutput -Recurse -Force }
if (Test-Path -LiteralPath $hostingOutput) { Remove-Item -LiteralPath $hostingOutput -Recurse -Force }
New-Item -ItemType Directory -Force -Path $clientOutput, $serverOutput | Out-Null
Copy-Item -LiteralPath (Join-Path $projectRoot 'index.html') -Destination $clientOutput -Force
Copy-Item -LiteralPath (Join-Path $projectRoot 'app-v2.js') -Destination $clientOutput -Force
Copy-Item -LiteralPath (Join-Path $projectRoot 'site.css') -Destination $clientOutput -Force
Copy-Item -LiteralPath (Join-Path $projectRoot 'content-overrides.json') -Destination $clientOutput -Force
Copy-Item -LiteralPath (Join-Path $projectRoot 'web-images') -Destination (Join-Path $clientOutput 'web-images') -Recurse -Force
Copy-Item -LiteralPath (Join-Path $projectRoot 'static-worker.js') -Destination (Join-Path $serverOutput 'index.js') -Force
Copy-Item -LiteralPath (Join-Path $projectRoot '.openai') -Destination $hostingOutput -Recurse -Force
