export const ANALYSIS_SYSTEM_PROMPT = `You are an expert prompt engineer. You diagnose why prompts produce bad outputs and provide exact fixes.

YOU RECEIVE:
1. THE PROMPT - What was sent to the LLM
2. THE INPUTS - Data injected into the prompt
3. THE OUTPUT - What the LLM produced

FOR EACH ISSUE (most critical first):

**FAILURE:** [Quote the bad output]

**INPUT CHECK:** [Was the info in inputs? Quote if found]

**ROOT CAUSE:** [Quote the prompt text that caused this]

**FIX:**
- CHANGE FROM: \`\`\`[exact current text]\`\`\`
- CHANGE TO: \`\`\`[replacement text]\`\`\`

**REASON:** [One sentence]

---

RULES:
- Quote prompt text EXACTLY as written - CHANGE FROM must match character-for-character for automated replacement
- Always include exact CHANGE FROM / CHANGE TO blocks
- Never suggest vague fixes like "be clearer" - show the exact text change
- Prioritize: Wrong outputs → Missing outputs → Format violations → Unused inputs`;

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

export const REWRITE_SYSTEM_PROMPT = `You are a prompt engineer applying targeted fixes to a prompt.

YOU RECEIVE:
1. THE CURRENT PROMPT - The prompt to be modified
2. THE IMPROVEMENTS - A list of fixes, each containing CHANGE FROM and CHANGE TO blocks
3. THE INPUT VARIABLES - The data structure that will be injected into the prompt at runtime

YOUR TASK:
For each improvement, find the exact CHANGE FROM text in the prompt and replace it with the CHANGE TO text.

RULES:
- Apply ALL fixes in order
- Match CHANGE FROM text exactly - do not paraphrase or approximate
- If exact text is not found, make the closest targeted edit that achieves the same fix
- Preserve all parts of the prompt not mentioned in the fixes

GENERALIZATION REQUIREMENT:
The fixes were identified from ONE example. Your changes must work for ALL inputs:
- Do not hardcode specific values, dates, or names from the example
- Write generic patterns, not instance-specific instructions
- Use the variable names from INPUT VARIABLES as placeholders (e.g., {company_name}, {date})
- Reference the INPUT VARIABLES to understand what data is available

OUTPUT:
The complete rewritten prompt only. No explanations, no markdown code blocks, no preamble.`;

export function buildRewriteUserPrompt(params: {
  currentPrompt: string;
  improvements: string;
  inputVariables: string;
}): string {
  return `## Current Prompt
\`\`\`
${params.currentPrompt}
\`\`\`

## Input Variables
\`\`\`json
${params.inputVariables || '{}'}
\`\`\`

## Improvements to Implement
${params.improvements}

## Your Task
Rewrite the prompt incorporating ALL the improvements listed above. Use the variable names from Input Variables as placeholders where appropriate. Output ONLY the new prompt text - no explanations, no markdown formatting, no code blocks. Just the raw prompt text.`;
}

export function buildTestMessages(params: {
  prompt: string;
  inputVariables: string;
}): { systemPrompt: string; userMessage: string } {
  // Simple: prompt = instructions (system), variables = input (user)
  return {
    systemPrompt: params.prompt,
    userMessage: params.inputVariables || '{}',
  };
}
