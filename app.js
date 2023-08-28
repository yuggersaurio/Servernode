const express = require('express');
const app = express();

// Importa las rutas
const routes = require('./routes/routes.js');
const cleaner = require('./modules/cleaner/cleaner.js');

// Usa las rutas en tu aplicación
app.use('/', routes);
app.use('/', cleaner);

// Inicia el servidor
app.listen(3001, () => {
  
  console.log('Servidor en ejecución en http://localhost:3000/');


});