// Importamos los controladores que contienen la lógica de las rutas
import express from 'express';
import { obtenerTodosLosMedicos, obtenerMedicoPorID, crearMedico, actualizarMedico, eliminarMedico } from '../controllers/medicosControllers.js';
import { verificarToken, soloAdmin } from "../middleware/authMiddleware.js"; // Importa los middlewares

// Creamos un enrutador de Express
const router = express.Router();

// Definimos la ruta para obtener todos los médicos
router.get('/', verificarToken,obtenerTodosLosMedicos);
// El controlador `obtenerTodosLosMedicos` se encarga de obtener la lista completa de médicos desde el modelo y responder con los datos.

// Definimos la ruta para obtener un médico por su ID
router.get('/:id', obtenerMedicoPorID);
// El controlador `obtenerMedicoPorID` se encarga de buscar un médico en la base de datos (por ID) y responder con los datos correspondientes.

// Definimos la ruta para crear un nuevo médico
router.post('/', verificarToken, soloAdmin, crearMedico);
// El controlador `crearMedico` se encarga de crear un nuevo médico en la base de datos utilizando los datos proporcionados en el cuerpo de la solicitud.

// Definimos la ruta para actualizar un médico por su ID
router.put('/:id', actualizarMedico);
// El controlador `actualizarMedico` se encarga de actualizar los datos de un médico existente utilizando el ID proporcionado en la URL y los nuevos datos enviados en el cuerpo de la solicitud.

// Definimos la ruta para eliminar un médico por su ID
router.delete('/:id', eliminarMedico);
// El controlador `eliminarMedico` se encarga de eliminar un médico existente en la base de datos utilizando el ID proporcionado en la URL.

// Exportamos el enrutador para que pueda ser utilizado en la configuración principal de la aplicación
export default router;
