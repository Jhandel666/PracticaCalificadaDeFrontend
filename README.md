# Proyecto CRUD React + Node.js + MySQL

CRUD solicitado únicamente para:

- Categorías
- Productos
- Clientes
- Proveedores

La aplicación usa una sola vista en React. El menú cambia el formulario y la tabla sin abrir otra pestaña.

## Base de datos local con XAMPP

1. Abre XAMPP.
2. Inicia Apache y MySQL.
3. Entra a phpMyAdmin.
4. Importa el archivo `bd_crud.sql`.

La conexión está configurada en `backend/server.js`:

```js
host: 'localhost'
user: 'root'
password: ''
database: 'db_crud'
```

## Instalar node_modules

Desde la carpeta principal:

```bash
npm run install-all
```

## Ejecutar backend

```bash
npm run backend
```

Backend: http://localhost:4000

## Ejecutar frontend

En otra terminal:

```bash
npm run frontend
```

Frontend: http://localhost:3000

## Endpoints API

- GET, POST, PUT, DELETE `/api/categorias`
- GET, POST, PUT, DELETE `/api/productos`
- GET, POST, PUT, DELETE `/api/clientes`
- GET, POST, PUT, DELETE `/api/proveedores`
