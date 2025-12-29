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
          className="flex-1"
        />
        <input
          type="number"
          min="0"
          max="1"
          step="0.1"
          value={temperature}
          onChange={(e) => setTemperature(parseFloat(e.target.value))}
          className="w-16 p-2 text-sm border border-zinc-300 rounded text-center"
        />
      </div>
    </div>
  );
}
