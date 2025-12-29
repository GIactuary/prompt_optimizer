import { useAppStore } from '@/store/appStore';

export function ModelSelector() {
  const { modelName, setModelName } = useAppStore();

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-zinc-700">
        Model Name
      </label>
      <input
        type="text"
        value={modelName}
        onChange={(e) => setModelName(e.target.value)}
        placeholder="e.g., anthropic/claude-sonnet-4-20250514"
        className="w-full p-3 text-sm border border-zinc-200 rounded-xl font-mono shadow-sm
          transition-all duration-200
          hover:border-zinc-300 hover:shadow
          focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500/50 focus:border-indigo-300 focus:outline-none"
      />
      <p className="text-xs text-zinc-500">
        OpenRouter model identifier
      </p>
    </div>
  );
}
