// Compone el árbol de contenido (appData) a partir de las piezas de datos de un
// idioma. El orden de las provincias es significativo, por eso la composición es
// explícita y compartida por todos los idiomas (cada idioma aporta sus piezas).
export function composeAppData(p) {
  return {
    ...p.start,
    magues: {
      ...p.maguesBase,
      options: [...p.maguesCore, ...p.maguesWE, ...p.maguesTNA],
    },
    nemesis: {
      ...p.nemesisBase,
      options: [...p.nemesisCore, ...p.nemesisWE, ...p.nemesisTNA],
    },
    expeditions: {
      ...p.expeditionsBase,
      options: [...p.expeditionsCore, ...p.expeditionsWE, ...p.expeditionsTNA],
    },
    ...p.ambientConfig,
  };
}
