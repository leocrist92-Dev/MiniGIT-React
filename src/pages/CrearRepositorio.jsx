import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// 1. Importamos la función encargada de crear el repositorio desde el servicio
import { crearRepositorio } from '../services/repoService';

export default function CrearRepositorio() {
  const navigate = useNavigate();
  // Estado del menú móvil
  const [navOpen, setNavOpen] = useState(false);

  // Estados del formulario con los valores iniciales del HTML
  const [repoName, setRepoName] = useState('mi-proyecto-python');
  const [repoDesc, setRepoDesc] = useState('Sistema de gestión de usuarios con Python y base de datos PostgreSQL');
  const [privacy, setPrivacy] = useState('Público');
  const [readme, setReadme] = useState(true);
  const [gitignore, setGitignore] = useState(false);
  const [license, setLicense] = useState(false);
  const [template, setTemplate] = useState('Python');

  // Estados de control de flujo y retroalimentación visual
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  // Estados de simulación y validación
  const [status, setStatus] = useState({
    type: 'status-info',
    msg: 'Ingresa un nombre válido para habilitar la creación del repositorio.'
  });
  const [repoNameHelp, setRepoNameHelp] = useState('3 a 50 caracteres, letras, números y guion.');
  const [isValid, setIsValid] = useState(false);
  const [createdRepoData, setCreatedRepoData] = useState(null);

  // Validación idéntica a app.js: /^[a-zA-Z0-9-]{3,50}$/
  useEffect(() => {
    const safeName = (repoName || '').trim(); // Previene error si repoName es undefined
    const ok = /^[a-zA-Z0-9-]{3,50}$/.test(safeName);
    setIsValid(ok);

    // Evitamos sobreescribir el status si ya se creó con éxito el repositorio
    if (status.type === 'status-success' && createdRepoData) return;

    if (ok) {
      setRepoNameHelp('✓ Nombre disponible');
      setStatus({
        type: 'status-info',
        msg: '✓ Nombre válido. Haz clic en "Crear repo" para continuar.'
      });
    } else {
      setRepoNameHelp('⚠️ Usa 3-50 caracteres con letras, números o guion');
      setStatus({
        type: 'status-info',
        msg: 'Ingresa un nombre válido para habilitar la creación del repositorio.'
      });
    }
  }, [repoName]);

  // 2. FUNCIÓN DE CREACIÓN CON PETICIÓN ASÍNCRONA
  const handleCreateRepo = async (e) => {
    // PREVENCIÓN OBLIGATORIA DE RECARGA DE PÁGINA
    if (e) e.preventDefault();

    if (!isValid || !repoName.trim()) {
      setStatus({
        type: 'status-error',
        msg: '✗ Ingresa un nombre válido para el repositorio.'
      });
      return;
    }

    // Bloqueamos el formulario e indicamos estado de envío
    setIsSubmitting(true);
    setStatus({
      type: 'status-info',
      msg: 'Creando repositorio en el servidor...'
    });

    // Construcción de la lista de archivos iniciales
    const files = [];
    if (readme) files.push('README.md');
    if (gitignore) files.push('.gitignore');
    if (license) files.push('LICENSE');
    if (files.length === 0) files.push('Sin inicialización');

    // 4. Construcción del objeto de datos conservando las variables requeridas
    const datosRepo = {
      name: repoName,
      Desc: repoDesc,
      url: `sena.mini-git.local/juanperez/${repoName}`,
      privacy: privacy,
      files: files.join(', '),
      template: template
    };

    try {
      // 5. Consumo asíncrono de la función en repoService
      const response = await crearRepositorio(datosRepo);

      // Respuesta exitosa del servicio
      setStatus({
        type: 'status-success',
        msg: '✓ Repositorio creado exitosamente.'
      });

      // Se guardan los datos procesados usando la estructura original
      setCreatedRepoData({
        name: response.repo.name,
        Desc: response.repo.description,
        url: response.repo.url,
        privacy: response.repo.privacy,
        files: response.repo.files,
        template: response.repo.template
      });

    } catch (error) {
      // Manejo de errores lanzados por la Promesa
      setStatus({
        type: 'status-error',
        msg: error.message
      });
    } finally {
      // Desbloqueo final del botón/formulario
      setIsSubmitting(false);
    }
  };

  // Restablecer formulario (idéntico al botón cancelar en app.js)
  const handleCancel = () => {
    setRepoName('');
    setRepoDesc('');
    setCreatedRepoData(null);
    setStatus({
      type: 'status-info',
      msg: 'Ingresa un nombre válido para habilitar la creación del repositorio.'
    });
  };

  return (
    <div className="grid xl:grid-cols-[1.1fr] gap-6">
      <section className="panel-neo p-6 md:p-8 space-y-5">
        <div id="repoStatus" className={`status-box show ${status.type}`}>
          {status.msg}
        </div>

        <form onSubmit={handleCreateRepo} className="space-y-5">
          <label className="block">
            <span className="text-sm font-bold uppercase tracking-wider text-slate-200">
              Nombre del repositorio
            </span>
            <input
              id="repoName"
              className="input-neo mt-2"
              value={repoName}
              onChange={(e) => setRepoName(e.target.value)}
              disabled={isSubmitting}
            />
          </label>
          <p id="repoNameHelp" className="text-sm text-slate-400">
            {repoNameHelp}
          </p>

          <label className="block">
            <span className="text-sm font-bold uppercase tracking-wider text-slate-200">
              Descripción
            </span>
            <textarea
              id="repoDesc"
              className="textarea-neo mt-2"
              maxLength={500}
              value={repoDesc}
              onChange={(e) => setRepoDesc(e.target.value)}
              disabled={isSubmitting}
            ></textarea>
          </label>
          <p className="text-sm text-slate-400">
            <span id="descCount">{repoDesc.length}</span> / 500 caracteres
          </p>

          <div className="grid md:grid-cols-2 gap-5">
            <div className="card-3d p-4">
              <div className="text-sm font-bold uppercase tracking-wider mb-3 text-slate-200">
                Privacidad
              </div>
              <label className="flex gap-3 items-center mb-2 cursor-pointer text-slate-300">
                <input
                  type="radio"
                  name="privacy"
                  value="Público"
                  checked={privacy === 'Público'}
                  onChange={(e) => setPrivacy(e.target.value)}
                  disabled={isSubmitting}
                />
                <span>Público</span>
              </label>
              <label className="flex gap-3 items-center cursor-pointer text-slate-300">
                <input
                  type="radio"
                  name="privacy"
                  value="Privado"
                  checked={privacy === 'Privado'}
                  onChange={(e) => setPrivacy(e.target.value)}
                  disabled={isSubmitting}
                />
                <span>Privado</span>
              </label>
            </div>

            <div className="card-3d p-4">
              <div className="text-sm font-bold uppercase tracking-wider mb-3 text-slate-200">
                Inicializar con
              </div>
              <label className="flex gap-3 items-center mb-2 cursor-pointer text-slate-300">
                <input
                  id="readme"
                  type="checkbox"
                  checked={readme}
                  onChange={(e) => setReadme(e.target.checked)}
                  disabled={isSubmitting}
                />
                README.md
              </label>
              <label className="flex gap-3 items-center mb-2 cursor-pointer text-slate-300">
                <input
                  id="gitignore"
                  type="checkbox"
                  checked={gitignore}
                  onChange={(e) => setGitignore(e.target.checked)}
                  disabled={isSubmitting}
                />
                .gitignore
              </label>
              <label className="flex gap-3 items-center cursor-pointer text-slate-300">
                <input
                  id="license"
                  type="checkbox"
                  checked={license}
                  onChange={(e) => setLicense(e.target.checked)}
                  disabled={isSubmitting}
                />
                LICENSE
              </label>
            </div>
          </div>

          <label className="block">
            <span className="text-sm font-bold uppercase tracking-wider text-slate-200">
              Plantilla de proyecto
            </span>
            <select
              id="template"
              className="select-neo mt-2"
              value={template}
              onChange={(e) => setTemplate(e.target.value)}
              disabled={isSubmitting}
            >
              <option value="Python">Python</option>
              <option value="Node.js">Node.js</option>
              <option value="Java">Java</option>
              <option value="Otro">Otro</option>
            </select>
          </label>

          <div className="flex flex-wrap gap-3">
            <button
              id="repoBtn"
              type="submit"
              className="btn-primary"
              disabled={!isValid || isSubmitting}
            >
              {isSubmitting ? 'Creando...' : 'Crear repo'}
            </button>
            <button
              id="repoCancel"
              type="button"
              className="btn-secondary"
              onClick={handleCancel}
              disabled={isSubmitting}
            >
              Cancelar
            </button>
          </div>
        </form>

        {/* Visualización de Datos del Repositorio Creado */}
            {createdRepoData && (
              <div className="mt-6 p-5 rounded-2xl border border-emerald-500/30 bg-emerald-950/20 space-y-3">
                <h3 className="font-black text-lg text-emerald-400">Detalles del Repositorio Creado:</h3>
                <ul className="text-sm space-y-1 text-slate-300">
                  <li><strong>Nombre:</strong> {createdRepoData.name}</li>
                  <li><strong>Descripción:</strong> {createdRepoData.Desc || 'Sin descripción'}</li>
                  <li><strong>Visibilidad:</strong> {createdRepoData.privacy}</li>
                  <li><strong>URL:</strong> <code className="text-blue-400">{createdRepoData.url}</code></li>
                  <li><strong>Archivos iniciales:</strong> {createdRepoData.files}</li>
                  <li><strong>Plantilla:</strong> {createdRepoData.template}</li>
                </ul>
                <div className="pt-2">
                  <button
                    onClick={() => navigate('/repos')}
                    className="badge-chip badge-blue cursor-pointer"
                  >
                    Ver en lista de repositorios →
                  </button>
                </div>
              </div>
            )}
      </section>
    </div>
  );
}