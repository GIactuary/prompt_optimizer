# Prompt Optimizer App - Implementation Specification

**Version:** 1.0  
**Last Updated:** December 2025  
**Target Audience:** LLM/Developer implementing this application

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Tech Stack Specification](#2-tech-stack-specification)
3. [Application Architecture](#3-application-architecture)
4. [Phase 1: Project Setup & Foundation](#phase-1-project-setup--foundation)
5. [Phase 2: UI Layout & Components](#phase-2-ui-layout--components)
6. [Phase 3: LLM Integration Layer](#phase-3-llm-integration-layer)
7. [Phase 4: Analysis Engine (Step 1)](#phase-4-analysis-engine-step-1)
8. [Phase 5: Prompt Rewriter (Step 2)](#phase-5-prompt-rewriter-step-2)
9. [Phase 6: Testing & Validation](#phase-6-testing--validation)
10. [Phase 7: Polish & Enhancements](#phase-7-polish--enhancements)
11. [Data Flow Diagrams](#data-flow-diagrams)
12. [API Contracts](#api-contracts)
13. [Recommended Improvements](#recommended-improvements)

---

## 1. Executive Summary

### Purpose
Build a web-based Prompt Optimizer application that helps users iteratively improve LLM prompts through a two-step AI-assisted workflow:

1. **Analysis Step**: Analyze the current prompt and its output against a defined goal, generating actionable improvement suggestions
2. **Rewrite Step**: Apply accepted improvements to generate an optimized prompt with inline diff visualization

### Core Value Proposition
- Systematic prompt improvement with clear goal alignment
- Human-in-the-loop editing of improvement suggestions
- Visual diff comparison between old and new prompts
- Test-run capability to validate improvements
- Persistent inputs across browser sessions

---

## 2. Tech Stack Specification

### Frontend Framework
```
React 19 + TypeScript + Vite
```
**Rationale**: Vite provides significantly faster HMR and build times compared to CRA. React 19 offers the latest concurrent features and improved performance.

### Styling
```
Tailwind CSS v4.x + @tailwindcss/vite plugin
```
**Installation (2025 method)**:
```bash
npm install tailwindcss @tailwindcss/vite
```

**vite.config.ts**:
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

**src/index.css**:
```css
@import "tailwindcss";
```

### UI Components
```
shadcn/ui
```
**Rationale**: Provides accessible, customizable components that work seamlessly with Tailwind CSS.

### State Management
```
Zustand v4.x
```
**Rationale**: Lightweight, TypeScript-friendly, minimal boilerplate compared to Redux.

### Diff Visualization
```
react-diff-viewer-continued v3.x
```
**Features**: Inline diff view, word-level diffing, syntax highlighting support.

**Installation**:
```bash
npm install react-diff-viewer-continued
```

### LLM Integration
```
OpenRouter via OpenAI SDK pattern
```
**Installation**:
```bash
npm install openai
```

### Local Storage
```
Native localStorage API with custom hook
```
**Purpose**: Persist all input values across browser sessions/refreshes.

### Complete Package.json Dependencies
```json
{
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "openai": "^4.x.x",
    "react-diff-viewer-continued": "^3.4.0",
    "zustand": "^4.x.x",
    "lucide-react": "^0.x.x"
  },
  "devDependencies": {
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "@vitejs/plugin-react": "^4.x.x",
    "tailwindcss": "^4.x.x",
    "@tailwindcss/vite": "^4.x.x",
    "typescript": "^5.x.x",
    "vite": "^6.x.x"
  }
}
```

---

## 3. Application Architecture

### High-Level Component Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx
│   │   └── MainContent.tsx
│   ├── inputs/
│   │   ├── GoalInput.tsx
│   │   ├── RoleInput.tsx
│   │   ├── PromptInput.tsx
│   │   ├── VariablesInput.tsx
│   │   ├── OutputInput.tsx
│   │   ├── ModelSelector.tsx
│   │   └── TemperatureInput.tsx
│   ├── analysis/
│   │   ├── AnalysisPanel.tsx
│   │   ├── ImprovementEditor.tsx
│   │   └── AnalyzeButton.tsx
│   ├── rewrite/
│   │   ├── RewritePanel.tsx
│   │   ├── DiffViewer.tsx
│   │   ├── NewPromptDisplay.tsx
│   │   └── RewriteButton.tsx
│   ├── testing/
│   │   ├── TestPanel.tsx
│   │   └── TestResultDisplay.tsx
│   └── ui/
│       └── (shadcn components)
├── hooks/
│   ├── useLocalStorage.ts
│   ├── useLLM.ts
│   └── useAnalysis.ts
├── store/
│   └── appStore.ts
├── services/
│   ├── openrouter.ts
│   └── prompts.ts
├── types/
│   └── index.ts
├── utils/
│   └── helpers.ts
├── App.tsx
├── main.tsx
└── index.css
```

### State Shape (Zustand Store)

```typescript
interface AppState {
  // Configuration Inputs (updated less often)
  goal: string;
  role: string;
  modelName: string;
  temperature: number;
  apiKey: string;
  
  // Dynamic Inputs (main workspace)
  currentPrompt: string;
  inputVariables: string; // JSON string
  currentOutput: string;
  
  // Analysis Results
  improvements: string;
  isAnalyzing: boolean;
  
  // Rewrite Results
  newPrompt: string;
  isRewriting: boolean;
  
  // Test Results
  testOutput: string;
  isTesting: boolean;
  
  // Actions
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
  runAnalysis: () => Promise<void>;
  runRewrite: () => Promise<void>;
  runTest: () => Promise<void>;
}
```

---

## Phase 1: Project Setup & Foundation

### Step 1.1: Initialize Project

```bash
# Create Vite project with React + TypeScript
npm create vite@latest prompt-optimizer -- --template react-ts
cd prompt-optimizer
npm install
```

### Step 1.2: Install Dependencies

```bash
# Core dependencies
npm install openai react-diff-viewer-continued zustand lucide-react

# Tailwind CSS (2025 method)
npm install tailwindcss @tailwindcss/vite

# shadcn/ui setup
npx shadcn@latest init
```

### Step 1.3: Configure Vite

**vite.config.ts**:
```typescript
import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
```

### Step 1.4: Configure TypeScript Paths

**tsconfig.json** (add to compilerOptions):
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### Step 1.5: Setup Index CSS

**src/index.css**:
```css
@import "tailwindcss";
```

### Step 1.6: Create Type Definitions

**src/types/index.ts**:
```typescript
export interface InputVariables {
  [key: string]: string | number | boolean;
}

export interface AnalysisResult {
  improvements: string;
  timestamp: Date;
}

export interface RewriteResult {
  oldPrompt: string;
  newPrompt: string;
  timestamp: Date;
}

export interface LLMConfig {
  modelName: string;
  temperature: number;
  apiKey: string;
}

export interface LLMResponse {
  content: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}
```

---

## Phase 2: UI Layout & Components

### Step 2.1: Create Layout Structure

The layout should follow this design:
- **Left Sidebar (Collapsible)**: Goal, Role, Model Config, API Key
- **Main Content Area**:
  - **Top Half**: Current Prompt (left) | Input Variables + Current Output (right)
  - **Bottom Half**: Analysis/Improvements Panel → Rewrite/Diff Panel → Test Panel

### Step 2.2: Implement Header Component

**src/components/layout/Header.tsx**:
```typescript
import { Wand2 } from 'lucide-react';

export function Header() {
  return (
    <header className="h-14 border-b border-zinc-200 bg-white px-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Wand2 className="h-6 w-6 text-indigo-600" />
        <h1 className="text-xl font-semibold text-zinc-900">Prompt Optimizer</h1>
      </div>
    </header>
  );
}
```

### Step 2.3: Implement Collapsible Sidebar

**src/components/layout/Sidebar.tsx**:
```typescript
import { useState } from 'react';
import { ChevronLeft, ChevronRight, Settings } from 'lucide-react';
import { GoalInput } from '../inputs/GoalInput';
import { RoleInput } from '../inputs/RoleInput';
import { ModelSelector } from '../inputs/ModelSelector';
import { TemperatureInput } from '../inputs/TemperatureInput';
import { ApiKeyInput } from '../inputs/ApiKeyInput';

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside 
      className={`
        border-r border-zinc-200 bg-zinc-50 transition-all duration-300
        ${isCollapsed ? 'w-12' : 'w-80'}
      `}
    >
      <div className="p-3 border-b border-zinc-200 flex items-center justify-between">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <Settings className="h-4 w-4 text-zinc-500" />
            <span className="text-sm font-medium text-zinc-700">Configuration</span>
          </div>
        )}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1 hover:bg-zinc-200 rounded"
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </button>
      </div>
      
      {!isCollapsed && (
        <div className="p-4 space-y-4 overflow-y-auto h-[calc(100vh-8rem)]">
          <GoalInput />
          <RoleInput />
          <ModelSelector />
          <TemperatureInput />
          <ApiKeyInput />
        </div>
      )}
    </aside>
  );
}
```

### Step 2.4: Create Input Components

**src/components/inputs/GoalInput.tsx**:
```typescript
import { useAppStore } from '@/store/appStore';

export function GoalInput() {
  const { goal, setGoal } = useAppStore();
  
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-zinc-700">
        Module Goal
      </label>
      <textarea
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
        placeholder="Define the objective of this LLM module. What should it achieve?"
        className="w-full h-32 p-3 text-sm border border-zinc-300 rounded-lg resize-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
      />
      <p className="text-xs text-zinc-500">
        This guides the analysis of prompt effectiveness
      </p>
    </div>
  );
}
```

**src/components/inputs/RoleInput.tsx**:
```typescript
import { useAppStore } from '@/store/appStore';

export function RoleInput() {
  const { role, setRole } = useAppStore();
  
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-zinc-700">
        Prompt Engineer Role
      </label>
      <textarea
        value={role}
        onChange={(e) => setRole(e.target.value)}
        placeholder="Define the perspective/expertise the analyzer should use. E.g., 'Senior prompt engineer specializing in financial analysis prompts'"
        className="w-full h-24 p-3 text-sm border border-zinc-300 rounded-lg resize-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
      />
    </div>
  );
}
```

**src/components/inputs/ModelSelector.tsx**:
```typescript
import { useAppStore } from '@/store/appStore';

export function ModelSelector() {
  const { modelName, setModelName } = useAppStore();
  
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-zinc-700">
        Model Name
      </label>
      <input
        type="text"
        value={modelName}
        onChange={(e) => setModelName(e.target.value)}
        placeholder="e.g., anthropic/claude-sonnet-4-20250514"
        className="w-full p-3 text-sm border border-zinc-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent font-mono"
      />
      <p className="text-xs text-zinc-500">
        OpenRouter model identifier
      </p>
    </div>
  );
}
```

**src/components/inputs/TemperatureInput.tsx**:
```typescript
import { useAppStore } from '@/store/appStore';

export function TemperatureInput() {
  const { temperature, setTemperature } = useAppStore();
  
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-zinc-700">
        Temperature: {temperature}
      </label>
      <div className="flex items-center gap-3">
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={temperature}
          onChange={(e) => setTemperature(parseFloat(e.target.value))}
          className="flex-1"
        />
        <input
          type="number"
          min="0"
          max="1"
          step="0.1"
          value={temperature}
          onChange={(e) => setTemperature(parseFloat(e.target.value))}
          className="w-16 p-2 text-sm border border-zinc-300 rounded text-center"
        />
      </div>
    </div>
  );
}
```

**src/components/inputs/ApiKeyInput.tsx**:
```typescript
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useAppStore } from '@/store/appStore';

export function ApiKeyInput() {
  const { apiKey, setApiKey } = useAppStore();
  const [showKey, setShowKey] = useState(false);
  
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-zinc-700">
        OpenRouter API Key
      </label>
      <div className="relative">
        <input
          type={showKey ? "text" : "password"}
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="sk-or-..."
          className="w-full p-3 pr-10 text-sm border border-zinc-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent font-mono"
        />
        <button
          type="button"
          onClick={() => setShowKey(!showKey)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
        >
          {showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>
    </div>
  );
}
```

### Step 2.5: Create Main Content Inputs

**src/components/inputs/PromptInput.tsx**:
```typescript
import { useAppStore } from '@/store/appStore';

export function PromptInput() {
  const { currentPrompt, setCurrentPrompt } = useAppStore();
  
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-2">
        <label className="text-sm font-medium text-zinc-700">
          Current Prompt
        </label>
        <span className="text-xs text-zinc-400">
          {currentPrompt.length} chars
        </span>
      </div>
      <textarea
        value={currentPrompt}
        onChange={(e) => setCurrentPrompt(e.target.value)}
        placeholder="Paste your current prompt here..."
        className="flex-1 p-4 text-sm border border-zinc-300 rounded-lg resize-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent font-mono bg-zinc-50"
      />
    </div>
  );
}
```

**src/components/inputs/VariablesInput.tsx**:
```typescript
import { useAppStore } from '@/store/appStore';

export function VariablesInput() {
  const { inputVariables, setInputVariables } = useAppStore();
  
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
  
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-2">
        <label className="text-sm font-medium text-zinc-700">
          Input Variables (JSON)
        </label>
        {!isValidJson() && (
          <span className="text-xs text-red-500">Invalid JSON</span>
        )}
      </div>
      <textarea
        value={inputVariables}
        onChange={(e) => setInputVariables(e.target.value)}
        placeholder='{"company": "AAPL", "period": "Q3 2024"}'
        className={`
          flex-1 p-4 text-sm border rounded-lg resize-none font-mono bg-zinc-50
          focus:ring-2 focus:ring-indigo-500 focus:border-transparent
          ${!isValidJson() ? 'border-red-300' : 'border-zinc-300'}
        `}
      />
    </div>
  );
}
```

**src/components/inputs/OutputInput.tsx**:
```typescript
import { useAppStore } from '@/store/appStore';

export function OutputInput() {
  const { currentOutput, setCurrentOutput } = useAppStore();
  
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-2">
        <label className="text-sm font-medium text-zinc-700">
          Current Output
        </label>
        <span className="text-xs text-zinc-400">
          {currentOutput.length} chars
        </span>
      </div>
      <textarea
        value={currentOutput}
        onChange={(e) => setCurrentOutput(e.target.value)}
        placeholder="Paste the output your current prompt produces..."
        className="flex-1 p-4 text-sm border border-zinc-300 rounded-lg resize-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent font-mono bg-zinc-50"
      />
    </div>
  );
}
```

---

## Phase 3: LLM Integration Layer

### Step 3.1: Create OpenRouter Service

**src/services/openrouter.ts**:
```typescript
import OpenAI from 'openai';
import type { LLMConfig, LLMResponse } from '@/types';

// Rate limiter to prevent hitting limits
const rateLimiter = {
  lastCall: 0,
  minInterval: 1000, // 1 second between calls
  
  async throttle() {
    const now = Date.now();
    const elapsed = now - this.lastCall;
    if (elapsed < this.minInterval) {
      await new Promise(resolve => 
        setTimeout(resolve, this.minInterval - elapsed)
      );
    }
    this.lastCall = Date.now();
  }
};

// Exponential backoff retry decorator
async function withRetry<T>(
  fn: () => Promise<T>,
  maxRetries = 3,
  baseDelay = 1000
): Promise<T> {
  let lastError: Error | null = null;
  
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      await rateLimiter.throttle();
      return await fn();
    } catch (error: any) {
      lastError = error;
      
      // Check if rate limited
      if (error?.status === 429) {
        const delay = baseDelay * Math.pow(2, attempt);
        console.log(`Rate limited. Retrying in ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
        continue;
      }
      
      // For other errors, throw immediately
      throw error;
    }
  }
  
  throw lastError;
}

export async function callLLM(
  config: LLMConfig,
  systemPrompt: string,
  userPrompt: string
): Promise<LLMResponse> {
  const openai = new OpenAI({
    baseURL: 'https://openrouter.ai/api/v1',
    apiKey: config.apiKey,
    dangerouslyAllowBrowser: true, // Required for client-side usage
    defaultHeaders: {
      'HTTP-Referer': window.location.origin,
      'X-Title': 'Prompt Optimizer',
    },
  });

  return withRetry(async () => {
    const response = await openai.chat.completions.create({
      model: config.modelName,
      temperature: config.temperature,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
    });

    return {
      content: response.choices[0]?.message?.content || '',
      usage: response.usage ? {
        promptTokens: response.usage.prompt_tokens,
        completionTokens: response.usage.completion_tokens,
        totalTokens: response.usage.total_tokens,
      } : undefined,
    };
  });
}
```

### Step 3.2: Create Prompt Templates

**src/services/prompts.ts**:
```typescript
export const ANALYSIS_SYSTEM_PROMPT = `You are an expert prompt engineer with deep knowledge of LLM behavior, instruction design, and output optimization.

Your role is to analyze prompts and their outputs against specific goals, identifying concrete improvements.

Guidelines:
- Be specific and actionable in your suggestions
- Focus on clarity, structure, and goal alignment
- Consider edge cases and potential misinterpretations
- Prioritize high-impact improvements
- Maintain the original intent while enhancing effectiveness`;

export function buildAnalysisUserPrompt(params: {
  goal: string;
  role: string;
  currentPrompt: string;
  inputVariables: string;
  currentOutput: string;
}): string {
  return `## Context
${params.role ? `You are acting as: ${params.role}` : ''}

## Module Goal
${params.goal}

## Current Prompt
\`\`\`
${params.currentPrompt}
\`\`\`

## Input Variables
\`\`\`json
${params.inputVariables || '{}'}
\`\`\`

## Current Output
\`\`\`
${params.currentOutput}
\`\`\`

## Your Task
Analyze the current prompt and its output against the stated goal. Identify specific improvements that would help achieve the goal more effectively.

For each improvement:
1. Identify the issue (what's wrong or suboptimal)
2. Explain why it matters (impact on goal achievement)
3. Provide the specific change needed (concrete, implementable)

Format your response as a clear, numbered list of improvements. Each improvement should be self-contained and actionable.`;
}

export const REWRITE_SYSTEM_PROMPT = `You are a senior prompt engineer tasked with implementing specific improvements to prompts.

Guidelines:
- Implement ALL suggested improvements faithfully
- Maintain the original structure where possible
- Ensure changes are cleanly integrated
- Preserve any working elements that weren't flagged for improvement
- Output ONLY the new prompt text, no explanations or markdown code blocks`;

export function buildRewriteUserPrompt(params: {
  currentPrompt: string;
  improvements: string;
}): string {
  return `## Current Prompt
\`\`\`
${params.currentPrompt}
\`\`\`

## Improvements to Implement
${params.improvements}

## Your Task
Rewrite the prompt incorporating ALL the improvements listed above. Output ONLY the new prompt text - no explanations, no markdown formatting, no code blocks. Just the raw prompt text.`;
}

export function buildTestUserPrompt(params: {
  prompt: string;
  inputVariables: string;
}): string {
  // Replace variables in the prompt
  let processedPrompt = params.prompt;
  
  try {
    const variables = JSON.parse(params.inputVariables || '{}');
    for (const [key, value] of Object.entries(variables)) {
      const regex = new RegExp(`\\{\\{${key}\\}\\}|\\{${key}\\}`, 'g');
      processedPrompt = processedPrompt.replace(regex, String(value));
    }
  } catch {
    // If JSON parsing fails, use prompt as-is
  }
  
  return processedPrompt;
}
```

---

## Phase 4: Analysis Engine (Step 1)

### Step 4.1: Create Analysis Panel

**src/components/analysis/AnalysisPanel.tsx**:
```typescript
import { useState } from 'react';
import { Sparkles, Loader2 } from 'lucide-react';
import { useAppStore } from '@/store/appStore';
import { ImprovementEditor } from './ImprovementEditor';

export function AnalysisPanel() {
  const { 
    improvements, 
    isAnalyzing, 
    runAnalysis,
    goal,
    currentPrompt,
    currentOutput,
    apiKey 
  } = useAppStore();
  
  const canAnalyze = goal && currentPrompt && currentOutput && apiKey;

  return (
    <div className="flex flex-col h-full border border-zinc-200 rounded-lg bg-white">
      <div className="flex items-center justify-between p-3 border-b border-zinc-200">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-amber-500" />
          <h3 className="font-medium text-zinc-900">Step 1: Analysis</h3>
        </div>
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
      
      <div className="flex-1 p-4 overflow-y-auto">
        {!improvements && !isAnalyzing && (
          <div className="h-full flex items-center justify-center text-zinc-400 text-sm">
            Click "Analyze Prompt" to generate improvement suggestions
          </div>
        )}
        
        {improvements && (
          <ImprovementEditor />
        )}
      </div>
    </div>
  );
}
```

### Step 4.2: Create Improvement Editor

**src/components/analysis/ImprovementEditor.tsx**:
```typescript
import { useAppStore } from '@/store/appStore';

export function ImprovementEditor() {
  const { improvements, setImprovements } = useAppStore();

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-zinc-700">
          Suggested Improvements
        </label>
        <span className="text-xs text-zinc-500">
          Edit as needed before applying
        </span>
      </div>
      <textarea
        value={improvements}
        onChange={(e) => setImprovements(e.target.value)}
        className="w-full h-64 p-4 text-sm border border-zinc-300 rounded-lg resize-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent font-mono leading-relaxed"
        placeholder="Improvement suggestions will appear here..."
      />
      <p className="text-xs text-zinc-500">
        You can edit, remove, or add improvements before proceeding to Step 2.
      </p>
    </div>
  );
}
```

---

## Phase 5: Prompt Rewriter (Step 2)

### Step 5.1: Create Rewrite Panel with Diff Viewer

**src/components/rewrite/RewritePanel.tsx**:
```typescript
import { useState } from 'react';
import { PenLine, Loader2, Copy, Check } from 'lucide-react';
import ReactDiffViewer, { DiffMethod } from 'react-diff-viewer-continued';
import { useAppStore } from '@/store/appStore';

export function RewritePanel() {
  const { 
    currentPrompt,
    newPrompt, 
    improvements,
    isRewriting, 
    runRewrite,
    apiKey 
  } = useAppStore();
  
  const [copied, setCopied] = useState(false);
  
  const canRewrite = improvements && apiKey;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(newPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col h-full border border-zinc-200 rounded-lg bg-white">
      <div className="flex items-center justify-between p-3 border-b border-zinc-200">
        <div className="flex items-center gap-2">
          <PenLine className="h-4 w-4 text-green-500" />
          <h3 className="font-medium text-zinc-900">Step 2: Rewrite</h3>
        </div>
        <div className="flex items-center gap-2">
          {newPrompt && (
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
                  Copy New Prompt
                </>
              )}
            </button>
          )}
          <button
            onClick={runRewrite}
            disabled={!canRewrite || isRewriting}
            className={`
              px-4 py-1.5 text-sm font-medium rounded-md flex items-center gap-2
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
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {!newPrompt && !isRewriting && (
          <div className="h-full flex items-center justify-center text-zinc-400 text-sm p-4">
            Accept improvements in Step 1, then click "Apply Improvements" to generate the new prompt
          </div>
        )}
        
        {newPrompt && (
          <div className="p-4 space-y-4">
            {/* Inline Diff View */}
            <div>
              <h4 className="text-sm font-medium text-zinc-700 mb-2">
                Changes (Inline Diff)
              </h4>
              <div className="border border-zinc-200 rounded-lg overflow-hidden text-sm">
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
                <pre className="p-4 bg-zinc-50 border border-zinc-200 rounded-lg text-sm font-mono whitespace-pre-wrap overflow-x-auto">
                  {newPrompt}
                </pre>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
```

---

## Phase 6: Testing & Validation

### Step 6.1: Create Test Panel

**src/components/testing/TestPanel.tsx**:
```typescript
import { useState } from 'react';
import { Play, Loader2, Copy, Check } from 'lucide-react';
import { useAppStore } from '@/store/appStore';

export function TestPanel() {
  const { 
    newPrompt,
    testOutput,
    isTesting, 
    runTest,
    apiKey 
  } = useAppStore();
  
  const [copied, setCopied] = useState(false);
  
  const canTest = newPrompt && apiKey;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(testOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col h-full border border-zinc-200 rounded-lg bg-white">
      <div className="flex items-center justify-between p-3 border-b border-zinc-200">
        <div className="flex items-center gap-2">
          <Play className="h-4 w-4 text-blue-500" />
          <h3 className="font-medium text-zinc-900">Step 3: Test</h3>
        </div>
        <div className="flex items-center gap-2">
          {testOutput && (
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
                  Copy Output
                </>
              )}
            </button>
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
      
      <div className="flex-1 p-4 overflow-y-auto">
        {!testOutput && !isTesting && (
          <div className="h-full flex items-center justify-center text-zinc-400 text-sm">
            Generate a new prompt in Step 2, then click "Test New Prompt" to see the output
          </div>
        )}
        
        {testOutput && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-zinc-700">
              Test Output
            </h4>
            <pre className="p-4 bg-zinc-50 border border-zinc-200 rounded-lg text-sm font-mono whitespace-pre-wrap overflow-x-auto max-h-96">
              {testOutput}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
```

---

## Phase 7: Polish & Enhancements

### Step 7.1: Create Zustand Store with localStorage Persistence

**src/store/appStore.ts**:
```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { callLLM } from '@/services/openrouter';
import {
  ANALYSIS_SYSTEM_PROMPT,
  buildAnalysisUserPrompt,
  REWRITE_SYSTEM_PROMPT,
  buildRewriteUserPrompt,
  buildTestUserPrompt,
} from '@/services/prompts';

interface AppState {
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
  runAnalysis: () => Promise<void>;
  runRewrite: () => Promise<void>;
  runTest: () => Promise<void>;
  clearErrors: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Initial state
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
        } catch (error: any) {
          set({ 
            analysisError: error.message || 'Analysis failed', 
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
            })
          );

          set({ newPrompt: response.content, isRewriting: false });
        } catch (error: any) {
          set({ 
            rewriteError: error.message || 'Rewrite failed', 
            isRewriting: false 
          });
        }
      },

      // Test action
      runTest: async () => {
        const state = get();
        set({ isTesting: true, testError: null });

        try {
          const response = await callLLM(
            {
              modelName: state.modelName,
              temperature: state.temperature,
              apiKey: state.apiKey,
            },
            '', // No system prompt for raw test
            buildTestUserPrompt({
              prompt: state.newPrompt,
              inputVariables: state.inputVariables,
            })
          );

          set({ testOutput: response.content, isTesting: false });
        } catch (error: any) {
          set({ 
            testError: error.message || 'Test failed', 
            isTesting: false 
          });
        }
      },
    }),
    {
      name: 'prompt-optimizer-storage',
      // Only persist these fields (not loading states or errors)
      partialize: (state) => ({
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
```

### Step 7.2: Assemble Main App Component

**src/App.tsx**:
```typescript
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
```

### Step 7.3: Setup Main Entry Point

**src/main.tsx**:
```typescript
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

---

## Data Flow Diagrams

### Overall Application Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER INPUTS                              │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌─────────────────┐  │
│  │  Goal    │  │   Role   │  │  Model   │  │   Temperature   │  │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └───────┬─────────┘  │
│       │             │             │                 │            │
│       └─────────────┴─────────────┴─────────────────┘            │
│                              │                                    │
│                    ┌─────────▼─────────┐                         │
│                    │   CONFIGURATION   │                         │
│                    │     (Sidebar)     │                         │
│                    └─────────┬─────────┘                         │
└──────────────────────────────┼───────────────────────────────────┘
                               │
┌──────────────────────────────┼───────────────────────────────────┐
│                     MAIN WORKSPACE                                │
│  ┌─────────────────┐  ┌──────┴──────┐  ┌─────────────────┐       │
│  │ Current Prompt  │  │    Input    │  │  Current Output │       │
│  │                 │  │  Variables  │  │                 │       │
│  └────────┬────────┘  └──────┬──────┘  └────────┬────────┘       │
│           │                  │                  │                 │
│           └──────────────────┼──────────────────┘                 │
│                              │                                    │
│                    ┌─────────▼─────────┐                         │
│                    │   STEP 1: ANALYZE │                         │
│                    │   ┌───────────┐   │                         │
│                    │   │  LLM Call │   │                         │
│                    │   └─────┬─────┘   │                         │
│                    │         ▼         │                         │
│                    │   Improvements    │                         │
│                    │   (Editable)      │                         │
│                    └─────────┬─────────┘                         │
│                              │                                    │
│                    ┌─────────▼─────────┐                         │
│                    │   STEP 2: REWRITE │                         │
│                    │   ┌───────────┐   │                         │
│                    │   │  LLM Call │   │                         │
│                    │   └─────┬─────┘   │                         │
│                    │         ▼         │                         │
│                    │   ┌───────────┐   │                         │
│                    │   │ Diff View │   │                         │
│                    │   └─────┬─────┘   │                         │
│                    │         ▼         │                         │
│                    │   New Prompt      │                         │
│                    │   (Copyable)      │                         │
│                    └─────────┬─────────┘                         │
│                              │                                    │
│                    ┌─────────▼─────────┐                         │
│                    │   STEP 3: TEST    │                         │
│                    │   ┌───────────┐   │                         │
│                    │   │  LLM Call │   │                         │
│                    │   └─────┬─────┘   │                         │
│                    │         ▼         │                         │
│                    │   Test Output     │                         │
│                    └───────────────────┘                         │
└──────────────────────────────────────────────────────────────────┘
```

---

## API Contracts

### OpenRouter Request Format

```typescript
// Request
{
  model: string;           // e.g., "anthropic/claude-sonnet-4-20250514"
  temperature: number;     // 0.0 - 1.0
  messages: [
    { role: "system", content: string },
    { role: "user", content: string }
  ]
}

// Response
{
  choices: [
    {
      message: {
        content: string
      }
    }
  ],
  usage: {
    prompt_tokens: number,
    completion_tokens: number,
    total_tokens: number
  }
}
```

### Internal State Transitions

```
IDLE → ANALYZING → (SUCCESS | ERROR) → IDLE
IDLE → REWRITING → (SUCCESS | ERROR) → IDLE  
IDLE → TESTING → (SUCCESS | ERROR) → IDLE
```

---

## Recommended Improvements

Based on analysis of the requirements, here are suggested enhancements:

### 1. **Iteration History Panel**
Add a collapsible panel that shows the history of prompt iterations within the current session (without persisting). This helps track progress.

### 2. **Variable Preview**
Show a preview of the prompt with variables substituted before running the test. This helps verify the variable replacement is working correctly.

### 3. **Side-by-Side Output Comparison**
After testing the new prompt, show the old output alongside the new output for easy comparison.

### 4. **Export/Import Configuration**
Add ability to export all current inputs (goal, role, prompt, variables, improvements) as a JSON file and re-import later.

### 5. **Model Suggestions Dropdown**
Instead of a plain text input for model name, provide a searchable dropdown with popular OpenRouter models.

### 6. **Token/Cost Estimation**
Before making LLM calls, show estimated token count and approximate cost based on the model's pricing.

### 7. **Keyboard Shortcuts**
- `Cmd/Ctrl + Enter` in any panel to run that panel's action
- `Cmd/Ctrl + 1/2/3` to focus Analysis/Rewrite/Test panels

### 8. **Error Toast Notifications**
Replace inline errors with toast notifications for better UX.

### 9. **Dark Mode Support**
Add dark mode toggle using Tailwind's dark mode utilities.

### 10. **Prompt Templates Library**
Add a sidebar section with pre-built prompt templates for common use cases that can be loaded as starting points.

---

## Implementation Checklist

Use this checklist to track implementation progress:

- [x] **Phase 1**: Project setup complete (Completed: Dec 29, 2025)
  - [x] Vite + React + TypeScript initialized
  - [x] Tailwind CSS v4 configured
  - [x] shadcn/ui initialized
  - [x] All dependencies installed
  - **Note**: Use `--legacy-peer-deps` for npm install due to react-diff-viewer-continued not yet supporting React 19

- [x] **Phase 2**: UI Layout complete (Completed: Dec 29, 2025)
  - [x] Header component
  - [x] Collapsible sidebar
  - [x] All input components (Goal, Role, Model, Temperature, API Key, Prompt, Variables, Output)
  - [x] Responsive layout

- [x] **Phase 3**: LLM Integration complete (Completed: Dec 29, 2025)
  - [x] OpenRouter service with retry logic
  - [x] Rate limiter implemented
  - [x] Prompt templates defined (Analysis, Rewrite, Test)

- [x] **Phase 4**: Analysis Engine complete (Completed: Dec 29, 2025)
  - [x] Analysis panel UI
  - [x] Improvement editor
  - [x] Analysis LLM integration

- [x] **Phase 5**: Prompt Rewriter complete (Completed: Dec 29, 2025)
  - [x] Rewrite panel UI
  - [x] Diff viewer integration (inline mode)
  - [x] Copy functionality

- [x] **Phase 6**: Testing complete (Completed: Dec 29, 2025)
  - [x] Test panel UI
  - [x] Variable substitution
  - [x] Test LLM integration

- [x] **Phase 7**: Polish complete (Completed: Dec 29, 2025)
  - [x] Zustand store with persistence
  - [x] localStorage working
  - [x] Error handling
  - [x] Loading states

---

## Phase 2 & 3 Implementation Notes

**Phase 2 - UI Layout Files Created:**
- `src/components/layout/Header.tsx` - App header with logo
- `src/components/layout/Sidebar.tsx` - Collapsible sidebar with configuration inputs
- `src/components/inputs/GoalInput.tsx` - Module goal textarea
- `src/components/inputs/RoleInput.tsx` - Prompt engineer role textarea
- `src/components/inputs/ModelSelector.tsx` - OpenRouter model name input
- `src/components/inputs/TemperatureInput.tsx` - Temperature slider and number input
- `src/components/inputs/ApiKeyInput.tsx` - API key input with show/hide toggle
- `src/components/inputs/PromptInput.tsx` - Current prompt textarea
- `src/components/inputs/VariablesInput.tsx` - JSON variables input with validation
- `src/components/inputs/OutputInput.tsx` - Current output textarea
- `src/components/analysis/AnalysisPanel.tsx` - Placeholder for Phase 4
- `src/components/rewrite/RewritePanel.tsx` - Placeholder for Phase 5
- `src/components/testing/TestPanel.tsx` - Placeholder for Phase 6

**Phase 3 - LLM Integration Files Created:**
- `src/services/openrouter.ts` - OpenRouter API client with rate limiting and retry logic
- `src/services/prompts.ts` - Prompt templates for Analysis, Rewrite, and Test steps
- `src/store/appStore.ts` - Zustand store with localStorage persistence

**Layout Structure:**
```
┌────────────────────────────────────────────────────┐
│                    Header                           │
├──────────┬─────────────────────────────────────────┤
│          │  Current Prompt    │ Variables          │
│ Sidebar  │                    ├────────────────────┤
│ (Config) │                    │ Current Output     │
│          ├────────────────────┴────────────────────┤
│          │ Analysis  │  Rewrite   │    Test        │
└──────────┴─────────────────────────────────────────┘
```

**Phase 4 - Analysis Engine Files Created/Updated:**
- `src/components/analysis/AnalysisPanel.tsx` - Full analysis panel with loading states, error handling, and validation
- `src/components/analysis/ImprovementEditor.tsx` - Editable textarea for improvement suggestions
- `src/store/appStore.ts` - Added `runAnalysis` action with LLM integration

**Phase 5 - Prompt Rewriter Files Updated:**
- `src/components/rewrite/RewritePanel.tsx` - Full rewrite panel with:
  - Diff viewer using react-diff-viewer-continued (inline mode, word-level diffing)
  - Copy to clipboard functionality
  - "Accept & Iterate" button to replace current prompt with new prompt
  - Loading states and error handling
- `src/store/appStore.ts` - Added `runRewrite` action with LLM integration

**Phase 6 - Testing Files Updated:**
- `src/components/testing/TestPanel.tsx` - Full test panel with:
  - Test New Prompt button with loading/disabled states
  - Variable substitution preview (toggle button)
  - Copy to clipboard functionality
  - "Use as Output" button to copy test output to Current Output for next iteration
  - Loading states and error handling
- `src/store/appStore.ts` - Added `runTest` action with LLM integration

**Phase 7 - Polish (Already Complete):**
- Zustand store with `persist` middleware already configured in Phase 3
- localStorage persistence working for all input fields
- Error handling with AlertCircle icons in all panels
- Loading states with Loader2 spinners in all panels
- All features integrated and working together

---

## Phase 1 Implementation Notes

**Files Created:**
- `package.json` - Project configuration with all dependencies
- `index.html` - Vite entry point
- `tsconfig.json` - TypeScript configuration with path aliases
- `vite.config.ts` - Vite configuration with Tailwind and React plugins
- `components.json` - shadcn/ui configuration
- `src/types/index.ts` - Type definitions
- `src/index.css` - Tailwind CSS with shadcn theme variables
- `src/main.tsx` - React entry point
- `src/App.tsx` - Basic app component (placeholder)
- `src/vite-env.d.ts` - Vite TypeScript declarations
- `src/lib/utils.ts` - shadcn utility functions (cn)
- `public/vite.svg` - Favicon

**Directory Structure Created:**
```
src/
├── components/
│   ├── layout/
│   ├── inputs/
│   ├── analysis/
│   ├── rewrite/
│   ├── testing/
│   └── ui/
├── hooks/
├── store/
├── services/
├── types/
├── lib/
└── utils/
```

---

## File Creation Order

For optimal implementation, create files in this order:

1. `src/types/index.ts`
2. `src/store/appStore.ts`
3. `src/services/openrouter.ts`
4. `src/services/prompts.ts`
5. `src/components/layout/Header.tsx`
6. `src/components/layout/Sidebar.tsx`
7. `src/components/inputs/*.tsx` (all input components)
8. `src/components/analysis/*.tsx`
9. `src/components/rewrite/*.tsx`
10. `src/components/testing/*.tsx`
11. `src/App.tsx`
12. `src/main.tsx`
13. `src/index.css`

---

*End of Specification Document*