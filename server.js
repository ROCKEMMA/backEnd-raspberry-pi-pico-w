var express = require('express');
var cors = require('cors');

var app = express();

// Usar CORS para permitir solicitudes desde cualquier origen
app.use(cors({
  origin: '*',
}));

// Para parsear JSON en las solicitudes
app.use(express.json());

// Variables para almacenar los valores de los sensores
let temperatura = 0;
let ph = 0;
let humedad = 0;
let oxigeno = 0;
let turbidez = 0;

// Función para actualizar los valores de los sensores
const actualizarValor = (req, res, variable, nombre) => {
  const { nuevoNumero } = req.body;
  if (typeof nuevoNumero === 'number' && !isNaN(nuevoNumero)) {
    global[variable] = nuevoNumero;
    res.status(200).json({ message: `${nombre} actualizado correctamente`, [nombre]: nuevoNumero });
  } else {
    res.status(400).json({ message: `El valor enviado para ${nombre} no es válido` });
  }
};

// Rutas para actualizar
app.post('/actualizarTemperatura', (req, res) => actualizarValor(req, res, 'temperatura', 'temperatura'));
app.post('/actualizarPH', (req, res) => actualizarValor(req, res, 'ph', 'ph'));
app.post('/actualizarHumedad', (req, res) => actualizarValor(req, res, 'humedad', 'humedad'));
app.post('/actualizarOxigeno', (req, res) => actualizarValor(req, res, 'oxigeno', 'oxigeno'));
app.post('/actualizarTurbidez', (req, res) => actualizarValor(req, res, 'turbidez', 'turbidez'));

// Rutas para consultar
app.get('/temperatura', (req, res) => res.status(200).json({ temperatura }));
app.get('/ph', (req, res) => res.status(200).json({ ph }));
app.get('/humedad', (req, res) => res.status(200).json({ humedad }));
app.get('/oxigeno', (req, res) => res.status(200).json({ oxigeno }));
app.get('/turbidez', (req, res) => res.status(200).json({ turbidez }));

// Configuración del puerto de consulta
const PORT = 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor escuchando en http://45.56.113.215:${PORT}`);
});

module.exports = app;
