import fs from "fs";
import path from "path";

const MEMORY_PATH = path.join(process.cwd(), "agent/memory.json");

type MemoryItem = {
  type: string;
  failedSelector: string;
  healedSelector: string;
  url?: string;
  time: string;
};

// ✅ Ensure file exists
function ensureMemory() {
  if (!fs.existsSync(MEMORY_PATH)) {
    fs.mkdirSync(path.dirname(MEMORY_PATH), { recursive: true });
    fs.writeFileSync(MEMORY_PATH, "[]", "utf-8");
  }
}

// 📥 Read memory
function readMemory(): MemoryItem[] {
  ensureMemory();
  return JSON.parse(fs.readFileSync(MEMORY_PATH, "utf-8"));
}

// 💾 Save new mapping
export function saveToMemory(item: MemoryItem) {
  const data = readMemory();

  // avoid duplicates
  const exists = data.find(
    (d) => d.failedSelector === item.failedSelector
  );

  if (!exists) {
    data.push(item);
    fs.writeFileSync(MEMORY_PATH, JSON.stringify(data, null, 2));
    console.log("💾 Saved to memory:", item.failedSelector);
  }
}

// 🔍 Find fix from memory
export function findFromMemory(selector: string): string | null {
  const data = readMemory();

  const match = data.find(
    (d) => d.failedSelector === selector
  );

  if (match) {
    console.log("⚡ Memory hit for:", selector);
    return match.healedSelector;
  }

  return null;
}