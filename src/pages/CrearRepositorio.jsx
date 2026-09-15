import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function CrearRepositorio() {
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
    const ok = /^[a-zA-Z0-9-]{3,50}$/.test(repoName.trim());
    setIsValid(ok);

    if (ok) {
      setRepoNameHelp('✓ Nombre disponible');
    } else {
      setRepoNameHelp('⚠️ Usa 3-50 caracteres con letras, números o guion');
    }
  }, [repoName]);

  // Simulación de creación de repositorio (idéntica a initCrearRepo en app.js)
  const handleCreateRepo = (e) => {
    e.preventDefault();
    if (!isValid) return;

    const files = [];
    if (readme) files.push('README.md');
    if (gitignore) files.push('.gitignore');
    if (license) files.push('LICENSE');
    if (files.length === 0) files.push('Sin inicialización');

    setStatus({
      type: 'status-success',
      msg: '✓ Repositorio creado exitosamente.'
    });

    setCreatedRepoData({
      name: repoName,
      url: `sena.mini-git.local/juanperez/${repoName}`,
      privacy: privacy,
      files: files.join(', '),
      template: template
    });
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
                />
                README.md
              </label>
              <label className="flex gap-3 items-center mb-2 cursor-pointer text-slate-300">
                <input
                  id="gitignore"
                  type="checkbox"
                  checked={gitignore}
                  onChange={(e) => setGitignore(e.target.checked)}
                />
                .gitignore
              </label>
              <label className="flex gap-3 items-center cursor-pointer text-slate-300">
                <input
                  id="license"
                  type="checkbox"
                  checked={license}
                  onChange={(e) => setLicense(e.target.checked)}
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
              disabled={!isValid}
            >
              Crear repo
            </button>
            <button
              id="repoCancel"
              type="button"
              className="btn-secondary"
              onClick={handleCancel}
            >
              Cancelar
            </button>
          </div>
        </form>

        {/* Resultado inyectado dinámicamente según app.js */}
        {createdRepoData && (
          <div id="createdRepo" className="pt-4">
            <div className="card-3d p-5">
              <h4 className="font-black text-lg text-white">{createdRepoData.name}</h4>
              <p className="text-slate-300 mt-3">URL: {createdRepoData.url}</p>
              <p className="text-slate-300 mt-2">Privacidad: {createdRepoData.privacy}</p>
              <p className="text-slate-300 mt-2">Archivos iniciales: {createdRepoData.files}</p>
              <p className="text-slate-300 mt-2">
                Plantilla: {createdRepoData.template} · Rama: main · Initial commit generado
              </p>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}