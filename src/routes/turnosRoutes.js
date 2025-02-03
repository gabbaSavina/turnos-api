// Importamos los controladores que contienen la lógica de las rutas
import express from 'express';
import { obtenerTodosLosTurnos, obtenerTurnoPorID, crearTurno, actualizarTurno, eliminarTurno } from '../controllers/turnosControllers.js';
import { verificarToken } from '../middleware/authMiddleware.js';

// Creamos un enrutador de Express
const router = express.Router();

// Definimos la ruta para obtener todos los turnos
router.get('/', verificarToken, obtenerTodosLosTurnos);
// El controlador `obtenerTodosLosTurnos` se encarga de obtener la lista completa de turnos desde el modelo y responder con los datos.

// Definimos la ruta para obtener un turno por su ID
router.get('/:id', obtenerTurnoPorID);
// El controlador `obtenerTurnoPorID` se encarga de buscar un turno en la base de datos (por ID) y responder con los datos correspondientes.

// Definimos la ruta para crear un nuevo turno
router.post('/', verificarToken, crearTurno);
// El controlador `crearTurno` se encarga de crear un nuevo turno en la base de datos utilizando los datos proporcionados en el cuerpo de la solicitud.

// Definimos la ruta para actualizar un turno por su ID
router.put('/:id', actualizarTurno);
// El controlador `actualizarTurno` se encarga de actualizar los datos de un turno existente utilizando el ID proporcionado en la URL y los nuevos datos enviados en el cuerpo de la solicitud.

// Definimos la ruta para eliminar un turno por su ID
router.delete('/:id', eliminarTurno);
// El controlador `eliminarTurno` se encarga de eliminar un turno existente en la base de datos utilizando el ID proporcionado en la URL.

// Exportamos el enrutador para que pueda ser utilizado en la configuración principal de la aplicación
export default router;
