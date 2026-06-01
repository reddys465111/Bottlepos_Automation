import fs from "fs";
import path from "path";

const memoryFile = path.join(process.cwd(), "agent/memory.json");

//  Ensure memory file exists
function ensureMemory() {
  if (!fs.existsSync(memoryFile)) {
    fs.mkdirSync(path.dirname(memoryFile), { recursive: true });
    fs.writeFileSync(memoryFile, JSON.stringify([]));
  }
}

//  Save failure (you already use this)
export function saveFailure(failure: string) {
  ensureMemory();

  const data = JSON.parse(fs.readFileSync(memoryFile, "utf-8"));
  data.push({
    failure,
    time: new Date().toISOString(),
  });

  fs.writeFileSync(memoryFile, JSON.stringify(data, null, 2));
}

//   ADD THIS FUNCTION (FIX YOUR ERROR)
export function getRelevantFailures(error: string): string {
  ensureMemory();

  const data = JSON.parse(fs.readFileSync(memoryFile, "utf-8"));

  // Simple keyword match (can upgrade later to embeddings)
  const matches = data
    .filter((item: any) =>
      item.failure.toLowerCase().includes(error.toLowerCase())
    )
    .slice(-3); // last 3 similar failures

  return matches.map((m: any) => m.failure).join("\n---\n");
} 