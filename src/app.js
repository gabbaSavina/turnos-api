import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import turnosRoutes from './routes/turnosRoutes.js';
import pacientesRoutes from './routes/pacientesRoutes.js';
import medicosRoutes from './routes/medicosRoutes.js';
import config from './config.js';

dotenv.config();

// Obtener __dirname en ES6
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ruta absoluta a la carpeta 'frontend'
const frontendPath = path.join(__dirname, '..', 'src', 'frontend');  // Asegúrate que 'frontend' esté dentro de 'src'

const app = express();

// Servir archivos estáticos desde la carpeta frontend
app.use('/static', express.static(path.join(frontendPath)));  // Sirve los archivos estáticos desde '/static'

// Ruta para servir index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(frontendPath, 'index.html'));  // Sirve el archivo index.html
});

// Rutas de la API
app.use("/api/auth", authRoutes);
app.use('/api/turnos', turnosRoutes);
app.use('/api/pacientes', pacientesRoutes);
app.use('/api/medicos', medicosRoutes);

// Iniciar servidor
const PORT = config.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

