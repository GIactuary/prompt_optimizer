import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useAppStore } from '@/store/appStore';

export function ApiKeyInput() {
  const { apiKey, setApiKey } = useAppStore();
  const [showKey, setShowKey] = useState(false);

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
        OpenRouter API Key
      </label>
      <div className="relative">
        <input
          type={showKey ? "text" : "password"}
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="sk-or-..."
          className="w-full p-3 pr-10 text-sm border border-zinc-200 dark:border-zinc-600 rounded-xl font-mono shadow-sm
            bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500
            transition-all duration-200
            hover:border-zinc-300 dark:hover:border-zinc-500 hover:shadow
            focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500/50 focus:border-indigo-300 dark:focus:border-indigo-500 focus:outline-none
            dark:focus:ring-offset-zinc-800"
        />
        <button
          type="button"
          onClick={() => setShowKey(!showKey)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
        >
          {showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>
    </div>
  );
}
