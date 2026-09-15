// EliminarRepositorio.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function EliminarRepositorio() {
  const [navOpen, setNavOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [securityModalOpen, setSecurityModalOpen] = useState(false);
  const [confirmRepoName, setConfirmRepoName] = useState('');

  // Status box states
  const [deleteResult, setDeleteResult] = useState({
    type: 'status-info',
    text: 'Usa el botón rojo para abrir la confirmación reforzada.'
  });

  const isNameCorrect = confirmRepoName === 'mi-proyecto-python';

  const handleDeleteNameChange = (e) => {
    setConfirmRepoName(e.target.value);
  };

  const handleStartDelete = () => {
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    setDeleteModalOpen(false);
    setSecurityModalOpen(true);
  };

  const handleSecurityOk = () => {
    setSecurityModalOpen(false);
    setDeleteResult({
      type: 'status-success',
      text: '✓ Repositorio eliminado. Se enviaría un correo de confirmación y se registraría en auditoría.'
    });
  };

  return (
	<>
		<div className="grid xl:grid-cols-[1.15fr,.85fr] gap-6">
			<section className="panel-neo p-6 space-y-5">
			<div className="card-3d p-5">
				<h3 className="text-xl font-black text-white">mi-proyecto-python</h3>
				<p className="text-slate-300 mt-3">Abrir · Clonar · Configurar · Más acciones</p>
				<div className="flex flex-wrap gap-3 mt-4">
				<button className="btn-secondary">Descargar ZIP</button>
				<button className="btn-secondary">Archivar</button>
				<button id="deleteStart" className="btn-danger" onClick={handleStartDelete}>
					Eliminar repositorio
				</button>
				</div>
			</div>

			<div className="card-3d p-5 border border-red-400/30">
				<h3 className="text-xl font-black text-red-300">
				Protecciones contra eliminación accidental
				</h3>
				<ul className="text-slate-300 mt-3 space-y-2">
				<li>Escritura del nombre exacto.</li>
				<li>Advertencia visible de irreversibilidad.</li>
				<li>Confirmación extra tipo OAuth / 2FA.</li>
				<li>Sugerencia de backup antes de borrar.</li>
				</ul>
			</div>

			<div id="deleteResult" className={`status-box show ${deleteResult.type}`}>
				{deleteResult.text}
			</div>
			</section>

			<aside className="panel-neo p-6">
			<div className="card-3d p-5">
				<h3 className="text-xl font-black text-white">Alternativa segura</h3>
				<p className="text-slate-300 mt-3">
				Archivar el repositorio conserva los datos y evita una pérdida definitiva.
				</p>
			</div>
			</aside>
		</div>

		{/* DELETE CONFIRMATION MODAL */}
		<div id="deleteModal" className={`modal-mask ${deleteModalOpen ? 'show' : ''}`}>
			<div className="modal-card panel-neo p-6">
			<div className="flex items-center justify-between gap-4">
				<h3 className="text-xl font-black text-red-300">
				Eliminar repositorio · acción irreversible
				</h3>
				<button
				data-close="deleteModal"
				className="badge-chip cursor-pointer"
				onClick={() => setDeleteModalOpen(false)}
				>
				Cerrar
				</button>
			</div>

			<div className="mt-5 space-y-4">
				<div className="card-3d p-4">
				<ul className="text-slate-300 space-y-2">
					<li>Se eliminarán archivos, commits, ramas y colaboradores.</li>
					<li>No habrá backup interno.</li>
					<li>Otros usuarios perderán acceso.</li>
				</ul>
				</div>

				<label className="block">
				<span className="text-sm font-bold uppercase tracking-wider text-slate-200">
					Escribe el nombre del repo para confirmar
				</span>
				<input
					id="confirmRepoName"
					className="input-neo mt-2"
					placeholder="mi-proyecto-python"
					value={confirmRepoName}
					onChange={handleDeleteNameChange}
				/>
				</label>

				<div
				id="deleteMsg"
				className={`status-box show ${isNameCorrect ? 'status-success' : 'status-info'}`}
				>
				{isNameCorrect
					? '✓ Nombre correcto. Ya puedes continuar.'
					: 'El botón se habilita cuando el nombre coincide exactamente.'}
				</div>

				<div className="flex flex-wrap gap-3">
				<button
					id="confirmDelete"
					className="btn-danger"
					disabled={!isNameCorrect}
					onClick={handleConfirmDelete}
				>
					Eliminar permanentemente
				</button>
				<button
					data-close="deleteModal"
					className="btn-secondary"
					onClick={() => setDeleteModalOpen(false)}
				>
					Cancelar
				</button>
				</div>
			</div>
			</div>
		</div>

		{/* SECURITY CONFIRMATION MODAL (OAuth / 2FA) */}
		<div id="securityModal" className={`modal-mask ${securityModalOpen ? 'show' : ''}`}>
			<div className="modal-card panel-neo p-6">
			<div className="flex items-center justify-between gap-4">
				<h3 className="text-xl font-black text-white">Confirmación extra de seguridad</h3>
				<button
				data-close="securityModal"
				className="badge-chip cursor-pointer"
				onClick={() => setSecurityModalOpen(false)}
				>
				Cerrar
				</button>
			</div>

			<p className="text-slate-300 mt-4">
				Simulación de OAuth / 2FA antes de borrar definitivamente.
			</p>

			<div className="mt-5 flex flex-wrap gap-3">
				<button id="securityOk" className="btn-danger" onClick={handleSecurityOk}>
				Confirmar identidad
				</button>
				<button
				data-close="securityModal"
				className="btn-secondary"
				onClick={() => setSecurityModalOpen(false)}
				>
				Cancelar
				</button>
			</div>
			</div>
		</div>
	</>
  );
}