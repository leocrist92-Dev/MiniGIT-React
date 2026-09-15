// HistorialCommits.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function HistorialCommits() {
  const [navOpen, setNavOpen] = useState(false);
  const [authorFilter, setAuthorFilter] = useState('Todos');
  const [searchCommit, setSearchCommit] = useState('');
  const [selectedCommitDetail, setSelectedCommitDetail] = useState(null);

  const commitsData = [
    {
      id: 'a1b2c3d',
      author: 'Juan Pérez',
      text: 'Agregar nueva función de saludo para SENA',
      time: 'Hace 1 minuto',
      info: 'Juan Pérez · Agregar nueva función de saludo para SENA · a1b2c3d · +1 línea'
    },
    {
      id: 'e5f6a7b',
      author: 'Juan Pérez',
      text: 'Refactorizar código principal',
      time: 'Hace 3 días',
      info: 'Juan Pérez · Refactorizar código principal · e5f6a7b · +15 / -8'
    },
    {
      id: 'c4d5e6f',
      author: 'Carlos Mendez',
      text: 'Agregar validación de entrada',
      time: 'Hace 5 días',
      info: 'Carlos Mendez · Agregar validación de entrada · c4d5e6f · +45 / -5'
    }
  ];

  const filteredCommits = commitsData.filter((commit) => {
    const okA = authorFilter === 'Todos' || commit.author === authorFilter;
    const okS = !searchCommit || commit.text.toLowerCase().includes(searchCommit.toLowerCase());
    return okA && okS;
  });

  const handleViewDetail = (id) => {
    setSelectedCommitDetail(id);
  };

  return (
	<section className="panel-neo p-6 md:p-8 space-y-6">
		<div className="grid md:grid-cols-4 gap-4">
		<div className="card-3d p-5">
			<div className="text-xs uppercase tracking-[.18em] text-slate-400">Total commits</div>
			<div className="text-3xl font-black mt-2 text-white">8</div>
		</div>
		<div className="card-3d p-5">
			<div className="text-xs uppercase tracking-[.18em] text-slate-400">Autores</div>
			<div className="text-3xl font-black mt-2 text-white">2</div>
		</div>
		<div className="card-3d p-5">
			<div className="text-xs uppercase tracking-[.18em] text-slate-400">Días</div>
			<div className="text-3xl font-black mt-2 text-white">15</div>
		</div>
		<div className="card-3d p-5">
			<div className="text-xs uppercase tracking-[.18em] text-slate-400">Cambios</div>
			<div className="text-3xl font-black mt-2 text-white">+247 / -18</div>
		</div>
		</div>

		<div className="flex flex-wrap gap-3">
		<select
			id="authorFilter"
			className="select-neo max-w-[200px]"
			value={authorFilter}
			onChange={(e) => setAuthorFilter(e.target.value)}
		>
			<option value="Todos">Todos</option>
			<option value="Juan Pérez">Juan Pérez</option>
			<option value="Carlos Mendez">Carlos Mendez</option>
		</select>
		<input
			id="searchCommit"
			className="input-neo max-w-[280px]"
			placeholder="Buscar mensaje..."
			value={searchCommit}
			onChange={(e) => setSearchCommit(e.target.value)}
		/>
		</div>

		<div className="grid xl:grid-cols-[1.15fr,.85fr] gap-6">
		<div id="commitList" className="space-y-4">
			{filteredCommits.map((item) => (
			<div
				key={item.id}
				className="card-3d p-5 commit-item"
				data-author={item.author}
				data-text={item.text}
			>
				<div className="flex items-start justify-between gap-3">
				<div>
					<h3 className="text-lg font-black text-white">{item.time}</h3>
					<p className="text-slate-300 mt-2">{item.info}</p>
				</div>
				<button
					className="btn-secondary view-detail"
					data-id={item.id}
					onClick={() => handleViewDetail(item.id)}
				>
					Ver cambios
				</button>
				</div>
			</div>
			))}
		</div>

		{/* Panel de detalle de commit dinámico */}
		<div id="commitDetail" className="card-3d p-5 space-y-2">
			{selectedCommitDetail ? (
			<div>
				<p className="text-slate-200"><strong>Autor:</strong> Juan Pérez</p>
				<p className="mt-2 text-slate-200"><strong>Fecha:</strong> 20-12-2025 15:47:32</p>
				<p className="mt-2 text-slate-200"><strong>Hash:</strong> {selectedCommitDetail}4e5f6g7h8</p>
				<p className="mt-2 text-slate-200"><strong>Rama:</strong> main</p>
				<div className="mt-4 space-y-2">
				<div className="diff-del rounded-xl px-3 py-2">- print(saludar("Mundo"))</div>
				<div className="diff-add rounded-xl px-3 py-2">+ print(saludar("Mundo"))</div>
				<div className="diff-add rounded-xl px-3 py-2">+ print(saludar("SENA"))</div>
				</div>
			</div>
			) : (
			<p className="text-slate-400 italic">Haz clic en "Ver cambios" de un commit para ver los detalles aquí.</p>
			)}
		</div>
		</div>
	</section>
  );
}