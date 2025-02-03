// Importamos el modelo de PacientesModel, que contiene las funciones para manejar la persistencia de datos
// relacionadas con los pacientes.
import { PacientesModel } from "../models/pacientesModels.js";

/**
 * Controlador para obtener todos los pacientes.
 * Este método responde con un JSON que contiene todos los pacientes registrados.
 */
export const obtenerTodosLosPacientes = (req, res) => {
    try {
        // Usamos el método del modelo para obtener todos los pacientes.
        const pacientes = PacientesModel.obtenerTodosLosPacientes();
        // Respondemos con un JSON de los pacientes.
        res.json(pacientes);
    } catch (error) {
        // Si ocurre un error, lo registramos en la consola y enviamos un código 500 con un mensaje de error.
        console.error("Error al obtener los pacientes:", error);
        res.status(500).json({ error: "Hubo un error al obtener los pacientes." });
    }
};

/**
 * Controlador para obtener un paciente por su ID.
 * Este método busca un paciente específico a través de su ID y lo devuelve en formato JSON.
 */
export const obtenerPacientePorID = (req, res) => {
    const { id } = req.params; // Obtenemos el ID de los parámetros de la URL.

    // Validamos que el ID sea un número válido.
    if (isNaN(id)) {
        return res.status(400).json({ error: "El ID debe ser un número válido." });
    }

    try {
        // Usamos el modelo para buscar el paciente por su ID.
        const paciente = PacientesModel.obtenerPacientePorId(id);
        if (!paciente) {
            // Si no se encuentra, respondemos con un código 404.
            res.status(404).json({ error: "Paciente no encontrado." });
            return;
        }
        // Si se encuentra, devolvemos el paciente en formato JSON.
        res.json(paciente);
    } catch (error) {
        // En caso de error, registramos el problema y devolvemos un código 500.
        console.error("Error al obtener el paciente:", error);
        res.status(500).json({ error: "Hubo un error al obtener el paciente." });
    }
};

/**
 * Controlador para crear un nuevo paciente.
 * Este método recibe los datos del paciente en el cuerpo de la solicitud y lo guarda en el sistema.
 */
export const crearPaciente = (req, res) => {
    const nuevoPaciente = req.body; // Extraemos el cuerpo de la solicitud.

    // Validamos que los datos obligatorios del paciente estén presentes.
    if (!nuevoPaciente || !nuevoPaciente.nombre || !nuevoPaciente.edad) {
        return res.status(400).json({ error: "Los datos del paciente son obligatorios." });
    }

    try {
        // Usamos el modelo para crear el paciente y devolver el nuevo paciente creado.
        const pacienteCreado = PacientesModel.crearPaciente(nuevoPaciente);
        // Respondemos con un código 201 y el objeto del paciente creado.
        res.status(201).json(pacienteCreado);
    } catch (error) {
        // En caso de error, registramos el problema y devolvemos un código 500.
        console.error("Error al crear el paciente:", error);
        res.status(500).json({ error: "Hubo un error al crear el paciente." });
    }
};

/**
 * Controlador para actualizar un paciente existente.
 * Este método recibe el ID del paciente como parámetro y los datos actualizados en el cuerpo de la solicitud.
 */
export const actualizarPaciente = (req, res) => {
    const { id } = req.params; // Obtenemos el ID de los parámetros de la URL.
    const datosActualizados = req.body; // Obtenemos los datos a actualizar del cuerpo de la solicitud.

    // Validamos que el ID sea un número válido.
    if (isNaN(id)) {
        return res.status(400).json({ error: "El ID debe ser un número válido." });
    }

    try {
        // Usamos el modelo para actualizar el paciente.
        const pacienteActualizado = PacientesModel.actualizarPaciente(id, datosActualizados);
        if (!pacienteActualizado) {
            // Si el paciente no existe, devolvemos un código 404.
            res.status(404).json({ error: "Paciente no encontrado." });
            return;
        }
        // Si se actualiza correctamente, devolvemos el paciente actualizado.
        res.json(pacienteActualizado);
    } catch (error) {
        // En caso de error, registramos el problema y devolvemos un código 500.
        console.error("Error al actualizar el paciente:", error);
        res.status(500).json({ error: "Hubo un error al actualizar el paciente." });
    }
};

/**
 * Controlador para eliminar un paciente existente.
 * Este método recibe el ID del paciente como parámetro y lo elimina del sistema.
 */
export const eliminarPaciente = (req, res) => {
    const { id } = req.params; // Obtenemos el ID de los parámetros de la URL.

    // Validamos que el ID sea un número válido.
    if (isNaN(id)) {
        return res.status(400).json({ error: "El ID debe ser un número válido." });
    }

    try {
        // Usamos el modelo para eliminar el paciente.
        const pacienteEliminado = PacientesModel.eliminarPaciente(id);
        if (!pacienteEliminado) {
            // Si el paciente no existe, devolvemos un código 404.
            res.status(404).json({ error: "Paciente no encontrado." });
            return;
        }
        // Si se elimina correctamente, devolvemos un código 204 (sin contenido).
        res.status(204).send();
    } catch (error) {
        // En caso de error, registramos el problema y devolvemos un código 500.
        console.error("Error al eliminar el paciente:", error);
        res.status(500).json({ error: "Hubo un error al eliminar el paciente." });
    }
};

