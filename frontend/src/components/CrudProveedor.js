import React from 'react';
import { CrudBase } from './CrudBase';

export const CrudProveedor = () => {
  return (
    <CrudBase
      titulo="CRUD Proveedores"
      endpoint="proveedores"
      idCampo="id_proveedor"
      inicial={{ razonsocial: '', direccion: '', telefono: '' }}
      campos={[
        { name: 'razonsocial', label: 'Razón Social', placeholder: 'Razón social' },
        { name: 'direccion', label: 'Dirección', placeholder: 'Dirección' },
        { name: 'telefono', label: 'Teléfono', placeholder: 'Teléfono' }
      ]}
    />
  );
};
