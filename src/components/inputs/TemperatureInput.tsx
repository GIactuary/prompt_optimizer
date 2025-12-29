import { useAppStore } from '@/store/appStore';

export function TemperatureInput() {
  const { temperature, setTemperature } = useAppStore();

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-zinc-700">
        Temperature: {temperature}
      </label>
      <div className="flex items-center gap-3">
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={temperature}
          onChange={(e) => setTemperature(parseFloat(e.target.value))}
          className="flex-1 h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-indigo-500"
        />
        <input
          type="number"
          min="0"
          max="1"
          step="0.1"
          value={temperature}
          onChange={(e) => setTemperature(parseFloat(e.target.value))}
          className="w-16 p-2 text-sm border border-zinc-200 rounded-lg text-center shadow-sm
            transition-all duration-200
            hover:border-zinc-300 hover:shadow
            focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500/50 focus:border-indigo-300 focus:outline-none"
        />
      </div>
    </div>
  );
}
