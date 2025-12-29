import { useAppStore } from '@/store/appStore';

export function PromptInput() {
  const { currentPrompt, setCurrentPrompt } = useAppStore();

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-2">
        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Current Prompt
        </label>
        <span className="text-xs text-zinc-400">
          {currentPrompt.length} chars
        </span>
      </div>
      <textarea
        value={currentPrompt}
        onChange={(e) => setCurrentPrompt(e.target.value)}
        placeholder="Paste your current prompt here..."
        className="flex-1 p-4 text-sm border border-zinc-200 dark:border-zinc-600 rounded-xl resize-none font-mono
          bg-zinc-50 dark:bg-zinc-700/50 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500
          shadow-sm transition-all duration-200
          hover:border-zinc-300 dark:hover:border-zinc-500 hover:shadow
          focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500/50 focus:border-indigo-300 dark:focus:border-indigo-500 focus:outline-none
          focus:bg-white dark:focus:bg-zinc-700 dark:focus:ring-offset-zinc-800"
      />
    </div>
  );
}
