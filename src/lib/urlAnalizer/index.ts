import { urlMaster } from "@/config/frees"

export default (url: string) => {
  try {
    if (urlMaster.indexOf(url) >= 0) return true
    else return false
  } catch (error: any) {
    return false
  }
}
