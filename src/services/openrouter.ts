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
    } catch (error: unknown) {
      lastError = error as Error;

      // Check if rate limited
      if (error && typeof error === 'object' && 'status' in error && error.status === 429) {
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
    const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [];

    if (systemPrompt) {
      messages.push({ role: 'system', content: systemPrompt });
    }
    messages.push({ role: 'user', content: userPrompt });

    const response = await openai.chat.completions.create({
      model: config.modelName,
      temperature: config.temperature,
      messages,
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
