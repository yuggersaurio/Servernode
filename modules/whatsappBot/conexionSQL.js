const mysql = require('mysql');

let fnConexionSql = () => {
return new Promise((resolve, reject) => {

    // Configuración de la conexión a la base de datos
    const connection = mysql.createConnection({
      host: '116.202.3.151',       // Cambia la dirección si tu base de datos no se encuentra en localhost
      user: 'portalho',
      password: 'paticas2013',
      database: 'portalho_portalhouses',
    });
    
    // Realizar la conexión
    connection.connect((err) => {
      if (err) {
        console.error('Ocurrió un error al conectar con la base de datos:', err);
        return;
      }else{
        console.log('Conexión exitosa a la base de datos.');
      }
    });
});
}  
  
module.exports = fnConexionSql;   