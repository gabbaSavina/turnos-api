import { UsuariosModel } from "../models/usuariosModels.js"; // Importa el modelo de usuarios
import jwt from "jsonwebtoken"; // Librería para generar tokens JWT
import bcrypt from "bcryptjs"; // Librería para manejar contraseñas encriptadas
import dotenv from "dotenv"; // Librería para manejar variables de entorno

dotenv.config(); // Carga las variables de entorno desde el archivo `.env`

// Controlador para registrar un nuevo usuario en el sistema
export const registrarUsuario = async (req, res) => {
    const { nombre, email, password, rol } = req.body;

    // Verifica que todos los campos sean proporcionados
    if (!nombre || !email || !password || !rol) {
        return res.status(400).json({ error: "Todos los campos son obligatorios." });
    }

    if (rol !== "admin" && rol !== "paciente") {
        return res.status(400).json({ error: "Rol no válido." });
    }

    // Verifica si el usuario ya existe
    const usuarioExistente = await UsuariosModel.buscarPorEmail(email);
    if (usuarioExistente) {
        return res.status(400).json({ error: "El usuario ya existe." });
    }

    // Encripta la contraseña antes de guardarla
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    // Intenta registrar al usuario en la base de datos
    const nuevoUsuario = await UsuariosModel.registrarUsuario({ nombre, email, password: hashedPassword, rol });
    if (!nuevoUsuario) {
        return res.status(500).json({ error: "Error al registrar el usuario." });
    }

    res.status(201).json({ mensaje: "Usuario registrado correctamente." });
};

// Controlador para el inicio de sesión de un usuario
export const loginUsuario = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Email y contraseña son requeridos." });
    }

    const usuario = await UsuariosModel.buscarPorEmail(email);
    if (!usuario || !bcrypt.compareSync(password, usuario.password)) {
        return res.status(401).json({ error: "Credenciales inválidas." });
    }

    // Genera un token JWT
    const token = jwt.sign({ id: usuario.id, rol: usuario.rol }, process.env.JWT_SECRET, {
        expiresIn: "2h",
    });

    res.json({ token });
};
