/**
 * Splits src/data.json into multiple smaller files under src/data/.
 * Run once: node scripts/split-data.cjs
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const SRC_FILE = path.join(ROOT, "src", "data.json");
const DATA_DIR = path.join(ROOT, "src", "data");
const MISIONES_DIR = path.join(DATA_DIR, "misiones");

const data = JSON.parse(fs.readFileSync(SRC_FILE, "utf8"));

fs.mkdirSync(DATA_DIR, { recursive: true });
fs.mkdirSync(MISIONES_DIR, { recursive: true });

function write(filePath, obj) {
  fs.writeFileSync(filePath, JSON.stringify(obj, null, 2) + "\n", "utf8");
  const rel = path.relative(ROOT, filePath).replace(/\\/g, "/");
  console.log("  ✔", rel);
}

console.log("Splitting src/data.json...\n");

// start
write(path.join(DATA_DIR, "start.json"), { start: data.start });

// ciudades
write(path.join(DATA_DIR, "ciudades.json"), { ciudades: data.ciudades });

// misiones — base metadata + split options by province
const { options: misionesOptions, ...misionesBase } = data.misiones;
write(path.join(MISIONES_DIR, "_base.json"), misionesBase);

const EXPANSIONES = ["core", "war_eternal", "the_new_age"];
const seen = new Set();

for (const expansion of EXPANSIONES) {
  const opts = misionesOptions.filter((o) => o.expansionTag === expansion);
  write(path.join(MISIONES_DIR, `${expansion}.json`), opts);
  opts.forEach((_, i) => seen.add(i));
}

// Warn about any options that didn't match a known expansion
const unhandled = misionesOptions.filter((o) => !EXPANSIONES.includes(o.expansionTag));
if (unhandled.length > 0) {
  console.warn("\n⚠  Misiones options with unrecognized expansionTag:");
  unhandled.forEach((o) => console.warn("    -", o.label, `(expansionTag: ${o.expansionTag})`));
}

// encuentros_generales
write(path.join(DATA_DIR, "encuentros_generales.json"), { encuentros_generales: data.encuentros_generales });

// encuentros_provinciales
write(path.join(DATA_DIR, "encuentros_provinciales.json"), { encuentros_provinciales: data.encuentros_provinciales });

// sesion_final
write(path.join(DATA_DIR, "sesion_final.json"), { sesion_final: data.sesion_final });

// ambientConfig
write(path.join(DATA_DIR, "ambient.json"), { ambientConfig: data.ambientConfig });

console.log("\nDone. Next steps:");
console.log("  1. Update src/main.js imports");
console.log("  2. Create src/data/merge.cjs for Node scripts");
console.log("  3. Remove src/data.json when satisfied\n");
