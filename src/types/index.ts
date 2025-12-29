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
