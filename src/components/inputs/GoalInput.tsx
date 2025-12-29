import { useAppStore } from '@/store/appStore';

export function GoalInput() {
  const { goal, setGoal } = useAppStore();

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
        Module Goal
      </label>
      <textarea
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
        placeholder="Define the objective of this LLM module. What should it achieve?"
        className="w-full h-32 p-3 text-sm border border-zinc-200 dark:border-zinc-600 rounded-xl resize-none shadow-sm
          bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500
          transition-all duration-200
          hover:border-zinc-300 dark:hover:border-zinc-500 hover:shadow
          focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500/50 focus:border-indigo-300 dark:focus:border-indigo-500 focus:outline-none
          dark:focus:ring-offset-zinc-800"
      />
      <p className="text-xs text-zinc-500 dark:text-zinc-400">
        This guides the analysis of prompt effectiveness
      </p>
    </div>
  );
}
