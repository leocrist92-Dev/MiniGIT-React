// Repositories.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Repositories() {
  const [navOpen, setNavOpen] = useState(false);
  const [privacyFilter, setPrivacyFilter] = useState('Todos');
  const [repoSearch, setRepoSearch] = useState('');
  const [viewMode, setViewMode] = useState('cards'); // 'cards' | 'table'

  const reposData = [
    {
      id: 'repo-1',
      name: 'mi-proyecto-python',
      privacy: 'Público',
      description: 'Sistema de gestión de usuarios con Python y PostgreSQL',
      stats: 'Contribuyentes: 2 · Commits: 8 · Ramas: 3 · Hace 1 minuto',
      commitsCount: 8,
      branchesCount: 3,
      updated: 'Hace 1 minuto',
      langs: [
        { type: 'py', width: '65%' },
        { type: 'sql', width: '35%' }
      ],
      langText: 'Python 65% · SQL 35% · 2.4 MB',
      hasActions: true
    },
    {
      id: 'repo-2',
      name: 'mi-web-frontend',
      privacy: 'Privado',
      description: 'Interfaz web moderna con React',
      stats: 'Contribuyentes: 1 · Commits: 23 · Ramas: 2 · Hace 3 días',
      commitsCount: 23,
      branchesCount: 2,
      updated: 'Hace 3 días',
      langs: [
        { type: 'js', width: '80%' },
        { type: 'css', width: '20%' }
      ],
      hasActions: false
    },
    {
      id: 'repo-3',
      name: 'tutorial-git-sena',
      privacy: 'Público',
      description: 'Tutorial de Git para estudiantes SENA',
      stats: 'Contribuyentes: 5 · Commits: 16 · Ramas: 4 · Hace 1 semana',
      commitsCount: 16,
      branchesCount: 4,
      updated: 'Hace 1 semana',
      langs: [{ type: 'md', width: '100%' }],
      hasActions: false
    },
    {
      id: 'repo-4',
      name: 'api-rest-django',
      privacy: 'Privado',
      description: 'API REST completa con Django',
      stats: 'Contribuyentes: 3 · Commits: 45 · Ramas: 5 · Ayer',
      commitsCount: 45,
      branchesCount: 5,
      updated: 'Ayer',
      langs: [
        { type: 'py', width: '75%' },
        { type: 'htmlc', width: '25%' }
      ],
      hasActions: false
    },
    {
      id: 'repo-5',
      name: 'ejercicios-javascript',
      privacy: 'Público',
      description: 'Ejercicios de JavaScript para SENA',
      stats: 'Contribuyentes: 1 · Commits: 12 · Ramas: 1 · Hace 2 meses',
      commitsCount: 12,
      branchesCount: 1,
      updated: 'Hace 2 meses',
      langs: [{ type: 'js', width: '100%' }],
      hasActions: false
    }
  ];

  const filteredRepos = reposData.filter((repo) => {
    const matchesPrivacy =
      privacyFilter === 'Todos' || repo.privacy === privacyFilter;
    const matchesSearch =
      !repoSearch || repo.name.toLowerCase().includes(repoSearch.toLowerCase());
    return matchesPrivacy && matchesSearch;
  });

  return (
	<section className="space-y-6">
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
				<Link className="btn-secondary" to="/historial">Commits</Link>
				<Link className="btn-secondary" to="/ramas">Ramas</Link>
				<Link className="btn-danger" to="/eliminar-repo">Eliminar</Link>
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