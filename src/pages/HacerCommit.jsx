import { useState } from 'react';

export default function HacerCommit() {
  const [message, setMessage] = useState('');
  const [branch, setBranch] = useState('main');
  const [status, setStatus] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus({ type: 'status-success', msg: `✓ Commit guardado correctamente en la rama '${branch}'.` });
    setMessage('');
  };

  return (
	<main className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8">
	  <div className="panel-neo p-6 space-y-5 max-w-2xl mx-auto">
		<h2 className="text-2xl font-black">Realizar Commit</h2>
		{status && <div className={`status-box show ${status.type}`}>{status.msg}</div>}
		<form onSubmit={handleSubmit} className="space-y-4">
		  <label className="block">
			<span className="text-sm font-bold uppercase">Rama destino</span>
			<select className="select-neo mt-2" value={branch} onChange={(e) => setBranch(e.target.value)}>
			  <option value="main">main</option>
			  <option value="feature-login">feature-login</option>
			  <option value="fix-styles">fix-styles</option>
			</select>
		  </label>
		  <label className="block">
			<span className="text-sm font-bold uppercase">Mensaje de Commit</span>
			<textarea className="textarea-neo mt-2" rows="3" placeholder="feat: agrega formulario de registro..." value={message} onChange={(e) => setMessage(e.target.value)} required />
		  </label>
		  <button type="submit" className="btn-primary w-full">Confirmar y Guardar Commit</button>
		</form>
	  </div>
	</main>
  );
}