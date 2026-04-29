const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

const db = mysql.createPool({
  host: 'localhost',
  user: 'root,
  password: '',
  database: 'db_crud',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
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
    tabla: 'producto', // 👈 IMPORTANTE
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

const crearCrud = (ruta, config) => {
  app.get(`/api/${ruta}`, async (req, res) => {
    try {
      const [filas] = await db.query(`SELECT * FROM ${config.tabla} ORDER BY ${config.id} DESC`);
      res.json(filas);
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al listar registros', error: error.message });
    }
  });

  app.get(`/api/${ruta}/:id`, async (req, res) => {
    try {
      const [filas] = await db.query(`SELECT * FROM ${config.tabla} WHERE ${config.id} = ?`, [req.params.id]);
      if (filas.length === 0) return res.status(404).json({ mensaje: 'Registro no encontrado' });
      res.json(filas[0]);
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al buscar registro', error: error.message });
    }
  });

  app.post(`/api/${ruta}`, async (req, res) => {
    try {
      if (!validarCampos(req, res, config.campos)) return;

      const valores = config.campos.map((campo) => req.body[campo]);
      const columnas = config.campos.join(', ');
      const marcas = config.campos.map(() => '?').join(', ');

      const [resultado] = await db.query(
        `INSERT INTO ${config.tabla} (${columnas}) VALUES (${marcas})`,
        valores
      );

      res.status(201).json({ [config.id]: resultado.insertId, ...req.body });
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al guardar registro', error: error.message });
    }
  });

  app.put(`/api/${ruta}/:id`, async (req, res) => {
    try {
      if (!validarCampos(req, res, config.campos)) return;

      const asignaciones = config.campos.map((campo) => `${campo} = ?`).join(', ');
      const valores = config.campos.map((campo) => req.body[campo]);
      valores.push(req.params.id);

      const [resultado] = await db.query(
        `UPDATE ${config.tabla} SET ${asignaciones} WHERE ${config.id} = ?`,
        valores
      );

      if (resultado.affectedRows === 0) return res.status(404).json({ mensaje: 'Registro no encontrado' });
      res.json({ [config.id]: Number(req.params.id), ...req.body });
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al actualizar registro', error: error.message });
    }
  });

  app.delete(`/api/${ruta}/:id`, async (req, res) => {
    try {
      const [resultado] = await db.query(`DELETE FROM ${config.tabla} WHERE ${config.id} = ?`, [req.params.id]);
      if (resultado.affectedRows === 0) return res.status(404).json({ mensaje: 'Registro no encontrado' });
      res.json({ mensaje: 'Registro eliminado correctamente' });
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al eliminar registro', error: error.message });
    }
  });
};

Object.entries(tablas).forEach(([ruta, config]) => crearCrud(ruta, config));

app.get('/', (req, res) => {
  res.send('API CRUD conectada a MySQL db_crud');
});

app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});
