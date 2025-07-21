import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import productoRoutes from './routes/productoRoutes.js';
import authRoutes from './routes/authRoutes.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { authentication } from './middlewares/authentication.js';
import { swaggerUi, swaggerSpec } from './utils/swagger.js';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/", (req, res) => {
    res.json({mensaje: "Bienvenido a la API"});
});
app.use('/auth', authRoutes);
app.use('/productos', authentication, productoRoutes);

app.use((req, res, next) => {
    res.status(404).json({mensaje: 'Ruta no encontrada'});
    next();
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
