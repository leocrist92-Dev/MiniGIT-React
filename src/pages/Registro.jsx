import { useState } from 'react';

export default function Registro() {
  const [formData, setFormData] = useState({ name: '', email: '', pass: '', confirmPass: '' });
  const [status, setStatus] = useState({ type: 'status-info', msg: 'Completa todos los campos para crear tu cuenta.' });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleRegister = (e) => {
    e.preventDefault();
    if (formData.pass !== formData.confirmPass) {
      setStatus({ type: 'status-error', msg: '✗ Las contraseñas no coinciden.' });
      return;
    }
    setStatus({ type: 'status-success', msg: '✓ Cuenta creada exitosamente en Mini-Git.' });
  };

  return (
    <>
      <div className="orb orb-a"></div>
      <div className="orb orb-b"></div>
      <div className="orb orb-c"></div>
      <div className="soft-grid shell min-h-screen">

        <main className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8">
          <div className="panel-neo p-6 md:p-8 max-w-xl mx-auto space-y-5">
            <h2 className="text-2xl font-black text-center">Registro de Usuario</h2>
            <div className={`status-box show ${status.type}`}>{status.msg}</div>
            <form onSubmit={handleRegister} className="space-y-4">
              <label className="block">
                <span className="text-sm font-bold uppercase">Nombre completo</span>
                <input name="name" className="input-neo mt-2" placeholder="Ej: Juan Pérez" value={formData.name} onChange={handleChange} required />
              </label>
              <label className="block">
                <span className="text-sm font-bold uppercase">Correo Electrónico</span>
                <input name="email" type="email" className="input-neo mt-2" placeholder="usuario@sena.edu.co" value={formData.email} onChange={handleChange} required />
              </label>
              <label className="block">
                <span className="text-sm font-bold uppercase">Contraseña</span>
                <input name="pass" type="password" className="input-neo mt-2" placeholder="••••••••" value={formData.pass} onChange={handleChange} required />
              </label>
              <label className="block">
                <span className="text-sm font-bold uppercase">Confirmar Contraseña</span>
                <input name="confirmPass" type="password" className="input-neo mt-2" placeholder="••••••••" value={formData.confirmPass} onChange={handleChange} required />
              </label>
              <button type="submit" className="btn-primary w-full">Crear Cuenta</button>
            </form>
          </div>
        </main>
      </div>
    </>
  );
}