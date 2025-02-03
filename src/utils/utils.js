import path from 'path';
import { fileURLToPath } from 'url';

// ✅ Convertimos import.meta.url a __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Función para obtener la ruta absoluta de un archivo o directorio en ES6.
 * @param {string} relativaRuta - Ruta relativa del archivo o directorio.
 * @returns {string} - Ruta absoluta.
 */
export const obtenerRutaAbsoluta = (relativaRuta) => {
    return path.join(__dirname, relativaRuta);
};

/**
 * Función para obtener la ruta absoluta de la carpeta 'frontend' dentro de 'src'.
 * @returns {string} - Ruta absoluta de 'frontend'.
 */
export const obtenerRutaFrontend = () => {
    return path.join(__dirname, '..', 'frontend'); // Correcto: accede a 'src/frontend'
};
