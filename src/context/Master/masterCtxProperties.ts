export interface masterUser {
  name: string
  email: string
  cellphone: string
  photo: string
  keepConnected: boolean
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
}

export interface ContextMaster {
  user: masterUser | null
  login: (masterUser: masterUser) => void
  logout: () => void
  lMenu: boolean
  rMenu: boolean
  registerLMenu: (value: boolean) => void
  revertLeftState: () => void
  registerRMenu: (value: boolean) => void
  revertRigthState: () => void
}

export const masterCtxDefault: ContextMaster = {
  user: null,
  login: (masterUser: masterUser) => {},
  logout: () => {},
  lMenu: false,
  rMenu: false,
  registerLMenu: (value: boolean) => {},
  revertLeftState: () => {},
  registerRMenu: (value: boolean) => {},
  revertRigthState: () => {}
}
