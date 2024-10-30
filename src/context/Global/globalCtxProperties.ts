export interface IUsuario {
  nome: string
  foto: string
  authorized: boolean
  credential: string
}

export interface ContextoGlobal {
  user: IUsuario | null
  authorize: (nome: string, foto: string, credential: string) => void
  logout: () => void
}

export const globalCtxDefault: ContextoGlobal = {
  user: null,
  authorize: () => {},
  logout: () => {}
}
