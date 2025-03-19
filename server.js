var express = require('express');
var cors = require('cors');
var https = require('https');
var fs = require('fs');

var app = express();

// Usar CORS para permitir solicitudes desde cualquier origen
app.use(cors({
  origin: '*',  // Puedes cambiar esto por un dominio específico en el futuro
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

// Configuración del puerto de consulta
const PORT = 3000;

// Para servir contenido sobre HTTPS (si tienes el certificado)
if (process.env.NODE_ENV === 'production') {
  // Leer los certificados SSL
  const privateKey = fs.readFileSync('path/to/privkey.pem', 'utf8');
  const certificate = fs.readFileSync('path/to/cert.pem', 'utf8');
  const ca = fs.readFileSync('path/to/chain.pem', 'utf8');

  const credentials = { key: privateKey, cert: certificate, ca: ca };

  https.createServer(credentials, app).listen(PORT, () => {
    console.log(`Servidor HTTPS escuchando en https://45.56.113.215:${PORT}`);
  });
} else {
  // Si no se necesita HTTPS, puedes usar HTTP
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor HTTP escuchando en http://45.56.113.215:${PORT}`);
  });
}

module.exports = app;
