# Docentes CRUD

API REST sencilla para gestionar docentes con operaciones CRUD usando **Node.js**, **Express** y **MySQL**.

El proyecto actualmente contiene la parte de **backend** en la carpeta `server`. Las carpetas `client` y `docs` existen en el repositorio, pero por ahora no incluyen implementacion.

## Objetivo del proyecto

Este proyecto permite administrar un listado de docentes mediante una API que soporta:

- Consultar todos los docentes
- Consultar un docente por su ID
- Registrar un nuevo docente
- Actualizar un docente existente
- Eliminar un docente

Es un proyecto apropiado para practicar:

- Arquitectura basica cliente-servidor
- Creacion de APIs REST con Express
- Conexion a bases de datos MySQL
- Operaciones CRUD
- Uso de variables de entorno con `dotenv`

## Tecnologias utilizadas

- `Node.js`
- `Express`
- `MySQL2`
- `dotenv`
- `cors`
- `nodemon` para desarrollo

## Estructura del proyecto

```text
docentes_crud/
|-- client/        # Carpeta reservada para el frontend (sin implementacion actual)
|-- docs/          # Carpeta reservada para documentacion adicional
`-- server/
    |-- db.js      # Configuracion y conexion a MySQL
    |-- index.js   # Servidor Express y rutas del CRUD
    |-- package.json
    `-- package-lock.json
```

## Funcionalidad actual

La API expone rutas para trabajar con la tabla `docentes`, que maneja los siguientes campos:

- `id`
- `nombre`
- `correo`
- `telefono`
- `titulo`
- `area_academica`
- `dedicacion`
- `anios_experiencia`

## Requisitos previos

Antes de ejecutar el proyecto, asegurate de tener instalado:

- `Node.js` 18 o superior
- `npm`
- `MySQL Server`

## Instalacion

### 1. Entrar al proyecto

```bash
cd docentes_crud
```

### 2. Entrar a la carpeta del servidor

```bash
cd server
```

### 3. Instalar dependencias

```bash
npm install
```

## Configuracion de la base de datos

El backend utiliza variables de entorno para conectarse a MySQL.

### 1. Crear la base de datos

Puedes crear una base llamada `docentes_db` con el siguiente script:

```sql
CREATE DATABASE IF NOT EXISTS docentes_db;
USE docentes_db;

CREATE TABLE IF NOT EXISTS docentes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  correo VARCHAR(120) NOT NULL,
  telefono VARCHAR(30) NOT NULL,
  titulo VARCHAR(120) NOT NULL,
  area_academica VARCHAR(120) NOT NULL,
  dedicacion VARCHAR(80) NOT NULL,
  anios_experiencia INT NOT NULL
);
```

### 2. Crear el archivo `.env`

Dentro de la carpeta `server`, crea un archivo llamado `.env` con un contenido similar a este:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_password
DB_NAME=docentes_db
```

### 3. Notas importantes sobre la conexion

- Si no defines variables de entorno, el proyecto usa valores por defecto desde el codigo.
- Aun asi, lo recomendable es **configurar siempre tu archivo `.env`** para evitar dependencias en credenciales locales.

## Ejecucion del proyecto

Desde la carpeta `server`, inicia el servidor con:

```bash
npm run dev
```

Si todo esta correcto, el backend se ejecutara en:

```text
http://localhost:3001
```

## Endpoints disponibles

La base URL de la API es:

```text
http://localhost:3001
```

### 1. Obtener todos los docentes

**GET** `/docentes`

Devuelve la lista completa de docentes registrados.

Ejemplo:

```bash
curl http://localhost:3001/docentes
```

Respuesta esperada:

```json
[
  {
    "id": 1,
    "nombre": "Ana Torres",
    "correo": "ana@correo.com",
    "telefono": "5551234567",
    "titulo": "Maestra en Sistemas",
    "area_academica": "Ingenieria en Software",
    "dedicacion": "Tiempo Completo",
    "anios_experiencia": 8
  }
]
```

### 2. Obtener un docente por ID

**GET** `/docentes/:id`

Consulta un docente especifico a partir de su identificador.

Ejemplo:

```bash
curl http://localhost:3001/docentes/1
```

### 3. Crear un docente

**POST** `/docentes`

Registra un nuevo docente en la base de datos.

Campos requeridos:

- `nombre`
- `correo`
- `telefono`
- `titulo`
- `area_academica`
- `dedicacion`
- `anios_experiencia`

Ejemplo:

```bash
curl -X POST http://localhost:3001/docentes \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Ana Torres",
    "correo": "ana@correo.com",
    "telefono": "5551234567",
    "titulo": "Maestra en Sistemas",
    "area_academica": "Ingenieria en Software",
    "dedicacion": "Tiempo Completo",
    "anios_experiencia": 8
  }'
```

### 4. Actualizar un docente

**PUT** `/docentes/:id`

Actualiza la informacion de un docente existente.

Ejemplo:

```bash
curl -X PUT http://localhost:3001/docentes/1 \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Ana Torres",
    "correo": "ana.actualizada@correo.com",
    "telefono": "5551234567",
    "titulo": "Doctora en Sistemas",
    "area_academica": "Ingenieria en Software",
    "dedicacion": "Tiempo Completo",
    "anios_experiencia": 10
  }'
```

### 5. Eliminar un docente

**DELETE** `/docentes/:id`

Elimina un docente a partir de su ID.

Ejemplo:

```bash
curl -X DELETE http://localhost:3001/docentes/1
```

## Validaciones implementadas

Actualmente el backend valida lo siguiente en las operaciones de creacion y actualizacion:

- Todos los campos de texto son obligatorios
- `anios_experiencia` debe ser numerico
- `anios_experiencia` no puede ser negativo

Si alguna validacion falla, la API responde con codigo `400`.

## Respuestas de error comunes

### Error de validacion

```json
{
  "error": "todos los campos son requeridos"
}
```

### Error de base de datos

```json
{
  "error": "error al guardar al docente"
}
```

## Scripts disponibles

En `server/package.json` estan configurados estos scripts:

- `npm run dev`: inicia el servidor con `nodemon`
- `npm test`: actualmente no tiene pruebas configuradas

## Estado actual del proyecto

Situacion real del repositorio al dia de hoy:

- El backend del CRUD si esta implementado
- La conexion a MySQL esta configurada en `server/db.js`
- Las rutas del CRUD estan definidas en `server/index.js`
- La carpeta `client` todavia no contiene frontend
- La carpeta `docs` todavia no contiene documentacion adicional
- No hay pruebas automaticas configuradas por ahora

## Posibles mejoras

Algunas mejoras naturales para la siguiente etapa del proyecto serian:

- Crear el frontend en la carpeta `client`
- Agregar un archivo `.env.example`
- Incorporar validaciones mas robustas
- Manejar mejor los errores por recurso no encontrado
- Anadir pruebas para la API
- Separar rutas, controladores y configuracion en modulos

## Autor

Proyecto orientado al aprendizaje y practica de un CRUD completo con Node.js, Express y MySQL.
