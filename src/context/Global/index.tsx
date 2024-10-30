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
  const authorize = (nome: string, foto: string, credential: string) => {
    setUser({
      nome,
      foto,
      credential,
      authorized: true
    })
  }

  const logout = () => {
    setUser(null)
  }

  const context: ContextoGlobal = {
    user,
    authorize,
    logout
  }

  return (
    <GlobalCtx.Provider value={context}>{props.children}</GlobalCtx.Provider>
  )
}

export default GlobalCtxControll
