import { useState, useEffect, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { loginUsuario, solicitarRecuperacion } from '../services/authService';
//import { AuthContext } from '../context/AuthContext';
// 1. Usamos el Hook defensivo en lugar de useContext directo
import { useAuth } from '../context/AuthContext';

export default function Login() {
  //const { loginSession } = useContext(AuthContext); // Extrae la función del Contexto
  // 2. Extraemos loginSession de forma segura
  const { loginSession } = useAuth();

  // Estados para el formulario
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  // Estados para controlar flujo
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: 'status-info', msg: 'Completa usuario y contraseña para habilitar el acceso.' });
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  // Estados para el modal de recuperación
  const [recoverModalOpen, setRecoverModalOpen] = useState(false);
  const [recoverEmail, setRecoverEmail] = useState('usuario@sena.edu.co');
  const [recoverStatus, setRecoverStatus] = useState({
    type: 'status-info',
    msg: 'Se enviará un enlace válido por 24 horas.'
  });

  // Efecto que reacciona a la escritura en el formulario
  useEffect(() => {
    if (isVerifying || isSuccess) return;

    const uTrim = username.trim();
    const pTrim = password.trim();

    if (!uTrim && !pTrim) {
      setStatus({ type: 'status-info', msg: 'Completa usuario y contraseña para habilitar el acceso.' });
    } else if (uTrim && pTrim) {
      setStatus({ type: 'status-info', msg: 'Datos completos. El botón ingresar ya está activo.' });
    } else {
      setStatus({ type: 'status-info', msg: 'Aún faltan campos requeridos.' });
    }
  }, [username, password, isVerifying, isSuccess]);

  const isFormValid = username.trim() !== '' && password.trim() !== '';

  const handleCancel = () => {
    setUsername('');
    setPassword('');
  };

  // Función handleLogin refactorizada usando el servicio externo
  const handleLogin = async () => {
    if (isSuccess) {
      navigate('/repos');
      return;
    }
	setLoading(true);

    setIsVerifying(true);
    setStatus({
      type: 'status-info',
      msg: 'Validando credenciales contra el servicio de autenticación...'
    });

    try {
      // Petición al servicio en lugar de usar setTimeout directo en la vista
      const data = await loginUsuario(username, password);
      loginSession(data.user, data.token); // Almacena usuario y token globalmente

      // Si la promesa se resuelve con éxito:
      //localStorage.setItem('token', data.token); // Guardamos la sesión simulada
      setStatus({
        type: 'status-success',
        msg: '✓ Login exitoso. Redirección simulada al panel de repositorios.'	
      });
      setIsSuccess(true);
      navigate('/repos');
    } catch (error) {
      // Si la promesa es rechazada (error):
      setStatus({
        type: 'status-error',
        msg: error.message
      });
      setPassword('');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleOpenRecover = () => {
    setRecoverModalOpen(true);
    setRecoverStatus({ type: 'status-info', message: 'Se enviará un enlace válido por 24 horas.' });
  };

  const handleSendRecover = async () => {
    const response = await solicitarRecuperacion(recoverEmail);
    setRecoverStatus({
      type: 'status-success',
      message: response.message
    });
  };

  const isBtnDisabled = !username.trim() || !password.trim() || loading;

  return (    
	<div className="grid xl:grid-cols-[1.2fr] gap-6">
	  <section className="panel-neo p-6 md:p-8">
		<div className="max-w-xl mx-auto space-y-5">
		  <div className="text-center">
			<div className="mx-auto w-20 h-20 rounded-3xl bg-gradient-to-br from-blue-500 via-violet-500 to-red-500 grid place-items-center text-3xl shadow-2xl">🔐</div>
			<h2 className="text-2xl font-black mt-4">Acceso seguro Mini-Git</h2>
		  </div>

		  <div className={`status-box show ${status.type}`}>{status.msg}</div>

		  <div className="space-y-4">
			<label className="block">
			  <span className="text-sm font-bold tracking-wider text-slate-200 uppercase">Email o usuario</span>
			  <input
				className="input-neo mt-2"
				placeholder="usuario@sena.edu.co"
				value={username}
				onChange={(e) => setUsername(e.target.value)}
				disabled={loading} />
			</label>

			<label className="block">
			  <span className="text-sm font-bold tracking-wider text-slate-200 uppercase">Contraseña</span>
			  <input
				type="password"
				className="input-neo mt-2"
				placeholder="••••••••••••"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				disabled={loading} />
			</label>

			<div className="flex flex-wrap gap-3">
			  <button
				onClick={handleLogin}
				className="btn-primary"
				disabled={isBtnDisabled}
			  >
				{loading ? 'Verificando credenciales...' : 'Ingresar'}
			  </button>
			  <button
				onClick={() => { setUsername(''); setPassword(''); } }
				className="btn-secondary"
				disabled={loading}
			  >
				Cancelar
			  </button>
			</div>
			<div className="flex flex-wrap gap-3 text-sm text-slate-300">
			  <span>¿No tienes cuenta?</span><Link to="/registro" className="badge-chip badge-blue">Registrarse</Link>
			</div>
			<div className="flex flex-wrap gap-3 text-sm text-slate-300">
			  <span>¿Olvidaste tu contraseña?</span><button className="badge-chip badge-red">Recuperar</button>
			</div>
		  </div>
		</div>
	  </section>
	</div>
  );
}