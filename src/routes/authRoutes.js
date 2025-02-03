import express from 'express'; // Importa Express para manejar las rutas
import { registrarUsuario, loginUsuario } from '../controllers/authControllers.js'; // Importa los controladores de autenticación
import { verificarToken } from '../middleware/authMiddleware.js'; // Importa el middleware de autenticación

const router = express.Router(); // Crea un nuevo router de Express

/**
 * Ruta para registrar un nuevo usuario.
 * No requiere autenticación previa.
 * Llama a la función `registrarUsuario` del controlador.
 */
router.post('/registro', registrarUsuario);

/**
 * Ruta para iniciar sesión (login).
 * No requiere autenticación previa.
 * Llama a la función `loginUsuario` del controlador.
 * Si las credenciales son correctas, devuelve un token JWT.
 */
router.post('/login', loginUsuario);

/**
 * Ruta protegida que solo pueden acceder usuarios autenticados.
 * Usa el middleware `verificarToken` para validar el token antes de permitir el acceso.
 * Si el token es válido, devuelve la información del usuario autenticado.
 */
router.get('/perfil', verificarToken, (req, res) => {
    res.json({ mensaje: "Perfil de usuario", usuario: req.usuario });
});

export default router; // Exporta el router para que pueda ser utilizado en el archivo principal de la API


