import { useAppStore } from '@/store/appStore';

export function OutputInput() {
  const { currentOutput, setCurrentOutput } = useAppStore();

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-2">
        <label className="text-sm font-medium text-zinc-700">
          Current Output
        </label>
        <span className="text-xs text-zinc-400">
          {currentOutput.length} chars
        </span>
      </div>
      <textarea
        value={currentOutput}
        onChange={(e) => setCurrentOutput(e.target.value)}
        placeholder="Paste the output your current prompt produces..."
        className="flex-1 p-4 text-sm border border-zinc-300 rounded-lg resize-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent font-mono bg-zinc-50"
      />
    </div>
  );
}
