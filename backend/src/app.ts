// levantar backend docker desde raíz web: docker-compose up backend mongo mongo-express --build
// revisar logs: docker logs -f process-girl-backend
// probar salud backend: curl http://localhost:5000/health

// levantar frontend docker desde raíz web: docker-compose up frontend --build
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import type { Express, Request, Response } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import routes from './routes/index.js';

const app: Express = express();

app.get('/health', (_, res) => {
  res.status(200).send('OK');
});

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/api', routes);

// Ruta raíz
app.get('/', (req: Request, res: Response) => {
  res.send('API Process Girl funcionando 💗');
});

app.listen(5000, () => {
  console.log('Backend running on port 5000');
});

// Conexión a MongoDB
const mongoURI: string =
  process.env.NODE_ENV === 'production'
    ? process.env.MONGO_URI_PROD || ''
    : process.env.MONGO_URI_LOCAL || '';

const PORT = process.env.PORT || 5000;

mongoose
  .connect(mongoURI, { family: 4, serverSelectionTimeoutMS: 30000 })
  .then(() => {
    console.log('MongoDB conectado ✅');
    app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT} 🚀`));
  })
  .catch((err: unknown) => {
    console.error('❌ Error al conectar a MongoDB:', err);
    process.exit(1);
  });
