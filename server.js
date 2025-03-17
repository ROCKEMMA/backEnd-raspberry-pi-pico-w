var express = require('express');
var cors = require('cors');

var app = express();

// Usar CORS para permitir solicitudes desde cualquier origen
app.use(cors({
  origin: '*',
}));

// Para parsear JSON en las solicitudes
app.use(express.json());

// Variable para almacenar los valores de los sensores
let temperatura = 0;

// Ruta para actualizar la temperatura
app.post('/actualizarTemperatura', (req, res) => {
  const { nuevoNumero } = req.body;

  // Validar si es un número
  if (typeof nuevoNumero === 'number' && !isNaN(nuevoNumero)) {
    temperatura = nuevoNumero;
    res.status(200).json({ message: 'Temperatura actualizada correctamente', temperatura });
  } else {
    res.status(400).json({ message: 'El valor enviado no es un número válido' });
  }
});

// Ruta para consultar la temperatura
app.get('/temperatura', (req, res) => {
  res.status(200).json({ temperatura });
});

// Configuración del puerto de consulta
const PORT = 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor escuchando en http://45.56.113.215:${PORT}`);
});

module.exports = app;
