import { FC, ReactNode, createContext, useContext, useState } from "react"
import {
  ContextoGlobal,
  globalCtxDefault,
  IUsuario
} from "./globalCtxProperties"

const GlobalCtx = createContext<ContextoGlobal>(globalCtxDefault)

export function useGlobalCtx(): ContextoGlobal {
  return useContext(GlobalCtx)
}

const GlobalCtxControll: FC<{ children?: ReactNode }> = ({ ...props }) => {
  const [user, setUser] = useState<IUsuario | null>(null)

  const authorize = (
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
  ) => {
    const usr = {
      nome,
      foto,
      email,
      cellphone,
      group: group,
      credential,
      access,
      authorized: true,
      keepConnected,
      connectedAt: !keepConnected
        ? new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
        : null
    }

    setUser(usr)
    localStorage.setItem("appUserData", JSON.stringify(usr))
  }

  const loadLocals = (content: string) => {
    if (content) setUser(JSON.parse(content))
  }

  const logout = () => {
    setUser(null)
  }

  const context: ContextoGlobal = {
    user,
    authorize,
    logout,
    loadLocals
  }

  return (
    <GlobalCtx.Provider value={context}>{props.children}</GlobalCtx.Provider>
  )
}

export default GlobalCtxControll
