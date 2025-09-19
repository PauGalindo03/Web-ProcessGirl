FROM node:20

# Establece el directorio de trabajo
WORKDIR /app

# Copia solo los archivos necesarios para instalar dependencias
COPY package*.json ./

# Instala dependencias del proyecto
RUN npm install

# Instala nodemon globalmente (solo si lo usas en dev)
RUN npm install -g nodemon

RUN npm install -g tsx

# Copia el resto del código fuente
COPY . .

# Expone el puerto del backend
EXPOSE 5000

# Comando de inicio
CMD ["npm", "run", "dev"]
