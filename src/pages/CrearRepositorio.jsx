import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CrearRepositorio() {
  const [repoName, setRepoName] = useState('');
  const [desc, setDesc] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const navigate = useNavigate();

  const handleCreate = (e) => {
    e.preventDefault();
    alert(`Repositorio ${repoName} creado con éxito.`);
    navigate('/repos');
  };

  return (
	<main className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8">
	  <div className="panel-neo p-6 md:p-8 max-w-2xl mx-auto space-y-5">
		<h2 className="text-2xl font-black">Crear nuevo repositorio</h2>
		<form onSubmit={handleCreate} className="space-y-4">
		  <label className="block">
			<span className="text-sm font-bold uppercase">Nombre del repositorio</span>
			<input className="input-neo mt-2" placeholder="ejemplo-mi-app" value={repoName} onChange={(e) => setRepoName(e.target.value)} required />
		  </label>
		  <label className="block">
			<span className="text-sm font-bold uppercase">Descripción (opcional)</span>
			<textarea className="textarea-neo mt-2" rows="3" value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Breve explicación del proyecto..."></textarea>
		  </label>
		  <div className="flex items-center gap-3">
			<input type="checkbox" id="privateCheck" checked={isPrivate} onChange={(e) => setIsPrivate(e.target.checked)} className="w-5 h-5 accent-blue-500" />
			<label htmlFor="privateCheck" className="text-sm font-semibold">Marcar como repositorio privado</label>
		  </div>
		  <button type="submit" className="btn-primary w-full">Inicializar Repositorio</button>
		</form>
	  </div>
	</main>
  );
}