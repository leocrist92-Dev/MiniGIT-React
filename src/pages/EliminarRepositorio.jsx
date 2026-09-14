import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function EliminarRepositorio() {
  const repoNameTarget = 'mi-proyecto-python';
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSecurityModal, setShowSecurityModal] = useState(false);
  const [confirmInput, setConfirmInput] = useState('');
  const [resultMsg, setResultMsg] = useState('Usa el botón rojo para abrir la confirmación reforzada.');
  const navigate = useNavigate();

  const handleFinalDelete = () => {
    setShowSecurityModal(false);
    setResultMsg('✓ El repositorio ha sido eliminado permanentemente.');
    setTimeout(() => navigate('/repos'), 1500);
  };

  return (
    <main className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8">
	  <div className="grid xl:grid-cols-[1.15fr,.85fr] gap-6">
		<section className="panel-neo p-6 space-y-5">
		  <div className="card-3d p-5">
			<h3 className="text-xl font-black">{repoNameTarget}</h3>
			<p className="text-slate-300 mt-3">Abrir · Clonar · Configurar · Más acciones</p>
			<div className="flex flex-wrap gap-3 mt-4">
			  <button className="btn-secondary">Descargar ZIP</button>
			  <button className="btn-secondary">Archivar</button>
			  <button onClick={() => setShowDeleteModal(true)} className="btn-danger">
				Eliminar repositorio
			  </button>
			</div>
		  </div>

		  <div className="card-3d p-5 border border-red-400/30">
			<h3 className="text-xl font-black text-red-300">Protecciones contra eliminación accidental</h3>
			<ul className="text-slate-300 mt-3 space-y-2">
			  <li>• Escritura del nombre exacto.</li>
			  <li>• Advertencia visible de irreversibilidad.</li>
			  <li>• Confirmación extra tipo OAuth / 2FA.</li>
			  <li>• Sugerencia de backup antes de borrar.</li>
			</ul>
		  </div>

		  <div className="status-box show status-info">{resultMsg}</div>
		</section>

		<aside className="panel-neo p-6">
		  <div className="card-3d p-5">
			<h3 className="text-xl font-black">Alternativa segura</h3>
			<p className="text-slate-300 mt-3">Archivar el repositorio conserva los datos y evita una pérdida definitiva.</p>
		  </div>
		</aside>
	  </div>

	  {/* Modal 1: Confirmación de Nombre */}
	  {showDeleteModal && (
		<div className="modal-mask show">
		  <div className="modal-card panel-neo p-6">
			<div className="flex items-center justify-between gap-4">
			  <h3 className="text-xl font-black text-red-300">Eliminar repositorio · acción irreversible</h3>
			  <button onClick={() => setShowDeleteModal(false)} className="badge-chip">Cerrar</button>
			</div>
			<div className="mt-5 space-y-4">
			  <div className="card-3d p-4">
				<ul className="text-slate-300 space-y-2">
				  <li>• Se eliminarán archivos, commits, ramas y colaboradores.</li>
				  <li>• No habrá backup interno.</li>
				  <li>• Otros usuarios perderán acceso.</li>
				</ul>
			  </div>
			  <label className="block">
				<span className="text-sm font-bold uppercase tracking-wider">Escribe el nombre del repo para confirmar</span>
				<input 
				  className="input-neo mt-2" 
				  placeholder={repoNameTarget} 
				  value={confirmInput}
				  onChange={(e) => setConfirmInput(e.target.value)}
				/>
			  </label>
			  <div className="status-box show status-info">
				{confirmInput === repoNameTarget ? 'El nombre coincide. Puedes continuar.' : 'El botón se habilita cuando el nombre coincide exactamente.'}
			  </div>
			  <div className="flex flex-wrap gap-3">
				<button 
				  disabled={confirmInput !== repoNameTarget} 
				  onClick={() => { setShowDeleteModal(false); setShowSecurityModal(true); }}
				  className="btn-danger"
				>
				  Eliminar permanentemente
				</button>
				<button onClick={() => setShowDeleteModal(false)} className="btn-secondary">Cancelar</button>
			  </div>
			</div>
		  </div>
		</div>
	  )}

	  {/* Modal 2: Autenticación 2FA */}
	  {showSecurityModal && (
		<div className="modal-mask show">
		  <div className="modal-card panel-neo p-6">
			<div className="flex items-center justify-between gap-4">
			  <h3 className="text-xl font-black">Confirmación extra de seguridad</h3>
			  <button onClick={() => setShowSecurityModal(false)} className="badge-chip">Cerrar</button>
			</div>
			<p className="text-slate-300 mt-4">Simulación de OAuth / 2FA antes de borrar definitivamente.</p>
			<div className="mt-5 flex flex-wrap gap-3">
			  <button onClick={handleFinalDelete} className="btn-danger">Confirmar identidad</button>
			  <button onClick={() => setShowSecurityModal(false)} className="btn-secondary">Cancelar</button>
			</div>
		  </div>
		</div>
	  )}
	</main>
  );
}