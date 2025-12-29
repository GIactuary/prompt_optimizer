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

  // Consistent button styles
  const iconBtnClass = "h-9 w-9 flex items-center justify-center rounded-md transition-colors";
  const secondaryBtnClass = "h-9 px-4 text-sm font-medium rounded-md border flex items-center justify-center gap-2 transition-colors";
  const primaryBtnClass = "h-9 px-4 text-sm font-medium rounded-md flex items-center justify-center gap-2 transition-colors";

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
            onClick={handleAcceptNewPrompt}
            className={`${secondaryBtnClass} border-green-300 text-green-700 hover:bg-green-50`}
          >
            Accept & Iterate
          </button>
          <button
            onClick={handleCopy}
            className={`${secondaryBtnClass} border-zinc-300 text-zinc-700 hover:bg-zinc-50`}
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 text-green-500" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                Copy
              </>
            )}
          </button>
        </>
      )}
      <button
        onClick={runRewrite}
        disabled={!canRewrite || isRewriting}
        className={`
          ${primaryBtnClass}
          ${canRewrite && !isRewriting
            ? 'bg-green-600 text-white hover:bg-green-700'
            : 'bg-zinc-100 text-zinc-400 cursor-not-allowed'
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
        <div className="m-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
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
            <div className="text-center space-y-1">
              <p>Requirements to rewrite:</p>
              <ul className="text-xs">
                {!improvements && <li>- Complete Step 1 (Analysis) first</li>}
                {!apiKey && <li>- API Key (sidebar)</li>}
              </ul>
            </div>
          ) : (
            'Click "Apply Improvements" to generate the new prompt'
          )}
        </div>
      )}

      {isRewriting && (
        <div className="h-full flex items-center justify-center">
          <div className="text-center space-y-2">
            <Loader2 className="h-8 w-8 animate-spin text-green-500 mx-auto" />
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
            <div className={`border border-zinc-200 rounded-lg overflow-hidden text-sm ${isExpanded ? 'max-h-[50vh] overflow-y-auto' : ''}`}>
              <ReactDiffViewer
                oldValue={currentPrompt}
                newValue={newPrompt}
                splitView={false}
                useDarkTheme={false}
                compareMethod={DiffMethod.WORDS}
                styles={{
                  contentText: {
                    fontFamily: 'ui-monospace, monospace',
                    fontSize: '0.875rem',
                    lineHeight: '1.5',
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
              <pre className={`p-4 bg-zinc-50 border border-zinc-200 rounded-lg text-sm font-mono whitespace-pre-wrap overflow-x-auto ${isExpanded ? 'max-h-[30vh]' : 'max-h-48'}`}>
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
                <PenLine className="h-5 w-5 text-green-500" />
                <h3 className="text-lg font-semibold text-zinc-900">Step 2: Rewrite</h3>
              </div>
              <div className="flex items-center gap-2">
                {actionButtons}
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

            <div className="flex-1 overflow-y-auto">
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
          <PenLine className="h-4 w-4 text-green-500" />
          <h3 className="font-medium text-zinc-900">Step 2: Rewrite</h3>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setIsExpanded(true)}
            className={`${iconBtnClass} hover:bg-zinc-100 border border-zinc-200`}
            title="Expand"
          >
            <Maximize2 className="h-4 w-4 text-zinc-500" />
          </button>
          {actionButtons}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {panelContent}
      </div>
    </div>
  );
}
