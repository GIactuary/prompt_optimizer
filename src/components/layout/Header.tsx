import { Wand2 } from 'lucide-react';

export function Header() {
  return (
    <header className="h-14 border-b border-zinc-200 bg-white px-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Wand2 className="h-6 w-6 text-indigo-600" />
        <h1 className="text-xl font-semibold text-zinc-900">Prompt Optimizer</h1>
      </div>
    </header>
  );
}
