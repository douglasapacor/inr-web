import { GetServerSidePropsContext, GetServerSidePropsResult } from "next"
import { boletimManagement, constructor } from "../types/buletimManagement"

const serverSide = async (
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<boletimManagement>> => {
  try {
    const response = constructor()

    response.sections = [
      {
        id: 1,
        name: "Notícias"
      },
      {
        id: 2,
        name: "Legislação"
      },
      {
        id: 3,
        name: "Opnião"
      },
      {
        id: 4,
        name: "Jurisprudencia"
      },
      {
        id: 5,
        name: "Pareceres"
      },
      {
        id: 6,
        name: "Menssagens"
      }
    ]
    return {
      props: response
    }
  } catch (error) {
    return {
      props: constructor()
    }
  }
}

export { serverSide }
