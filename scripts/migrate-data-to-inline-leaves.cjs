const fs = require("fs");

const path = "src/data.json";
const data = JSON.parse(fs.readFileSync(path, "utf8"));

function normalize(text) {
  return String(text || "").toLowerCase();
}

function inferExpansionFromText(text) {
  // TODO: agregar inferencia de expansión cuando haya contenido AE
  return "";
}

let mergedCount = 0;
let taggedCount = 0;
const removable = new Set();

for (const [, node] of Object.entries(data)) {
  if (!node || !Array.isArray(node.options)) continue;

  node.options = node.options.map((option) => {
    const nextId = option?.next;
    const nextNode = nextId ? data[nextId] : null;
    const combinedText = [
      option?.label || "",
      option?.description || "",
      nextId || "",
      nextNode?.title || "",
      nextNode?.description || ""
    ].join(" ");

    const expansionTag = inferExpansionFromText(combinedText);

    const out = { ...option };
    if (expansionTag) out.expansionTag = expansionTag;
    if (expansionTag) taggedCount++;

    const isLeafAudioTarget = !!(
      nextId &&
      nextNode &&
      !Array.isArray(nextNode.options) &&
      (nextNode.audio || (Array.isArray(nextNode.audios) && nextNode.audios.length > 0))
    );

    if (isLeafAudioTarget) {
      out.leafTitle = nextNode.title || out.label || "";
      out.leafDescription = nextNode.description || "";
      if (nextNode.audio) out.audio = nextNode.audio;
      if (Array.isArray(nextNode.audios) && nextNode.audios.length > 0) out.audios = nextNode.audios;
      delete out.next;
      removable.add(nextId);
      mergedCount++;
    }

    return out;
  });
}

for (const key of removable) {
  delete data[key];
}

fs.writeFileSync(path, `${JSON.stringify(data, null, 2)}\n`, "utf8");

console.log(JSON.stringify({
  mergedCount,
  taggedCount,
  removedNodes: removable.size,
  totalKeys: Object.keys(data).length
}, null, 2));
