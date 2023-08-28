const mysql = require('mysql');


let fnConsultaSQLPay = () => {

     return new Promise((resolve, reject) => {

  // Configura la conexión a la base de datos
const connection = mysql.createConnection({
  host: 'localhost',       // Cambia la dirección si tu base de datos no se encuentra en localhost
  user: 'root',
  password: '',
  database: 'whatsappbot',
  connectTimeout: 30000 // Tiempo de espera de 30 segundos
});

// Conecta a la base de datos
connection.connect();

// Ejecuta la consulta SQL
connection.query('SELECT * FROM morosos', function(error, results, fields) {
  if (error) throw error;

  // Crea un array para almacenar los resultados
  const usuarios = [];

  // Recorre los resultados y agrega cada registro al array
  results.forEach(function(row) {
    usuarios.push(row);
  
  });

  // Imprime los resultados en la consola
  
  resolve(usuarios);
  console.log(usuarios);
  // Cierra la conexión a la base de datos

});

connection.query('TRUNCATE TABLE morosos', function(error, results, fields) {
  if (error) throw error;


  connection.end();
});


});
}



module.exports = fnConsultaSQLPay;