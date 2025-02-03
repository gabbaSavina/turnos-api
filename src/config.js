// Aquí configuramos las variables de entorno necesarias para la aplicación
const config = {
    PORT: 3000,  // Configuramos el puerto en el que escuchará el servidor
    DB_PATH: './data',  // La ruta donde se almacenarán los archivos de datos
    API_VERSION: '1.0',  // Versión de la API
    SECRET_KEY: 'mi_clave_secreta',  // Ejemplo de una clave secreta para autenticación o cifrado
};

export default config;
