// Este archivo contiene las acciones asociadas a los endpoints de la ruta de médicos.
// Cada función maneja la lógica de negocio correspondiente a un método HTTP (GET, POST, PUT, DELETE).

import { MedicosModel } from "../models/medicosModels.js"; // Importa el modelo de médicos para interactuar con los datos.

// 1. Obtener todos los médicos (GET)
// Este controlador responde al endpoint para obtener la lista completa de médicos.
export const obtenerTodosLosMedicos = (req, res) => {
    try {
        const medicos = MedicosModel.obtenerTodosLosMedicos(); // Llama al modelo para obtener todos los médicos.
        res.json(medicos); // Devuelve la lista de médicos en formato JSON.
    } catch (error) {
        console.error("Error al obtener los médicos:", error); // Registra el error en la consola.
        res.status(500).json({ error: "Hubo un error al obtener los médicos." }); // Responde con un error 500 si algo falla.
    }
};

// 2. Obtener un médico por su ID (GET)
// Este controlador maneja las solicitudes para obtener un médico específico por su ID.
export const obtenerMedicoPorID = (req, res) => {
    const { id } = req.params; // Extrae el ID del médico de los parámetros de la ruta.

    // Valida que el ID sea un número válido.
    if (isNaN(id)) {
        return res.status(400).json({ error: "El ID debe ser un número válido." });
    }

    try {
        const medico = MedicosModel.obtenerMedicosPorId(id); // Llama al modelo para buscar el médico por su ID.
        if (!medico) {
            res.status(404).json({ error: "Médico no encontrado." }); // Responde con un error 404 si el médico no existe.
            return;
        }
        res.json(medico); // Devuelve los datos del médico en formato JSON.
    } catch (error) {
        console.error("Error al obtener el médico:", error); // Registra el error en la consola.
        res.status(500).json({ error: "Hubo un error al obtener el médico." }); // Responde con un error 500 si algo falla.
    }
};

// 3. Crear un nuevo médico (POST)
// Este controlador maneja las solicitudes para crear un nuevo médico.
export const crearMedico = (req, res) => {
    const nuevoMedico = req.body; // Obtiene los datos del nuevo médico del cuerpo de la solicitud.

    // Valida que los datos obligatorios estén presentes.
    if (!nuevoMedico || !nuevoMedico.nombre || !nuevoMedico.especialidad) {
        return res.status(400).json({ error: "Los datos del médico son obligatorios." });
    }

    try {
        const medicoCreado = MedicosModel.crearMedico(nuevoMedico); // Llama al modelo para crear el nuevo médico.
        res.status(201).json(medicoCreado); // Responde con el nuevo médico creado y un código de estado 201 (Creado).
    } catch (error) {
        console.error("Error al crear el médico:", error); // Registra el error en la consola.
        res.status(500).json({ error: "Hubo un error al crear el médico." }); // Responde con un error 500 si algo falla.
    }
};

// 4. Actualizar un médico (PUT)
// Este controlador maneja las solicitudes para actualizar los datos de un médico existente.
export const actualizarMedico = (req, res) => {
    const { id } = req.params; // Extrae el ID del médico de los parámetros de la ruta.
    const datosActualizados = req.body; // Obtiene los datos a actualizar del cuerpo de la solicitud.

    // Valida que el ID sea un número válido.
    if (isNaN(id)) {
        return res.status(400).json({ error: "El ID debe ser un número válido." });
    }

    try {
        const medicoActualizado = MedicosModel.actualizarMedico(id, datosActualizados); // Llama al modelo para actualizar el médico.
        if (!medicoActualizado) {
            res.status(404).json({ error: "Médico no encontrado." }); // Responde con un error 404 si el médico no existe.
            return;
        }
        res.json(medicoActualizado); // Devuelve los datos del médico actualizado en formato JSON.
    } catch (error) {
        console.error("Error al actualizar el médico:", error); // Registra el error en la consola.
        res.status(500).json({ error: "Hubo un error al actualizar el médico." }); // Responde con un error 500 si algo falla.
    }
};

// 5. Eliminar un médico (DELETE)
// Este controlador maneja las solicitudes para eliminar un médico por su ID.
export const eliminarMedico = (req, res) => {
    const { id } = req.params; // Extrae el ID del médico de los parámetros de la ruta.

    // Valida que el ID sea un número válido.
    if (isNaN(id)) {
        return res.status(400).json({ error: "El ID debe ser un número válido." });
    }

    try {
        const medicoEliminado = MedicosModel.eliminarMedico(id); // Llama al modelo para eliminar el médico.
        if (!medicoEliminado) {
            res.status(404).json({ error: "Médico no encontrado." }); // Responde con un error 404 si el médico no existe.
            return;
        }
        res.status(204).send(); // Responde con un código de estado 204 (Sin contenido) si el médico se eliminó correctamente.
    } catch (error) {
        console.error("Error al eliminar el médico:", error); // Registra el error en la consola.
        res.status(500).json({ error: "Hubo un error al eliminar el médico." }); // Responde con un error 500 si algo falla.
    }
};
