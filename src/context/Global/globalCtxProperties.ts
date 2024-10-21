// interface ComponenteAmbiental {
//   path: string
//   icon: string
//   name: string
//   acoes: string[]
// }

// interface Ambiente {
//   aplication: ComponenteAmbiental[]
//   usuario: ComponenteAmbiental[]
// }

// interface Usuario {
//   nome: string
//   foto: string
//   authorized: boolean
//   ambiente: Ambiente
//   authorize: () => void
//   logout: () => void
// }

export interface ContextoGlobal {}
export const globalCtxDefault: ContextoGlobal = {}
