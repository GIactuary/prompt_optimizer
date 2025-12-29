import { useAppStore } from '@/store/appStore';

interface ImprovementEditorProps {
  expanded?: boolean;
}

export function ImprovementEditor({ expanded = false }: ImprovementEditorProps) {
  const { improvements, setImprovements } = useAppStore();

  return (
    <div className="space-y-3 h-full flex flex-col">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Suggested Improvements
        </label>
        <span className="text-xs text-zinc-500 dark:text-zinc-400">
          Edit as needed before applying
        </span>
      </div>
      <textarea
        value={improvements}
        onChange={(e) => setImprovements(e.target.value)}
        className={`
          w-full p-4 text-sm border border-zinc-300 dark:border-zinc-600 rounded-xl resize-none
          bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100
          placeholder:text-zinc-400 dark:placeholder:text-zinc-500
          focus:ring-2 focus:ring-indigo-500 focus:border-transparent
          font-mono leading-relaxed flex-1
          ${expanded ? 'min-h-[60vh]' : 'h-64'}
        `}
        placeholder="Improvement suggestions will appear here..."
      />
      <p className="text-xs text-zinc-500 dark:text-zinc-400">
        You can edit, remove, or add improvements before proceeding to Step 2.
      </p>
    </div>
  );
}
