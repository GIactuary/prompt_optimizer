import { Wand2, Moon, Sun } from 'lucide-react';
import { useAppStore } from '@/store/appStore';

export function Header() {
  const { darkMode, toggleDarkMode } = useAppStore();

  return (
    <header className="h-14 border-b border-indigo-100 dark:border-zinc-700 bg-gradient-to-r from-white via-indigo-50/30 to-white dark:from-zinc-800 dark:via-zinc-800 dark:to-zinc-800 px-6 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/25">
          <Wand2 className="h-5 w-5 text-white" />
        </div>
        <div>
          <h1 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">Prompt Optimizer</h1>
          <p className="text-[10px] font-medium text-zinc-400 dark:text-zinc-500 -mt-0.5">AI-Powered Prompt Engineering</p>
        </div>
      </div>
      <button
        onClick={toggleDarkMode}
        className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors"
        title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
      >
        {darkMode ? (
          <Sun className="h-5 w-5 text-amber-500" />
        ) : (
          <Moon className="h-5 w-5 text-zinc-500" />
        )}
      </button>
    </header>
  );
}
