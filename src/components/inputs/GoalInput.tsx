import { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { useAppStore } from '@/store/appStore';

export function GoalInput() {
  const { goal, setGoal } = useAppStore();
  const [showBestPractices, setShowBestPractices] = useState(false);

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
        Module Goal
      </label>
      <textarea
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
        placeholder="Define the objective of this LLM module. What should it achieve?"
        className="w-full h-32 p-3 text-sm border border-zinc-200 dark:border-zinc-600 rounded-xl resize-none shadow-sm
          bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500
          transition-all duration-200
          hover:border-zinc-300 dark:hover:border-zinc-500 hover:shadow
          focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500/50 focus:border-indigo-300 dark:focus:border-indigo-500 focus:outline-none
          dark:focus:ring-offset-zinc-800"
      />
      <button
        type="button"
        onClick={() => setShowBestPractices(!showBestPractices)}
        className="flex items-center gap-1 text-xs text-zinc-500 dark:text-zinc-400 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors"
      >
        <HelpCircle className="w-3 h-3" />
        <span>Best practices</span>
        {showBestPractices ? (
          <ChevronUp className="w-3 h-3" />
        ) : (
          <ChevronDown className="w-3 h-3" />
        )}
      </button>
      {showBestPractices && (
        <div className="p-3 text-xs rounded-lg bg-zinc-50 dark:bg-zinc-700/50 border border-zinc-200 dark:border-zinc-600 text-zinc-600 dark:text-zinc-300 space-y-4 max-h-[60vh] overflow-y-auto">
          {/* Purpose Statement */}
          <p className="italic text-zinc-500 dark:text-zinc-400 border-l-2 border-indigo-400 pl-2">
            The Module Goal tells the optimizer what "good output" looks like. It's your evaluation framework - without it, the optimizer can't judge whether improvements are actually improvements.
          </p>

          {/* Key Questions */}
          <div className="space-y-3">
            <p className="font-semibold text-zinc-700 dark:text-zinc-200">Key Questions to Answer:</p>

            <div className="space-y-2">
              <p><strong>1. What is the input?</strong></p>
              <p className="text-zinc-500 dark:text-zinc-400 ml-3">What kind of data, requests, or queries will users send to this prompt?</p>
              <p className="text-zinc-500 dark:text-zinc-400 ml-3 italic">"Users submit customer support tickets with varying levels of detail and emotional tone"</p>
            </div>

            <div className="space-y-2">
              <p><strong>2. What is the ideal output?</strong></p>
              <ul className="list-disc list-inside ml-3 text-zinc-500 dark:text-zinc-400">
                <li>Format: JSON, markdown, plain text, structured sections?</li>
                <li>Length: Word count, paragraph count, max/min?</li>
                <li>Content: What must always be included? What should never appear?</li>
              </ul>
              <p className="text-zinc-500 dark:text-zinc-400 ml-3 italic">"Response should be 2-3 sentences, acknowledge the issue, and provide a concrete next step"</p>
            </div>

            <div className="space-y-2">
              <p><strong>3. How do you measure success?</strong></p>
              <ul className="list-disc list-inside ml-3 text-zinc-500 dark:text-zinc-400">
                <li>Accuracy: Must facts be verifiable?</li>
                <li>Completeness: All points addressed?</li>
                <li>Tone: Professional, friendly, formal, empathetic?</li>
                <li>Actionability: Should output be immediately usable?</li>
              </ul>
              <p className="text-zinc-500 dark:text-zinc-400 ml-3 italic">"Success = customer feels heard AND has a clear action to take"</p>
            </div>

            <div className="space-y-2">
              <p><strong>4. What are the failure modes?</strong></p>
              <ul className="list-disc list-inside ml-3 text-zinc-500 dark:text-zinc-400">
                <li>What should NEVER happen? (Hallucinations, wrong tone, missing info)</li>
                <li>What would make this output harmful or useless?</li>
              </ul>
              <p className="text-zinc-500 dark:text-zinc-400 ml-3 italic">"Never promise refunds without verification, never use dismissive language"</p>
            </div>

            <div className="space-y-2">
              <p><strong>5. Who is the audience?</strong></p>
              <ul className="list-disc list-inside ml-3 text-zinc-500 dark:text-zinc-400">
                <li>Who reads/uses the output? Technical or non-technical?</li>
                <li>What do they already know? What do they need explained?</li>
              </ul>
              <p className="text-zinc-500 dark:text-zinc-400 ml-3 italic">"Output is read by frustrated customers who may not be tech-savvy"</p>
            </div>

            <div className="space-y-2">
              <p><strong>6. What are the constraints?</strong></p>
              <ul className="list-disc list-inside ml-3 text-zinc-500 dark:text-zinc-400">
                <li>Brand voice guidelines?</li>
                <li>Regulatory requirements (HIPAA, GDPR mentions)?</li>
                <li>Technical limitations (character limits, no markdown)?</li>
              </ul>
              <p className="text-zinc-500 dark:text-zinc-400 ml-3 italic">"Must comply with company tone guide: warm but professional, no slang"</p>
            </div>

            <div className="space-y-2">
              <p><strong>7. How should edge cases be handled?</strong></p>
              <ul className="list-disc list-inside ml-3 text-zinc-500 dark:text-zinc-400">
                <li>Missing or incomplete input?</li>
                <li>Ambiguous requests?</li>
                <li>Out-of-scope queries?</li>
              </ul>
              <p className="text-zinc-500 dark:text-zinc-400 ml-3 italic">"If intent is unclear, ask ONE clarifying question before proceeding"</p>
            </div>
          </div>

          {/* Scenario Examples */}
          <div className="space-y-3 pt-2 border-t border-zinc-200 dark:border-zinc-600">
            <p className="font-semibold text-zinc-700 dark:text-zinc-200">Scenario Examples:</p>

            <div className="space-y-1">
              <p className="font-medium">Customer Service Bot:</p>
              <pre className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded text-[10px] leading-relaxed whitespace-pre-wrap overflow-x-auto">{`Goal: Respond to customer support tickets for a SaaS product. Each response should:
- Acknowledge the customer's frustration or concern within the first sentence
- Identify the specific issue category (billing, technical, feature request, account)
- Provide a concrete next step or solution
- Keep responses under 150 words
- Escalate to human if: billing disputes over $100, legal threats, or repeated contacts about the same issue
- Never: make promises about features, admit liability, or use scripted phrases like "I understand your frustration"
- Tone: warm, competent, efficient - like a knowledgeable friend who works at the company`}</pre>
            </div>

            <div className="space-y-1">
              <p className="font-medium">Content Generation:</p>
              <pre className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded text-[10px] leading-relaxed whitespace-pre-wrap overflow-x-auto">{`Goal: Generate blog post introductions for a B2B marketing agency. Each intro should:
- Hook the reader with a surprising statistic, question, or bold statement
- Be 3-4 sentences (60-80 words)
- Establish the problem the post will solve
- Use active voice, present tense
- Avoid jargon unless the target audience is specified as technical
- Match the brand voice: authoritative but approachable, data-driven
- If the topic is unclear or too broad, suggest 2-3 narrower angles instead`}</pre>
            </div>

            <div className="space-y-1">
              <p className="font-medium">Data Extraction:</p>
              <pre className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded text-[10px] leading-relaxed whitespace-pre-wrap overflow-x-auto">{`Goal: Extract structured product information from unstructured supplier descriptions. Output JSON with:
- name (string, required): Product name exactly as stated
- price (number, nullable): Price in USD, null if not found
- dimensions (object, nullable): {length, width, height} in inches
- materials (array): List of materials mentioned
- Handle missing data: Use null, never fabricate values
- Handle ambiguity: If multiple prices exist, use the highest (assume it's retail)
- Validation: If description is too short (<20 words), return {"error": "insufficient_data"}`}</pre>
            </div>

            <div className="space-y-1">
              <p className="font-medium">Code Generation:</p>
              <pre className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded text-[10px] leading-relaxed whitespace-pre-wrap overflow-x-auto">{`Goal: Generate TypeScript utility functions based on natural language descriptions. Requirements:
- Use modern TypeScript (ES2022+, strict mode compatible)
- Include JSDoc comments with @param and @returns
- Handle edge cases: null inputs, empty arrays, type mismatches
- Prefer immutable operations (no mutation of input)
- Keep functions pure when possible
- If requirements are ambiguous, implement the simplest interpretation and add a TODO comment noting the assumption
- Output format: Just the code, no explanations unless specifically asked`}</pre>
            </div>

            <div className="space-y-1">
              <p className="font-medium">Document Summarization:</p>
              <pre className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded text-[10px] leading-relaxed whitespace-pre-wrap overflow-x-auto">{`Goal: Summarize legal contracts for non-lawyer stakeholders. Each summary should:
- Lead with the 3 most important obligations/rights
- Use plain English (8th grade reading level)
- Highlight any unusual or concerning clauses
- Structure: Key Terms → Obligations → Rights → Red Flags → Dates to Remember
- Length: 250-400 words regardless of contract length
- When uncertain about a clause's meaning, flag it as "Requires Legal Review"
- Never: interpret intent, give legal advice, or omit liability clauses`}</pre>
            </div>

            <div className="space-y-1">
              <p className="font-medium">Stock/Financial Analysis:</p>
              <pre className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded text-[10px] leading-relaxed whitespace-pre-wrap overflow-x-auto">{`Goal: Analyze stock data and news to generate investment insights. Each analysis should:
- Synthesize quantitative data (price, volume, ratios) with qualitative signals (news, sentiment)
- Identify key drivers: What factors are moving this stock?
- Assess risk/reward: What could go right? What could go wrong?
- Output structure:
  * Summary (2-3 sentences): Overall assessment
  * Key Metrics: P/E, revenue growth, debt ratios with context
  * Catalysts: Upcoming events that could move the stock
  * Risks: Specific, concrete risks (not generic "market volatility")
  * Sentiment: What's the narrative? Is it priced in?
- Timeframe: Specify whether analysis is for short-term or long-term
- Confidence level: Express uncertainty when data is conflicting
- Constraints: Never give buy/sell recommendations, always note data recency
- Edge cases: Note liquidity risk for penny stocks, limited data for recent IPOs`}</pre>
            </div>

            <div className="space-y-1">
              <p className="font-medium">Data Interpretation & Insights:</p>
              <pre className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded text-[10px] leading-relaxed whitespace-pre-wrap overflow-x-auto">{`Goal: Transform raw data exports into actionable business insights. Each analysis should:
- Start with the "so what": What should someone DO based on this data?
- Identify patterns: Trends, anomalies, correlations
- Quantify findings: Specific numbers, not vague descriptors ("revenue increased 23%" not "significantly")
- Contextualize: Compare to benchmarks, previous periods, or expectations
- Structure:
  * Executive Summary (3 bullets): Top findings
  * Detailed Findings: Each insight with supporting data
  * Anomalies: Unexpected patterns that warrant investigation
  * Data Quality Notes: Missing data, outliers, or reliability concerns
  * Recommended Actions: Specific next steps based on findings
- Handle incomplete data: State what's missing and how it limits conclusions
- Avoid: Overstating confidence, burying important findings, generic insights`}</pre>
            </div>
          </div>

          {/* Anti-patterns */}
          <div className="space-y-2 pt-2 border-t border-zinc-200 dark:border-zinc-600">
            <p className="font-semibold text-zinc-700 dark:text-zinc-200">Anti-patterns to Avoid:</p>
            <ul className="space-y-1">
              <li><span className="text-red-500 dark:text-red-400">✗</span> <strong>Too vague:</strong> "Summarize well" - What does "well" mean?</li>
              <li><span className="text-red-500 dark:text-red-400">✗</span> <strong>No success criteria:</strong> "Generate content" - How do we know if it's good?</li>
              <li><span className="text-red-500 dark:text-red-400">✗</span> <strong>Missing constraints:</strong> "Be helpful" - No format, length, or tone guidance</li>
              <li><span className="text-red-500 dark:text-red-400">✗</span> <strong>Ignoring edge cases:</strong> No mention of how to handle unusual inputs</li>
              <li><span className="text-red-500 dark:text-red-400">✗</span> <strong>Assuming context:</strong> The optimizer only sees what you tell it</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
