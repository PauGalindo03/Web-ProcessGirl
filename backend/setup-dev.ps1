Write-Host "Limpiando entorno..."
Remove-Item -Recurse -Force node_modules, dist, package-lock.json

Write-Host "Reinstalando dependencias..."
npm install

Write-Host "Reiniciando Docker..."
docker-compose down
docker-compose build --no-cache
docker-compose up -d

Write-Host "Entorno reiniciado correctamente."

Write-Host "Esperando a que los servicios estén saludables..."
Start-Sleep -Seconds 10

Write-Host "Estado de los contenedores:"
docker ps --filter "name=process-girl" --format "table {{.Names}}\t{{.Status}}"

Write-Host "Entorno listo. Backend: http://localhost:5000"
