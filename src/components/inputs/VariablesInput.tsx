import { useAppStore } from '@/store/appStore';

export function VariablesInput() {
  const { inputVariables, setInputVariables } = useAppStore();

  // Validate JSON
  const isValidJson = () => {
    if (!inputVariables.trim()) return true;
    try {
      JSON.parse(inputVariables);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-2">
        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Input Variables (JSON)
        </label>
        <div className="flex items-center gap-2">
          {!isValidJson() && (
            <span className="text-xs text-red-500 font-medium">Invalid JSON</span>
          )}
          <span className="text-xs text-zinc-400">
            {inputVariables.length} chars
          </span>
        </div>
      </div>
      <textarea
        value={inputVariables}
        onChange={(e) => setInputVariables(e.target.value)}
        placeholder='{"company": "AAPL", "period": "Q3 2024"}'
        className={`
          flex-1 p-4 text-sm border rounded-xl resize-none font-mono
          bg-zinc-50 dark:bg-zinc-700/50 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500
          shadow-sm transition-all duration-200
          hover:shadow
          focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500/50 focus:outline-none
          focus:bg-white dark:focus:bg-zinc-700 dark:focus:ring-offset-zinc-800
          ${!isValidJson()
            ? 'border-red-300 dark:border-red-500 hover:border-red-400 focus:border-red-400 focus:ring-red-500/50'
            : 'border-zinc-200 dark:border-zinc-600 hover:border-zinc-300 dark:hover:border-zinc-500 focus:border-indigo-300 dark:focus:border-indigo-500'
          }
        `}
      />
    </div>
  );
}
