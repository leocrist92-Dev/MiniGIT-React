export default function DiffVersiones() {
  return (
    <>
      <div className="orb orb-a"></div>
      <div className="orb orb-b"></div>
      <div className="orb orb-c"></div>
      <div className="soft-grid shell min-h-screen">

        <main className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8">
          <div className="panel-neo p-6 space-y-4">
            <h2 className="text-2xl font-black">Diferencias de Código (Diff)</h2>
            <div className="code-board space-y-1">
              <div className="text-slate-400">--- src/App.js</div>
              <div className="text-slate-400">+++ src/App.js</div>
              <div className="diff-del">- const title = "Antigua App";</div>
              <div className="diff-add">+ const title = "Mini-Git React App";</div>
              <div>  return (</div>
              <div className="diff-del">-   &lt;h1&gt;&#123;title&#125;&lt;/h1&gt;</div>
              <div className="diff-add">+   &lt;h1 className="title-style"&gt;&#123;title&#125;&lt;/h1&gt;</div>
              <div>  );</div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}