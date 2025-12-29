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

  const panelContent = (
    <>
      {analysisError && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
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
            <div className="text-center space-y-1">
              <p>Fill in the required fields to analyze:</p>
              <ul className="text-xs">
                {!goal && <li>- Module Goal (sidebar)</li>}
                {!currentPrompt && <li>- Current Prompt</li>}
                {!currentOutput && <li>- Current Output</li>}
                {!apiKey && <li>- API Key (sidebar)</li>}
              </ul>
            </div>
          ) : (
            'Click "Analyze Prompt" to generate improvement suggestions'
          )}
        </div>
      )}

      {isAnalyzing && (
        <div className="h-full flex items-center justify-center">
          <div className="text-center space-y-2">
            <Loader2 className="h-8 w-8 animate-spin text-indigo-500 mx-auto" />
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
        <div className="flex flex-col h-full border border-zinc-200 rounded-lg bg-zinc-100">
          <div className="flex items-center justify-center h-full text-zinc-400 text-sm">
            Panel expanded - click minimize to return
          </div>
        </div>

        {/* Fullscreen overlay */}
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-6">
          <div className="bg-white rounded-xl shadow-2xl w-full h-full max-w-6xl max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-zinc-200">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-amber-500" />
                <h3 className="text-lg font-semibold text-zinc-900">Step 1: Analysis</h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={runAnalysis}
                  disabled={!canAnalyze || isAnalyzing}
                  className={`
                    px-4 py-1.5 text-sm font-medium rounded-md flex items-center gap-2
                    ${canAnalyze && !isAnalyzing
                      ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                      : 'bg-zinc-100 text-zinc-400 cursor-not-allowed'
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
                  className="p-2 hover:bg-zinc-100 rounded-md transition-colors"
                  title="Minimize"
                >
                  <Minimize2 className="h-5 w-5 text-zinc-600" />
                </button>
                <button
                  onClick={() => setIsExpanded(false)}
                  className="p-2 hover:bg-zinc-100 rounded-md transition-colors"
                  title="Close"
                >
                  <X className="h-5 w-5 text-zinc-600" />
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
    <div className="flex flex-col h-full border border-zinc-200 rounded-lg bg-white">
      <div className="flex items-center justify-between p-3 border-b border-zinc-200">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-amber-500" />
          <h3 className="font-medium text-zinc-900">Step 1: Analysis</h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsExpanded(true)}
            className="p-1.5 hover:bg-zinc-100 rounded-md transition-colors"
            title="Expand"
          >
            <Maximize2 className="h-4 w-4 text-zinc-500" />
          </button>
          <button
            onClick={runAnalysis}
            disabled={!canAnalyze || isAnalyzing}
            className={`
              px-4 py-1.5 text-sm font-medium rounded-md flex items-center gap-2
              ${canAnalyze && !isAnalyzing
                ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                : 'bg-zinc-100 text-zinc-400 cursor-not-allowed'
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
