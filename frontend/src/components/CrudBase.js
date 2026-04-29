import React, { useEffect, useState } from 'react';

const API_URL = 'http://localhost:4000/api';

export const CrudBase = ({ titulo, endpoint, idCampo, campos, inicial }) => {
  const [lista, setLista] = useState([]);
  const [formulario, setFormulario] = useState(inicial);
  const [editando, setEditando] = useState(null);
  const [mensaje, setMensaje] = useState('');

  const obtenerDatos = async () => {
    try {
      const respuesta = await fetch(`${API_URL}/${endpoint}`);
      const datos = await respuesta.json();

      if (!respuesta.ok) {
        setMensaje(datos.error || datos.mensaje || 'Error al cargar datos');
        setLista([]);
        return;
      }

      setLista(Array.isArray(datos) ? datos : []);
      setMensaje('');
    } catch (error) {
      setMensaje('No se pudo conectar con el backend. Ejecuta npm run backend.');
      setLista([]);
    }
  };

  useEffect(() => {
    obtenerDatos();
  }, [endpoint]);

  const manejarCambio = (e) => {
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
  };

  const limpiar = () => {
    setFormulario(inicial);
    setEditando(null);
    setMensaje('');
  };

  const guardar = async (e) => {
    e.preventDefault();
    const metodo = editando ? 'PUT' : 'POST';
    const url = editando ? `${API_URL}/${endpoint}/${editando}` : `${API_URL}/${endpoint}`;

    try {
      const respuesta = await fetch(url, {
        method: metodo,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formulario)
      });

      const datos = await respuesta.json();
      if (!respuesta.ok) {
        setMensaje(datos.error || datos.mensaje || 'Error al guardar');
        return;
      }

      limpiar();
      obtenerDatos();
    } catch (error) {
      setMensaje('No se pudo conectar con el backend.');
    }
  };

  const editar = (item) => {
    const datosFormulario = { ...inicial };
    campos.forEach((campo) => {
      datosFormulario[campo.name] = item[campo.name] ?? '';
    });
    setFormulario(datosFormulario);
    setEditando(item[idCampo]);
    setMensaje('');
  };

  const eliminar = async (id) => {
    const confirmar = window.confirm('¿Deseas eliminar este registro?');
    if (!confirmar) return;

    try {
      const respuesta = await fetch(`${API_URL}/${endpoint}/${id}`, { method: 'DELETE' });
      const datos = await respuesta.json();
      if (!respuesta.ok) {
        setMensaje(datos.error || datos.mensaje || 'Error al eliminar');
        return;
      }
      obtenerDatos();
    } catch (error) {
      setMensaje('No se pudo conectar con el backend.');
    }
  };

  return (
    <div className="crud-card">
      <h2>{titulo}</h2>

      {mensaje && <div className="mensaje-error">{mensaje}</div>}

      <form onSubmit={guardar} className="crud-form">
        {campos.map((campo) => (
          <div className="campo-form" key={campo.name}>
            <label>{campo.label}</label>
            <input
              type={campo.type || 'text'}
              name={campo.name}
              placeholder={campo.placeholder}
              value={formulario[campo.name]}
              onChange={manejarCambio}
              required
            />
          </div>
        ))}

        <div className="acciones-form">
          <button type="submit">{editando ? 'Actualizar' : 'Guardar'}</button>
          {editando && <button type="button" onClick={limpiar}>Cancelar</button>}
        </div>
      </form>

      <table className="tabla-crud">
        <thead>
          <tr>
            <th>{idCampo}</th>
            {campos.map((campo) => <th key={campo.name}>{campo.label}</th>)}
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {lista.length === 0 ? (
            <tr>
              <td colSpan={campos.length + 2}>No hay registros para mostrar.</td>
            </tr>
          ) : (
            lista.map((item) => (
              <tr key={item[idCampo]}>
                <td>{item[idCampo]}</td>
                {campos.map((campo) => <td key={campo.name}>{item[campo.name]}</td>)}
                <td>
                  <button className="btn-editar" onClick={() => editar(item)}>Editar</button>
                  <button className="btn-eliminar" onClick={() => eliminar(item[idCampo])}>Eliminar</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
