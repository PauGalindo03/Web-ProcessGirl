#!/bin/bash

echo "🧹 Limpiando entorno local..."
rm -rf backend/node_modules frontend/node_modules
rm -f backend/package-lock.json frontend/package-lock.json

echo "🐳 Levantando entorno de producción local..."
docker-compose -f docker-compose.prod.yml down --volumes --remove-orphans
docker-compose -f docker-compose.prod.yml up --build -d

echo "⏳ Esperando a que los servicios estén listos..."
sleep 10

echo "✅ Verificando endpoints..."
curl -f http://localhost:5000/health && echo "Backend OK"
curl -f http://localhost:3000 && echo "Frontend OK"

echo "🚀 Entorno de producción simulado listo"
