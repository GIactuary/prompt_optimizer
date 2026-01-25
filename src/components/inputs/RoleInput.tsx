import { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { useAppStore } from '@/store/appStore';

export function RoleInput() {
  const { role, setRole } = useAppStore();
  const [showBestPractices, setShowBestPractices] = useState(false);

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
        Prompt Engineer Role
      </label>
      <textarea
        value={role}
        onChange={(e) => setRole(e.target.value)}
        placeholder="Define the perspective/expertise the analyzer should use. E.g., 'Senior prompt engineer specializing in financial analysis prompts'"
        className="w-full h-24 p-3 text-sm border border-zinc-200 dark:border-zinc-600 rounded-xl resize-none shadow-sm
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
            The Role defines the expertise lens through which improvements are suggested. It shapes WHAT kinds of issues are prioritized and HOW solutions are framed.
          </p>

          {/* When Role Matters Most */}
          <div className="space-y-2">
            <p className="font-semibold text-zinc-700 dark:text-zinc-200">When Role Matters Most:</p>
            <ul className="list-disc list-inside space-y-1 text-zinc-500 dark:text-zinc-400">
              <li><strong>Domain-specific prompts:</strong> Legal, medical, financial prompts need domain expertise</li>
              <li><strong>Technique preferences:</strong> When you want specific approaches (chain-of-thought, few-shot)</li>
              <li><strong>Quality standards:</strong> Enterprise-grade vs. casual, creative vs. precise</li>
              <li><strong>Trade-off decisions:</strong> When you need to choose between competing goals</li>
            </ul>
          </div>

          {/* Key Aspects */}
          <div className="space-y-3">
            <p className="font-semibold text-zinc-700 dark:text-zinc-200">Key Aspects to Include:</p>

            <div className="space-y-2">
              <p><strong>1. Domain Expertise</strong></p>
              <p className="text-zinc-500 dark:text-zinc-400 ml-3">What industry or field knowledge is relevant?</p>
              <p className="text-zinc-500 dark:text-zinc-400 ml-3 italic">"with deep experience in healthcare compliance and HIPAA requirements"</p>
            </div>

            <div className="space-y-2">
              <p><strong>2. Optimization Priorities</strong></p>
              <p className="text-zinc-500 dark:text-zinc-400 ml-3">What matters most: clarity, brevity, accuracy, creativity, safety?</p>
              <p className="text-zinc-500 dark:text-zinc-400 ml-3 italic">"prioritizing response accuracy over speed, willing to trade verbosity for precision"</p>
            </div>

            <div className="space-y-2">
              <p><strong>3. Methodology Preferences</strong></p>
              <p className="text-zinc-500 dark:text-zinc-400 ml-3">Chain-of-thought, structured output, few-shot examples?</p>
              <p className="text-zinc-500 dark:text-zinc-400 ml-3 italic">"preferring explicit reasoning chains for complex queries"</p>
            </div>

            <div className="space-y-2">
              <p><strong>4. Trade-off Stance</strong></p>
              <p className="text-zinc-500 dark:text-zinc-400 ml-3">How should competing goals be balanced?</p>
              <p className="text-zinc-500 dark:text-zinc-400 ml-3 italic">"when in doubt, err toward safety and ask for clarification rather than assume"</p>
            </div>

            <div className="space-y-2">
              <p><strong>5. Quality Bar</strong></p>
              <p className="text-zinc-500 dark:text-zinc-400 ml-3">What level of polish is expected?</p>
              <p className="text-zinc-500 dark:text-zinc-400 ml-3 italic">"applying production-grade standards suitable for customer-facing applications"</p>
            </div>
          </div>

          {/* Scenario Examples */}
          <div className="space-y-3 pt-2 border-t border-zinc-200 dark:border-zinc-600">
            <p className="font-semibold text-zinc-700 dark:text-zinc-200">Scenario Examples:</p>

            <div className="space-y-1">
              <p className="font-medium">Customer Service Optimization:</p>
              <pre className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded text-[10px] leading-relaxed whitespace-pre-wrap overflow-x-auto">{`Role: Senior prompt engineer specializing in customer service automation with 5+ years at enterprise SaaS companies. Expertise in:
- Reducing escalation rates while maintaining customer satisfaction
- Designing tone-adaptive responses that match customer emotional state
- Building prompts that gracefully handle edge cases without human intervention
- Balancing efficiency (short responses) with empathy (acknowledgment, validation)

Priorities: De-escalation > Resolution > Efficiency. Willing to sacrifice brevity for warmth.`}</pre>
            </div>

            <div className="space-y-1">
              <p className="font-medium">Technical Documentation:</p>
              <pre className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded text-[10px] leading-relaxed whitespace-pre-wrap overflow-x-auto">{`Role: Prompt engineer with a technical writing background, specializing in developer documentation and API references. Focus on:
- Clarity and precision over marketing language
- Consistent terminology and structure
- Anticipating developer questions and edge cases
- Building prompts that work across different expertise levels

Quality bar: Documentation should be accurate enough for production use without additional review.`}</pre>
            </div>

            <div className="space-y-1">
              <p className="font-medium">Creative Content:</p>
              <pre className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded text-[10px] leading-relaxed whitespace-pre-wrap overflow-x-auto">{`Role: Creative prompt engineer with experience in marketing and brand voice development. Expertise in:
- Crafting prompts that produce engaging, on-brand content
- Balancing creativity with consistency
- Building in variety without sacrificing quality
- Optimizing for emotional resonance and memorability

Approach: Prefer structured creativity - give the model room to be creative within clear guardrails.`}</pre>
            </div>

            <div className="space-y-1">
              <p className="font-medium">Data/Analytics:</p>
              <pre className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded text-[10px] leading-relaxed whitespace-pre-wrap overflow-x-auto">{`Role: Prompt engineer with a data science background, specializing in extraction and analysis tasks. Focused on:
- Accuracy and verifiability above all else
- Structured, parseable outputs (JSON, tables)
- Graceful handling of missing or ambiguous data
- Prompts that fail explicitly rather than fabricate

Methodology: Prefer chain-of-thought for complex analysis, explicit validation steps, and confidence indicators.`}</pre>
            </div>

            <div className="space-y-1">
              <p className="font-medium">Financial/Stock Analysis:</p>
              <pre className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded text-[10px] leading-relaxed whitespace-pre-wrap overflow-x-auto">{`Role: Prompt engineer with quantitative finance background, specializing in investment research and data-driven analysis. Expertise in:
- Synthesizing multiple data sources (fundamentals, technicals, news, sentiment)
- Building prompts that balance insight with appropriate uncertainty
- Avoiding hindsight bias and overconfident predictions
- Designing outputs that distinguish between fact, interpretation, and speculation

Priorities: Accuracy > Completeness > Speed
- Always show your work: cite specific data points that support conclusions
- Explicit uncertainty: use ranges, scenarios, and confidence levels

Methodology:
- Structured reasoning: data → pattern → interpretation → implication
- Devil's advocate: always consider the bear case and the bull case
- Base rates: what does history suggest for similar situations?

Guard rails:
- Never predict specific price targets without stating assumptions
- Always note data recency and potential staleness`}</pre>
            </div>

            <div className="space-y-1">
              <p className="font-medium">Safety-Critical Applications:</p>
              <pre className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded text-[10px] leading-relaxed whitespace-pre-wrap overflow-x-auto">{`Role: Prompt engineer specializing in safety-critical and regulated applications (healthcare, finance, legal). Expertise in:
- Designing prompts that minimize hallucination risk
- Building in appropriate disclaimers and escalation paths
- Ensuring compliance with industry regulations
- Creating audit-friendly prompt structures

Principles: When uncertain, refuse gracefully. Never trade safety for capability. Default to human escalation.`}</pre>
            </div>
          </div>

          {/* Anti-patterns */}
          <div className="space-y-2 pt-2 border-t border-zinc-200 dark:border-zinc-600">
            <p className="font-semibold text-zinc-700 dark:text-zinc-200">Anti-patterns to Avoid:</p>
            <ul className="space-y-1">
              <li><span className="text-red-500 dark:text-red-400">✗</span> <strong>Generic:</strong> "Experienced prompt engineer" - What makes them experienced?</li>
              <li><span className="text-red-500 dark:text-red-400">✗</span> <strong>No priorities:</strong> Without trade-off guidance, optimizer picks arbitrarily</li>
              <li><span className="text-red-500 dark:text-red-400">✗</span> <strong>Mismatched expertise:</strong> Legal role for a creative writing prompt</li>
              <li><span className="text-red-500 dark:text-red-400">✗</span> <strong>Conflicting guidance:</strong> "Prioritize both brevity and thoroughness equally"</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
