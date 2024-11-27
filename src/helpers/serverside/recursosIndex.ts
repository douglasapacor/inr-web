import security from "@/config/actions/security"
import fetchApi from "@/lib/fetchApi"
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next"
import { featureIndexServerSide } from "../types/recursosIndex"
import { constructor } from "../types/recursosIndex"

const serverSide = async (
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<featureIndexServerSide>> => {
  try {
    const response = constructor()

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

    response.device.list = compList.data.list
    response.device.length = compList.data.count

    return {
      props: response
    }
  } catch (error: any) {
    return {
      props: constructor()
    }
  }
}

export { serverSide }
