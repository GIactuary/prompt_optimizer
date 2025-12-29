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
        className="w-full h-24 p-3 text-sm border border-zinc-300 rounded-lg resize-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
      />
    </div>
  );
}
