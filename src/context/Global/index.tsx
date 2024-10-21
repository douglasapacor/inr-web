import { FC, ReactNode, createContext, useContext, useState } from "react"
import { ContextoGlobal, globalCtxDefault } from "./globalCtxProperties"

const GlobalCtx = createContext<ContextoGlobal>(globalCtxDefault)

export function useGlobalCtx(): ContextoGlobal {
  return useContext(GlobalCtx)
}

const GlobalCtxControll: FC<{ children?: ReactNode }> = ({ ...props }) => {
  const context = {}
  return (
    <GlobalCtx.Provider value={context}>{props.children}</GlobalCtx.Provider>
  )
}

export default GlobalCtxControll
