import { useState } from 'react';

export default function HacerMerge() {
  const [status, setStatus] = useState(null);

  const handleMerge = () => {
    setStatus({ type: 'status-success', msg: '✓ Integración (Merge) completada sin conflictos.' });
  };

  return (
    <>
      <div className="orb orb-a"></div>
      <div className="orb orb-b"></div>
      <div className="orb orb-c"></div>
      <div className="soft-grid shell min-h-screen">

        <main className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8">
          <div className="panel-neo p-6 max-w-xl mx-auto space-y-5">
            <h2 className="text-2xl font-black">Fusionar Ramas (Merge)</h2>
            {status && <div className={`status-box show ${status.type}`}>{status.msg}</div>}
            <div className="space-y-4">
              <label className="block">
                <span className="text-sm font-bold uppercase">Rama Origen (Source)</span>
                <select className="select-neo mt-2"><option>feature/login</option></select>
              </label>
              <label className="block">
                <span className="text-sm font-bold uppercase">Rama Destino (Target)</span>
                <select className="select-neo mt-2"><option>main</option></select>
              </label>
              <button onClick={handleMerge} className="btn-primary w-full">Ejecutar Merge</button>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}