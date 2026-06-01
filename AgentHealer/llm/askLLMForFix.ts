import "dotenv/config";
import Anthropic from "@anthropic-ai/sdk";
import { getRelevantFailures } from "./rag";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
});

export async function askLLMForFix(params: {
  selector: string;
  error: string;
  url?: string;
  domSnapshot: string;
}): Promise<string | null> {
  try {
    //  Get memory context
    const history = getRelevantFailures(params.error);

    const prompt = `
You are a senior Playwright automation engineer.

GOAL:
Fix a broken selector using ONLY the provided HTML.

STRICT RULES:
- Use Playwright-friendly selectors
- Prefer: text, aria-label, role, name
- Avoid XPath unless absolutely necessary
- Avoid index-based selectors (nth-child, nth-of-type)
- Selector MUST exist in HTML
- Return ONLY selector usable inside page.locator()
- No explanation

If no stable selector found, return: NO_STABLE_LOCATOR

FAILED SELECTOR:
${params.selector}

ERROR:
${params.error}

URL:
${params.url ?? "unknown"}

HTML:
${params.domSnapshot}

PAST SIMILAR FAILURES:
${history || "none"}
`;

    const response = await client.messages.create({
      model: "claude-3-haiku-20240307", // fast + cheap
      max_tokens: 200,
      temperature: 0.2,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    // ✅ Safe extraction (handles multiple blocks)
    const text = response.content
      ?.filter((c: any) => c.type === "text")
      ?.map((c: any) => c.text)
      ?.join(" ")
      ?.trim() || null;

    if (!text) return null;

    //  Validation
    if (
      text.length < 3 ||
      text.includes("undefined") ||
      text.includes("null")
    ) {
      console.log("⚠️ Invalid selector from Claude:", text);
      return null;
    }

    if (text === "NO_STABLE_LOCATOR") {
      console.warn("🤖 Claude could not find stable selector");
      return null;
    }

    console.log("🤖 Claude Healed Selector:", text);

    return text;

  } catch (err) {
    console.error("🤖 Claude error:", err);
    return null;
  }
}