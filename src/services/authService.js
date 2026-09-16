// src/services/authService.js

const DELAY_MS = 1600;

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
    }, DELAY_MS);
  });
};

export const registrarUsuario = (datosUsuario) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (datosUsuario.email === 'existente@sena.edu.co') {
        reject(new Error('✗ El correo electrónico ya se encuentra registrado.'));
      } else {
        resolve({
          success: true,
          message: '✓ Cuenta creada exitosamente.',
          user: { username: datosUsuario.username, email: datosUsuario.email }
        });
      }
    }, DELAY_MS);
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