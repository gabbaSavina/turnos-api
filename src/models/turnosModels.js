// Importamos los módulos necesarios.
import fs from 'fs'; // Para leer y escribir archivos.
import { obtenerRutaAbsoluta } from '../utils/utils.js';

// Determina la ruta del archivo JSON donde se almacenan los datos de los médicos
const filePath = obtenerRutaAbsoluta('../data/turnos.json');

// Creamos la clase `TurnosModel` que contiene métodos estáticos para manejar los datos de los turnos.
export class TurnosModel {
    /**
     * Lee el archivo `turnos.json` y retorna su contenido como un objeto JavaScript.
     * Si hay un error al leer el archivo, devuelve un objeto vacío con una propiedad `turnos` (array vacío).
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
            // Retornamos un objeto por defecto con un array vacío de turnos.
            return { turnos: [] };
        }
    }

    /**
     * Guarda un objeto en el archivo `turnos.json` como JSON.
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
     * Obtiene todos los turnos almacenados en el archivo JSON.
     * @returns {Array} Array de turnos.
     */
    static obtenerTodosLosTurnos() {
        // Leemos el archivo y devolvemos solo la propiedad `turnos`.
        const data = this.leerArchivo();
        return data.turnos;
    }

    /**
     * Busca y devuelve un turno por su ID.
     * @param {number} id - ID del turno a buscar.
     * @returns {Object|null} El turno encontrado o `null` si no existe.
     */
    static obtenerTurnoPorId(id) {
        // Leemos el archivo y buscamos un turno cuyo ID coincida con el dado.
        const data = this.leerArchivo();
        return data.turnos.find((turno) => turno.id === parseInt(id, 10)) || null;
    }

    /**
     * Crea un nuevo turno y lo guarda en el archivo JSON.
     * @param {Object} nuevoTurno - Objeto con los datos del turno a crear.
     * @returns {Object} El nuevo turno creado (con ID asignado).
     */
    static crearTurno(nuevoTurno) {
        // Leemos los datos actuales.
        const data = this.leerArchivo();
        // Generamos un nuevo ID. Si no hay turnos, el ID será 1; si hay, tomamos el último ID y le sumamos 1.
        const newId = data.turnos.length > 0 ? data.turnos[data.turnos.length - 1].id + 1 : 1;
        // Creamos el nuevo turno asignándole el nuevo ID.
        const turnoConId = { id: newId, ...nuevoTurno };
        // Agregamos el nuevo turno al array de turnos.
        data.turnos.push(turnoConId);
        // Guardamos los datos actualizados en el archivo.
        this.guardarArchivo(data);
        // Retornamos el turno creado.
        return turnoConId;
    }

    /**
     * Actualiza un turno existente por su ID.
     * @param {number} id - ID del turno a actualizar.
     * @param {Object} datosActualizados - Objeto con los datos a modificar.
     * @returns {Object|null} El turno actualizado o `null` si no se encontró.
     */
    static actualizarTurno(id, datosActualizados) {
        // Leemos los datos actuales.
        const data = this.leerArchivo();
        // Buscamos el índice del turno con el ID dado.
        const turnoIndex = data.turnos.findIndex((turno) => turno.id === parseInt(id, 10));
        // Si no se encuentra el turno, devolvemos `null`.
        if (turnoIndex === -1) return null;
        // Mezclamos los datos actuales del turno con los datos actualizados.
        data.turnos[turnoIndex] = { ...data.turnos[turnoIndex], ...datosActualizados };
        // Guardamos los datos actualizados en el archivo.
        this.guardarArchivo(data);
        // Retornamos el turno actualizado.
        return data.turnos[turnoIndex];
    }

    /**
     * Elimina un turno por su ID.
     * @param {number} id - ID del turno a eliminar.
     * @returns {Object|null} El turno eliminado o `null` si no se encontró.
     */
    static eliminarTurno(id) {
        // Leemos los datos actuales.
        const data = this.leerArchivo();
        // Buscamos el índice del turno con el ID dado.
        const turnoIndex = data.turnos.findIndex((turno) => turno.id === parseInt(id, 10));
        // Si no se encuentra el turno, devolvemos `null`.
        if (turnoIndex === -1) return null;
        // Eliminamos el turno del array y lo guardamos en una variable.
        const [turnoEliminado] = data.turnos.splice(turnoIndex, 1);
        // Guardamos los datos actualizados en el archivo.
        this.guardarArchivo(data);
        // Retornamos el turno eliminado.
        return turnoEliminado;
    }
}
