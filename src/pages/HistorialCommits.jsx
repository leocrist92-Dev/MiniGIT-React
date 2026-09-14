export default function HistorialCommits() {
  const commits = [
    { hash: 'a1b2c3d', msg: 'feat: agrega diseño adaptativo con Tailwind', author: 'Dev React', date: 'Hace 2 horas' },
    { hash: 'e5f6g7h', msg: 'fix: corrige bug en validación de contraseñas', author: 'SENA Student', date: 'Ayer' },
    { hash: 'i8j9k0l', msg: 'Initial commit', author: 'Admin', date: 'Hace 3 días' }
  ];

  return (
    <main className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8">
	  <div className="panel-neo p-6 space-y-4">
		<h2 className="text-2xl font-black">Historial de Commits</h2>
		<div className="space-y-3">
		  {commits.map((c) => (
			<div key={c.hash} className="card-3d p-4 flex flex-col sm:flex-row justify-between sm:items-center gap-2">
			  <div>
				<span className="font-mono text-cyan-400 font-bold mr-3">{c.hash}</span>
				<span className="font-semibold">{c.msg}</span>
				<p className="text-xs text-slate-400 mt-1">Por {c.author} · {c.date}</p>
			  </div>
			  <span className="badge-chip self-start sm:self-auto">Ver detalles</span>
			</div>
		  ))}
		</div>
	  </div>
	</main>
  );
}