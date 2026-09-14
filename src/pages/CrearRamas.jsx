import { useState } from 'react';

export default function CrearRamas() {
  const [branchName, setBranchName] = useState('');
  const [branches, setBranches] = useState(['main', 'develop']);

  const handleCreateBranch = (e) => {
    e.preventDefault();
    if (branchName && !branches.includes(branchName)) {
      setBranches([...branches, branchName]);
      setBranchName('');
    }
  };

  return (
	<main className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8 grid md:grid-cols-2 gap-6">
	  <div className="panel-neo p-6 space-y-4">
		<h2 className="text-2xl font-black">Crear nueva rama</h2>
		<form onSubmit={handleCreateBranch} className="space-y-4">
		  <label className="block">
			<span className="text-sm font-bold uppercase">Nombre de la rama</span>
			<input className="input-neo mt-2" placeholder="feature/nueva-vista" value={branchName} onChange={(e) => setBranchName(e.target.value)} required />
		  </label>
		  <button type="submit" className="btn-primary w-full">Crear Rama</button>
		</form>
	  </div>
	  <div className="panel-neo p-6 space-y-4">
		<h3 className="text-xl font-black">Ramas existentes</h3>
		<ul className="space-y-2">
		  {branches.map((b) => (
			<li key={b} className="card-3d p-3 flex justify-between items-center">
			  <span className="font-mono text-cyan-300">🌿 {b}</span>
			  <span className="badge-chip">Activa</span>
			</li>
		  ))}
		</ul>
	  </div>
	</main>
  );
}