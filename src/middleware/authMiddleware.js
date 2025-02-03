import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config(); // Carga las variables de entorno desde el archivo `.env`

/**
 * Middleware para verificar la autenticación mediante un token JWT.
 * Se asegura de que el usuario esté autenticado antes de permitirle el acceso a ciertas rutas.
 */
export const verificarToken = (req, res, next) => {
    const token = req.headers["authorization"]; // Extrae el token del encabezado "Authorization" de la solicitud

    // Si no hay token en la petición, se deniega el acceso
    if (!token) {
        return res.status(401).json({ error: "Acceso denegado, token no proporcionado." });
    }

    // Verifica que el token tenga el formato "Bearer <token>"
    if (!token.startsWith("Bearer ")) {
        return res.status(400).json({ error: "Formato de token incorrecto. Debe comenzar con 'Bearer '" });
    }

    try {
        // El token viene en formato: "Bearer <token>", por lo que se extrae la parte del token
        const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET); // Verifica el token con la clave secreta

        req.usuario = decoded; // Almacena los datos del usuario en `req` para que estén disponibles en la siguiente función
        next(); // Llama al siguiente middleware o controlador
    } catch (error) {
        return res.status(403).json({ error: "Token inválido o expirado." }); // Si el token es incorrecto o expiró, devuelve un error
    }
};

/**
 * Middleware para restringir el acceso solo a usuarios con rol "admin".
 * Se debe usar después de `verificarToken` para asegurarse de que el usuario está autenticado.
 */
export const soloAdmin = (req, res, next) => {
    // Asegura que req.usuario exista antes de verificar el rol
    if (!req.usuario) {
        return res.status(403).json({ error: "Usuario no autenticado." });
    }

    // Verifica si el usuario autenticado tiene el rol de "admin"
    if (req.usuario.rol !== "admin") {
        return res.status(403).json({ error: "Acceso restringido a administradores." });
    }
    next(); // Si el usuario es admin, continúa con la ejecución de la siguiente función
};
