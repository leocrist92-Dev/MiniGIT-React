import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';

export default function Layout() {
  const [navOpen, setNavOpen] = useState(false);
  const location = useLocation();

  const getLinkClass = (path) => 
    `badge-chip ${location.pathname === path ? 'badge-blue' : ''}`;

  return (
    <div className="font-sans text-slate-100 min-h-screen">
      <div className="orb orb-a"></div>
      <div className="orb orb-b"></div>
      <div className="orb orb-c"></div>
      <div className="soft-grid shell min-h-screen">
        <header className="max-w-7xl mx-auto px-4 md:px-6 pt-5">
          <div className="panel-neo px-5 py-4 flex flex-col lg:flex-row lg:items-center gap-4 justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl grid place-items-center bg-gradient-to-br from-blue-500 via-violet-500 to-red-500 font-black text-white shadow-2xl">MG</div>
              <div className="text-lg font-black tracking-[0.2em] text-white">MINI-GIT</div>
            </div>

            <button
              onClick={() => setNavOpen(!navOpen)}
              className="lg:hidden inline-flex items-center gap-2 self-start px-3 py-2 rounded-xl border border-white/20 text-xs font-semibold tracking-[0.18em] uppercase text-slate-100 hover:bg-white/10"
              type="button"
            >
              <span>Menú</span>
              <span className="text-lg">☰</span>
            </button>

            <nav className={`${navOpen ? 'flex' : 'hidden'} lg:flex flex-wrap gap-2 text-sm`}>
              <Link className={getLinkClass('/repos')} to="/repos">Home</Link>
              <Link className={getLinkClass('/login')} to="/login">Login</Link>
              <Link className={getLinkClass('/registro')} to="/registro">Registro</Link>
              <Link className={getLinkClass('/crear-repo')} to="/crear-repo">Crear repo</Link>
              <Link className={getLinkClass('/commit')} to="/commit">Commit</Link>
              <Link className={getLinkClass('/historial')} to="/historial">Historial</Link>
              <Link className={getLinkClass('/diff')} to="/diff">Diff</Link>
              <Link className={getLinkClass('/ramas')} to="/ramas">Ramas</Link>
              <Link className={getLinkClass('/merge')} to="/merge">Merge</Link>
              <Link className={`badge-chip badge-red ${location.pathname === '/eliminar' ? 'border-red-500' : ''}`} to="/eliminar">Eliminar</Link>
            </nav>
          </div>
        </header>

        <Outlet />
      </div>
    </div>
  );
}