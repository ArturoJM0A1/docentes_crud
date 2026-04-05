require('dotenv').config();

const mysql = require('mysql2');


//Función para conectarse a la base de datos
const connection = mysql.createConnection({

    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'ajuarezm',
    database: process.env.DB_NAME || 'docentes_db'

})

//Validar la conexión
connection.connect((err) => {
    if(err){
        console.error('Error al conectar la bd', err);
        return;
    }

    console.log('Conexión exitosa...');
});


module.exports = connection;

