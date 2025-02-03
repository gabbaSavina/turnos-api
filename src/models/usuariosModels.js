import fs from "fs";
import bcrypt from "bcryptjs";
import { obtenerRutaAbsoluta } from '../utils/utils.js';

const filePath = obtenerRutaAbsoluta('../data/usuarios.json');

export class UsuariosModel {
    static async leerArchivo() {
        try {
            const data = await fs.promises.readFile(filePath, "utf-8");
            return JSON.parse(data);
        } catch (error) {
            console.error("Error leyendo el archivo de usuarios:", error.message);
            return { usuarios: [] };
        }
    }

    static async guardarArchivo(datos) {
        try {
            await fs.promises.writeFile(filePath, JSON.stringify(datos, null, 2), "utf-8");
        } catch (error) {
            console.error("Error guardando el archivo de usuarios:", error.message);
        }
    }

    static async registrarUsuario({ nombre, email, password, rol }) {
        const data = await this.leerArchivo();
        const existe = data.usuarios.find((u) => u.email === email);
        if (existe) return null; 

        // Encriptación asincrónica de la contraseña
        const hashPassword = await bcrypt.hash(password, 10); 

        const nuevoUsuario = {
            id: data.usuarios.length + 1,
            nombre,
            email,
            password: hashPassword,
            rol,
        };

        data.usuarios.push(nuevoUsuario);

        await this.guardarArchivo(data);

        return nuevoUsuario; 
    }

    static async buscarPorEmail(email) {
        const data = await this.leerArchivo();
        return data.usuarios.find((u) => u.email === email) || null;
    }
}


