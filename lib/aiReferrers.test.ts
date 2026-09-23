import { test } from "node:test";
import assert from "node:assert/strict";

import { aiCrawlerName, aiReferrerName } from "./aiReferrers.ts";

/**
 * Run with:  npm run test:ai-referrers
 *
 * The risk here is mislabelling, not missing a label. An unrecognised
 * assistant costs nothing — the referrer hostname is recorded as it always
 * was. But labelling an ordinary referral "AI assistant: ChatGPT" puts a false
 * source on a lead in the CRM, and a sales decision gets made on it. So the
 * "must never match" cases below are the important half of this file.
 */

test("recognises assistant referrers by exact host", () => {
  assert.equal(aiReferrerName("chatgpt.com"), "ChatGPT");
  assert.equal(aiReferrerName("perplexity.ai"), "Perplexity");
  assert.equal(aiReferrerName("claude.ai"), "Claude");
  assert.equal(aiReferrerName("gemini.google.com"), "Gemini");
  assert.equal(aiReferrerName("copilot.microsoft.com"), "Copilot");
});

test("recognises subdomains and www, and is case-insensitive", () => {
  assert.equal(aiReferrerName("www.perplexity.ai"), "Perplexity");
  assert.equal(aiReferrerName("ChatGPT.com"), "ChatGPT");
  assert.equal(aiReferrerName("chat.openai.com"), "ChatGPT");
  // A subdomain of a listed host is still that host's assistant.
  assert.equal(aiReferrerName("eu.perplexity.ai"), "Perplexity");
});

test("accepts a full URL as well as a bare hostname", () => {
  // attribution.ts stores a hostname; a server-side caller may have the URL.
  assert.equal(aiReferrerName("https://chatgpt.com/c/abc-123"), "ChatGPT");
  assert.equal(aiReferrerName("https://www.perplexity.ai/search?q=x"), "Perplexity");
});

test("never matches a lookalike host on a substring", () => {
  // The whole reason matching is anchored to dot boundaries: each of these
  // CONTAINS a listed domain but is a different site.
  const lookalikes = [
    "notchatgpt.com",
    "chatgpt.com.example.net",
    "fakeperplexity.ai",
    "myclaude.ai.phishing.test",
    "openai.com.attacker.example",
  ];
  for (const host of lookalikes) {
    assert.equal(aiReferrerName(host), "", `must not match ${host}`);
  }
});

test("returns empty for ordinary referrers and for nothing at all", () => {
  for (const host of ["google.com", "bing.com", "linkedin.com", "justdial.com", "indiamart.com"]) {
    assert.equal(aiReferrerName(host), "", `must not match ${host}`);
  }
  assert.equal(aiReferrerName(""), "");
  assert.equal(aiReferrerName(null), "");
  assert.equal(aiReferrerName(undefined), "");
});

test("recognises AI crawlers from their documented user-agent token", () => {
  assert.equal(
    aiCrawlerName("Mozilla/5.0 (compatible; OAI-SearchBot/1.0; +https://openai.com/searchbot)"),
    "OpenAI (search)"
  );
  assert.equal(
    aiCrawlerName("Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; GPTBot/1.1; +https://openai.com/gptbot"),
    "OpenAI (index)"
  );
  assert.equal(
    aiCrawlerName("Mozilla/5.0 (compatible; PerplexityBot/1.0; +https://perplexity.ai/perplexitybot)"),
    "Perplexity (index)"
  );
  assert.equal(
    aiCrawlerName("Mozilla/5.0 (compatible; ClaudeBot/1.0; +claudebot@anthropic.com)"),
    "Anthropic (index)"
  );
  assert.equal(aiCrawlerName("Mozilla/5.0 (compatible; Google-Extended)"), "Google (Gemini grounding)");
});

test("more specific crawler tokens win over the ones they contain", () => {
  // OAI-SearchBot is the answer-time fetcher and GPTBot the index crawler;
  // Claude-User is a user-initiated fetch and ClaudeBot the index crawler.
  // Conflating them would hide exactly the distinction worth measuring.
  assert.equal(aiCrawlerName("compatible; OAI-SearchBot/1.0"), "OpenAI (search)");
  assert.equal(aiCrawlerName("compatible; Claude-User/1.0"), "Anthropic (user fetch)");
  assert.equal(aiCrawlerName("compatible; ChatGPT-User/1.0"), "OpenAI (user fetch)");
});

test("ordinary search crawlers and browsers are not AI crawlers", () => {
  const notAi = [
    "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
    "Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/128.0 Safari/537.36",
    "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 Safari/604.1",
  ];
  for (const ua of notAi) {
    assert.equal(aiCrawlerName(ua), "", `must not match ${ua}`);
  }
  assert.equal(aiCrawlerName(""), "");
  assert.equal(aiCrawlerName(null), "");
});
