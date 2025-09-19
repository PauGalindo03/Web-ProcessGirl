$changedFiles = git diff --cached --name-only
$types = @()

foreach ($file in $changedFiles) {
    switch -Regex ($file) {
        "^commit/.*\.ps1$" { $null = $types += "chore"; continue }
        "^(src|frontend|components|pages).*\.(ts|tsx|js|jsx)$" { $null = $types += "feat"; continue }
        "^(backend|api|controllers|services).*\.(ts|js)$"      { $null = $types += "fix"; continue }
        "\.(md|markdown|txt|README\.md|.ps1)$"                      { $null = $types += "docs"; continue }
        "\.(json|yml|yaml|lock)$"                              { $null = $types += "chore"; continue }
        "\.(css|scss|sass|less)$"                              { $null = $types += "style"; continue }
        "\.(test|spec)\.(ts|js|tsx)$"                          { $null = $types += "test"; continue }
        default { } # evita salidas inesperadas
    }
    #Write-Host "Archivo: $file"
}

$types = $types | Sort-Object -Unique

if ($types.Count -eq 1) {
    $type = $types[0].ToString().Trim()
    Write-Output "$type"
}
elseif ($types.Count -gt 1) {
    $joined = ($types | ForEach-Object { $_.ToString().Trim() }) -join ", "
    Write-Output "multiple: $joined"
}
else {
    Write-Output "none"
}
