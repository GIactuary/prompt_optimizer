import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { callLLM } from '@/services/openrouter';
import {
  ANALYSIS_SYSTEM_PROMPT,
  buildAnalysisUserPrompt,
  REWRITE_SYSTEM_PROMPT,
  buildRewriteUserPrompt,
  buildTestMessages,
} from '@/services/prompts';

// Strip markdown code blocks from LLM response
function stripMarkdownCodeBlocks(text: string): string {
  // Remove ```language\n...\n``` or ```\n...\n```
  const codeBlockRegex = /^```(?:\w+)?\n?([\s\S]*?)\n?```$/;
  const match = text.trim().match(codeBlockRegex);
  if (match) {
    return match[1].trim();
  }
  return text.trim();
}

interface AppState {
  // UI
  darkMode: boolean;

  // Configuration
  goal: string;
  role: string;
  modelName: string;
  temperature: number;
  apiKey: string;

  // Inputs
  currentPrompt: string;
  inputVariables: string;
  currentOutput: string;

  // Analysis
  improvements: string;
  isAnalyzing: boolean;
  analysisError: string | null;

  // Rewrite
  newPrompt: string;
  isRewriting: boolean;
  rewriteError: string | null;

  // Test
  testOutput: string;
  isTesting: boolean;
  testError: string | null;

  // Actions
  setDarkMode: (darkMode: boolean) => void;
  toggleDarkMode: () => void;
  setGoal: (goal: string) => void;
  setRole: (role: string) => void;
  setModelName: (model: string) => void;
  setTemperature: (temp: number) => void;
  setApiKey: (key: string) => void;
  setCurrentPrompt: (prompt: string) => void;
  setInputVariables: (vars: string) => void;
  setCurrentOutput: (output: string) => void;
  setImprovements: (improvements: string) => void;
  setNewPrompt: (prompt: string) => void;
  setTestOutput: (output: string) => void;
  setIsAnalyzing: (isAnalyzing: boolean) => void;
  setIsRewriting: (isRewriting: boolean) => void;
  setIsTesting: (isTesting: boolean) => void;
  setAnalysisError: (error: string | null) => void;
  setRewriteError: (error: string | null) => void;
  setTestError: (error: string | null) => void;
  clearErrors: () => void;
  runAnalysis: () => Promise<void>;
  runRewrite: () => Promise<void>;
  runTest: () => Promise<void>;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Initial state
      darkMode: false,
      goal: '',
      role: '',
      modelName: 'anthropic/claude-sonnet-4-20250514',
      temperature: 0.3,
      apiKey: '',
      currentPrompt: '',
      inputVariables: '',
      currentOutput: '',
      improvements: '',
      isAnalyzing: false,
      analysisError: null,
      newPrompt: '',
      isRewriting: false,
      rewriteError: null,
      testOutput: '',
      isTesting: false,
      testError: null,

      // Setters
      setDarkMode: (darkMode) => set({ darkMode }),
      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
      setGoal: (goal) => set({ goal }),
      setRole: (role) => set({ role }),
      setModelName: (model) => set({ modelName: model }),
      setTemperature: (temp) => set({ temperature: temp }),
      setApiKey: (key) => set({ apiKey: key }),
      setCurrentPrompt: (prompt) => set({ currentPrompt: prompt }),
      setInputVariables: (vars) => set({ inputVariables: vars }),
      setCurrentOutput: (output) => set({ currentOutput: output }),
      setImprovements: (improvements) => set({ improvements }),
      setNewPrompt: (prompt) => set({ newPrompt: prompt }),
      setTestOutput: (output) => set({ testOutput: output }),
      setIsAnalyzing: (isAnalyzing) => set({ isAnalyzing }),
      setIsRewriting: (isRewriting) => set({ isRewriting }),
      setIsTesting: (isTesting) => set({ isTesting }),
      setAnalysisError: (error) => set({ analysisError: error }),
      setRewriteError: (error) => set({ rewriteError: error }),
      setTestError: (error) => set({ testError: error }),
      clearErrors: () => set({
        analysisError: null,
        rewriteError: null,
        testError: null
      }),

      // Analysis action
      runAnalysis: async () => {
        const state = get();
        set({ isAnalyzing: true, analysisError: null });

        try {
          const response = await callLLM(
            {
              modelName: state.modelName,
              temperature: state.temperature,
              apiKey: state.apiKey,
            },
            ANALYSIS_SYSTEM_PROMPT,
            buildAnalysisUserPrompt({
              goal: state.goal,
              role: state.role,
              currentPrompt: state.currentPrompt,
              inputVariables: state.inputVariables,
              currentOutput: state.currentOutput,
            })
          );

          set({ improvements: response.content, isAnalyzing: false });
        } catch (error: unknown) {
          const errorMessage = error instanceof Error ? error.message : 'Analysis failed';
          set({
            analysisError: errorMessage,
            isAnalyzing: false
          });
        }
      },

      // Rewrite action
      runRewrite: async () => {
        const state = get();
        set({ isRewriting: true, rewriteError: null });

        try {
          const response = await callLLM(
            {
              modelName: state.modelName,
              temperature: state.temperature,
              apiKey: state.apiKey,
            },
            REWRITE_SYSTEM_PROMPT,
            buildRewriteUserPrompt({
              currentPrompt: state.currentPrompt,
              improvements: state.improvements,
              inputVariables: state.inputVariables,
            })
          );

          set({ newPrompt: stripMarkdownCodeBlocks(response.content), isRewriting: false });
        } catch (error: unknown) {
          const errorMessage = error instanceof Error ? error.message : 'Rewrite failed';
          set({
            rewriteError: errorMessage,
            isRewriting: false
          });
        }
      },

      // Test action
      runTest: async () => {
        const state = get();
        set({ isTesting: true, testError: null });

        try {
          // Current Prompt = instructions (system), Input Variables = data (user)
          const { systemPrompt, userMessage } = buildTestMessages({
            prompt: state.currentPrompt,
            inputVariables: state.inputVariables,
          });

          const response = await callLLM(
            {
              modelName: state.modelName,
              temperature: state.temperature,
              apiKey: state.apiKey,
            },
            systemPrompt,
            userMessage
          );

          set({ testOutput: response.content, isTesting: false });
        } catch (error: unknown) {
          const errorMessage = error instanceof Error ? error.message : 'Test failed';
          set({
            testError: errorMessage,
            isTesting: false
          });
        }
      },
    }),
    {
      name: 'prompt-optimizer-storage',
      // Only persist these fields (not loading states or errors)
      partialize: (state) => ({
        darkMode: state.darkMode,
        goal: state.goal,
        role: state.role,
        modelName: state.modelName,
        temperature: state.temperature,
        apiKey: state.apiKey,
        currentPrompt: state.currentPrompt,
        inputVariables: state.inputVariables,
        currentOutput: state.currentOutput,
        improvements: state.improvements,
        newPrompt: state.newPrompt,
        testOutput: state.testOutput,
      }),
    }
  )
);
