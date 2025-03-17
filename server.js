// Requiriendo las dependencias necesarias
var express = require('express');
var cors = require('cors');

// Crear una instancia de la aplicación Express
var app = express();

// Usar CORS para permitir solicitudes desde cualquier origen
app.use(cors({
  origin: '*', // Permite solicitudes de cualquier origen
}));

// Middlewares para la configuración básica de Express
app.use(express.json()); // Para parsear JSON en las solicitudes

// Variable para almacenar el número
let numero = 0;  // Valor inicial de la variable

// Ruta para actualizar el número
app.post('/actualizar', (req, res) => {
  // Verificar que el número se pasa en el cuerpo de la solicitud
  const { nuevoNumero } = req.body;

  // Validar que el número sea un entero
  if (Number.isInteger(nuevoNumero)) {
    numero = nuevoNumero; // Actualizar el valor de la variable
    res.status(200).send({ message: 'Número actualizado correctamente', numero });
  } else {
    res.status(400).send({ message: 'El valor enviado no es un número entero válido' });
  }
});

// Ruta para consultar el valor actual del número
app.get('/valor', (req, res) => {
  res.status(200).send({ numero });
});

// Configurar el puerto en el que se escucharán las solicitudes
const PORT = 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor escuchando en http://45.56.113.215:${PORT}`);
});

module.exports = app;
