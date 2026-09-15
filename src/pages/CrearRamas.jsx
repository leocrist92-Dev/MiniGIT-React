// CrearRamas.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function CrearRamas() {
  const [navOpen, setNavOpen] = useState(false);
  const [branchModalOpen, setBranchModalOpen] = useState(false);
  
  // Branch form state
  const [branchName, setBranchName] = useState('feature/validacion-emails');
  const [branchBase, setBranchBase] = useState('main');
  const [branchDesc, setBranchDesc] = useState('Implementar validación avanzada de emails');
  
  // Status messages
  const [branchStateMsg, setBranchStateMsg] = useState({
    type: 'status-info',
    text: 'Rama actual: main'
  });
  const [branchModalMsg, setBranchModalMsg] = useState({
    type: 'status-info',
    text: 'Validando nombre y rama base.'
  });

  // Dynamic branch list state
  const [branches, setBranches] = useState([
    {
      id: 'b1',
      name: 'main',
      badges: [
        { text: 'Predeterminada', class: 'badge-blue' },
        { text: 'Protegida', class: '' }
      ],
      description: 'Creada por Juan Pérez · Commits: 8 · Sincronizada con remoto',
      isCustom: false
    },
    {
      id: 'b2',
      name: 'feature/auth-mejorada',
      badges: [{ text: 'Activa', class: 'badge-purple' }],
      description: 'Basada en main · 3 commits adelante · 0 atrás',
      hasSwitch: true,
      isCustom: false
    },
    {
      id: 'b3',
      name: 'feature/listar-repos',
      badges: [{ text: 'Atrasada', class: 'badge-red' }],
      description: 'Basada en main · 5 commits adelante · 3 atrás',
      hasSwitch: true,
      isCustom: false
    },
    {
      id: 'b4',
      name: 'bugfix/login-error',
      badges: [{ text: 'Inactiva', class: '' }],
      description: 'Basada en main · rama obsoleta',
      isCustom: false
    }
  ]);

  // Validation logic from app.js: /^(feature|bugfix|docs|style|refactor|improve)\/[a-z0-9-]+$/i
  const isBranchNameValid = /^(feature|bugfix|docs|style|refactor|improve)\/[a-z0-9-]+$/i.test(
    branchName.trim()
  );

  const handleSync = () => {
    setBranchStateMsg({
      type: 'status-info',
      text: 'Sincronización simulada completada.'
    });
  };

  const handleSwitchBranch = (name) => {
    setBranchStateMsg({
      type: 'status-success',
      text: `Rama actual: ${name}`
    });
  };

  const handleCreateBranch = () => {
    if (!isBranchNameValid) return;

    setBranchModalMsg({
      type: 'status-success',
      text: `✓ Rama creada exitosamente. Basada en ${branchBase}.`
    });

    const newBranchObj = {
      id: Date.now().toString(),
      name: branchName,
      badges: [{ text: 'Activa', class: 'badge-purple' }],
      description: `Basada en ${branchBase} · lista para usar`,
      isCustom: true
    };

    setBranches([newBranchObj, ...branches]);
  };

  return (
	<>
	<div className="grid xl:grid-cols-[1.18fr,.82fr] gap-6">
		<section className="panel-neo p-6 space-y-5">
		<div className="flex flex-wrap gap-3">
			<button
			id="newBranchBtn"
			className="btn-primary"
			onClick={() => setBranchModalOpen(true)}
			>
			+ Nueva rama
			</button>
			<button id="syncBtn" className="btn-secondary" onClick={handleSync}>
			Sincronizar
			</button>
		</div>

		<div id="branchList" className="space-y-4">
			{branches.map((b) => (
			<div key={b.id} className="card-3d p-5">
				<h3 className="text-lg font-black text-white">
				{b.name === 'main' ? '⭐ ' : '🌿 '}
				{b.name}{' '}
				{b.badges.map((bg, idx) => (
					<span key={idx} className={`badge-chip ${bg.class}`}>
					{bg.text}
					</span>
				))}
				</h3>
				<p className="text-slate-300 mt-2">{b.description}</p>
				{b.hasSwitch && (
				<div className="mt-4">
					<button
					className="btn-secondary switch-branch"
					data-name={b.name}
					onClick={() => handleSwitchBranch(b.name)}
					>
					Cambiar
					</button>
				</div>
				)}
			</div>
			))}
		</div>
		</section>

		<aside className="panel-neo p-6 space-y-4">
		<div id="branchState" className={`status-box show ${branchStateMsg.type}`}>
			{branchStateMsg.text}
		</div>
		<div className="card-3d p-5">
			<h3 className="font-black text-lg text-white">Convención</h3>
			<ul className="text-sm text-slate-300 mt-3 space-y-2">
			<li>feature/* para nuevas funcionalidades</li>
			<li>bugfix/* para errores</li>
			<li>docs/*, style/*, refactor/*, improve/* para trabajos complementarios</li>
			</ul>
		</div>
	  </aside>
	</div>

	{/* MODAL */}
	<div
		id="branchModal"
		className={`modal-mask ${branchModalOpen ? 'show' : ''}`}
	>
		<div className="modal-card panel-neo p-6">
		<div className="flex items-center justify-between gap-4">
			<h3 className="text-xl font-black text-white">Crear nueva rama</h3>
			<button
			data-close="branchModal"
			className="badge-chip cursor-pointer"
			onClick={() => setBranchModalOpen(false)}
			>
			Cerrar
			</button>
		</div>
		<div className="mt-5 space-y-4">
			<label className="block">
			<span className="text-sm font-bold uppercase tracking-wider text-slate-200">
				Nombre de la rama
			</span>
			<input
				id="branchName"
				className="input-neo mt-2"
				value={branchName}
				onChange={(e) => setBranchName(e.target.value)}
			/>
			</label>
			<p id="branchHelp" className="text-sm text-slate-400">
			{isBranchNameValid
				? '✓ Convención válida'
				: '⚠️ Usa prefijo válido, barra y descripción'}
			</p>

			<label className="block">
			<span className="text-sm font-bold uppercase tracking-wider text-slate-200">
				Basada en
			</span>
			<select
				id="branchBase"
				className="select-neo mt-2"
				value={branchBase}
				onChange={(e) => setBranchBase(e.target.value)}
			>
				<option value="main">main</option>
				<option value="feature/auth-mejorada">feature/auth-mejorada</option>
				<option value="feature/listar-repos">feature/listar-repos</option>
			</select>
			</label>

			<label className="block">
			<span className="text-sm font-bold uppercase tracking-wider text-slate-200">
				Descripción
			</span>
			<textarea
				id="branchDesc"
				className="textarea-neo mt-2"
				value={branchDesc}
				onChange={(e) => setBranchDesc(e.target.value)}
			/>
			</label>

			<div id="branchMsg" className={`status-box show ${branchModalMsg.type}`}>
			{branchModalMsg.text}
			</div>

			<div className="flex flex-wrap gap-3">
			<button
				id="createBranch"
				className="btn-primary"
				disabled={!isBranchNameValid}
				onClick={handleCreateBranch}
			>
				Crear rama
			</button>
			<button
				data-close="branchModal"
				className="btn-secondary"
				onClick={() => setBranchModalOpen(false)}
			>
				Cancelar
			</button>
			</div>
		</div>
	  </div>
	</div>
	</>
  );
}