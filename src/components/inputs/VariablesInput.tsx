import { useState } from 'react';
import { Maximize2, Minimize2, X, Braces } from 'lucide-react';
import { useAppStore } from '@/store/appStore';

export function VariablesInput() {
  const { inputVariables, setInputVariables } = useAppStore();
  const [isExpanded, setIsExpanded] = useState(false);

  // Validate JSON
  const isValidJson = () => {
    if (!inputVariables.trim()) return true;
    try {
      JSON.parse(inputVariables);
      return true;
    } catch {
      return false;
    }
  };

  const inputContent = (
    <textarea
      value={inputVariables}
      onChange={(e) => setInputVariables(e.target.value)}
      placeholder='{"company": "AAPL", "period": "Q3 2024"}'
      className={`
        w-full p-4 text-sm border rounded-xl resize-none font-mono
        bg-zinc-50 dark:bg-zinc-700/50 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500
        shadow-sm transition-all duration-200
        hover:shadow
        focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500/50 focus:outline-none
        focus:bg-white dark:focus:bg-zinc-700 dark:focus:ring-offset-zinc-800
        ${!isValidJson()
          ? 'border-red-300 dark:border-red-500 hover:border-red-400 focus:border-red-400 focus:ring-red-500/50'
          : 'border-zinc-200 dark:border-zinc-600 hover:border-zinc-300 dark:hover:border-zinc-500 focus:border-indigo-300 dark:focus:border-indigo-500'
        }
        ${isExpanded ? 'min-h-[70vh]' : 'flex-1'}
      `}
    />
  );

  // Fullscreen overlay
  if (isExpanded) {
    return (
      <>
        {/* Placeholder */}
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-center h-full text-zinc-400 dark:text-zinc-500 text-sm">
            Panel expanded - click minimize to return
          </div>
        </div>

        {/* Fullscreen overlay */}
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-6">
          <div className="bg-white dark:bg-zinc-800 rounded-2xl shadow-2xl w-full h-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-zinc-200 dark:border-zinc-700 bg-gradient-to-r from-zinc-50 to-white dark:from-zinc-800 dark:to-zinc-800">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-700">
                  <Braces className="h-5 w-5 text-zinc-600 dark:text-zinc-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Input Variables (JSON)</h3>
                  <div className="flex items-center gap-2">
                    {!isValidJson() && (
                      <span className="text-xs text-red-500 font-medium">Invalid JSON</span>
                    )}
                    <span className="text-xs text-zinc-400">{inputVariables.length} chars</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsExpanded(false)}
                  className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded-lg transition-colors"
                  title="Minimize"
                >
                  <Minimize2 className="h-5 w-5 text-zinc-500 dark:text-zinc-400" />
                </button>
                <button
                  onClick={() => setIsExpanded(false)}
                  className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded-lg transition-colors"
                  title="Close"
                >
                  <X className="h-5 w-5 text-zinc-500 dark:text-zinc-400" />
                </button>
              </div>
            </div>

            <div className="flex-1 p-6 overflow-y-auto">
              {inputContent}
            </div>
          </div>
        </div>
      </>
    );
  }

  // Normal view
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-2">
        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Input Variables (JSON)
        </label>
        <div className="flex items-center gap-2">
          {!isValidJson() && (
            <span className="text-xs text-red-500 font-medium">Invalid JSON</span>
          )}
          <span className="text-xs text-zinc-400">
            {inputVariables.length} chars
          </span>
          <button
            onClick={() => setIsExpanded(true)}
            className="p-1 hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded transition-colors"
            title="Expand"
          >
            <Maximize2 className="h-4 w-4 text-zinc-400 dark:text-zinc-500" />
          </button>
        </div>
      </div>
      {inputContent}
    </div>
  );
}
