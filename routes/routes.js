const express = require('express');
const router = express.Router();


// Ruta GET
router.get('/', (req, res) => {
  res.send('¡Hola, mundo get!');
});

// Ruta POST
router.post('/users/:id', (req, res) => {
  // Lógica para crear un nuevo usuario
  const id = req.params.id;
  res.send('Usuario creado'+ id);


  
});

module.exports = router;
