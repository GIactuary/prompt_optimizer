import { useState } from 'react';
import { ChevronDown, ChevronRight, Sparkles, PenLine, RotateCcw } from 'lucide-react';
import { useAppStore } from '@/store/appStore';
import { ANALYSIS_SYSTEM_PROMPT, REWRITE_SYSTEM_PROMPT } from '@/services/prompts';

export function SystemPromptsInput() {
  const {
    analysisSystemPrompt,
    rewriteSystemPrompt,
    setAnalysisSystemPrompt,
    setRewriteSystemPrompt
  } = useAppStore();

  const [isAnalysisExpanded, setIsAnalysisExpanded] = useState(false);
  const [isRewriteExpanded, setIsRewriteExpanded] = useState(false);

  const handleResetAnalysis = () => {
    setAnalysisSystemPrompt(ANALYSIS_SYSTEM_PROMPT);
  };

  const handleResetRewrite = () => {
    setRewriteSystemPrompt(REWRITE_SYSTEM_PROMPT);
  };

  return (
    <div className="space-y-3">
      {/* Step 1: Analysis System Prompt */}
      <div className="space-y-2">
        <button
          onClick={() => setIsAnalysisExpanded(!isAnalysisExpanded)}
          className="w-full flex items-center justify-between text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
        >
          <div className="flex items-center gap-2">
            {isAnalysisExpanded ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
            <Sparkles className="h-3.5 w-3.5 text-amber-500" />
            <span>Step 1 System Prompt</span>
          </div>
          {analysisSystemPrompt !== ANALYSIS_SYSTEM_PROMPT && (
            <span className="text-xs text-amber-500 font-normal">Modified</span>
          )}
        </button>

        {isAnalysisExpanded && (
          <div className="space-y-2">
            <textarea
              value={analysisSystemPrompt}
              onChange={(e) => setAnalysisSystemPrompt(e.target.value)}
              className="w-full h-40 p-3 text-xs border border-zinc-200 dark:border-zinc-600 rounded-xl resize-none
                bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500
                transition-all duration-200 font-mono leading-relaxed
                hover:border-zinc-300 dark:hover:border-zinc-500 hover:shadow
                focus:ring-2 focus:ring-offset-2 focus:ring-amber-500/50 focus:border-amber-300 dark:focus:border-amber-500 focus:outline-none
                dark:focus:ring-offset-zinc-800"
            />
            {analysisSystemPrompt !== ANALYSIS_SYSTEM_PROMPT && (
              <button
                onClick={handleResetAnalysis}
                className="flex items-center gap-1 text-xs text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 transition-colors"
              >
                <RotateCcw className="h-3 w-3" />
                Reset to default
              </button>
            )}
          </div>
        )}
      </div>

      {/* Step 2: Rewrite System Prompt */}
      <div className="space-y-2">
        <button
          onClick={() => setIsRewriteExpanded(!isRewriteExpanded)}
          className="w-full flex items-center justify-between text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
        >
          <div className="flex items-center gap-2">
            {isRewriteExpanded ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
            <PenLine className="h-3.5 w-3.5 text-indigo-500" />
            <span>Step 2 System Prompt</span>
          </div>
          {rewriteSystemPrompt !== REWRITE_SYSTEM_PROMPT && (
            <span className="text-xs text-indigo-500 font-normal">Modified</span>
          )}
        </button>

        {isRewriteExpanded && (
          <div className="space-y-2">
            <textarea
              value={rewriteSystemPrompt}
              onChange={(e) => setRewriteSystemPrompt(e.target.value)}
              className="w-full h-40 p-3 text-xs border border-zinc-200 dark:border-zinc-600 rounded-xl resize-none
                bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500
                transition-all duration-200 font-mono leading-relaxed
                hover:border-zinc-300 dark:hover:border-zinc-500 hover:shadow
                focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500/50 focus:border-indigo-300 dark:focus:border-indigo-500 focus:outline-none
                dark:focus:ring-offset-zinc-800"
            />
            {rewriteSystemPrompt !== REWRITE_SYSTEM_PROMPT && (
              <button
                onClick={handleResetRewrite}
                className="flex items-center gap-1 text-xs text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
              >
                <RotateCcw className="h-3 w-3" />
                Reset to default
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
