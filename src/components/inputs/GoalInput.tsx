import { useAppStore } from '@/store/appStore';

export function GoalInput() {
  const { goal, setGoal } = useAppStore();

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-zinc-700">
        Module Goal
      </label>
      <textarea
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
        placeholder="Define the objective of this LLM module. What should it achieve?"
        className="w-full h-32 p-3 text-sm border border-zinc-300 rounded-lg resize-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
      />
      <p className="text-xs text-zinc-500">
        This guides the analysis of prompt effectiveness
      </p>
    </div>
  );
}
