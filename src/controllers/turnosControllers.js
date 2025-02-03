// Importamos el modelo `TurnosModel` para poder interactuar con los datos de los turnos.
import { TurnosModel } from "../models/turnosModels.js";

// Controlador para obtener todos los turnos
export const obtenerTodosLosTurnos = (req, res) => {
    try {
        // Llamamos al método del modelo para obtener todos los turnos
        const turnos = TurnosModel.obtenerTodosLosTurnos();
        // Respondemos al cliente con los turnos en formato JSON
        res.json(turnos);
    } catch (error) {
        // Si hay un error, lo mostramos en la consola
        console.error("Error al obtener los turnos:", error);
        // Respondemos con un error 500 y un mensaje personalizado
        res.status(500).json({ error: "Hubo un error al obtener los turnos." });
    }
};

// Controlador para obtener un turno por su ID
export const obtenerTurnoPorID = (req, res) => {
    // Extraemos el ID del turno de los parámetros de la URL
    const { id } = req.params;

    // Comprobamos que el ID sea un número válido
    if (isNaN(id)) {
        return res.status(400).json({ error: "El ID debe ser un número válido." });
    }

    try {
        // Llamamos al método del modelo para obtener el turno por su ID
        const turno = TurnosModel.obtenerTurnoPorId(id);
        
        // Si no encontramos el turno, respondemos con un error 404
        if (!turno) {
            res.status(404).json({ error: "Turno no encontrado." });
            return;
        }
        
        // Si encontramos el turno, lo respondemos en formato JSON
        res.json(turno);
    } catch (error) {
        // Si hay un error, lo mostramos en la consola
        console.error("Error al obtener el turno:", error);
        // Respondemos con un error 500 y un mensaje personalizado
        res.status(500).json({ error: "Hubo un error al obtener el turno." });
    }
};

// Controlador para crear un nuevo turno
export const crearTurno = (req, res) => {
    // Extraemos los datos del turno desde el cuerpo de la solicitud
    const nuevoTurno = req.body;

    // Comprobamos que los datos del turno sean válidos (en este caso, que tenga fecha y hora)
    if (!nuevoTurno || !nuevoTurno.fecha || !nuevoTurno.hora) {
        return res.status(400).json({ error: "Los datos del turno son obligatorios." });
    }

    try {
        // Llamamos al modelo para crear un nuevo turno
        const turnoCreado = TurnosModel.crearTurno(nuevoTurno);
        // Respondemos con un código 201 y el turno creado
        res.status(201).json(turnoCreado);
    } catch (error) {
        // Si hay un error, lo mostramos en la consola
        console.error("Error al crear el turno:", error);
        // Respondemos con un error 500 y un mensaje personalizado
        res.status(500).json({ error: "Hubo un error al crear el turno." });
    }
};

// Controlador para actualizar un turno existente
export const actualizarTurno = (req, res) => {
    // Extraemos el ID del turno desde los parámetros de la URL
    const { id } = req.params;
    // Extraemos los datos actualizados del cuerpo de la solicitud
    const datosActualizados = req.body;

    // Comprobamos que el ID sea un número válido
    if (isNaN(id)) {
        return res.status(400).json({ error: "El ID debe ser un número válido." });
    }

    try {
        // Llamamos al modelo para actualizar el turno
        const turnoActualizado = TurnosModel.actualizarTurno(id, datosActualizados);
        
        // Si el turno no fue encontrado, respondemos con un error 404
        if (!turnoActualizado) {
            res.status(404).json({ error: "Turno no encontrado." });
            return;
        }
        
        // Si el turno fue actualizado con éxito, lo respondemos en formato JSON
        res.json(turnoActualizado);
    } catch (error) {
        // Si hay un error, lo mostramos en la consola
        console.error("Error al actualizar el turno:", error);
        // Respondemos con un error 500 y un mensaje personalizado
        res.status(500).json({ error: "Hubo un error al actualizar el turno." });
    }
};

// Controlador para eliminar un turno por su ID
export const eliminarTurno = (req, res) => {
    // Extraemos el ID del turno desde los parámetros de la URL
    const { id } = req.params;

    // Comprobamos que el ID sea un número válido
    if (isNaN(id)) {
        return res.status(400).json({ error: "El ID debe ser un número válido." });
    }

    try {
        // Llamamos al modelo para eliminar el turno
        const turnoEliminado = TurnosModel.eliminarTurno(id);
        
        // Si el turno no fue encontrado, respondemos con un error 404
        if (!turnoEliminado) {
            res.status(404).json({ error: "Turno no encontrado." });
            return;
        }
        
        // Si el turno fue eliminado con éxito, respondemos con un código 204 (sin contenido)
        res.status(204).send();
    } catch (error) {
        // Si hay un error, lo mostramos en la consola
        console.error("Error al eliminar el turno:", error);
        // Respondemos con un error 500 y un mensaje personalizado
        res.status(500).json({ error: "Hubo un error al eliminar el turno." });
    }
};
