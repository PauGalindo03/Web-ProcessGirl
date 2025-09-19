# Ir a la carpeta del frontend
cd "C:\Users\pauli\Desktop\ProcessGirl_Final\frontend"

# Eliminar node_modules y lockfile
Remove-Item -Recurse -Force node_modules
Remove-Item -Force pnpm-lock.yaml

# Limpiar caché de pnpm
pnpm store prune

# Reinstalar dependencias
pnpm install

# Confirmar instalación
pnpm list --depth=0
