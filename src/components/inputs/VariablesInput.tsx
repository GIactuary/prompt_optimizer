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
        <label className="text-sm font-medium text-zinc-700">
          Input Variables (JSON)
        </label>
        <div className="flex items-center gap-2">
          {!isValidJson() && (
            <span className="text-xs text-red-500">Invalid JSON</span>
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
          flex-1 p-4 text-sm border rounded-lg resize-none font-mono bg-zinc-50
          focus:ring-2 focus:ring-indigo-500 focus:border-transparent
          ${!isValidJson() ? 'border-red-300' : 'border-zinc-300'}
        `}
      />
    </div>
  );
}
