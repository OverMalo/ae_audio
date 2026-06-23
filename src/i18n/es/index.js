// ── Paquete del idioma: Español (es) ───────────────────────────────────────
// Todo lo específico de este idioma vive en esta carpeta:
//   ui.json         → textos de interfaz
//   manifest.json   → metadatos de la PWA (nombre, descripción…)
//   soundtrack.json → pistas de la banda sonora
//   data/           → contenido narrado (ciudades, misiones, encuentros…)
//
// Para crear un idioma nuevo: copia esta carpeta a src/i18n/<código>/, traduce
// los .json (y, en su caso, apunta los audios a su versión localizada) y
// registra el idioma en src/i18n.js.

import ui from "./ui.json";
import manifest from "./manifest.json";
import soundtrack from "./soundtrack.json";

import start from "./data/start.json";
import maguesBase from "./data/magues/_base.json";
import maguesCore from "./data/magues/core.json";
import maguesWE from "./data/magues/war_eternal.json";
import maguesTNA from "./data/magues/the_new_age.json";
import maguesOutcast from "./data/magues/outcast.json";
import maguesBeyondBreach from "./data/magues/beyond_breach.json";
import nemesisBase from "./data/nemesis/_base.json";
import nemesisCore from "./data/nemesis/core.json";
import nemesisWE from "./data/nemesis/war_eternal.json";
import nemesisTNA from "./data/nemesis/the_new_age.json";
import nemesisOutcast from "./data/nemesis/outcast.json";
import nemesisBeyondBreach from "./data/nemesis/beyond_breach.json";
import expeditionsBase from "./data/expeditions/_base.json";
import expeditionsCore from "./data/expeditions/core.json";
import expeditionsWE from "./data/expeditions/war_eternal.json";
import expeditionsTNA from "./data/expeditions/the_new_age.json";
import expeditionsOutcast from "./data/expeditions/outcast.json";
import expeditionsBeyondBreach from "./data/expeditions/beyond_breach.json";
import ambientConfig from "./data/ambient.json";

import { composeAppData } from "../compose.js";

export default {
  code: "es",
  ui,
  manifest,
  soundtrack,
  appData: composeAppData({
    start,
    maguesBase, maguesCore, maguesWE, maguesTNA, maguesOutcast, maguesBeyondBreach,
    nemesisBase, nemesisCore, nemesisWE, nemesisTNA, nemesisOutcast, nemesisBeyondBreach,
    expeditionsBase, expeditionsCore, expeditionsWE, expeditionsTNA, expeditionsOutcast, expeditionsBeyondBreach,
    ambientConfig,
  }),
};
