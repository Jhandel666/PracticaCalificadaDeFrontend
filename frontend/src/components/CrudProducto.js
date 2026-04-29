import React from 'react';
import { CrudBase } from './CrudBase';

export const CrudProducto = () => {
  return (
    <CrudBase
      titulo="CRUD Productos"
      endpoint="productos"
      idCampo="id_producto"
      inicial={{ descripcion: '', precio: '', stock: '', id_categoria: '', id_proveedor: '' }}
      campos={[
        { name: 'descripcion', label: 'Descripción', placeholder: 'Descripción del producto' },
        { name: 'precio', label: 'Precio', placeholder: 'Precio', type: 'number' },
        { name: 'stock', label: 'Stock', placeholder: 'Stock', type: 'number' },
        { name: 'id_categoria', label: 'ID Categoría', placeholder: 'ID Categoría', type: 'number' },
        { name: 'id_proveedor', label: 'ID Proveedor', placeholder: 'ID Proveedor', type: 'number' }
      ]}
    />
  );
};
