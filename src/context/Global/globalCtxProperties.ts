export interface IUsuario {
  nome: string
  email: string
  foto: string
  cellphone: string
  group: {
    name: string
    canonical: string
  }
  credential: string
  access: {
    name: string
    icon: string
    path: string
    deviceId: number
  }[]
  authorized: boolean
  keepConnected: boolean
  connectedAt: Date | null
}

export interface ContextoGlobal {
  user: IUsuario | null
  authorize: (
    nome: string,
    email: string,
    foto: string,
    cellphone: string,
    group: {
      name: string
      canonical: string
    },
    credential: string,
    access: {
      name: string
      icon: string
      path: string
      deviceId: number
    }[],
    keepConnected: boolean
  ) => void
  logout: () => void
  loadLocals: (content: string) => void
}

export const globalCtxDefault: ContextoGlobal = {
  user: null,
  authorize: () => {},
  logout: () => {},
  loadLocals: () => {}
}
