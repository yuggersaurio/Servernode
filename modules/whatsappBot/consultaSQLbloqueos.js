const mysql = require('mysql');



let fnConsultaSQLbloqueos = (contrato) => {
let bloqueoReturn = 0;

  


    return new Promise((resolve, reject) => {

// Configuración de la conexión a la base de datos
const connection = mysql.createConnection({
  host: 'localhost',       
  user: 'root',
  password: '',
  database: 'whatsappbot',
  connectTimeout: 30000 // Tiempo fuera para conexion con la base de datos. 

});

// Realizar la conexión
connection.connect((err) => {
  if (err) {
    console.error('Ocurrió un error al conectar con la base de datos:', err);
    connection.end();
    return;
  }

  console.log('Conexión exitosa a la base de datos.');

  // Consulta a la tabla
  const consulta = 'SELECT * FROM contratos_bloqueo WHERE Contrato = '+ '"'+contrato+'"';

  // Ejecutar la consulta
  connection.query(consulta, (error, filas) => {
    if (error) {
      console.error('Ocurrió un error al ejecutar la consulta:', error);
      connection.end();
      return;
    }
    
    if (filas.length === 0) {
      console.log("Contrato activo");
      connection.end();
    } else {

    // Mostrar los resultados
    console.log('Contrato bloqueado');
    bloqueoReturn = 1

    
     resolve (bloqueoReturn);
     
     
        
        connection.end();
  

      }


    //----------------------------------------------------------------


    // Cerrar la conexión a la base de datos
 
  });
});
});

}



module.exports = fnConsultaSQLbloqueos;