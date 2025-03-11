import { FC, ReactNode, createContext, useContext } from "react"
import { ContextMaster, masterCtxDefault } from "./props"

const MasterCtx = createContext<ContextMaster>(masterCtxDefault)

export function useContextMaster(): ContextMaster {
  return useContext(MasterCtx)
}

const MasterCtxControll: FC<{ children?: ReactNode }> = ({ ...props }) => {
  const ctx: ContextMaster = {}

  return <MasterCtx.Provider value={ctx}>{props.children}</MasterCtx.Provider>
}

export default MasterCtxControll
