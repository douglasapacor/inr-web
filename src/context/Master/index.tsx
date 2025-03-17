import {
  FC,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState
} from "react"
import { ctxUser, defaultCtx, masterCtxDefault } from "./props"

const MasterCtx = createContext<defaultCtx>(masterCtxDefault)

export function useContextMaster(): defaultCtx {
  return useContext(MasterCtx)
}

const MasterCtxControll: FC<{ children?: ReactNode }> = ({ ...props }) => {
  const [data, setData] = useState<ctxUser | null>(null)
  const [left, setLeft] = useState<boolean>(false)
  const [rigth, setRight] = useState<boolean>(false)

  useEffect(() => {
    const storedUser = localStorage.getItem("masterUserData")
    if (storedUser) {
      setData(JSON.parse(storedUser))
    }

    const lfState = localStorage.getItem("lfDrawerState")
    if (lfState) {
      setLeft(JSON.parse(lfState))
    }

    const rtState = localStorage.getItem("rtDrawerState")
    if (rtState) {
      setRight(JSON.parse(rtState))
    }
  }, [])

  const login = (user: ctxUser) => {
    setData(user)
    localStorage.setItem("masterUserData", JSON.stringify(user))
  }

  const logout = () => {
    setData(null)
    localStorage.removeItem("masterUserData")
  }

  const changeLeft = () => {
    setLeft(!left)
    localStorage.setItem("lfDrawerState", JSON.stringify(!left))
  }

  const changeRigth = () => {
    setRight(!rigth)
    localStorage.setItem("rtDrawerState", JSON.stringify(!rigth))
  }

  const ctx: defaultCtx = {
    data,
    left,
    rigth,
    login,
    logout,
    changeLeft,
    changeRigth
  }

  return <MasterCtx.Provider value={ctx}>{props.children}</MasterCtx.Provider>
}

export default MasterCtxControll
