const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');
const {
  errorHandler,
  logErrors,
  boomErrorHandler,
} = require('./middlewares/error.handler');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const whitelist = ['http://127.0.0.1:5500', 'https://myapp.co'];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('no permitido'));
    }
  },
};
app.use(cors(options));

app.get('/', (req, res) => {
  res.send('Hola mi server en express');
});

app.get('/nueva-ruta', (req, res) => {
  res.send('Hola soy una nueva ruta');
});

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log('Mi port ' + port);
});

/**
 *
 *



REST: Representational State Transfer
Es una conveccion que se refiere a servicios web por protocolo HTTP

Metodos:

Get: Obtener
Put: Modificar/Actualizar
Patch: Modificar/Actualizar
Post: Crear
Delete: Eliminar
Patch
El método de solicitud HTTP PATCH aplica modificaciones parciales a un recurso.

PATCH es algo análogo al concepto de “actualización” que se encuentra en CRUD, Una solicitud se considera un conjunto de instrucciones sobre cómo modificar un recurso. Contrasta esto con PUT; que es una representación completa de un recurso.PATCH

Mo es necesariamente idempotente, aunque puede serlo. Contrasta esto con PUT; que siempre es idempotente.

La palabra “idempotente” significa que cualquier número de solicitudes repetidas e idénticas dejará el recurso en el mismo estado.

Por ejemplo, si un campo de contador de incremento automático es una parte integral del recurso, entonces un PUT lo sobrescribirá naturalmente (ya que sobrescribe todo), pero no necesariamente para .PATCH

PATCH (como POST) puede tener efectos secundarios sobre otros recursos.

PATCH - HTTP | MDN


 */

/***
 *
 *
 Según lo que he leído en la documentación para habilitar CORS en todos los requests la solución sería añadir:

const cors = require('cors');
app.use(cors());
Si solo queremos hacer CORS a los endpoints de nuestra API, bajamos app.use(cors()) justo antes de que empiecen nuestras rutas hacia la API. (Esa sería mi solución)
 */

/**
 *

33
Un breve resumen de las consideraciones para producción:

Cors: Que acceso y a quienes le damos acceso para hacer solicitudes
Https: Que la API esta sobre servidor de HTTPS
Procesos de Build: Se ve en procesos que cosas que tiene procesar información (typescript)
Remover logs: No es bueno tener logs, a veces esto tiene demoras, existen mejor formas para capturar logs.
Seguridad (helmet): Muy importante la seguridad y para esto se recomienda helmt que es una colección de Middleware que colocan capas de segridad a la aplicación
Testing: Correr prebas unitarias o de integración antes de salir de producción
 */
