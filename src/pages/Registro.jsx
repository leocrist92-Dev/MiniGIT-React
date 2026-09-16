// Registro.jsx
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// 1. Importamos la función del servicio de autenticación
import { registrarUsuario } from '../services/authService';

export default function Registro() {
  const navigate = useNavigate(); // Hook para redireccionar al usuario
  
  // Estados para los campos del formulario
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [terms, setTerms] = useState(false);
  const [updates, setUpdates] = useState(false);

  // Estado para la alerta principal
  const [status, setStatus] = useState({
    type: 'status-info',
    message: 'Completa todos los campos válidos y acepta los términos para crear la cuenta.'
  });

  // Estado para saber si se está enviando la petición al backend
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false); // Para saber si ya se registró exitosamente

  // Estados para los textos de ayuda debajo de los inputs
  const [nameHelp, setNameHelp] = useState('Mínimo 5 caracteres.');
  const [emailHelp, setEmailHelp] = useState('Se enviará confirmación por correo.');
  const [userHelp, setUserHelp] = useState('3 a 20 caracteres.');
  const [passHelp, setPassHelp] = useState({ label: 'Fortaleza pendiente.', color: 'inherit' });
  const [pass2Help, setPass2Help] = useState('Debe coincidir exactamente.');
  // Estado que habilita o deshabilita el botón de Registro
  const [isValid, setIsValid] = useState(false);

  // Efecto que valida los campos en tiempo real mientras el usuario escribe
  useEffect(() => {
    // Si ya estamos enviando o ya se registró, no validamos de nuevo
    if (isSubmitting || isSuccess) return;

    // 1. Validación de Nombre
    const nTrim = fullName.trim();
    const nameOk = nTrim.length >= 5 && nTrim.length <= 100;
    if (nTrim) {
      setNameHelp(nameOk ? '✓ Nombre válido' : '⚠️ Debe tener entre 5 y 100 caracteres');
    } else {
      setNameHelp('Mínimo 5 caracteres.');
    }

    // 2. Validación de Email
    const eTrim = email.trim();
    const emailTaken = eTrim.toLowerCase() === 'existente@sena.edu.co';
    const emailRegexOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(eTrim) && !emailTaken;
    const sena = /@sena\.edu\.co$/i.test(eTrim);
    
    if (eTrim) {
      if (emailTaken) setEmailHelp('✗ Email ya registrado');
      else if (emailRegexOk) setEmailHelp(sena ? '✓ Email disponible · dominio SENA' : '✓ Email disponible');
      else setEmailHelp('⚠️ Formato inválido');
    } else {
      setEmailHelp('Se enviará confirmación por correo.');
    }

    // 3. Validación de Usuario
    const uTrim = username.trim();
    const userTaken = ['admin', 'juanperez'].includes(uTrim.toLowerCase());
    const userOk = /^[a-zA-Z0-9_]{3,20}$/.test(uTrim) && !userTaken;
    
    if (uTrim) {
      if (userTaken) setUserHelp('✗ Username no disponible');
      else if (userOk) setUserHelp('✓ Username disponible');
      else setUserHelp('⚠️ 3 a 20 caracteres con letras, números o _');
    } else {
      setUserHelp('3 a 20 caracteres.');
    }

    // 4. Fortaleza y Validación de Contraseña
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    
    let pColor = 'inherit';
    let pLabel = 'Fortaleza pendiente.';
    
    if (password) {
      if (score <= 2) { pLabel = 'Fortaleza: ⚠️ Débil'; pColor = '#fca5a5'; }
      else if (score <= 4 || password.length < 16) { pLabel = 'Fortaleza: ✓ Media'; pColor = '#fdba74'; }
      else { pLabel = 'Fortaleza: ✓ Fuerte'; pColor = '#86efac'; }
    }
    setPassHelp({ label: password ? pLabel : 'Fortaleza pendiente.', color: pColor });

    const passOk = password.length >= 8 && /[A-Z]/.test(password) && /[a-z]/.test(password) && /[0-9]/.test(password) && /[^A-Za-z0-9]/.test(password);

    // 5. Confirmar Contraseña
    const match = confirmPassword && password === confirmPassword;
    if (confirmPassword) {
      setPass2Help(match ? '✓ Las contraseñas coinciden' : '✗ Las contraseñas no coinciden');
    } else {
      setPass2Help('Debe coincidir exactamente.');
    }

    // 6. Validación Global
    const allOk = nameOk && emailRegexOk && userOk && passOk && match && terms;
    setIsValid(allOk);
    
    setStatus({
      type: allOk ? 'status-success' : 'status-info',
      message: allOk ? '✓ Todo listo para crear la cuenta.' : 'Completa todos los campos válidos y acepta los términos para crear la cuenta.'
    });

  }, [fullName, email, username, password, confirmPassword, terms, isSubmitting]);

  // 2. FUNCIÓN DE REGISTRO CON CONEXIÓN AL SERVICIO
  const handleRegister = async () => {
    // Si ya fue exitoso, un segundo clic redirige al login
    if (isSuccess) {
      navigate('/login');
      return;
    }

    // 2.1 Bloqueamos el formulario y mostramos estado de carga
    setIsSubmitting(true);
    setStatus({
      type: 'status-info',
      message: 'Registrando tu cuenta en el servidor...'
    });

    try {
      // 2.2 Agrupamos los datos a enviar
      const datosUsuario = {
        fullName,
        email,
        username,
        password,
        wantsUpdates: updates
      };

      // 2.3 Hacemos la petición al servicio simulado y ESPERAMOS (await)
      const response = await registrarUsuario(datosUsuario);

      // 2.4 Si la promesa se resuelve correctamente (éxito)
      setStatus({
        type: 'status-success',
        message: `${response.message} Redirigiendo al inicio de sesión...`
      });
      setIsSuccess(true);
      
      // Opcional: Redirigir automáticamente después de 2 segundos
      setTimeout(() => navigate('/login'), 2500);

    } catch (error) {
      // 2.5 Si la promesa es rechazada (por ejemplo, el correo ya existe en authService)
      setStatus({
        type: 'status-error',
        message: error.message // Mostrará "✗ El correo electrónico ya se encuentra registrado."
      });
      setIsSuccess(false);
    } finally {
      // 2.6 Pase lo que pase (éxito o error), desbloqueamos el formulario
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setFullName('');
    setEmail('');
    setUsername('');
    setPassword('');
    setConfirmPassword('');
    setTerms(false);
    setUpdates(false);
    setIsSubmitting(false);
  };

  return (
    <div className="grid xl:grid-cols-[1.15fr] gap-6">
      <section className="panel-neo p-6 md:p-8 space-y-5">
        
        <div id="regStatus" className={`status-box show ${status.type}`}>
          {status.message}
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block">
              <span className="text-sm font-bold uppercase tracking-wider">Nombre completo</span>
              <input 
                id="fullName" 
                className="input-neo mt-2 w-full" 
                placeholder="Juan Pérez García" 
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                disabled={isSubmitting}
              />
            </label>
            <p id="nameHelp" className="text-sm text-slate-400 mt-2">{nameHelp}</p>
          </div>

          <div>
            <label className="block">
              <span className="text-sm font-bold uppercase tracking-wider">Email</span>
              <input 
                id="regEmail" 
                className="input-neo mt-2 w-full" 
                placeholder="juan@sena.edu.co" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmitting}
              />
            </label>
            <p id="emailHelp" className="text-sm text-slate-400 mt-2">{emailHelp}</p>
          </div>

          <div>
            <label className="block">
              <span className="text-sm font-bold uppercase tracking-wider">Nombre de usuario</span>
              <input 
                id="regUser" 
                className="input-neo mt-2 w-full" 
                placeholder="juanperez"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={isSubmitting}
              />
            </label>
            <p id="userHelp" className="text-sm text-slate-400 mt-2">{userHelp}</p>
          </div>

          <div>
            <label className="block">
              <span className="text-sm font-bold uppercase tracking-wider">Contraseña</span>
              <input 
                id="regPass" 
                type="password" 
                className="input-neo mt-2 w-full" 
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isSubmitting}
              />
            </label>
            <p id="passHelp" className="text-sm mt-2" style={{ color: passHelp.color }}>
              <strong>{passHelp.label}</strong>
            </p>
          </div>

          <div>
            <label className="block">
              <span className="text-sm font-bold uppercase tracking-wider">Confirmar contraseña</span>
              <input 
                id="regPass2" 
                type="password" 
                className="input-neo mt-2 w-full" 
                placeholder="••••••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={isSubmitting}
              />
            </label>
            <p id="pass2Help" className="text-sm text-slate-400 mt-2">{pass2Help}</p>
          </div>
        </div>

        <label className="flex items-center gap-3">
          <input 
            id="terms" 
            type="checkbox" 
            checked={terms}
            onChange={(e) => setTerms(e.target.checked)}
            disabled={isSubmitting}
          /> 
          <span className="text-slate-300">Acepto los términos de servicio</span>
        </label>
        
        <label className="flex items-center gap-3">
          <input 
            id="updates" 
            type="checkbox" 
            checked={updates}
            onChange={(e) => setUpdates(e.target.checked)}
            disabled={isSubmitting}
          /> 
          <span className="text-slate-300">Deseo recibir actualizaciones por email</span>
        </label>

        <div className="flex flex-wrap gap-3">
          <button 
            id="regBtn" 
            className="btn-primary" 
            disabled={!isValid || isSubmitting}
            onClick={handleRegister}
          >
            Registrarse
          </button>
          <button 
            id="regCancel" 
            className="btn-secondary"
            disabled={isSubmitting}
            onClick={handleCancel}
          >
            Cancelar
          </button>
        </div>
        
      </section>
    </div>
  );
}