import { useState } from 'react';
import { Play, Loader2, Copy, Check, AlertCircle, Eye } from 'lucide-react';
import { useAppStore } from '@/store/appStore';

export function TestPanel() {
  const {
    newPrompt,
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

  const canTest = newPrompt && apiKey;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(testOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleUseAsCurrentOutput = () => {
    setCurrentOutput(testOutput);
  };

  // Get the processed prompt with variables substituted
  const getProcessedPrompt = () => {
    let processedPrompt = newPrompt;

    try {
      const variables = JSON.parse(inputVariables || '{}');
      for (const [key, value] of Object.entries(variables)) {
        const regex = new RegExp(`\\{\\{${key}\\}\\}|\\{${key}\\}`, 'g');
        processedPrompt = processedPrompt.replace(regex, String(value));
      }
    } catch {
      // If JSON parsing fails, use prompt as-is
    }

    return processedPrompt;
  };

  return (
    <div className="flex flex-col h-full border border-zinc-200 rounded-lg bg-white">
      <div className="flex items-center justify-between p-3 border-b border-zinc-200">
        <div className="flex items-center gap-2">
          <Play className="h-4 w-4 text-blue-500" />
          <h3 className="font-medium text-zinc-900">Step 3: Test</h3>
        </div>
        <div className="flex items-center gap-2">
          {newPrompt && (
            <button
              onClick={() => setShowPreview(!showPreview)}
              className={`px-3 py-1.5 text-sm font-medium rounded-md border flex items-center gap-2 ${
                showPreview
                  ? 'border-blue-300 text-blue-700 bg-blue-50'
                  : 'border-zinc-300 hover:bg-zinc-50'
              }`}
            >
              <Eye className="h-4 w-4" />
              Preview
            </button>
          )}
          {testOutput && (
            <>
              <button
                onClick={handleUseAsCurrentOutput}
                className="px-3 py-1.5 text-sm font-medium rounded-md border border-blue-300 text-blue-700 hover:bg-blue-50 flex items-center gap-2"
              >
                Use as Output
              </button>
              <button
                onClick={handleCopy}
                className="px-3 py-1.5 text-sm font-medium rounded-md border border-zinc-300 hover:bg-zinc-50 flex items-center gap-2"
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
            onClick={runTest}
            disabled={!canTest || isTesting}
            className={`
              px-4 py-1.5 text-sm font-medium rounded-md flex items-center gap-2
              ${canTest && !isTesting
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-zinc-100 text-zinc-400 cursor-not-allowed'
              }
            `}
          >
            {isTesting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Testing...
              </>
            ) : (
              'Test New Prompt'
            )}
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {testError && (
          <div className="m-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
            <AlertCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-red-700">
              <p className="font-medium">Test failed</p>
              <p className="text-red-600">{testError}</p>
            </div>
          </div>
        )}

        {showPreview && newPrompt && (
          <div className="m-4 mb-0">
            <h4 className="text-sm font-medium text-zinc-700 mb-2">
              Prompt Preview (with variables substituted)
            </h4>
            <pre className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm font-mono whitespace-pre-wrap overflow-x-auto max-h-40">
              {getProcessedPrompt()}
            </pre>
          </div>
        )}

        {!testOutput && !isTesting && !testError && !showPreview && (
          <div className="h-full flex items-center justify-center text-zinc-400 text-sm p-4">
            {!canTest ? (
              <div className="text-center space-y-1">
                <p>Requirements to test:</p>
                <ul className="text-xs">
                  {!newPrompt && <li>- Complete Step 2 (Rewrite) first</li>}
                  {!apiKey && <li>- API Key (sidebar)</li>}
                </ul>
              </div>
            ) : (
              'Click "Test New Prompt" to see the output'
            )}
          </div>
        )}

        {isTesting && (
          <div className="h-full flex items-center justify-center">
            <div className="text-center space-y-2">
              <Loader2 className="h-8 w-8 animate-spin text-blue-500 mx-auto" />
              <p className="text-sm text-zinc-500">Running test...</p>
            </div>
          </div>
        )}

        {testOutput && !isTesting && (
          <div className="p-4 space-y-2">
            <h4 className="text-sm font-medium text-zinc-700">
              Test Output
            </h4>
            <pre className="p-4 bg-zinc-50 border border-zinc-200 rounded-lg text-sm font-mono whitespace-pre-wrap overflow-x-auto max-h-64">
              {testOutput}
            </pre>
            <p className="text-xs text-zinc-500">
              Click "Use as Output" to copy this to Current Output for the next iteration.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
