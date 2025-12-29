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

CRITICAL - GENERALIZATION REQUIREMENT:
The improvements you're implementing were identified from ONE example output. However, your rewritten prompt must work for ALL possible inputs of this type, not just the example that was analyzed.

DO NOT:
- Hardcode specific values, dates, names, or numbers from the example
- Add instructions that only apply to the specific case shown
- Reverse-engineer the example output into the prompt
- Reference specific data points that won't exist in other inputs

DO:
- Write generic extraction patterns that work across all similar inputs
- Use variable placeholders where input-specific data should go
- Create instructions that handle the CATEGORY of problem, not the specific instance
- Ensure the prompt produces correct output for any valid input, not just the analyzed example

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
