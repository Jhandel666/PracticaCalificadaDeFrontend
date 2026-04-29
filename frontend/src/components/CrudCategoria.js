import React from 'react';
import { CrudBase } from './CrudBase';

export const CrudCategoria = () => {
  return (
    <CrudBase
      titulo="CRUD Categorías"
      endpoint="categorias"
      idCampo="id_categoria"
      inicial={{ descripcion: '' }}
      campos={[
        { name: 'descripcion', label: 'Descripción', placeholder: 'Descripción de la categoría' }
      ]}
    />
  );
};
