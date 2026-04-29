import { useState } from 'react';
import './App.css';
import { CrudCategoria } from './components/CrudCategoria';
import { CrudProducto } from './components/CrudProducto';
import { CrudCliente } from './components/CrudCliente';
import { CrudProveedor } from './components/CrudProveedor';

function App() {
  const [vista, setVista] = useState('categorias');

  const renderVista = () => {
    if (vista === 'categorias') return <CrudCategoria />;
    if (vista === 'productos') return <CrudProducto />;
    if (vista === 'clientes') return <CrudCliente />;
    if (vista === 'proveedores') return <CrudProveedor />;
    return <CrudCategoria />;
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>CRUD React + Node.js + MySQL</h1>
        <p>Base de datos local XAMPP: db_crud</p>

        <nav className="menu">
          <button className={vista === 'categorias' ? 'activo' : ''} onClick={() => setVista('categorias')}>Categorías</button>
          <button className={vista === 'productos' ? 'activo' : ''} onClick={() => setVista('productos')}>Productos</button>
          <button className={vista === 'clientes' ? 'activo' : ''} onClick={() => setVista('clientes')}>Clientes</button>
          <button className={vista === 'proveedores' ? 'activo' : ''} onClick={() => setVista('proveedores')}>Proveedores</button>
        </nav>

        <div className="crud-contenedor">
          {renderVista()}
        </div>
      </header>
    </div>
  );
}

export default App;
