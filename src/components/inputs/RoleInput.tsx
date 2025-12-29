import { useAppStore } from '@/store/appStore';

export function RoleInput() {
  const { role, setRole } = useAppStore();

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
        Prompt Engineer Role
      </label>
      <textarea
        value={role}
        onChange={(e) => setRole(e.target.value)}
        placeholder="Define the perspective/expertise the analyzer should use. E.g., 'Senior prompt engineer specializing in financial analysis prompts'"
        className="w-full h-24 p-3 text-sm border border-zinc-200 dark:border-zinc-600 rounded-xl resize-none shadow-sm
          bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500
          transition-all duration-200
          hover:border-zinc-300 dark:hover:border-zinc-500 hover:shadow
          focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500/50 focus:border-indigo-300 dark:focus:border-indigo-500 focus:outline-none
          dark:focus:ring-offset-zinc-800"
      />
    </div>
  );
}
