// src/services/repoService.js

const DELAY_MS = 500;

// Base de datos simulada en memoria
let repositoriosSimulados = [
  {
      id: 'repo-1',
      name: 'mi-proyecto-python',
      privacy: 'Público',
      description: 'Sistema de gestión de usuarios con Python y PostgreSQL',
      stats: 'Contribuyentes: 2 · Commits: 8 · Ramas: 3 · Hace 1 minuto',
      commitsCount: 8,
      branchesCount: 3,
      updated: 'Hace 1 minuto',
      langs: [
        { type: 'py', width: '65%' },
        { type: 'sql', width: '35%' }
      ],
      langText: 'Python 65% · SQL 35% · 2.4 MB',
      hasActions: true
    },
    {
      id: 'repo-2',
      name: 'mi-web-frontend',
      privacy: 'Privado',
      description: 'Interfaz web moderna con React',
      stats: 'Contribuyentes: 1 · Commits: 23 · Ramas: 2 · Hace 3 días',
      commitsCount: 23,
      branchesCount: 2,
      updated: 'Hace 3 días',
      langs: [
        { type: 'js', width: '80%' },
        { type: 'css', width: '20%' }
      ],
      hasActions: false
    },
    {
      id: 'repo-3',
      name: 'tutorial-git-sena',
      privacy: 'Público',
      description: 'Tutorial de Git para estudiantes SENA',
      stats: 'Contribuyentes: 5 · Commits: 16 · Ramas: 4 · Hace 1 semana',
      commitsCount: 16,
      branchesCount: 4,
      updated: 'Hace 1 semana',
      langs: [{ type: 'md', width: '100%' }],
      hasActions: false
    },
    {
      id: 'repo-4',
      name: 'api-rest-django',
      privacy: 'Privado',
      description: 'API REST completa con Django',
      stats: 'Contribuyentes: 3 · Commits: 45 · Ramas: 5 · Ayer',
      commitsCount: 45,
      branchesCount: 5,
      updated: 'Ayer',
      langs: [
        { type: 'py', width: '75%' },
        { type: 'htmlc', width: '25%' }
      ],
      hasActions: false
    },
    {
      id: 'repo-5',
      name: 'ejercicios-javascript',
      privacy: 'Público',
      description: 'Ejercicios de JavaScript para SENA',
      stats: 'Contribuyentes: 1 · Commits: 12 · Ramas: 1 · Hace 2 meses',
      commitsCount: 12,
      branchesCount: 1,
      updated: 'Hace 2 meses',
      langs: [{ type: 'js', width: '100%' }],
      hasActions: true
    }
];

export const obtenerRepositorios = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...repositoriosSimulados]);
    }, DELAY_MS);
  });
};

export const crearRepositorio = (datosRepo) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
        // Extraemos el nombre evaluando 'name' o 'nombre' de forma segura
      const nombreExtraido = datosRepo?.name || datosRepo?.nombre || '';
      const nombreRepo = nombreExtraido.toString().trim();

      // Validación defensiva sobre la cadena limpia
      if (!nombreRepo) {
        reject(new Error('✗ El nombre del repositorio no puede estar vacío.'));
        return;
      }
      
      // Estructura que simula el guardado en la base de datos
      const nuevoRepo = {
        id: Date.now(),
        name: datosRepo.name,
        privacy: datosRepo.privacy,
        description: datosRepo.Desc,
        files: datosRepo.files,
        template: datosRepo.template,
        url: datosRepo.url,
        branch: ['main'],
        commits: 1,
        stats: 'Contribuyentes: 1 · menos de 1 minuto',
        commitsCount: 0,
        branchesCount: 1,
        updated: 'menos de 1 minuto',
        langs: [{ type: 'js', width: '100%' }],
        hasActions: false
      };
      
      // Validaciones del lado del servicio / servidor
      repositoriosSimulados.push(nuevoRepo);
      // Retornamos respuesta exitosa
      resolve({
        success: true,
        message: '✓ Repositorio creado exitosamente en el servidor.',
        repo: nuevoRepo
      });
    }, DELAY_MS);
  });
};

export const hacerCommit = (repoIdONombre, mensajeCommit) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // 1. Validamos que el mensaje no esté vacío
      if (!mensajeCommit || !mensajeCommit.trim()) {
        reject(new Error('✗ El mensaje del commit es obligatorio.'));
        return;
      }

      // 2. Buscamos el repositorio por ID o por Nombre en la base de datos simulada
      const repo = repositoriosSimulados.find(
        r => r.id === repoIdONombre || r.name === repoIdONombre
      );

      if (!repo) {
        reject(new Error('✗ Repositorio no encontrado en el sistema.'));
        return;
      }

      // 3. Modificamos los datos simulados (sumamos commit y creamos hash aleatorio)
      repo.commits += 1;
      const commitHash = Math.random().toString(36).substring(2, 9);

      // 4. Resolvemos la promesa
      resolve({
        success: true,
        message: '✓ Commit registrado exitosamente.',
        repoActualizado: repo,
        hash: commitHash
      });
    }, DELAY_MS);
  });
};

export const hacerMerge = (ramaOrigen, ramaDestino) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (ramaOrigen === ramaDestino) {
        reject(new Error('✗ No se puede hacer merge sobre la misma rama.'));
        return;
      }

      resolve({
        success: true,
        message: `✓ Merge exitoso de ${ramaOrigen} en ${ramaDestino}. Sin conflictos.`
      });
    }, DELAY_MS);
  });
};