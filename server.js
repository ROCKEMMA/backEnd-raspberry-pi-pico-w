var express = require('express');
var cors = require('cors');
var https = require('https');
var fs = require('fs');

var app = express();

// Usar CORS para permitir solicitudes desde cualquier origen
app.use(cors({
  origin: '*'
}));

// Para parsear JSON en las solicitudes
app.use(express.json());

// Configuración del puerto de consulta
const PORT = process.env.PORT || 3000;

const credentials = {
  key: fs.readFileSync('/etc/letsencrypt/live/tilapias360.duckdns.org/privkey.pem', 'utf8'),
  cert: fs.readFileSync('/etc/letsencrypt/live/tilapias360.duckdns.org/fullchain.pem', 'utf8')
};

// Crear servidor HTTPS
https.createServer(credentials, app).listen(PORT, () => {
  console.log(`Servidor HTTPS escuchando en https://tilapias360.duckdns.org:${PORT}`);
});

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

  // Validar si el valor es un número
  if (typeof nuevoNumero === 'number' && !isNaN(nuevoNumero)) {
    sensores[variable] = nuevoNumero;
    res.status(200).json({ message: `${variable} actualizado correctamente`, [variable]: nuevoNumero });
  } else {
    res.status(400).json({ message: `El valor enviado para ${variable} no es válido. Debe ser un número.` });
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

module.exports = app;
