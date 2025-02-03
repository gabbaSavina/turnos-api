import fs from 'fs';
import { obtenerRutaAbsoluta } from '../utils/utils.js';

// Determina la ruta del archivo JSON donde se almacenan los datos de los médicos
const filePath = obtenerRutaAbsoluta('../data/medicos.json');

export class MedicosModel {
    // Método para leer el archivo JSON y devolver su contenido como un objeto
    static leerArchivo() {
        try {
            // Lee el archivo JSON de forma síncrona
            const data = fs.readFileSync(filePath, 'utf-8');
            return JSON.parse(data); // Convierte el contenido del archivo en un objeto
        } catch (error) {
            // Maneja errores de lectura, como archivo inexistente o problemas de formato
            console.error('Error leyendo el archivo JSON:', error.message);
            return { medicos: [] }; // Retorna un objeto con un array vacío si ocurre un error
        }
    }

    // Método para guardar datos en el archivo JSON
    static guardarArchivo(datos) {
        try {
            // Escribe los datos proporcionados en el archivo JSON
            fs.writeFileSync(filePath, JSON.stringify(datos, null, 2), 'utf-8');
        } catch (error) {
            // Maneja errores al intentar guardar los datos
            console.error('Error escribiendo en el archivo JSON:', error.message);
        }
    }

    // MÉTODOS CRUD (Create, Read, Update, Delete)

    // 1. Obtener todos los médicos
    static obtenerTodosLosMedicos() {
        try {
            const data = this.leerArchivo(); // Obtiene el contenido del archivo
            return data.medicos; // Devuelve el array de médicos
        } catch (error) {
            console.error('Error al obtener todos los médicos:', error.message);
            throw new Error('No se pudieron obtener los médicos.'); // Lanza un error si falla
        }
    }

    // 2. Obtener un médico por su ID
    static obtenerMedicosPorId(id) {
        try {
            const data = this.leerArchivo(); // Obtiene el contenido del archivo
            // Busca un médico cuyo ID coincida con el proporcionado
            const medico = data.medicos.find((medico) => medico.id === parseInt(id, 10));
            if (!medico) {
                // Si no encuentra el médico, muestra una advertencia
                console.warn(`Médico con ID ${id} no encontrado.`);
                return null; // Devuelve null si no encuentra el médico
            }
            return medico; // Devuelve el médico encontrado
        } catch (error) {
            console.error(`Error al obtener el médico con ID ${id}:`, error.message);
            throw new Error('No se pudo obtener el médico.');
        }
    }

    // 3. Crear un nuevo médico
    static crearMedico(nuevoMedico) {
        // Valida que el nombre y la especialidad sean obligatorios
        if (!nuevoMedico.nombre || !nuevoMedico.especialidad) {
            throw new Error('El nombre y la especialidad son obligatorios para crear un médico.');
        }

        try {
            const data = this.leerArchivo(); // Obtiene el contenido del archivo
            // Genera un nuevo ID basado en el último médico o usa 1 si no hay médicos
            const newId = data.medicos.length > 0 ? data.medicos[data.medicos.length - 1].id + 1 : 1;
            // Crea un objeto con el nuevo médico incluyendo el ID generado
            const medicoConId = { id: newId, ...nuevoMedico };
            data.medicos.push(medicoConId); // Agrega el nuevo médico al array
            this.guardarArchivo(data); // Guarda los cambios en el archivo JSON
            return medicoConId; // Devuelve el nuevo médico
        } catch (error) {
            console.error('Error al crear un nuevo médico:', error.message);
            throw new Error('No se pudo crear el médico.');
        }
    }

    // 4. Actualizar un médico
    static actualizarMedico(id, datosActualizados) {
        // Valida que el ID sea un número válido
        if (!id || isNaN(id)) {
            throw new Error('El ID debe ser un número válido.');
        }

        try {
            const data = this.leerArchivo(); // Obtiene el contenido del archivo
            // Encuentra el índice del médico con el ID proporcionado
            const medicoIndex = data.medicos.findIndex((medico) => medico.id === parseInt(id, 10));
            if (medicoIndex === -1) {
                // Si el médico no existe, muestra una advertencia
                console.warn(`Médico con ID ${id} no encontrado.`);
                return null; // Devuelve null si no encuentra el médico
            }
            // Actualiza solo los campos proporcionados en datosActualizados
            data.medicos[medicoIndex] = { ...data.medicos[medicoIndex], ...datosActualizados };
            this.guardarArchivo(data); // Guarda los cambios en el archivo JSON
            return data.medicos[medicoIndex]; // Devuelve el médico actualizado
        } catch (error) {
            console.error(`Error al actualizar el médico con ID ${id}:`, error.message);
            throw new Error('No se pudo actualizar el médico.');
        }
    }

    // 5. Eliminar un médico
    static eliminarMedico(id) {
        // Valida que el ID sea un número válido
        if (!id || isNaN(id)) {
            throw new Error('El ID debe ser un número válido.');
        }

        try {
            const data = this.leerArchivo(); // Obtiene el contenido del archivo
            // Encuentra el índice del médico con el ID proporcionado
            const medicoIndex = data.medicos.findIndex((medico) => medico.id === parseInt(id, 10));
            if (medicoIndex === -1) {
                // Si el médico no existe, muestra una advertencia
                console.warn(`Médico con ID ${id} no encontrado.`);
                return null; // Devuelve null si no encuentra el médico
            }
            // Elimina el médico del array
            const [medicoEliminado] = data.medicos.splice(medicoIndex, 1);
            this.guardarArchivo(data); // Guarda los cambios en el archivo JSON
            return medicoEliminado; // Devuelve el médico eliminado
        } catch (error) {
            console.error(`Error al eliminar el médico con ID ${id}:`, error.message);
            throw new Error('No se pudo eliminar el médico.');
        }
    }
}
