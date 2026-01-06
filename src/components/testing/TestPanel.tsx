import { useState } from 'react';
import { Play, Loader2, Copy, Check, AlertCircle, Eye, Maximize2, Minimize2, X } from 'lucide-react';
import { useAppStore } from '@/store/appStore';

export function TestPanel() {
  const {
    currentPrompt,
    inputVariables,
    testOutput,
    isTesting,
    testError,
    runTest,
    setCurrentOutput,
    apiKey
  } = useAppStore();

  const [copied, setCopied] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const canTest = currentPrompt && apiKey;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(testOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleUseAsCurrentOutput = () => {
    setCurrentOutput(testOutput);
  };

  // Preview what will be sent to LLM
  const getPreview = () => {
    return {
      system: currentPrompt,
      user: inputVariables || '{}',
    };
  };

  // Button styles
  const iconBtnClass = "h-9 w-9 flex items-center justify-center rounded-lg transition-colors flex-shrink-0";
  const secondaryBtnClass = "h-9 px-4 text-sm font-medium rounded-lg border flex items-center justify-center gap-2 shadow-sm hover:shadow-md active:scale-[0.98] transition-all duration-150 whitespace-nowrap flex-shrink-0";
  const primaryBtnClass = "h-9 px-4 text-sm font-medium rounded-lg flex items-center justify-center gap-2 shadow-sm hover:shadow-md active:scale-[0.98] transition-all duration-150 whitespace-nowrap flex-shrink-0";

  const actionButtons = (
    <>
      {currentPrompt && (
        <button
          onClick={() => setShowPreview(!showPreview)}
          className={`${iconBtnClass} border ${
            showPreview
              ? 'border-emerald-300 dark:border-emerald-500 text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30'
              : 'border-zinc-200 dark:border-zinc-600 text-zinc-500 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-700'
          }`}
          title={showPreview ? "Hide preview" : "Preview prompt"}
        >
          <Eye className="h-4 w-4" />
        </button>
      )}
      {testOutput && (
        <button
          onClick={handleCopy}
          className={`${iconBtnClass} border border-zinc-200 dark:border-zinc-600 hover:bg-zinc-50 dark:hover:bg-zinc-700`}
          title={copied ? "Copied!" : "Copy to clipboard"}
        >
          {copied ? (
            <Check className="h-4 w-4 text-emerald-500 animate-checkmark" />
          ) : (
            <Copy className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
          )}
        </button>
      )}
      {testOutput && (
        <button
          onClick={handleUseAsCurrentOutput}
          className={`${secondaryBtnClass} border-emerald-300 dark:border-emerald-500 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/30`}
        >
          Use as Output
        </button>
      )}
      <button
        onClick={runTest}
        disabled={!canTest || isTesting}
        className={`
          ${primaryBtnClass}
          ${canTest && !isTesting
            ? 'bg-emerald-500 text-white hover:bg-emerald-600'
            : 'bg-zinc-200 dark:bg-zinc-700 text-zinc-400 cursor-not-allowed shadow-none'
          }
        `}
      >
        {isTesting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Testing...
          </>
        ) : (
          'Run Test'
        )}
      </button>
    </>
  );

  const panelContent = (
    <>
      {testError && (
        <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl flex items-start gap-2">
          <AlertCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-red-700 dark:text-red-400">
            <p className="font-medium">Test failed</p>
            <p className="text-red-600 dark:text-red-500">{testError}</p>
          </div>
        </div>
      )}

      {showPreview && currentPrompt && (
        <div className="mb-4 space-y-3">
          <div>
            <h4 className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
              System Message (Instructions)
            </h4>
            <pre className={`p-4 bg-blue-50/50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl text-sm font-mono whitespace-pre-wrap overflow-x-auto shadow-sm text-zinc-900 dark:text-zinc-100 ${isExpanded ? 'max-h-[30vh]' : 'max-h-32'}`}>
              {getPreview().system}
            </pre>
          </div>
          <div>
            <h4 className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
              User Message (Input Data)
            </h4>
            <pre className={`p-4 bg-emerald-50/50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl text-sm font-mono whitespace-pre-wrap overflow-x-auto shadow-sm text-zinc-900 dark:text-zinc-100 ${isExpanded ? 'max-h-[30vh]' : 'max-h-32'}`}>
              {getPreview().user}
            </pre>
          </div>
        </div>
      )}

      {!testOutput && !isTesting && !testError && !showPreview && (
        <div className="h-full flex items-center justify-center text-zinc-400 text-sm">
          {!canTest ? (
            <div className="text-center space-y-2">
              <p className="font-medium">Requirements to test:</p>
              <ul className="text-xs space-y-1">
                {!currentPrompt && <li className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-zinc-300 dark:bg-zinc-600" />Add a prompt in Current Prompt</li>}
                {!apiKey && <li className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-zinc-300 dark:bg-zinc-600" />API Key (sidebar)</li>}
              </ul>
            </div>
          ) : (
            <span className="text-zinc-500 dark:text-zinc-400">Click "Run Test" to see the output</span>
          )}
        </div>
      )}

      {isTesting && (
        <div className="h-full flex items-center justify-center">
          <div className="text-center space-y-4">
            {/* Skeleton loading */}
            <div className="space-y-3 animate-pulse w-64">
              <div className="h-4 bg-emerald-100 dark:bg-emerald-900/50 rounded-full w-full" />
              <div className="h-4 bg-emerald-100 dark:bg-emerald-900/50 rounded-full w-4/5" />
              <div className="h-4 bg-emerald-100 dark:bg-emerald-900/50 rounded-full w-5/6" />
              <div className="h-4 bg-emerald-100 dark:bg-emerald-900/50 rounded-full w-2/3" />
            </div>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">Running test...</p>
          </div>
        </div>
      )}

      {testOutput && !isTesting && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Test Output
          </h4>
          <pre className={`p-4 bg-emerald-50/50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl text-sm font-mono whitespace-pre-wrap overflow-x-auto shadow-sm text-zinc-900 dark:text-zinc-100 ${isExpanded ? 'max-h-[60vh]' : 'max-h-64'}`}>
            {testOutput}
          </pre>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Click "Use as Output" to copy this to Current Output for the next iteration.
          </p>
        </div>
      )}
    </>
  );

  // Fullscreen overlay
  if (isExpanded) {
    return (
      <>
        {/* Placeholder to maintain grid layout */}
        <div className="flex flex-col h-full border border-zinc-200 dark:border-zinc-700 rounded-xl bg-zinc-100/50 dark:bg-zinc-800/50 border-l-4 border-l-emerald-400">
          <div className="flex items-center justify-center h-full text-zinc-400 text-sm">
            Panel expanded - click minimize to return
          </div>
        </div>

        {/* Fullscreen overlay */}
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-6">
          <div className="bg-white dark:bg-zinc-800 rounded-2xl shadow-2xl w-full h-full max-w-6xl max-h-[90vh] flex flex-col border-l-4 border-l-emerald-400 overflow-hidden">
            {/* Progress bar when loading */}
            {isTesting && (
              <div className="absolute top-0 left-0 right-0 h-1 bg-emerald-100 dark:bg-emerald-900/50 overflow-hidden">
                <div className="h-full bg-emerald-500 animate-progress" />
              </div>
            )}

            <div className="flex items-center justify-between p-4 border-b border-zinc-200 dark:border-zinc-700 bg-gradient-to-r from-emerald-50/50 to-white dark:from-emerald-900/20 dark:to-zinc-800">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-900/50">
                  <Play className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Step 3: Test</h3>
              </div>
              <div className="flex items-center gap-2">
                {actionButtons}
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
              {panelContent}
            </div>
          </div>
        </div>
      </>
    );
  }

  // Normal view
  return (
    <div className="flex flex-col h-full border border-zinc-200 dark:border-zinc-700 rounded-xl bg-white dark:bg-zinc-800 shadow-sm hover:shadow-md transition-shadow duration-200 border-l-4 border-l-emerald-400 overflow-hidden relative">
      {/* Progress bar when loading */}
      {isTesting && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-emerald-100 dark:bg-emerald-900/50 overflow-hidden">
          <div className="h-full bg-emerald-500 animate-progress" />
        </div>
      )}

      <div className="flex items-center justify-between p-3 border-b border-zinc-200 dark:border-zinc-700 bg-gradient-to-r from-emerald-50/50 to-white dark:from-emerald-900/20 dark:to-zinc-800">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-900/50">
            <Play className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">Step 3: Test</h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsExpanded(true)}
            className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded-lg transition-colors"
            title="Expand"
          >
            <Maximize2 className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
          </button>
          {actionButtons}
        </div>
      </div>

      <div className="flex-1 p-4 overflow-y-auto">
        {panelContent}
      </div>
    </div>
  );
}
