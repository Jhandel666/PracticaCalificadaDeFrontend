CREATE DATABASE IF NOT EXISTS db_crud;
USE db_crud;

DROP TABLE IF EXISTS producto;
DROP TABLE IF EXISTS proveedor;
DROP TABLE IF EXISTS clientes;
DROP TABLE IF EXISTS categoria;

CREATE TABLE categoria (
  id_categoria INT(11) NOT NULL AUTO_INCREMENT,
  descripcion VARCHAR(100) NOT NULL,
  PRIMARY KEY (id_categoria)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE clientes (
  id_cliente INT(11) NOT NULL AUTO_INCREMENT,
  nombres VARCHAR(50) NOT NULL,
  apellidos VARCHAR(50) NOT NULL,
  direccion VARCHAR(50) NOT NULL,
  telefono VARCHAR(50) NOT NULL,
  PRIMARY KEY (id_cliente)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE proveedor (
  id_proveedor INT(11) NOT NULL AUTO_INCREMENT,
  razonsocial VARCHAR(50) NOT NULL,
  direccion VARCHAR(50) NOT NULL,
  telefono VARCHAR(50) NOT NULL,
  PRIMARY KEY (id_proveedor)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE producto (
  id_producto INT(11) NOT NULL AUTO_INCREMENT,
  descripcion VARCHAR(50) NOT NULL,
  precio DECIMAL(18,0) NOT NULL,
  stock INT(11) NOT NULL,
  id_categoria INT(11) DEFAULT NULL,
  id_proveedor INT(11) DEFAULT NULL,
  PRIMARY KEY (id_producto),
  KEY fk_categoria (id_categoria),
  KEY fk_proveedor (id_proveedor),
  CONSTRAINT fk_categoria FOREIGN KEY (id_categoria) REFERENCES categoria (id_categoria) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_proveedor FOREIGN KEY (id_proveedor) REFERENCES proveedor (id_proveedor) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO categoria (id_categoria, descripcion) VALUES
(1, 'cocina'),
(2, 'carro'),
(3, 'refrigerador'),
(4, 'lavadora'),
(5, 'laptop'),
(6, 'mouse'),
(7, 'parlante'),
(8, 'television'),
(9, 'camara'),
(10, 'horno');

INSERT INTO clientes (id_cliente, nombres, apellidos, direccion, telefono) VALUES
(1, 'Maryori Cris', 'Taipe Tolentino', 'Av. Salsipuedes N°345', '929137780'),
(2, 'Luis Alberto', 'Utos Ceras', 'Av. Salsipuedes N°111', '912345678'),
(3, 'Magdalena Maria', 'Quiñonez Jimenes', 'Av. Marginal N°222', '987654321'),
(4, 'Ana Melisa', 'Arias Malpartida', 'Av. Francisco Bolognesi N°333', '978451261'),
(5, 'Miguel Jose', 'Torres Caysahuana', 'Av. La huerta N°444', '932165498'),
(6, 'Monica Sheyla', 'Meza Taipe', 'Av. La huerta N°444', '945216378'),
(7, 'Cristobal Colon', 'Chiricente Coco', 'Av. San Miguel N°555', '998545412'),
(8, 'Miguel Jose', 'Torres Caysahuana', 'Av. Colonos Fundadores N°666', '988785542'),
(9, 'Marcela Joaquín', 'Tito Tomas', 'Calles Madrigales N°777', '922148579'),
(10, 'Carlos Alvaro', 'Torres Caysahuana', 'Nueva Esperanza N°888', '911223345');

INSERT INTO proveedor (id_proveedor, razonsocial, direccion, telefono) VALUES
(1, 'Grupo S.A 1', 'Jr. Colonos Fundadores', '911223344'),
(2, 'Grupo S.A 2', 'Av. Micaela', '923845210'),
(3, 'Grupo S.A 3', 'Calle Las Marvinas', '900145007'),
(4, 'Grupo S.A 4', 'Agusto B.Legia', '952400152'),
(5, 'Grupo S.A 5', 'Campos Las Flores', '988874574'),
(6, 'Grupo S.A 6', 'Calle Las Brisas del Sur', '966321008'),
(7, 'Grupo S.A 7', 'Las Praderas del Norte', '905442181'),
(8, 'Grupo S.A 8', 'Avenida Los Marginales', '971002450'),
(9, 'Grupo S.A 9', 'Cuadra Las nubes', '985456213'),
(10, 'Grupo S.A 10', 'Julio C.Tello', '912221445');

INSERT INTO producto (id_producto, descripcion, precio, stock, id_categoria, id_proveedor) VALUES
(1, 'aparato electronico 1', 200, 20, 10, 1),
(2, 'aparato electronico 2', 5000, 20, 9, 2),
(3, 'aparato electronico 3', 500, 20, 8, 3),
(4, 'aparato electronico 4', 1200, 20, 7, 4),
(5, 'aparato electronico 5', 2400, 20, 6, 5),
(6, 'aparato electronico 6', 65, 20, 5, 6),
(7, 'aparato electronico 7', 250, 20, 4, 7),
(8, 'aparato electronico 8', 1500, 20, 3, 8),
(9, 'aparato electronico 9', 50, 20, 2, 9),
(10, 'aparato electronico 10', 800, 20, 1, 10);
