import { Wand2 } from 'lucide-react';

export function Header() {
  return (
    <header className="h-14 border-b border-indigo-100 bg-gradient-to-r from-white via-indigo-50/30 to-white px-6 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/25">
          <Wand2 className="h-5 w-5 text-white" />
        </div>
        <div>
          <h1 className="text-lg font-bold text-zinc-900 tracking-tight">Prompt Optimizer</h1>
          <p className="text-[10px] font-medium text-zinc-400 -mt-0.5">AI-Powered Prompt Engineering</p>
        </div>
      </div>
    </header>
  );
}
