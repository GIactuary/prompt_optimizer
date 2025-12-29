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
        className="w-full p-3 text-sm border border-zinc-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent font-mono"
      />
      <p className="text-xs text-zinc-500">
        OpenRouter model identifier
      </p>
    </div>
  );
}
