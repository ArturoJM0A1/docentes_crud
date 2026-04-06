# Docentes CRUD API REST Node.js, Express y MySQL

Aplicacion full stack para gestionar docentes con operaciones CRUD. El proyecto esta dividido en:

- `server`: API REST con Node.js, Express y MySQL.
- `client`: SPA con React, Vite, Tailwind CSS, Axios y Lucide React.

## Que hace el proyecto

La aplicacion permite:

- Listar docentes
- Registrar nuevos docentes
- Editar docentes existentes
- Eliminar docentes por ID
- Consultar los datos desde una interfaz web conectada al backend

## Tecnologias

### Backend

- `Node.js`
- `Express`
- `MySQL2`
- `cors`
- `dotenv`
- `nodemon`

### Frontend

- `React`
- `Vite`
- `Tailwind CSS`
- `Axios`
- `react-router-dom`
- `lucide-react`

## Estructura del proyecto

```text
docentes_crud/
|-- client/
|   |-- src/
|   |-- .env.example
|   `-- package.json
|-- docs/
|-- server/
|   |-- db.js
|   |-- index.js
|   |-- .env.example
|   `-- package.json
`-- README.md
```

## Requisitos previos

Antes de ejecutar el proyecto, asegurate de tener instalado:

- `Node.js` 18 o superior
- `npm`
- `MySQL Server`

## Configuracion de la base de datos

### 1. Crear la base de datos

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

### 2. Configurar variables de entorno del backend

Copia `server/.env.example` a `server/.env` y ajusta tus credenciales:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_password
DB_NAME=docentes_db
```

Nota:

- El backend tiene valores por defecto en el codigo, pero lo recomendable es usar siempre `server/.env`.

### 3. Configurar variables de entorno del frontend

El frontend ya apunta por defecto a `http://localhost:3001`, pero si quieres dejarlo explicito puedes copiar `client/.env.example` a `client/.env`:

```env
VITE_API_URL=http://localhost:3001
```

## Instalacion

Instala dependencias por separado para backend y frontend.

### Backend

```bash
cd server
npm install
```

### Frontend

```bash
cd client
npm install
```

## Como ejecutar el backend y el frontend

Necesitas dos terminales abiertas al mismo tiempo.

### Terminal 1: iniciar backend

```bash
cd server
npm run dev
```

El backend quedara disponible en:

```text
http://localhost:3001
```

### Terminal 2: iniciar frontend

```bash
cd client
npm run dev
```

El frontend quedara disponible normalmente en:

```text
http://localhost:5173
```

## Flujo recomendado de arranque

1. Inicia MySQL.
2. Verifica que exista la base `docentes_db` y la tabla `docentes`.
3. Inicia el backend con `npm run dev` dentro de `server`.
4. Inicia el frontend con `npm run dev` dentro de `client`.
5. Abre `http://localhost:5173` en el navegador.

## API REST disponible

Base URL:

```text
http://localhost:3001
```

### Endpoints

- `GET /docentes`: lista todos los docentes.
- `GET /docentes/:id`: obtiene un docente por ID.
- `POST /docentes`: crea un docente.
- `PUT /docentes/:id`: actualiza un docente existente.
- `DELETE /docentes/:id`: elimina un docente.

### Body esperado para crear o actualizar

```json
{
  "nombre": "Ana Torres",
  "correo": "ana@correo.com",
  "telefono": "5551234567",
  "titulo": "Maestra en Sistemas",
  "area_academica": "Ingenieria en Software",
  "dedicacion": "Tiempo Completo",
  "anios_experiencia": 8
}
```

## Scripts disponibles

### `server/package.json`

- `npm run dev`: inicia el backend con `nodemon`

### `client/package.json`

- `npm run dev`: inicia Vite en modo desarrollo
- `npm run build`: genera la version de produccion del frontend
- `npm run preview`: sirve localmente el build generado

## Verificacion rapida

Si quieres validar que todo este funcionando:

1. Ejecuta el backend.
2. Abre `http://localhost:3001/docentes` y confirma que responde JSON.
3. Ejecuta el frontend.
4. Abre `http://localhost:5173`.
5. Crea, edita y elimina un docente desde la interfaz.

## Estado actual

Actualmente el repositorio incluye:

- Backend CRUD funcional con Express y MySQL
- Frontend SPA funcional con React y Tailwind
- Formulario reutilizable para crear y editar
- Tabla de docentes con acciones CRUD
- Servicio Axios para consumo del API
- Notificaciones visuales para operaciones exitosas o fallidas

## Comando de scaffold usado para el frontend

Si quisieras recrear manualmente el frontend desde cero, la base equivalente es:

```bash
npm create vite@latest client -- --template react
```
