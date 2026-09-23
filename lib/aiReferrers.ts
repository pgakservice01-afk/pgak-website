/**
 * Recognises visits that an AI assistant sent, and crawls that an AI company's
 * bot made.
 *
 * ── Why this exists ──
 * Search Console (90 days to 2026-09-20) showed 6.1K impressions against 150
 * clicks, with essentially every non-brand click going missing: the question
 * clusters this site answers best — CCTV retention, AEBAS, proxy attendance —
 * are the ones Google and the assistants now answer in place. One recorded
 * query was literally an assistant's own prompt text ("context: location:
 * united states … question: if my internet goes down, will ai search still
 * work on recordings later"), so the site is already being read on a user's
 * behalf. None of that is visible in GA4, where a visit from ChatGPT lands in
 * "Referral" beside a directory listing and a forum link.
 *
 * Two different things are worth counting and they are not the same signal:
 *
 *   REFERRAL — a human clicked a citation in an assistant's answer and is on
 *     the site now. This is the commercial signal: it means PGAK was cited,
 *     and the visit can become a lead.
 *   CRAWLER — an AI company's bot fetched the page to build an index or ground
 *     an answer. This is the eligibility signal: it means the page can be
 *     cited at all. It never appears in client-side analytics because bots do
 *     not run JavaScript.
 *
 * ── Matching rule ──
 * Hostnames are matched on exact host or dot-boundary suffix, never bare
 * substring, so `notchatgpt.com.example.net` cannot match `chatgpt.com`.
 * Crawler user agents are matched case-insensitively on the token each vendor
 * documents. An unrecognised assistant is simply not labelled — the referrer
 * hostname is still recorded as it always was, so this can add information but
 * never lose any.
 */

/** Hostnames an assistant sends a human from, mapped to the name we report. */
const REFERRER_HOSTS: Record<string, string> = {
  "chatgpt.com": "ChatGPT",
  "chat.openai.com": "ChatGPT",
  "openai.com": "ChatGPT",
  "perplexity.ai": "Perplexity",
  "claude.ai": "Claude",
  "gemini.google.com": "Gemini",
  "bard.google.com": "Gemini",
  "copilot.microsoft.com": "Copilot",
  "edgeservices.bing.com": "Copilot",
  "you.com": "You.com",
  "poe.com": "Poe",
  "phind.com": "Phind",
  "grok.com": "Grok",
  "x.ai": "Grok",
  "mistral.ai": "Le Chat",
  "chat.deepseek.com": "DeepSeek",
  "kagi.com": "Kagi",
};

/**
 * Crawler user-agent tokens, mapped to the operator. Includes both the
 * answer-time fetchers (OAI-SearchBot, PerplexityBot, Claude-User) and the
 * training/index crawlers (GPTBot, ClaudeBot, Google-Extended), because the
 * question "can an assistant cite this page" depends on the first group and
 * the question "is this site in the corpus at all" depends on the second.
 *
 * Order matters: the first match wins, so the more specific token is listed
 * before a token that is its prefix (`Claude-User` before `ClaudeBot` would be
 * ambiguous otherwise, and `OAI-SearchBot` must be tested before `GPTBot`).
 */
const CRAWLER_TOKENS: [token: string, operator: string][] = [
  ["OAI-SearchBot", "OpenAI (search)"],
  ["ChatGPT-User", "OpenAI (user fetch)"],
  ["GPTBot", "OpenAI (index)"],
  ["PerplexityBot", "Perplexity (index)"],
  ["Perplexity-User", "Perplexity (user fetch)"],
  ["Claude-User", "Anthropic (user fetch)"],
  ["Claude-SearchBot", "Anthropic (search)"],
  ["ClaudeBot", "Anthropic (index)"],
  ["Google-Extended", "Google (Gemini grounding)"],
  ["Applebot-Extended", "Apple Intelligence"],
  ["Amazonbot", "Amazon"],
  ["Bytespider", "ByteDance"],
  ["CCBot", "Common Crawl"],
  ["cohere-ai", "Cohere"],
  ["Meta-ExternalAgent", "Meta"],
  ["MistralAI-User", "Mistral"],
];

/** True when `host` is `domain` or a subdomain of it. Never a substring match. */
function hostMatches(host: string, domain: string): boolean {
  return host === domain || host.endsWith(`.${domain}`);
}

/**
 * The assistant that sent this visit, or "" when the referrer is not a known
 * one. Accepts a bare hostname (what `lib/attribution.ts` stores) or a full
 * URL, so it is usable on both the client and the server.
 */
export function aiReferrerName(referrer: string | null | undefined): string {
  if (!referrer) return "";

  let host = referrer.trim().toLowerCase();
  if (host.includes("/")) {
    try {
      host = new URL(host.includes("://") ? host : `https://${host}`).hostname;
    } catch {
      return "";
    }
  }
  host = host.replace(/^www\./, "");
  if (!host) return "";

  for (const [domain, name] of Object.entries(REFERRER_HOSTS)) {
    if (hostMatches(host, domain)) return name;
  }
  return "";
}

/**
 * The AI operator behind this user agent, or "" for anything else — including
 * Googlebot and Bingbot, which are ordinary search crawlers and are counted
 * elsewhere.
 */
export function aiCrawlerName(userAgent: string | null | undefined): string {
  if (!userAgent) return "";
  const ua = userAgent.toLowerCase();
  for (const [token, operator] of CRAWLER_TOKENS) {
    if (ua.includes(token.toLowerCase())) return operator;
  }
  return "";
}
