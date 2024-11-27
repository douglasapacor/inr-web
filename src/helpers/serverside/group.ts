import { GetServerSidePropsContext, GetServerSidePropsResult } from "next"
import { groupType, contructor } from "../types/group"
import fetchApi from "@/lib/fetchApi"
import security from "@/config/actions/security"
import colors from "../colors"

const serverSide = async (
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<groupType>> => {
  try {
    if (!context.req.cookies["master-key-inr"]) throw new Error("no Auth")

    const urlSlug = context.params?.slug
    if (!urlSlug) throw new Error("no Slug")

    const content = contructor()

    if (urlSlug[0] === "new") {
      content.locationIcon = "create"
      content.pageMode = "creating"
    }

    const featureList = await fetchApi.get(
      security.feature.getAll,
      context.req.cookies["master-key-inr"]
    )

    if (!featureList.success) throw new Error("no feature list")

    content.features = featureList.data.map((fi: any) => ({
      id: fi.id,
      name: fi.name,
      icon: fi.icon,
      path: fi.path,
      visible: fi.visible,
      deviceComponentsName: fi.devicecomponentsname,
      checked: false
    }))

    content.colors = colors

    return { props: content }
  } catch (error: any) {
    return { props: contructor() }
  }
}

export { serverSide }
