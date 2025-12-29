import { useAppStore } from '@/store/appStore';

export function RoleInput() {
  const { role, setRole } = useAppStore();

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-zinc-700">
        Prompt Engineer Role
      </label>
      <textarea
        value={role}
        onChange={(e) => setRole(e.target.value)}
        placeholder="Define the perspective/expertise the analyzer should use. E.g., 'Senior prompt engineer specializing in financial analysis prompts'"
        className="w-full h-24 p-3 text-sm border border-zinc-200 rounded-xl resize-none shadow-sm
          transition-all duration-200
          hover:border-zinc-300 hover:shadow
          focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500/50 focus:border-indigo-300 focus:outline-none"
      />
    </div>
  );
}
