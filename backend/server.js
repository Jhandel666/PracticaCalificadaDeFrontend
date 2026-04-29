const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { Pool } = require('pg');

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

const db = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  ssl: {
    rejectUnauthorized: false
  }
});

const tablas = {
  categorias: {
    tabla: 'categoria',
    id: 'id_categoria',
    campos: ['descripcion']
  },
  clientes: {
    tabla: 'clientes',
    id: 'id_cliente',
    campos: ['nombres', 'apellidos', 'direccion', 'telefono']
  },
  productos: {
    tabla: 'producto',
    id: 'id_producto',
    campos: ['descripcion', 'precio', 'stock', 'id_categoria', 'id_proveedor']
  },
  proveedores: {
    tabla: 'proveedor',
    id: 'id_proveedor',
    campos: ['razonsocial', 'direccion', 'telefono']
  }
};

const validarCampos = (req, res, campos) => {
  for (const campo of campos) {
    if (req.body[campo] === undefined || req.body[campo] === '') {
      res.status(400).json({ mensaje: `El campo ${campo} es obligatorio` });
      return false;
    }
  }
  return true;
};

const crearMarcadores = (cantidad, inicio = 1) => {
  return Array.from({ length: cantidad }, (_, i) => `$${i + inicio}`).join(', ');
};

const crearCrud = (ruta, config) => {
  app.get(`/api/${ruta}`, async (req, res) => {
    try {
      const resultado = await db.query(
        `SELECT * FROM ${config.tabla} ORDER BY ${config.id} DESC`
      );

      res.json(resultado.rows);
    } catch (error) {
      res.status(500).json({
        mensaje: 'Error al listar registros',
        error: error.message
      });
    }
  });

  app.get(`/api/${ruta}/:id`, async (req, res) => {
    try {
      const resultado = await db.query(
        `SELECT * FROM ${config.tabla} WHERE ${config.id} = $1`,
        [req.params.id]
      );

      if (resultado.rows.length === 0) {
        return res.status(404).json({ mensaje: 'Registro no encontrado' });
      }

      res.json(resultado.rows[0]);
    } catch (error) {
      res.status(500).json({
        mensaje: 'Error al buscar registro',
        error: error.message
      });
    }
  });

  app.post(`/api/${ruta}`, async (req, res) => {
    try {
      if (!validarCampos(req, res, config.campos)) return;

      const valores = config.campos.map((campo) => req.body[campo]);
      const columnas = config.campos.join(', ');
      const marcas = crearMarcadores(config.campos.length);

      const resultado = await db.query(
        `INSERT INTO ${config.tabla} (${columnas})
         VALUES (${marcas})
         RETURNING *`,
        valores
      );

      res.status(201).json(resultado.rows[0]);
    } catch (error) {
      res.status(500).json({
        mensaje: 'Error al guardar registro',
        error: error.message
      });
    }
  });

  app.put(`/api/${ruta}/:id`, async (req, res) => {
    try {
      if (!validarCampos(req, res, config.campos)) return;

      const asignaciones = config.campos
        .map((campo, index) => `${campo} = $${index + 1}`)
        .join(', ');

      const valores = config.campos.map((campo) => req.body[campo]);
      valores.push(req.params.id);

      const resultado = await db.query(
        `UPDATE ${config.tabla}
         SET ${asignaciones}
         WHERE ${config.id} = $${config.campos.length + 1}
         RETURNING *`,
        valores
      );

      if (resultado.rows.length === 0) {
        return res.status(404).json({ mensaje: 'Registro no encontrado' });
      }

      res.json(resultado.rows[0]);
    } catch (error) {
      res.status(500).json({
        mensaje: 'Error al actualizar registro',
        error: error.message
      });
    }
  });

  app.delete(`/api/${ruta}/:id`, async (req, res) => {
    try {
      const resultado = await db.query(
        `DELETE FROM ${config.tabla}
         WHERE ${config.id} = $1
         RETURNING *`,
        [req.params.id]
      );

      if (resultado.rows.length === 0) {
        return res.status(404).json({ mensaje: 'Registro no encontrado' });
      }

      res.json({ mensaje: 'Registro eliminado correctamente' });
    } catch (error) {
      res.status(500).json({
        mensaje: 'Error al eliminar registro',
        error: error.message
      });
    }
  });
};

Object.entries(tablas).forEach(([ruta, config]) => crearCrud(ruta, config));

app.get('/', (req, res) => {
  res.send('API CRUD conectada a PostgreSQL Supabase');
});

app.get('/test-db', async (req, res) => {
  try {
    const resultado = await db.query('SELECT NOW()');
    res.json(resultado.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});