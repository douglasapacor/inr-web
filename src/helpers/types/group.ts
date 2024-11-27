import { group } from "console"
import { locationIcon, pageMode } from "./geral"

type featureGroupType = {
  id: number
  name: string
  icon: string
  path: string
  visible: boolean
  deviceComponentsName: string
  checked: boolean
}

type group = {
  id: number | null
  name: string
  canonical: string
  active: boolean
  super: boolean
  color: string
  features: number[]
}

type colorsType = {
  code: string
  name: string
}

type groupType = {
  locationIcon: locationIcon
  pageMode: pageMode
  features: featureGroupType[]
  colors: colorsType[]
  group: group
}

const contructor = (): groupType => {
  return {
    locationIcon: "visibility",
    pageMode: "visualizing",
    features: [],
    colors: [],
    group: {
      id: null,
      name: "",
      canonical: "",
      active: false,
      super: false,
      color: "",
      features: []
    }
  }
}

export { type groupType, contructor, type featureGroupType, type group }
