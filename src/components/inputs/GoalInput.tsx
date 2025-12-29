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
        className="w-full h-32 p-3 text-sm border border-zinc-200 rounded-xl resize-none shadow-sm
          transition-all duration-200
          hover:border-zinc-300 hover:shadow
          focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500/50 focus:border-indigo-300 focus:outline-none"
      />
      <p className="text-xs text-zinc-500">
        This guides the analysis of prompt effectiveness
      </p>
    </div>
  );
}
