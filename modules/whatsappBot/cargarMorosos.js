const mysql = require('mysql');
const XLSX = require('xlsx');
const fs = require('fs');
const filePath = './morosos/MOROSOS.XLSX';
const folderPath = '/morosos/MOROSOS.XLSX';

// Función para verificar si el archivo existe en la carpeta
function verificarArchivo() {
  if (fs.existsSync(filePath)) {
    console.log('El archivo existe.');
    cargarMorososSQL();
  } else {
    console.log('El archivo no existe.');
  }

   

}

// Verificar cada 60 segundos
setInterval(verificarArchivo, 5000);


function cargarMorososSQL() {

// Configura la conexión a la base de datos MySQL
const connection = mysql.createConnection({
    host: 'localhost',       // Cambia la dirección si tu base de datos no se encuentra en localhost
    user: 'root',
    password: '',
    database: 'whatsappbot',
    connectTimeout: 30000 // Tiempo de espera de 30 segundos
});

// Establece la conexión a la base de datos
connection.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos: ', err);
    return;
  }

  console.log('Conexión exitosa a la base de datos MySQL');

  const workbook = XLSX.readFile('./morosos/MOROSOS.xlsx');
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];

  // Convertir los datos del archivo XLSX a un arreglo de objetos
  const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

  // Nombre de la tabla en la base de datos
  const tableName = 'morosos';

  // Consulta para crear la tabla si no existe
  const createTableQuery = `CREATE TABLE IF NOT EXISTS ${tableName} (id VARCHAR(100), contrato VARCHAR(100), nombre VARCHAR(100), celular VARCHAR(100), correo VARCHAR(100))`;


  // Consulta para insertar los datos en la tabla
  let insertQuery = `INSERT INTO ${tableName} (id, contrato, nombre, celular, correo) VALUES ?`; // Reemplaza los "..." con las columnas de tu tabla


// Consulta para vaciar los datos en la tabla
let truncateQuery = `TRUNCATE TABLE ${tableName}`;


// Ejecutar consulta para vaciar la tabla
connection.query(truncateQuery, (err) => {
  if (err) {
    console.error('Error al vaciar la tabla:', err);
    return;
  }
  console.log('Tabla vaciada.');
});


  // Ejecutar consulta para crear la tabla
  connection.query(createTableQuery, (err) => {
    if (err) {
      console.error('Error al crear la tabla:', err);
      return;
    }
    console.log('Tabla creada o ya existente.');


    

    // Ejecutar consulta para insertar los datos en la tabla
    connection.query(insertQuery, [data], (err, results) => {
      if (err) {
        console.error('Error al insertar los datos:', err);
        return;
      }
      console.log('Datos insertados correctamente.');

      fs.unlink(filePath, (err) => {
        if (err) {
          console.error(`Error al borrar el archivo: ${err}`);
        } else {
          console.log('Archivo borrado correctamente.');
        }
      });
    

      connection.end(); // Cerrar la conexión a la base de datos
    });
  });
});
}