// src/components/Layout.jsx
import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';

export default function Layout() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/' || location.pathname === '/login';

  return (
    <>
      <div className="orb orb-a"></div>
      <div className="orb orb-b"></div>
      <div className="orb orb-c"></div>

      <div className="soft-grid shell min-h-screen">
        {!isLoginPage && (
          <header className="max-w-7xl mx-auto px-4 md:px-6 pt-5">
            <div className="panel-neo px-5 py-4 flex flex-col lg:flex-row lg:items-center gap-4 justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl grid place-items-center bg-gradient-to-br from-blue-500 via-violet-500 to-red-500 font-black text-white shadow-2xl">
                  MG
                </div>
                <div className="text-lg font-black tracking-[0.2em] text-white">MINI-GIT</div>
              </div>
              <nav className="flex flex-wrap gap-2 text-sm">
                <Link className="badge-chip badge-blue" to="/repos">Home</Link>
                <Link className="badge-chip" to="/login">Login</Link>
                <Link className="badge-chip" to="/registro">Registro</Link>
                <Link className="badge-chip" to="/crear-repo">Crear repo</Link>
                <Link className="badge-chip" to="/commit">Commit</Link>
                <Link className="badge-chip" to="/historial">Historial</Link>
                <Link className="badge-chip" to="/diff">Diff</Link>
                <Link className="badge-chip" to="/ramas">Ramas</Link>
                <Link className="badge-chip" to="/merge">Merge</Link>
                <Link className="badge-chip badge-red" to="/eliminar">Eliminar</Link>
              </nav>
            </div>
          </header>
        )}

        <main className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8">
          <Outlet />
        </main>
      </div>
    </>
  );
}