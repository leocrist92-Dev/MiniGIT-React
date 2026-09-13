import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: 'status-info', msg: 'Completa usuario y contraseña para habilitar el acceso.' });
  const navigate = useNavigate();

  // Emula la función "sync" de tu app.js[cite: 1]
  useEffect(() => {
    if (!user.trim() && !pass.trim()) {
      setStatus({ type: 'status-info', msg: 'Completa usuario y contraseña para habilitar el acceso.' });
    } else if (user.trim() && pass.trim()) {
      setStatus({ type: 'status-info', msg: 'Datos completos. El botón ingresar ya está activo.' });
    } else {
      setStatus({ type: 'status-info', msg: 'Aún faltan campos requeridos.' });
    }
  }, [user, pass]);

  const handleLogin = () => {
    setLoading(true);
    setStatus({ type: 'status-info', msg: 'Validando credenciales contra el servicio de autenticación...' }); //[cite: 1]
    
    // Emulación del retraso del servidor de 1600ms[cite: 1]
    setTimeout(() => {
      if (pass === 'ContraseñaIncorrecta') { //[cite: 1]
        setStatus({ type: 'status-error', msg: '✗ Usuario o contraseña inválida.' });
        setPass('');
        setLoading(false);
      } else {
        setStatus({ type: 'status-success', msg: '✓ Login exitoso. Redirección simulada al panel de repositorios.' }); //[cite: 1]
        setTimeout(() => navigate('/repos'), 1000); // Redirige programáticamente
      }
    }, 1600);
  };

  const isBtnDisabled = !user.trim() || !pass.trim() || loading;

  return (
    <>
      <div className="orb orb-a"></div>
      <div className="orb orb-b"></div>
      <div className="orb orb-c"></div>
      <div className="soft-grid shell min-h-screen">

        <main className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8">
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
                      value={user}
                      onChange={(e) => setUser(e.target.value)}
                      disabled={loading} />
                  </label>

                  <label className="block">
                    <span className="text-sm font-bold tracking-wider text-slate-200 uppercase">Contraseña</span>
                    <input
                      type="password"
                      className="input-neo mt-2"
                      placeholder="••••••••••••"
                      value={pass}
                      onChange={(e) => setPass(e.target.value)}
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
                      onClick={() => { setUser(''); setPass(''); } }
                      className="btn-secondary"
                      disabled={loading}
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </>
  );
}