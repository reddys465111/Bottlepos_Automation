import fs from "fs";
import path from "path";

const memoryFile = path.join(
  process.cwd(),
  "agent/memory/selector-fixes.json"
);

// 🔍 FIND existing fix
export function findSelectorFix(error: string, selector: string) {
  if (!fs.existsSync(memoryFile)) return null;

  const memory = JSON.parse(fs.readFileSync(memoryFile, "utf-8"));

  const normalize = (text: string) =>
    text.toLowerCase().replace(/[^a-z0-9]/g, "");

  const normError = normalize(error);
  const normSelector = normalize(selector);

  const match = memory.find((m: any) => {
    const mError = normalize(m.error || "");
    const mSelector = normalize(m.selector || "");

    return (
      m.success === true &&
      (normError.includes(mError) ||
        mError.includes(normError) ||
        normSelector.includes(mSelector))
    );
  });

  if (match) {
    console.log("🧠 Memory hit! Reusing selector:", match.fixedSelector);
    return match.fixedSelector;
  }

  return null;
}

// 💾 SAVE new fix (ADD THIS)
export function saveSelectorFix(data: {
  error: string;
  selector: string;
  fixedSelector: string;
}) {
  let memory: any[] = [];

  if (fs.existsSync(memoryFile)) {
    memory = JSON.parse(fs.readFileSync(memoryFile, "utf-8"));
  }

  // 🚫 avoid duplicates
  const exists = memory.some(
    (m: any) =>
      m.selector === data.selector &&
      m.fixedSelector === data.fixedSelector
  );

  if (!exists) {
    memory.push({
      ...data,
      success: true,
      time: new Date().toISOString(),
    });

    fs.mkdirSync(path.dirname(memoryFile), { recursive: true });
    fs.writeFileSync(memoryFile, JSON.stringify(memory, null, 2));

    console.log("💾 Saved selector fix to memory");
  } else {
    console.log("⚡ Fix already exists, skipping save");
  }
}