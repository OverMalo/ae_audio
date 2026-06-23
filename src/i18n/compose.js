// Compone el árbol de contenido (appData) a partir de las piezas de datos de un
// idioma. El orden de las provincias es significativo, por eso la composición es
// explícita y compartida por todos los idiomas (cada idioma aporta sus piezas).
export function composeAppData(p) {
  return {
    ...p.start,
    magues: {
      ...p.maguesBase,
      options: [...p.maguesCore, ...p.maguesWE, ...p.maguesTNA, ...p.maguesOutcast, ...p.maguesBeyondBreach],
    },
    nemesis: {
      ...p.nemesisBase,
      options: [...p.nemesisCore, ...p.nemesisWE, ...p.nemesisTNA, ...p.nemesisOutcast, ...p.nemesisBeyondBreach],
    },
    expeditions: {
      ...p.expeditionsBase,
      options: [...p.expeditionsCore, ...p.expeditionsWE, ...p.expeditionsTNA, ...p.expeditionsOutcast, ...p.expeditionsBeyondBreach],
    },
    ...p.ambientConfig,
  };
}
