import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
          {/* Aquí agregarías el resto de tus rutas */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;