// Importamos los controladores que contienen la lógica de las rutas
import express from 'express';
import { obtenerTodosLosPacientes, obtenerPacientePorID, crearPaciente, actualizarPaciente, eliminarPaciente } from '../controllers/pacientesControllers.js';

// Creamos un enrutador de Express
const router = express.Router();

// Definimos la ruta para obtener todos los pacientes
router.get('/', obtenerTodosLosPacientes);
// El controlador `obtenerTodosLosPacientes` se encarga de obtener la lista completa de pacientes desde el modelo y responder con los datos.

// Definimos la ruta para obtener un paciente por su ID
router.get(':id', obtenerPacientePorID);
// El controlador `obtenerPacientePorID` se encarga de buscar un paciente en la base de datos (por ID) y responder con los datos correspondientes.

// Definimos la ruta para crear un nuevo paciente
router.post('/', crearPaciente);
// El controlador `crearPaciente` se encarga de crear un nuevo paciente en la base de datos utilizando los datos proporcionados en el cuerpo de la solicitud.

// Definimos la ruta para actualizar un paciente por su ID
router.put('/:id', actualizarPaciente);
// El controlador `actualizarPaciente` se encarga de actualizar los datos de un paciente existente utilizando el ID proporcionado en la URL y los nuevos datos enviados en el cuerpo de la solicitud.

// Definimos la ruta para eliminar un paciente por su ID
router.delete('/:id', eliminarPaciente);
// El controlador `eliminarPaciente` se encarga de eliminar un paciente existente en la base de datos utilizando el ID proporcionado en la URL.

// Exportamos el enrutador para que pueda ser utilizado en la configuración principal de la aplicación
export default router;

