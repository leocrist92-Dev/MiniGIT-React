// src/pages/HacerCommit.jsx
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
// 1. Importamos el servicio encargado de procesar la petición del commit
import { hacerCommit } from '../services/repoService';

export default function HacerCommit() {
  const location = useLocation();

  // Estado para la navegación móvil
  const [navOpen, setNavOpen] = useState(false);

  // Obtiene el nombre del repo desde la navegación (card) o usa el valor por defecto de tu ruta HTML
  const repoNombre = location.state?.repoNombre || 'mi-proyecto-python';

  // Estados del formulario y simulación de commit (conservando tus valores iniciales)
  const [commitMsg, setCommitMsg] = useState('Agregar nueva función de saludo para SENA');
  const [commitDesc, setCommitDesc] = useState('Se agregó nueva línea para saludar SENA y mejorar la experiencia del usuario.');
  const [showDiff, setShowDiff] = useState(true);
  const [hasChanges, setHasChanges] = useState(true);

  // Estado de carga asíncrona para deshabilitar botones durante la petición
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Estado del cuadro de notificación (status box)
  const [status, setStatus] = useState({
    type: 'status-info',
    msg: 'Hay cambios detectados. Escribe el mensaje del commit para continuar.'
  });

  // Alternar visibilidad de las diferencias (diffBox)
  const handleToggleDiff = () => {
    setShowDiff((prev) => !prev);
  };

  // Descartar cambios pendientes
  const handleDiscard = () => {
    setHasChanges(false);
    setStatus({
      type: 'status-error',
      msg: 'Cambios descartados. Ya no hay archivos pendientes.'
    });
  };

  // 2. FUNCIÓN ASÍNCRONA PARA GUARDAR EL COMMIT EN EL SERVICIO
  const handleSaveCommit = async () => {
    if (!commitMsg.trim() || !hasChanges) return;

    // Bloqueamos interacciones e indicamos proceso
    setIsSubmitting(true);
    setStatus({
      type: 'status-info',
      msg: 'Registrando commit en el servidor...'
    });

    try {
      // Consumo asíncrono del servicio pasando el nombre del repositorio y el mensaje
      const response = await hacerCommit(repoNombre, commitMsg);

      // Si la promesa se resuelve con éxito, mostramos el mensaje y el hash dinámico retornado
      setStatus({
        type: 'status-success',
        msg: `✓ Commit guardado exitosamente. Hash: ${response.hash}`
      });

    } catch (error) {
      // Captura de errores lanzados por el servicio
      setStatus({
        type: 'status-error',
        msg: error.message || '✗ Ocurrió un error al guardar el commit.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isSaveDisabled = !hasChanges || !commitMsg.trim() || isSubmitting;

  return (
    <div className="grid xl:grid-cols-[1.2fr] gap-6">
      <section className="panel-neo p-6 space-y-5">
        <div className="badge-chip badge-blue">
          Ruta: /{repoNombre}/main.py
        </div>

        {/* Visualizador de código */}
        <div className="code-board space-y-1">
          <div><span className="text-sky-300">1</span> def saludar(nombre):</div>
          <div><span className="text-sky-300">2</span>     """Función para saludar"""</div>
          <div><span className="text-sky-300">3</span>     return f"Hola, {'{nombre}'}!"</div>
          <div><span className="text-sky-300">4</span></div>
          <div><span className="text-sky-300">5</span> if __name__ == "__main__":</div>
          <div><span className="text-sky-300">6</span>     print(saludar("Mundo"))</div>
          {hasChanges && (
            <div id="newLine">
              <span className="text-sky-300">7</span>     print(saludar("SENA")) <span className="badge-chip badge-purple">NUEVO</span>
            </div>
          )}
        </div>

        {/* Resumen de cambios en archivos */}
        <div className="card-3d p-4 text-slate-300">
          ✎ main.py (modificado) · + requirements.txt (nuevo) · - README_OLD.md (eliminado)
        </div>

        {/* Mensaje de estado */}
        <div id="commitStatus" className={`status-box show ${status.type}`}>
          {status.msg}
        </div>

        {/* Campos de entrada */}
        <label className="block">
          <span className="text-sm font-bold uppercase tracking-wider text-slate-200">
            Mensaje de commit
          </span>
          <input
            id="commitMsg"
            className="input-neo mt-2"
            value={commitMsg}
            onChange={(e) => setCommitMsg(e.target.value)}
            disabled={isSubmitting}
          />
        </label>

        <label className="block">
          <span className="text-sm font-bold uppercase tracking-wider text-slate-200">
            Descripción detallada
          </span>
          <textarea
            id="commitDesc"
            className="textarea-neo mt-2"
            value={commitDesc}
            onChange={(e) => setCommitDesc(e.target.value)}
            disabled={isSubmitting}
          ></textarea>
        </label>

        {/* Badges con metadatos */}
        <div className="flex flex-wrap gap-2">
          <span className="badge-chip">Autor: Juan Pérez</span>
          <span className="badge-chip">Rama: main</span>
          <span className="badge-chip">Fecha: 20-12-2025 15:47</span>
        </div>

        {/* Botones de acción */}
        <div className="flex flex-wrap gap-3">
          <button
            id="toggleDiff"
            type="button"
            className="btn-secondary"
            onClick={handleToggleDiff}
            disabled={isSubmitting}
          >
            Ocultar / mostrar diferencias
          </button>
          <button
            id="commitSave"
            type="button"
            className="btn-primary"
            disabled={isSaveDisabled}
            onClick={handleSaveCommit}
          >
            {isSubmitting ? 'Guardando...' : 'Hacer commit'}
          </button>
          <button
            id="discardBtn"
            type="button"
            className="btn-danger"
            onClick={handleDiscard}
            disabled={isSubmitting}
          >
            Descartar cambios
          </button>
        </div>

        {/* Visualizador de Diff */}
        <div
          id="diffBox"
          className={`card-3d p-5 space-y-2 ${showDiff ? '' : 'hidden-soft'}`}
        >
          <div className="diff-del rounded-xl px-3 py-2">- print(saludar("Mundo"))</div>
          <div className="diff-add rounded-xl px-3 py-2">+ print(saludar("Mundo"))</div>
          <div className="diff-add rounded-xl px-3 py-2">+ print(saludar("SENA"))</div>
        </div>
      </section>
    </div>
  );
}