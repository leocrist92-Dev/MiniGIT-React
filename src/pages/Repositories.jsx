import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Repositories() {
  const [search, setSearch] = useState('');
  const repos = [
    { name: 'mi-proyecto-python', desc: 'API backend desarrollada con FastAPI y PostgreSQL.', lang: 'Python', visibility: 'Público' },
    { name: 'frontend-react', desc: 'Interfaz interactiva de usuario en ReactJS.', lang: 'JavaScript', visibility: 'Privado' },
    { name: 'documentacion-sena', desc: 'Guías y especificaciones técnicas.', lang: 'Markdown', visibility: 'Público' }
  ];

  const filtered = repos.filter(r => r.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <>
      <div className="orb orb-a"></div>
      <div className="orb orb-b"></div>
      <div className="orb orb-c"></div>
      <div className="soft-grid shell min-h-screen">

        <main className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <input 
              className="input-neo sm:w-80" 
              placeholder="Buscar repositorio..." 
              value={search} 
              onChange={(e) => setSearch(e.target.value)} 
            />
            <Link to="/crear-repo" className="btn-primary">+ Nuevo Repositorio</Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((repo, i) => (
              <div key={i} className="card-3d p-5 space-y-3">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-black text-blue-400">{repo.name}</h3>
                  <span className="badge-chip">{repo.visibility}</span>
                </div>
                <p className="text-slate-300 text-sm">{repo.desc}</p>
                <div className="flex justify-between items-center text-xs text-slate-400 pt-2 border-t border-white/10">
                  <span>Lenguaje: {repo.lang}</span>
                  <Link to="/commit" className="text-cyan-400 hover:underline">Ver repositorio →</Link>
                </div>
              </div>
            ))}
          </div>
        </main>
    </div>
  </>
  );
}