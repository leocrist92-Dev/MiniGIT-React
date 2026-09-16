// Repositories.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// 1. Importamos el servicio para interactuar con la fuente de datos de repositorios
import { obtenerRepositorios } from '../services/repoService';

export default function Repositories() {
  // Estado para almacenar la lista de repositorios traída desde el servicio
  const [repos, setRepos] = useState([]);

  // Estados para la carga asíncrona y errores de red
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState({
    type: 'status-info',
    message: 'Cargando repositorios desde el servidor...'
  });

  const [navOpen, setNavOpen] = useState(false);
  const [privacyFilter, setPrivacyFilter] = useState('Todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [repoSearch, setRepoSearch] = useState('');
  const [viewMode, setViewMode] = useState('cards'); // 'cards' | 'table'

  // 2. EFECTO DE CARGA INICIAL
  // Se ejecuta una sola vez al montar el componente gracias al arreglo de dependencias vacío []
  useEffect(() => {
    cargarRepositorios();
  }, []);

  // 3. FUNCIÓN ASÍNCRONA PARA CONSULTAR EL SERVICIO
  const cargarRepositorios = async () => {
    setLoading(true);
    setStatus({
      type: 'status-info',
      message: 'Cargando repositorios desde el servidor...'
    });

    try {
      // Petición asíncrona con await al servicio
      const data = await obtenerRepositorios();
      setRepos(data);
      setStatus({
        type: 'status-success',
        message: `✓ Se cargaron ${data.length} repositorios correctamente.`
      });
    } catch (error) {
      // Manejo de errores en caso de fallo de red o backend
      setStatus({
        type: 'status-error',
        message: error.message || '✗ Error al consultar los repositorios.'
      });
    } finally {
      // Desactivamos el indicador de carga
      setLoading(false);
    }
  };

  // 4. LÓGICA DE FILTRADO EN MEMORIA
  // Filtramos la lista cargada según el buscador y la visibilidad sin rehacer peticiones al backend
  const filteredRepos = repos.filter((repo) => {
    const matchesPrivacy =
      privacyFilter === 'Todos' || repo.privacy === privacyFilter;
    const matchesSearch =
      !repoSearch || repo.name.toLowerCase().includes(repoSearch.toLowerCase());
    return matchesPrivacy && matchesSearch;
  });

  return (
	<section className="space-y-6">
		{/* Encabezado y acciones principales */}
		<div className="panel-neo p-6">
		<div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
			<div>
			<div className="badge-chip badge-blue">Usuario: Juan Pérez</div>
			<p className="text-slate-300 mt-3">
				Panel corporativo con acceso a repositorios, ramas, commits y acciones administrativas.
			</p>
			</div>
			<div className="flex flex-wrap gap-3">
			<Link to="/crear-repo" className="btn-primary">+ Nuevo repo</Link>
			<button className="btn-secondary">Configuración</button>
			</div>
		</div>
		</div>

		<div className="grid md:grid-cols-4 gap-4">
		<div className="card-3d p-5">
			<div className="text-xs uppercase tracking-[.18em] text-slate-400">Total repos</div>
			<div className="text-3xl font-black mt-2">5</div>
		</div>
		<div className="card-3d p-5">
			<div className="text-xs uppercase tracking-[.18em] text-slate-400">Privados</div>
			<div className="text-3xl font-black mt-2">2</div>
		</div>
		<div className="card-3d p-5">
			<div className="text-xs uppercase tracking-[.18em] text-slate-400">Públicos</div>
			<div className="text-3xl font-black mt-2">3</div>
		</div>
		<div className="card-3d p-5">
			<div className="text-xs uppercase tracking-[.18em] text-slate-400">Commits totales</div>
			<div className="text-3xl font-black mt-2">47</div>
		</div>
		</div>

		<div className="panel-neo p-5">
		<div className="flex flex-wrap gap-3">
			<select
			id="privacyFilter"
			className="select-neo max-w-[180px]"
			value={privacyFilter}
			onChange={(e) => setPrivacyFilter(e.target.value)}
			>
			<option value="Todos">Todos</option>
			<option value="Público">Público</option>
			<option value="Privado">Privado</option>
			</select>

			<input
			id="repoSearch"
			className="input-neo max-w-[280px]"
			placeholder="Buscar repositorio..."
			value={repoSearch}
			onChange={(e) => setRepoSearch(e.target.value)}
			/>

			<button
			id="viewCards"
			className="btn-secondary"
			onClick={() => setViewMode('cards')}
			>
			Tarjetas
			</button>
			<button
			id="viewTable"
			className="btn-secondary"
			onClick={() => setViewMode('table')}
			>
			Tabla
			</button>
		</div>
		</div>

		{/* CARD VIEW */}
		<div
		id="repoCards"
		className={`grid lg:grid-cols-2 gap-5 ${viewMode === 'table' ? 'hidden-soft' : ''}`}
		>
		{filteredRepos.map((repo) => (
			<div
			key={repo.id}
			className="card-3d p-5 repo-item"
			data-name={repo.name}
			data-privacy={repo.privacy}
			>
			<div className="flex flex-wrap items-center gap-2">
				<h3 className="text-xl font-black text-white">{repo.name}</h3>
				<span className={`badge-chip ${repo.privacy === 'Público' ? 'badge-blue' : ''}`}>
				{repo.privacy}
				</span>
			</div>
			<p className="text-slate-300 mt-3">{repo.description}</p>
			<p className="text-slate-400 mt-2 text-sm">{repo.stats}</p>
			
			<div className="langbar mt-4">
				{repo.langs.map((l, idx) => (
				<span key={idx} className={l.type} style={{ width: l.width }}></span>
				))}
			</div>

			{repo.langText && (
				<p className="text-slate-300 text-sm mt-3">{repo.langText}</p>
			)}

			{repo.hasActions && (
				<div className="flex flex-wrap gap-3 mt-4">
				<Link className="btn-secondary" to="/commit" state={{ repoNombre: repo.name, repoId: repo.id }}>Hacer Commit</Link>
				<Link className="btn-secondary" to="/historial">Ver Commits</Link>
				<Link className="btn-secondary" to="/ramas">Ramas</Link>
				<Link className="btn-danger" to="/eliminar">Eliminar</Link>
				</div>
			)}
			</div>
		))}
		</div>

		{/* TABLE VIEW */}
		<div
		id="repoTable"
		className={`panel-neo p-5 ${viewMode === 'cards' ? 'hidden-soft' : ''}`}
		>
		<table className="table-neo">
			<thead>
			<tr>
				<th>Nombre</th>
				<th>Privacidad</th>
				<th>Commits</th>
				<th>Ramas</th>
				<th>Actualizado</th>
			</tr>
			</thead>
			<tbody>
			{filteredRepos.map((repo) => (
				<tr key={repo.id}>
				<td>{repo.name}</td>
				<td>{repo.privacy}</td>
				<td>{repo.commitsCount}</td>
				<td>{repo.branchesCount}</td>
				<td>{repo.updated}</td>
				</tr>
			))}
			</tbody>
		</table>
		</div>
	</section>
  );
}