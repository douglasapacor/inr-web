import {
  FC,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState
} from "react"
import {
  ContextMaster,
  masterCtxDefault,
  masterUser
} from "./masterCtxProperties"
import urlAnalizer from "@/lib/urlAnalizer"
import { useCookies } from "react-cookie"
const MasterCtx = createContext<ContextMaster>(masterCtxDefault)

export function useContextMaster(): ContextMaster {
  return useContext(MasterCtx)
}

const MasterCtxControll: FC<{ children?: ReactNode }> = ({ ...props }) => {
  const [user, setUser] = useState<masterUser | null>(null)
  const [lMenu, setLMenu] = useState<boolean>(false)
  const [rMenu, setRMenu] = useState<boolean>(false)
  const [_, setCookie, removeCookie] = useCookies(["master-key-inr"])

  const login = (usr: {
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
  }) => {
    setUser(usr)
    localStorage.setItem("user", JSON.stringify(usr))
    setCookie("master-key-inr", usr.credential, { path: "/" })
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
    removeCookie("master-key-inr", { path: "/" })
  }

  const registerLMenu = (value: boolean) => {
    setLMenu(value)
    localStorage.setItem("leftDrawerState", JSON.stringify(value))
  }

  const registerRMenu = (value: boolean) => {
    setRMenu(value)
    localStorage.setItem("rigthDrawerState", JSON.stringify(value))
  }

  const revertLeftState = () => {
    localStorage.setItem("leftDrawerState", JSON.stringify(!lMenu))
    setLMenu(left => !left)
  }

  const revertRigthState = () => {
    localStorage.setItem("rigthDrawerState", JSON.stringify(!rMenu))
    setRMenu(rigth => !rigth)
  }

  useEffect(() => {
    const stringContent = localStorage.getItem("user")

    if (stringContent) {
      const userContent = JSON.parse(stringContent)

      setUser(userContent)

      setCookie("master-key-inr", userContent.credential, { path: "/" })

      const lm = localStorage.getItem("leftDrawerState")
      const rm = localStorage.getItem("rigthDrawerState")

      if (lm) setLMenu(JSON.parse(lm))
      if (rm) setRMenu(JSON.parse(rm))
    } else {
      if (!urlAnalizer(window.location.pathname)) {
        window.location.assign("/painel/autenticacao")
      }
    }
  }, [])

  const ctx: ContextMaster = {
    user,
    login,
    logout,
    lMenu,
    rMenu,
    registerLMenu,
    revertLeftState,
    registerRMenu,
    revertRigthState
  }

  return <MasterCtx.Provider value={ctx}>{props.children}</MasterCtx.Provider>
}

export default MasterCtxControll
