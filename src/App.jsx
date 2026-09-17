import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// 1. Importamos el AuthProvider
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout';

import Login from './pages/Login';
import Registro from './pages/Registro';
import Repositories from './pages/Repositories';
import CrearRepositorio from './pages/CrearRepositorio';
import HacerCommit from './pages/HacerCommit';
import HistorialCommits from './pages/HistorialCommits';
import DiffVersiones from './pages/DiffVersiones';
import CrearRamas from './pages/CrearRamas';
import HacerMerge from './pages/HacerMerge';
import EliminarRepositorio from './pages/EliminarRepositorio';

import './assets/theme.css';

function App() {
  return (
    // 2. Envolvemos toda la aplicación o el Router con AuthProvider
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            {/*<Route index element={<Repositories />} />*/}
            <Route index element={<Login />} />
            <Route path="login" element={<Login />} />
            <Route path="registro" element={<Registro />} />
            <Route path="repos" element={<Repositories />} />
            <Route path="crear-repo" element={<CrearRepositorio />} />
            <Route path="commit" element={<HacerCommit />} />
            <Route path="historial" element={<HistorialCommits />} />
            <Route path="diff" element={<DiffVersiones />} />
            <Route path="ramas" element={<CrearRamas />} />
            <Route path="merge" element={<HacerMerge />} />
            <Route path="eliminar" element={<EliminarRepositorio />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;