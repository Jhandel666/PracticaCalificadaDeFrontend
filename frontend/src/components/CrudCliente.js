import React from 'react';
import { CrudBase } from './CrudBase';

export const CrudCliente = () => {
  return (
    <CrudBase
      titulo="CRUD Clientes"
      endpoint="clientes"
      idCampo="id_cliente"
      inicial={{ nombres: '', apellidos: '', direccion: '', telefono: '' }}
      campos={[
        { name: 'nombres', label: 'Nombres', placeholder: 'Nombres' },
        { name: 'apellidos', label: 'Apellidos', placeholder: 'Apellidos' },
        { name: 'direccion', label: 'Dirección', placeholder: 'Dirección' },
        { name: 'telefono', label: 'Teléfono', placeholder: 'Teléfono' }
      ]}
    />
  );
};
