import { useState } from 'react';
import { PenLine, Loader2, Copy, Check, AlertCircle, Maximize2, Minimize2, X, Trash2 } from 'lucide-react';
import ReactDiffViewer, { DiffMethod } from 'react-diff-viewer-continued';
import { useAppStore } from '@/store/appStore';

export function RewritePanel() {
  const {
    currentPrompt,
    newPrompt,
    improvements,
    isRewriting,
    rewriteError,
    runRewrite,
    setCurrentPrompt,
    setNewPrompt,
    apiKey
  } = useAppStore();

  const [copied, setCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const canRewrite = improvements && apiKey;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(newPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAcceptNewPrompt = () => {
    setCurrentPrompt(newPrompt);
    setNewPrompt('');
  };

  const handleClear = () => {
    setNewPrompt('');
  };

  // Button styles
  const iconBtnClass = "h-9 w-9 flex items-center justify-center rounded-lg transition-colors";
  const secondaryBtnClass = "h-9 px-4 text-sm font-medium rounded-lg border flex items-center justify-center gap-2 shadow-sm hover:shadow-md active:scale-[0.98] transition-all duration-150";
  const primaryBtnClass = "h-9 px-4 text-sm font-medium rounded-lg flex items-center justify-center gap-2 shadow-sm hover:shadow-md active:scale-[0.98] transition-all duration-150";

  const actionButtons = (
    <>
      {newPrompt && (
        <>
          <button
            onClick={handleClear}
            className={`${iconBtnClass} hover:bg-red-50 border border-zinc-200`}
            title="Clear"
          >
            <Trash2 className="h-4 w-4 text-red-500" />
          </button>
          <button
            onClick={handleCopy}
            className={`${iconBtnClass} border border-zinc-200 hover:bg-zinc-50`}
            title={copied ? "Copied!" : "Copy to clipboard"}
          >
            {copied ? (
              <Check className="h-4 w-4 text-green-500 animate-checkmark" />
            ) : (
              <Copy className="h-4 w-4 text-zinc-500" />
            )}
          </button>
          <button
            onClick={handleAcceptNewPrompt}
            className={`${secondaryBtnClass} border-indigo-300 text-indigo-700 hover:bg-indigo-50`}
          >
            Accept & Iterate
          </button>
        </>
      )}
      <button
        onClick={runRewrite}
        disabled={!canRewrite || isRewriting}
        className={`
          ${primaryBtnClass}
          ${canRewrite && !isRewriting
            ? 'bg-indigo-500 text-white hover:bg-indigo-600'
            : 'bg-zinc-100 text-zinc-400 cursor-not-allowed shadow-none'
          }
        `}
      >
        {isRewriting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Rewriting...
          </>
        ) : (
          'Apply Improvements'
        )}
      </button>
    </>
  );

  const panelContent = (
    <>
      {rewriteError && (
        <div className="m-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2">
          <AlertCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-red-700">
            <p className="font-medium">Rewrite failed</p>
            <p className="text-red-600">{rewriteError}</p>
          </div>
        </div>
      )}

      {!newPrompt && !isRewriting && !rewriteError && (
        <div className="h-full flex items-center justify-center text-zinc-400 text-sm p-4">
          {!canRewrite ? (
            <div className="text-center space-y-2">
              <p className="font-medium">Requirements to rewrite:</p>
              <ul className="text-xs space-y-1">
                {!improvements && <li className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-zinc-300" />Complete Step 1 (Analysis) first</li>}
                {!apiKey && <li className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-zinc-300" />API Key (sidebar)</li>}
              </ul>
            </div>
          ) : (
            <span className="text-zinc-500">Click "Apply Improvements" to generate the new prompt</span>
          )}
        </div>
      )}

      {isRewriting && (
        <div className="h-full flex items-center justify-center">
          <div className="text-center space-y-4">
            {/* Skeleton loading */}
            <div className="space-y-3 animate-pulse w-64">
              <div className="h-4 bg-indigo-100 rounded-full w-full" />
              <div className="h-4 bg-indigo-100 rounded-full w-5/6" />
              <div className="h-4 bg-indigo-100 rounded-full w-4/5" />
              <div className="h-4 bg-indigo-100 rounded-full w-3/4" />
            </div>
            <p className="text-sm text-zinc-500">Rewriting your prompt...</p>
          </div>
        </div>
      )}

      {newPrompt && !isRewriting && (
        <div className={`p-4 space-y-4 ${isExpanded ? 'p-6' : ''}`}>
          {/* Inline Diff View */}
          <div>
            <h4 className="text-sm font-medium text-zinc-700 mb-2">
              Changes (Inline Diff)
            </h4>
            <div className={`border border-zinc-200 rounded-xl overflow-hidden text-sm shadow-sm ${isExpanded ? 'max-h-[50vh] overflow-y-auto' : ''}`}>
              <ReactDiffViewer
                oldValue={currentPrompt}
                newValue={newPrompt}
                splitView={false}
                useDarkTheme={false}
                compareMethod={DiffMethod.WORDS}
                styles={{
                  contentText: {
                    fontFamily: "'JetBrains Mono', ui-monospace, monospace",
                    fontSize: '0.875rem',
                    lineHeight: '1.6',
                  },
                  diffContainer: {
                    borderRadius: '0.75rem',
                  },
                }}
              />
            </div>
          </div>

          {/* New Prompt (Copyable) */}
          <div>
            <h4 className="text-sm font-medium text-zinc-700 mb-2">
              New Prompt (Ready to Copy)
            </h4>
            <div className="relative">
              <pre className={`p-4 bg-indigo-50/50 border border-indigo-200 rounded-xl text-sm font-mono whitespace-pre-wrap overflow-x-auto shadow-sm ${isExpanded ? 'max-h-[30vh]' : 'max-h-48'}`}>
                {newPrompt}
              </pre>
            </div>
          </div>
        </div>
      )}
    </>
  );

  // Fullscreen overlay
  if (isExpanded) {
    return (
      <>
        {/* Placeholder to maintain grid layout */}
        <div className="flex flex-col h-full border border-zinc-200 rounded-xl bg-zinc-100/50 border-l-4 border-l-indigo-400">
          <div className="flex items-center justify-center h-full text-zinc-400 text-sm">
            Panel expanded - click minimize to return
          </div>
        </div>

        {/* Fullscreen overlay */}
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-6">
          <div className="bg-white rounded-2xl shadow-2xl w-full h-full max-w-6xl max-h-[90vh] flex flex-col border-l-4 border-l-indigo-400 overflow-hidden">
            {/* Progress bar when loading */}
            {isRewriting && (
              <div className="absolute top-0 left-0 right-0 h-1 bg-indigo-100 overflow-hidden">
                <div className="h-full bg-indigo-500 animate-progress" />
              </div>
            )}

            <div className="flex items-center justify-between p-4 border-b border-zinc-200 bg-gradient-to-r from-indigo-50/50 to-white">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-indigo-100">
                  <PenLine className="h-5 w-5 text-indigo-600" />
                </div>
                <h3 className="text-lg font-semibold text-zinc-900">Step 2: Rewrite</h3>
              </div>
              <div className="flex items-center gap-2">
                {actionButtons}
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
    <div className="flex flex-col h-full border border-zinc-200 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow duration-200 border-l-4 border-l-indigo-400 overflow-hidden relative">
      {/* Progress bar when loading */}
      {isRewriting && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-indigo-100 overflow-hidden">
          <div className="h-full bg-indigo-500 animate-progress" />
        </div>
      )}

      <div className="flex items-center justify-between p-3 border-b border-zinc-200 bg-gradient-to-r from-indigo-50/50 to-white">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-indigo-100">
            <PenLine className="h-4 w-4 text-indigo-600" />
          </div>
          <h3 className="font-semibold text-zinc-900">Step 2: Rewrite</h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsExpanded(true)}
            className="p-2 hover:bg-zinc-100 rounded-lg transition-colors"
            title="Expand"
          >
            <Maximize2 className="h-4 w-4 text-zinc-500" />
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
