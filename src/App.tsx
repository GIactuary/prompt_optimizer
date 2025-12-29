import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { PromptInput } from '@/components/inputs/PromptInput';
import { VariablesInput } from '@/components/inputs/VariablesInput';
import { OutputInput } from '@/components/inputs/OutputInput';
import { AnalysisPanel } from '@/components/analysis/AnalysisPanel';
import { RewritePanel } from '@/components/rewrite/RewritePanel';
import { TestPanel } from '@/components/testing/TestPanel';

export default function App() {
  return (
    <div className="h-screen flex flex-col bg-zinc-100">
      <Header />

      <div className="flex-1 flex overflow-hidden">
        <Sidebar />

        <main className="flex-1 flex flex-col overflow-hidden">
          {/* Top Section: Inputs */}
          <div className="h-1/2 p-4 grid grid-cols-2 gap-4">
            <div className="bg-white rounded-lg border border-zinc-200 p-4">
              <PromptInput />
            </div>
            <div className="grid grid-rows-2 gap-4">
              <div className="bg-white rounded-lg border border-zinc-200 p-4">
                <VariablesInput />
              </div>
              <div className="bg-white rounded-lg border border-zinc-200 p-4">
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
