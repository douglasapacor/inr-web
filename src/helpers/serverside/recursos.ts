import { GetServerSidePropsContext, GetServerSidePropsResult } from "next"
import { construtor, featureManagement } from "../types/recursos"
import fetchApi from "@/lib/fetchApi"
import security from "@/config/actions/security"

const serverSide = async (
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<featureManagement>> => {
  try {
    if (!context.req.cookies["master-key-inr"]) throw new Error()

    const urlSlug = context.params?.slug
    if (!urlSlug) throw new Error()

    const content = construtor()

    const actions = await fetchApi.get(
      security.action.getAll,
      context.req.cookies["master-key-inr"]
    )

    if (!actions.success) throw new Error()

    const actionList = actions.data.map((acl: any) => ({
      id: acl.id,
      name: acl.name,
      canonical: acl.canonical,
      checked: false
    }))

    if (urlSlug[0] === "new") {
      content.locationIcon = "create"
      content.pageMode = "creating"
    } else {
      content.locationIcon = "visibility"
      content.pageMode = "visualizing"

      const response = await fetchApi.get(
        security.feature.select(+urlSlug[0]),
        context.req.cookies["master-key-inr"]
      )

      if (response.success) {
        content.feature.active = response.data.active
        content.feature.canonical = response.data.canonical
        content.feature.createdAt = response.data.createdAt
        content.feature.createdName = response.data.createdByName
        content.feature.deviceComponentsId = response.data.deviceComponentsId
        content.feature.icon = response.data.icon
        content.feature.id = response.data.id
        content.feature.name = response.data.name
        content.feature.path = response.data.path
        content.feature.updatedAt = response.data.updatedAt
        content.feature.updatedName = response.data.updatedByName
        content.feature.visible = response.data.visible
      }
    }

    content.feature.actions = actionList

    const compList = await fetchApi.post(
      security.deviceComponent.search,
      {
        name: "",
        deviceId: 0,
        limit: 5,
        offset: 0
      },
      context.req.cookies["master-key-inr"]
    )

    if (!compList.success) throw new Error()

    content.device = {
      list: compList.data.list,
      length: compList.data.count
    }

    return {
      props: content
    }
  } catch (error: any) {
    return {
      props: construtor()
    }
  }
}

export default serverSide
