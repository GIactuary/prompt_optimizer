import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { PromptInput } from '@/components/inputs/PromptInput';
import { VariablesInput } from '@/components/inputs/VariablesInput';
import { OutputInput } from '@/components/inputs/OutputInput';
import { AnalysisPanel } from '@/components/analysis/AnalysisPanel';
import { RewritePanel } from '@/components/rewrite/RewritePanel';
import { TestPanel } from '@/components/testing/TestPanel';
import { useAppStore } from '@/store/appStore';

export default function App() {
  const darkMode = useAppStore((state) => state.darkMode);

  return (
    <div className={`h-screen flex flex-col bg-zinc-100 dark:bg-zinc-900 ${darkMode ? 'dark' : ''}`}>
      <Header />

      <div className="flex-1 flex overflow-hidden">
        <Sidebar />

        <main className="flex-1 flex flex-col overflow-hidden">
          {/* Top Section: Inputs */}
          <div className="h-1/2 p-4 grid grid-cols-2 gap-4">
            <div className="bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 p-4 shadow-sm">
              <PromptInput />
            </div>
            <div className="grid grid-rows-2 gap-4">
              <div className="bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 p-4 shadow-sm">
                <VariablesInput />
              </div>
              <div className="bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 p-4 shadow-sm">
                <OutputInput />
              </div>
            </div>
          </div>

          {/* Bottom Section: Analysis → Rewrite → Test */}
          <div className="h-1/2 p-4 pt-0 grid grid-cols-3 gap-4">
            <AnalysisPanel />
            <RewritePanel />
            <TestPanel />
          </div>
        </main>
      </div>
    </div>
  );
}
