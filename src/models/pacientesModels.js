// Importamos los módulos necesarios.
import fs from 'fs'; // Para leer y escribir archivos.
import { obtenerRutaAbsoluta } from '../utils/utils.js';

// Determina la ruta del archivo JSON donde se almacenan los datos de los médicos
const filePath = obtenerRutaAbsoluta('../data/pacientes.json');


// Creamos la clase `PacientesModel` que contiene métodos estáticos para manejar los datos de pacientes.
export class PacientesModel {
    /**
     * Lee el archivo `pacientes.json` y retorna su contenido como un objeto JavaScript.
     * Si hay un error al leer el archivo, devuelve un objeto vacío con una propiedad `pacientes` (array vacío).
     */
    static leerArchivo() {
        try {
            // Leemos el contenido del archivo como texto.
            const data = fs.readFileSync(filePath, 'utf-8');
            // Convertimos el texto JSON en un objeto de JavaScript.
            return JSON.parse(data);
        } catch (error) {
            // Si ocurre un error (por ejemplo, el archivo no existe), mostramos el error en la consola.
            console.error('Error leyendo el archivo JSON:', error.message);
            // Retornamos un objeto por defecto con un array vacío de pacientes.
            return { pacientes: [] };
        }
    }

    /**
     * Guarda un objeto en el archivo `pacientes.json` como JSON.
     * Si hay un error, lo muestra en la consola.
     */
    static guardarArchivo(datos) {
        try {
            // Escribimos los datos en el archivo, formateados con 2 espacios para mejor legibilidad.
            fs.writeFileSync(filePath, JSON.stringify(datos, null, 2), 'utf-8');
        } catch (error) {
            // Si ocurre un error al escribir, lo registramos en la consola.
            console.error('Error escribiendo en el archivo JSON:', error.message);
        }
    }

    /**
     * Obtiene todos los pacientes almacenados en el archivo JSON.
     * @returns {Array} Array de pacientes.
     */
    static obtenerTodosLosPacientes() {
        // Leemos el archivo y devolvemos solo la propiedad `pacientes`.
        const data = this.leerArchivo();
        return data.pacientes;
    }

    /**
     * Busca y devuelve un paciente por su ID.
     * @param {number} id - ID del paciente a buscar.
     * @returns {Object|null} El paciente encontrado o `null` si no existe.
     */
    static obtenerPacientePorId(id) {
        // Leemos el archivo y buscamos un paciente cuyo ID coincida con el dado.
        const data = this.leerArchivo();
        return data.pacientes.find((paciente) => paciente.id === parseInt(id, 10)) || null;
    }

    /**
     * Crea un nuevo paciente y lo guarda en el archivo JSON.
     * @param {Object} nuevoPaciente - Objeto con los datos del paciente a crear.
     * @returns {Object} El nuevo paciente creado (con ID asignado).
     */
    static crearPaciente(nuevoPaciente) {
        // Leemos los datos actuales.
        const data = this.leerArchivo();
        // Generamos un nuevo ID. Si no hay pacientes, el ID será 1; si hay, tomamos el último ID y le sumamos 1.
        const newId = data.pacientes.length > 0 ? data.pacientes[data.pacientes.length - 1].id + 1 : 1;
        // Creamos el nuevo paciente asignándole el nuevo ID.
        const pacienteConId = { id: newId, ...nuevoPaciente };
        // Agregamos el nuevo paciente al array.
        data.pacientes.push(pacienteConId);
        // Guardamos los datos actualizados en el archivo.
        this.guardarArchivo(data);
        // Retornamos el paciente creado.
        return pacienteConId;
    }

    /**
     * Actualiza un paciente existente por su ID.
     * @param {number} id - ID del paciente a actualizar.
     * @param {Object} datosActualizados - Objeto con los datos a modificar.
     * @returns {Object|null} El paciente actualizado o `null` si no se encontró.
     */
    static actualizarPaciente(id, datosActualizados) {
        // Leemos los datos actuales.
        const data = this.leerArchivo();
        // Buscamos el índice del paciente con el ID dado.
        const pacienteIndex = data.pacientes.findIndex((paciente) => paciente.id === parseInt(id, 10));
        // Si no se encuentra el paciente, devolvemos `null`.
        if (pacienteIndex === -1) return null;
        // Mezclamos los datos actuales del paciente con los datos actualizados.
        data.pacientes[pacienteIndex] = { ...data.pacientes[pacienteIndex], ...datosActualizados };
        // Guardamos los datos actualizados en el archivo.
        this.guardarArchivo(data);
        // Retornamos el paciente actualizado.
        return data.pacientes[pacienteIndex];
    }

    /**
     * Elimina un paciente por su ID.
     * @param {number} id - ID del paciente a eliminar.
     * @returns {Object|null} El paciente eliminado o `null` si no se encontró.
     */
    static eliminarPaciente(id) {
        // Leemos los datos actuales.
        const data = this.leerArchivo();
        // Buscamos el índice del paciente con el ID dado.
        const pacienteIndex = data.pacientes.findIndex((paciente) => paciente.id === parseInt(id, 10));
        // Si no se encuentra el paciente, devolvemos `null`.
        if (pacienteIndex === -1) return null;
        // Eliminamos el paciente del array y lo guardamos en una variable.
        const [pacienteEliminado] = data.pacientes.splice(pacienteIndex, 1);
        // Guardamos los datos actualizados en el archivo.
        this.guardarArchivo(data);
        // Retornamos el paciente eliminado.
        return pacienteEliminado;
    }
}

