Write-Host "Instalando dependencias para Conventional Commits y lint-staged..."
pnpm add -D husky @commitlint/cli @commitlint/config-conventional lint-staged eslint prettier

Write-Host "Creando configuración de commitlint..."
Set-Content -Path "commitlint.config.js" -Value "module.exports = { extends: ['@commitlint/config-conventional'] };"

Write-Host "Inicializando Husky..."
pnpm husky install

Write-Host "Agregando script prepare en package.json..."
$packageJson = Get-Content package.json -Raw
if ($packageJson -match '"scripts"\s*:\s*\{') {
    $packageJson = $packageJson -replace '"scripts"\s*:\s*\{', '"scripts": {\n    "prepare": "husky install",'
    Set-Content package.json -Value $packageJson
} else {
    Write-Host "No se encontró la sección scripts en package.json. Agrega manualmente el script 'prepare'."
}

Write-Host "Agregando hook de commit-msg para validar formato..."
pnpm husky add .husky/commit-msg "npx --no -- commitlint --edit `"$1`""

Write-Host "Agregando hook de pre-commit para validar código con lint-staged..."
pnpm husky add .husky/pre-commit "npx lint-staged"

Write-Host "Configurando lint-staged en package.json..."
$lintStagedBlock = @'
"lint-staged": {
  "**/*.{ts,tsx,js,jsx}": [
    "eslint --fix",
    "prettier --write"
  ],
  "**/*.{json,md,yml}": [
    "prettier --write"
  ]
}
'@

# Insertar lint-staged al final del package.json si no existe
if ($packageJson -notmatch '"lint-staged"\s*:\s*\{') {
    $packageJson = Get-Content package.json -Raw
    $packageJson = $packageJson.TrimEnd("`n", "`r", "}") + ",`n$lintStagedBlock`n}"
    Set-Content package.json -Value $packageJson
} else {
    Write-Host "Ya existe configuración de lint-staged. Revisa manualmente si necesitas actualizarla."
}

Write-Host "Configuración completada. Tu proyecto ahora valida commits y código automáticamente."
