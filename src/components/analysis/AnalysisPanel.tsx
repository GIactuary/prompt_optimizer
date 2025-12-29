import { useState } from 'react';
import { Sparkles, Loader2, AlertCircle, Maximize2, Minimize2, X } from 'lucide-react';
import { useAppStore } from '@/store/appStore';
import { ImprovementEditor } from './ImprovementEditor';

export function AnalysisPanel() {
  const {
    improvements,
    isAnalyzing,
    analysisError,
    runAnalysis,
    goal,
    currentPrompt,
    currentOutput,
    apiKey
  } = useAppStore();

  const [isExpanded, setIsExpanded] = useState(false);

  const canAnalyze = goal && currentPrompt && currentOutput && apiKey;

  // Button styles
  const primaryBtnClass = `
    px-4 py-2 text-sm font-medium rounded-lg flex items-center gap-2
    shadow-sm hover:shadow-md active:scale-[0.98] transition-all duration-150
  `;

  const panelContent = (
    <>
      {analysisError && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2">
          <AlertCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-red-700">
            <p className="font-medium">Analysis failed</p>
            <p className="text-red-600">{analysisError}</p>
          </div>
        </div>
      )}

      {!improvements && !isAnalyzing && !analysisError && (
        <div className="h-full flex items-center justify-center text-zinc-400 text-sm">
          {!canAnalyze ? (
            <div className="text-center space-y-2">
              <p className="font-medium">Fill in the required fields to analyze:</p>
              <ul className="text-xs space-y-1">
                {!goal && <li className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-zinc-300" />Module Goal (sidebar)</li>}
                {!currentPrompt && <li className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-zinc-300" />Current Prompt</li>}
                {!currentOutput && <li className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-zinc-300" />Current Output</li>}
                {!apiKey && <li className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-zinc-300" />API Key (sidebar)</li>}
              </ul>
            </div>
          ) : (
            <span className="text-zinc-500">Click "Analyze Prompt" to generate improvement suggestions</span>
          )}
        </div>
      )}

      {isAnalyzing && (
        <div className="h-full flex items-center justify-center">
          <div className="text-center space-y-4">
            {/* Skeleton loading */}
            <div className="space-y-3 animate-pulse w-64">
              <div className="h-4 bg-amber-100 rounded-full w-3/4" />
              <div className="h-4 bg-amber-100 rounded-full w-full" />
              <div className="h-4 bg-amber-100 rounded-full w-5/6" />
              <div className="h-4 bg-amber-100 rounded-full w-2/3" />
            </div>
            <p className="text-sm text-zinc-500">Analyzing your prompt...</p>
          </div>
        </div>
      )}

      {improvements && !isAnalyzing && (
        <ImprovementEditor expanded={isExpanded} />
      )}
    </>
  );

  // Fullscreen overlay
  if (isExpanded) {
    return (
      <>
        {/* Placeholder to maintain grid layout */}
        <div className="flex flex-col h-full border border-zinc-200 rounded-xl bg-zinc-100/50 border-l-4 border-l-amber-400">
          <div className="flex items-center justify-center h-full text-zinc-400 text-sm">
            Panel expanded - click minimize to return
          </div>
        </div>

        {/* Fullscreen overlay */}
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-6">
          <div className="bg-white rounded-2xl shadow-2xl w-full h-full max-w-6xl max-h-[90vh] flex flex-col border-l-4 border-l-amber-400 overflow-hidden">
            {/* Progress bar when loading */}
            {isAnalyzing && (
              <div className="absolute top-0 left-0 right-0 h-1 bg-amber-100 overflow-hidden">
                <div className="h-full bg-amber-500 animate-progress" />
              </div>
            )}

            <div className="flex items-center justify-between p-4 border-b border-zinc-200 bg-gradient-to-r from-amber-50/50 to-white">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-amber-100">
                  <Sparkles className="h-5 w-5 text-amber-600" />
                </div>
                <h3 className="text-lg font-semibold text-zinc-900">Step 1: Analysis</h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={runAnalysis}
                  disabled={!canAnalyze || isAnalyzing}
                  className={`
                    ${primaryBtnClass}
                    ${canAnalyze && !isAnalyzing
                      ? 'bg-amber-500 text-white hover:bg-amber-600'
                      : 'bg-zinc-100 text-zinc-400 cursor-not-allowed shadow-none'
                    }
                  `}
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    'Analyze Prompt'
                  )}
                </button>
                <button
                  onClick={() => setIsExpanded(false)}
                  className="p-2 hover:bg-zinc-100 rounded-lg transition-colors"
                  title="Minimize"
                >
                  <Minimize2 className="h-5 w-5 text-zinc-500" />
                </button>
                <button
                  onClick={() => setIsExpanded(false)}
                  className="p-2 hover:bg-zinc-100 rounded-lg transition-colors"
                  title="Close"
                >
                  <X className="h-5 w-5 text-zinc-500" />
                </button>
              </div>
            </div>

            <div className="flex-1 p-6 overflow-y-auto">
              {panelContent}
            </div>
          </div>
        </div>
      </>
    );
  }

  // Normal view
  return (
    <div className="flex flex-col h-full border border-zinc-200 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow duration-200 border-l-4 border-l-amber-400 overflow-hidden relative">
      {/* Progress bar when loading */}
      {isAnalyzing && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-amber-100 overflow-hidden">
          <div className="h-full bg-amber-500 animate-progress" />
        </div>
      )}

      <div className="flex items-center justify-between p-3 border-b border-zinc-200 bg-gradient-to-r from-amber-50/50 to-white">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-amber-100">
            <Sparkles className="h-4 w-4 text-amber-600" />
          </div>
          <h3 className="font-semibold text-zinc-900">Step 1: Analysis</h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsExpanded(true)}
            className="p-2 hover:bg-zinc-100 rounded-lg transition-colors"
            title="Expand"
          >
            <Maximize2 className="h-4 w-4 text-zinc-500" />
          </button>
          <button
            onClick={runAnalysis}
            disabled={!canAnalyze || isAnalyzing}
            className={`
              ${primaryBtnClass}
              ${canAnalyze && !isAnalyzing
                ? 'bg-amber-500 text-white hover:bg-amber-600'
                : 'bg-zinc-100 text-zinc-400 cursor-not-allowed shadow-none'
              }
            `}
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              'Analyze Prompt'
            )}
          </button>
        </div>
      </div>

      <div className="flex-1 p-4 overflow-y-auto">
        {panelContent}
      </div>
    </div>
  );
}
