// DiffVersiones.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function DiffVersiones() {
  const [navOpen, setNavOpen] = useState(false);
  const [baseCommit, setBaseCommit] = useState('a2b3c4d');
  const [newCommit, setNewCommit] = useState('a1b2c3d');
  const [activeTab, setActiveTab] = useState('side');
  const [status, setStatus] = useState({
    type: 'status-info',
    msg: 'Resumen: +1 línea, -0 líneas en 1 archivo.'
  });

  const handleCompare = () => {
    setStatus({
      type: 'status-success',
      msg: `Comparando ${baseCommit} vs ${newCommit} · Resultado: +1 línea, -0 líneas.`
    });
  };

  const handleCopyDiff = () => {
    setStatus({
      type: 'status-success',
      msg: '✓ Diff copiado al portapapeles (simulado).'
    });
  };

  const handleDownloadDiff = () => {
    setStatus({
      type: 'status-info',
      msg: 'Descarga del diff preparada (simulación visual).'
    });
  };

  const handleRevertDiff = () => {
    setStatus({
      type: 'status-error',
      msg: 'Se abriría el flujo de reversión del cambio.'
    });
  };

  return (
	<section className="panel-neo p-6 md:p-8 space-y-6">
		<div className="flex flex-wrap gap-3 items-center">
		<span className="badge-chip badge-blue">Repositorio: mi-proyecto-python</span>
		<select
			id="baseCommit"
			className="select-neo max-w-[180px]"
			value={baseCommit}
			onChange={(e) => setBaseCommit(e.target.value)}
		>
			<option value="a2b3c4d">a2b3c4d</option>
			<option value="a3b4c5d">a3b4c5d</option>
		</select>
		<span className="text-slate-400">vs</span>
		<select
			id="newCommit"
			className="select-neo max-w-[180px]"
			value={newCommit}
			onChange={(e) => setNewCommit(e.target.value)}
		>
			<option value="a1b2c3d">a1b2c3d</option>
			<option value="b2c3d4e">b2c3d4e</option>
		</select>
		<button id="compareBtn" className="btn-primary" onClick={handleCompare}>
			Comparar
		</button>
		</div>

		<div id="compareSummary" className={`status-box show ${status.type}`}>
		{status.msg}
		</div>

		<div className="flex flex-wrap gap-3">
		<button
			className={`btn-secondary tab-btn ${activeTab === 'side' ? 'active' : ''}`}
			data-tab="side"
			onClick={() => setActiveTab('side')}
		>
			Vista lado a lado
		</button>
		<button
			className={`btn-secondary tab-btn ${activeTab === 'unified' ? 'active' : ''}`}
			data-tab="unified"
			onClick={() => setActiveTab('unified')}
		>
			Diff unificado
		</button>
		<button
			className={`btn-secondary tab-btn ${activeTab === 'stats' ? 'active' : ''}`}
			data-tab="stats"
			onClick={() => setActiveTab('stats')}
		>
			Estadísticas
		</button>
		</div>

		{/* Tab Side-by-Side */}
		<div id="tab-side" className={`grid xl:grid-cols-2 gap-5 ${activeTab !== 'side' ? 'hidden-soft' : ''}`}>
		<div className="card-3d p-5">
			<h3 className="font-black text-lg text-white">Versión anterior</h3>
			<div className="code-board mt-4">
			<div>1 def saludar(...)</div>
			<div>2 """Función para saludar"""</div>
			<div>3 return f"Hola"</div>
			<div>4</div>
			<div>5 if __name__ == ...</div>
			<div>6 print(saludar("Mundo"))</div>
			</div>
			<p className="text-slate-300 mt-3">Líneas: 6 · Tamaño: 145 bytes</p>
		</div>
		<div className="card-3d p-5">
			<h3 className="font-black text-lg text-white">Versión nueva</h3>
			<div className="code-board mt-4">
			<div>1 def saludar(...)</div>
			<div>2 """Función para saludar"""</div>
			<div>3 return f"Hola"</div>
			<div>4</div>
			<div>5 if __name__ == ...</div>
			<div>6 print(saludar("Mundo"))</div>
			<div className="text-emerald-300">7 print(saludar("SENA"))</div>
			</div>
			<p className="text-slate-300 mt-3">Líneas: 7 (+1) · Tamaño: 165 bytes (+20)</p>
		</div>
		</div>

		{/* Tab Unified */}
		<div id="tab-unified" className={activeTab !== 'unified' ? 'hidden-soft' : ''}>
		<div className="card-3d p-5">
			<h3 className="font-black text-lg text-white">Diff unificado</h3>
			<div className="code-board mt-4">
			<div>--- a/main.py ({baseCommit})</div>
			<div>+++ b/main.py ({newCommit})</div>
			<div>@@ -1,6 +1,7 @@</div>
			<div> def saludar(nombre):</div>
			<div>     """Función para saludar"""</div>
			<div>     return f"Hola"</div>
			<div> if __name__ == "__main__":</div>
			<div>     print(saludar("Mundo"))</div>
			<div className="text-emerald-300">+    print(saludar("SENA"))</div>
			</div>
		</div>
		</div>

		{/* Tab Stats */}
		<div id="tab-stats" className={activeTab !== 'stats' ? 'hidden-soft' : ''}>
		<div className="grid md:grid-cols-4 gap-4">
			<div className="card-3d p-5">
			<div className="text-xs uppercase tracking-[.18em] text-slate-400">Añadidas</div>
			<div className="text-3xl font-black mt-2 text-white">1</div>
			</div>
			<div className="card-3d p-5">
			<div className="text-xs uppercase tracking-[.18em] text-slate-400">Eliminadas</div>
			<div className="text-3xl font-black mt-2 text-white">0</div>
			</div>
			<div className="card-3d p-5">
			<div className="text-xs uppercase tracking-[.18em] text-slate-400">Modificadas</div>
			<div className="text-3xl font-black mt-2 text-white">0</div>
			</div>
			<div className="card-3d p-5">
			<div className="text-xs uppercase tracking-[.18em] text-slate-400">Sin cambios</div>
			<div className="text-3xl font-black mt-2 text-white">6</div>
			</div>
		</div>
		</div>

		<div className="flex flex-wrap gap-3">
		<button id="copyDiff" className="btn-secondary" onClick={handleCopyDiff}>
			Copiar diff
		</button>
		<button id="downloadDiff" className="btn-secondary" onClick={handleDownloadDiff}>
			Descargar
		</button>
		<button id="revertDiff" className="btn-danger" onClick={handleRevertDiff}>
			Revertir
		</button>
		</div>
	</section>
  );
}