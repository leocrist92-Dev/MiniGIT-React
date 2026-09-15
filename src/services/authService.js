// src/services/authService.js

/**
 * Simula la petición HTTP de inicio de sesión contra el backend.
 * Retorna una Promesa con retardo de 1.6s.
 */
export const loginUsuario = (username, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (password === 'ContraseñaIncorrecta') {
        reject(new Error('✗ Usuario o contraseña inválida.'));
      } else {
        resolve({
          token: 'fake-jwt-token-123456',
          user: {
            username: username,
            name: 'Juan Pérez',
            email: 'usuario@sena.edu.co'
          }
        });
      }
    }, 1600);
  });
};

/**
 * Simula el envío de recuperación de contraseña.
 */
export const solicitarRecuperacion = (email) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: '✓ Enlace enviado. Revisa tu bandeja de entrada.'
      });
    }, 400);
  });
};