// HacerMerge.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function HacerMerge() {
  const [navOpen, setNavOpen] = useState(false);
  const [prStatus, setPrStatus] = useState({
    type: 'status-info',
    msg: 'Sin conflictos · Tests 15/15 pasados · Review 1 de 2 aprobaciones.'
  });

  const handleApprove = () => {
    setPrStatus({
      type: 'status-success',
      msg: '✓ Aprobación registrada. El PR queda listo para merge.'
    });
  };

  const handleRequestChanges = () => {
    setPrStatus({
      type: 'status-error',
      msg: '⚠️ Cambios solicitados: agregar un test para caso X.'
    });
  };

  const handleComment = () => {
    setPrStatus({
      type: 'status-info',
      msg: '💬 Comentario agregado al review (simulado).'
    });
  };

  const handleMerge = () => {
    setPrStatus({
      type: 'status-success',
      msg: '✅ PR mergeado con éxito mediante Squash and merge.'
    });
  };

  const handleClose = () => {
    setPrStatus({
      type: 'status-error',
      msg: 'PR cerrado sin merge (simulación).'
    });
  };

  return (
	<div className="grid xl:grid-cols-[1.2fr,.8fr] gap-6">
		<section className="panel-neo p-6 space-y-5">
		<div className="flex flex-wrap gap-2">
			<span className="badge-chip badge-blue">Estado: Abierto</span>
			<span className="badge-chip badge-purple">feature/auth-mejorada → main</span>
		</div>

		<h2 className="text-2xl font-black text-white">Merge mejoras de autenticación</h2>
		<p className="text-slate-300">
			Creador: Juan Pérez · Creado: 19-12-2025 · Cambios: +127 líneas, -18 líneas en 3 archivos
		</p>

		<div id="prStatus" className={`status-box show ${prStatus.type}`}>
			{prStatus.msg}
		</div>

		<div className="card-3d p-5">
			<h3 className="font-black text-white">Descripción</h3>
			<p className="text-slate-300 mt-3">
			Se agrega validación mejorada de autenticación con soporte para 2FA, recuperación por SMS y nuevos tests de seguridad.
			</p>
		</div>

		<div className="grid md:grid-cols-2 gap-5">
			<div className="card-3d p-5">
			<h3 className="font-black text-white">Revisores</h3>
			<div className="mt-3 space-y-3">
				<div className="badge-chip">✓ Carlos Mendez · Aprobado</div>
				<div className="badge-chip">⏳ María García · Pendiente</div>
			</div>
			</div>

			<div className="card-3d p-5">
			<h3 className="font-black text-white">Archivos modificados</h3>
			<ul className="text-slate-300 mt-3 space-y-2">
				<li>auth.py +95 / -15</li>
				<li>database.py +20 / -3</li>
				<li>tests.py +12 / -0</li>
			</ul>
			</div>
		</div>

		<div className="card-3d p-5">
			<h3 className="font-black text-white">Diff destacado</h3>
			<div className="mt-3 space-y-2">
			<div className="diff-del rounded-xl px-3 py-2">- if len(pwd) &lt; 8:</div>
			<div className="diff-add rounded-xl px-3 py-2">+ if len(pwd) &lt; 12:</div>
			<div className="diff-add rounded-xl px-3 py-2">+ def enable_2fa(user):</div>
			<div className="diff-add rounded-xl px-3 py-2">+ user.2fa_enabled = True</div>
			</div>
		</div>

		<div className="flex flex-wrap gap-3">
			<button id="approvePr" className="btn-secondary" onClick={handleApprove}>
			Aprobar
			</button>
			<button id="changesPr" className="btn-secondary" onClick={handleRequestChanges}>
			Solicitar cambios
			</button>
			<button id="commentPr" className="btn-secondary" onClick={handleComment}>
			Comentar
			</button>
			<button id="mergePr" className="btn-primary" onClick={handleMerge}>
			Merge
			</button>
			<button id="closePr" className="btn-danger" onClick={handleClose}>
			Cerrar
			</button>
		</div>
		</section>

		<aside className="panel-neo p-6">
		<h3 className="text-xl font-black text-white">Commits del PR</h3>
		<div className="mt-4 space-y-4">
			<div className="card-3d p-4 text-slate-200">a1b2c3d · Agregar validación 2FA</div>
			<div className="card-3d p-4 text-slate-200">b2c3d4e · Mejorar error handling</div>
			<div className="card-3d p-4 text-slate-200">c3d4e5f · Agregar tests de seguridad</div>
		</div>
		</aside>
	</div>
  );
}