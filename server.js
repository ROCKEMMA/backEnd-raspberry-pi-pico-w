var express = require('express');
var cors = require('cors');

var app = express();

// Usar CORS para permitir solicitudes desde cualquier origen
app.use(cors({
  origin: '*',
}));

// Para parsear JSON en las solicitudes
app.use(express.json());

// Objeto para almacenar los valores de los sensores
let sensores = {
  temperatura: 0,
  ph: 0,
  humedad: 0,
  oxigeno: 0,
  turbidez: 0
};

// Función para actualizar los valores de los sensores
const actualizarValor = (req, res, variable) => {
  const { nuevoNumero } = req.body;
  if (typeof nuevoNumero === 'number' && !isNaN(nuevoNumero)) {
    sensores[variable] = nuevoNumero;
    res.status(200).json({ message: `${variable} actualizado correctamente`, [variable]: nuevoNumero });
  } else {
    res.status(400).json({ message: `El valor enviado para ${variable} no es válido` });
  }
};

// Rutas para actualizar
app.post('/actualizarTemperatura', (req, res) => actualizarValor(req, res, 'temperatura'));
app.post('/actualizarPH', (req, res) => actualizarValor(req, res, 'ph'));
app.post('/actualizarHumedad', (req, res) => actualizarValor(req, res, 'humedad'));
app.post('/actualizarOxigeno', (req, res) => actualizarValor(req, res, 'oxigeno'));
app.post('/actualizarTurbidez', (req, res) => actualizarValor(req, res, 'turbidez'));

// Rutas para consultar
app.get('/temperatura', (req, res) => res.status(200).json({ temperatura: sensores.temperatura }));
app.get('/ph', (req, res) => res.status(200).json({ ph: sensores.ph }));
app.get('/humedad', (req, res) => res.status(200).json({ humedad: sensores.humedad }));
app.get('/oxigeno', (req, res) => res.status(200).json({ oxigeno: sensores.oxigeno }));
app.get('/turbidez', (req, res) => res.status(200).json({ turbidez: sensores.turbidez }));

// Configuración del puerto de consulta
const PORT = 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor escuchando en http://45.56.113.215:${PORT}`);
});

module.exports = app;
