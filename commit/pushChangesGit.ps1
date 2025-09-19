# Paso 1: Mostrar estado
Write-Host "`nEstado actual del repositorio:"
git status

# Confirmar si quieres continuar
$continue = Read-Host "`n¿Quieres continuar con git add .? (y/n)"
if ($continue -ne "y") { exit }

# Paso 2: Agregar cambios
git add .

# Paso 3: Sugerir tipo de commit
Write-Host "`nDetectando tipo de commit sugerido..."
$commitTypeRaw = & .\commit\suggest-commit-type.ps1

if ($commitTypeRaw -eq "none") {
    $commitType = Read-Host "`nNo se detectó tipo. Escribe manualmente el tipo de commit (ej: feat, fix, chore)"
} elseif ($commitTypeRaw -like "multiple:*") {
    $options = $commitTypeRaw -replace "multiple:\s*", ""
    Write-Host "`nSe detectaron múltiples tipos:"
    $options.Split(",") | ForEach-Object { Write-Host "- $($_.Trim())" }
    $commitType = Read-Host "Elige uno de los tipos anteriores"
} else {
    $commitType = $commitTypeRaw
    Write-Host "`nSugerencia: tipo de commit '$commitType'"
}

# Paso 4: Escribir mensaje
$commitMessage = Read-Host "`nEscribe el mensaje del commit (sin tipo)"
$fullMessage = "${commitType}: ${commitMessage}"

# Confirmar commit
$confirmCommit = Read-Host "`n¿Quieres hacer commit con este mensaje? '$fullMessage' (y/n)"
if ($confirmCommit -ne "y") { exit }

git commit -m "$fullMessage"

# Confirmar push
$confirmPush = Read-Host "`n¿Quieres hacer push a origin main? (y/n)"
if ($confirmPush -ne "y") { exit }

git push origin main

Write-Host "`nCambios subidos correctamente a origin/main."