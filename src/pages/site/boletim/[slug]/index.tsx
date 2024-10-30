import { SiteFrame } from "@/components"
import legacy from "@/config/actions/legacy"
import fetchApi from "@/lib/fetchApi"
import { Box, Container, Divider, Grid, Icon } from "@mui/material"
import { GetServerSideProps, NextPage } from "next"
import parse from "html-react-parser"
import he from "he"
import sanitize from "@/lib/helpers/sinitize"
import { KeyboardArrowDown } from "@mui/icons-material"

type newsProps = {
  title: string
  description: string
  tag: string
  text: string
  list: { id: number; titulo: string; datacad: string }[]
}

type slugsString =
  | "noticias"
  | "legislacoes"
  | "jurisprudencias"
  | "opinioes"
  | "perguntas-e-respostas"
  | "mensagens-editores"
  | "pareceresCGJ"
  | "suplementos"
  | "historias"

type slugTagsType = Record<
  slugsString,
  {
    title: string
    descriptionId: number
    text: string
  }
>

const slugTags: slugTagsType = {
  noticias: {
    title: "Notí­cias",
    descriptionId: 5,
    text: "Últimas Notí­cias"
  },
  legislacoes: {
    title: "Legislação",
    descriptionId: 7,
    text: "Últimos Atos Legais"
  },
  jurisprudencias: {
    title: "Jurisprudência",
    descriptionId: 6,
    text: "Últimas Decisões"
  },
  opinioes: { title: "Opinião", descriptionId: 9, text: "Últimos Artigos" },
  "perguntas-e-respostas": {
    title: "Perguntas e Respostas",
    descriptionId: 10,
    text: "Últimas Consultas"
  },
  "mensagens-editores": {
    title: "Mensagens dos Editores",
    descriptionId: 26,
    text: "Últimas Mensagens"
  },
  pareceresCGJ: {
    title:
      "Pareceres não divulgados no DJe — \n\tCorregedoria Geral da Justiça do Estado de São Paulo",
    descriptionId: 8,
    text: `Últimos Pareceres CGJ SP`
  },
  suplementos: {
    title: "Suplementos da Consultoria INR",
    descriptionId: 15,
    text: "Suplementos da Consultoria INR"
  },
  historias: {
    title: "Histórias do ofício",
    descriptionId: 46,
    text: "Últimas Histórias"
  }
}

export const getServerSideProps: GetServerSideProps<
  newsProps
> = async context => {
  const slug =
    context.params && context.params.slug ? context.params.slug.toString() : ""
  const pageData = slugTags[slug as keyof typeof slugTags]
  const desc = await fetchApi.get(
    legacy.boletim.description(pageData.descriptionId)
  )

  let fetch

  switch (slug) {
    case "noticias":
      fetch = await await fetchApi.get(legacy.boletim.news.home)
      break
    case "legislacoes":
      fetch = await await fetchApi.get(legacy.boletim.legislation.home)
      break
    case "jurisprudencias":
      fetch = await await fetchApi.get(legacy.boletim.jurisprudence.home)
      break
    case "opinioes":
      fetch = await await fetchApi.get(legacy.boletim.opinion.home)
      break
    case "perguntas-e-respostas":
      fetch = await await fetchApi.get(legacy.boletim.questionAndAnswer.home)
      break
    case "mensagens-editores":
      fetch = await await fetchApi.get(legacy.boletim.messagesEditors.home)
      break
    case "pareceresCGJ":
      fetch = await await fetchApi.get(legacy.boletim.pareceres.home)
      break
    // case "suplementos":
    //   fetch = await await fetchApi.get(legacy.boletim.se.home)
    //   break
    // case "historias":
    //   fetch = await await fetchApi.get(legacy.boletim.news.home)
    //   break
    default:
      fetch = { success: false }
      break
  }

  if (fetch.success) {
    return {
      props: {
        title: pageData.title,
        description: desc.data,
        tag: slug,
        text: pageData.text,
        list: fetch.data
      }
    }
  } else {
    return {
      props: {
        title: pageData.title,
        description: desc.data,
        tag: slug,
        text: pageData.text,
        list: []
      }
    }
  }
}

const BeFrame: NextPage<newsProps> = props => {
  return (
    <SiteFrame>
      <Grid container>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <section
            style={{
              width: "100%",
              height: 250,
              fontSize: "1.8rem",
              backgroundImage: `url('https://inrpublicacoes.com.br/site/img/icones/textura_banner.png'), url('https://inrpublicacoes.com.br/site/img/${props.tag}/banner.jpg')`,
              backgroundPosition: "left top, center top",
              backgroundSize: "auto auto, 100%",
              backgroundRepeat: "repeat, no-repeat",
              backgroundColor: "#006092",
              backgroundBlendMode: "difference, multiply",
              position: "relative",
              overflow: "hidden",
              margin: "0 auto 1em",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              whiteSpace: "preserve-breaks",
              textAlign: "center"
            }}
          >
            <h1
              style={{
                fontFamily: "RobotoSlab",
                fontWeight: "500",
                textTransform: "uppercase",
                color: "#fff"
              }}
            >
              {props.title}
            </h1>
          </section>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Container>
            <div
              style={{
                width: "100%",
                textAlign: "center",
                margin: "2em auto 3em",
                fontFamily: "Arial, Helvetica, sans-serif",
                fontSize: "14px",
                lineHeight: "1.42857143",
                color: "#333"
              }}
              dangerouslySetInnerHTML={{ __html: props.description }}
            />
          </Container>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Container>
            <div
              style={{
                width: "100%"
              }}
            >
              <h2
                style={{
                  fontSize: "1.9rem",
                  fontFamily: "RobotoSlab",
                  marginTop: 0,
                  marginBottom: "1em",
                  color: "#006092"
                }}
              >
                {props.text}
              </h2>
            </div>
          </Container>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Container>
            <ul className="be-main-ul">
              {props.list.map((i, index) => (
                <li
                  className="be-main-li"
                  key={`${index}-list-item-${new Date().getDate()}`}
                >
                  <a
                    className="be-main-a"
                    href={`/site/boletim/pareceresCGJ/${i.id}/${sanitize(
                      parse(
                        he.decode(i.titulo).replace(/<\/?p>/g, "")
                      ).toString()
                    ).urlFriendly()}`}
                  >
                    <time datatype="ano-mes-dia">{`[+] ${i.datacad} ${he.decode(
                      " &ndash; "
                    )}`}</time>

                    <strong>
                      {parse(he.decode(`${i.titulo}`).replace(/<\/?p>/g, ""))}
                    </strong>
                  </a>
                </li>
              ))}
            </ul>
          </Container>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Container>
            <Box sx={{ width: "100%", marginBottom: "15px" }}>
              <div className="be-main-load-more-button">
                <strong>
                  Clique aqui e veja mais
                  <br />
                  {props.title}
                </strong>
                <br />
                <KeyboardArrowDown
                  className="load-more_icon"
                  sx={{
                    fontSize: 50
                  }}
                />
              </div>
            </Box>
          </Container>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Container>
            <Divider
              color="#2196F3"
              sx={{ height: 1, width: "100%", marginBottom: "15px" }}
            />
          </Container>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Container>
            <Box sx={{ width: "100%" }}>
              <a className="be-main-db-button">
                Não encontrou o que procurava?{" "}
                <strong>
                  Clique aqui e realize uma busca na Base de Dados INR.
                </strong>
              </a>
            </Box>
          </Container>
        </Grid>
      </Grid>
    </SiteFrame>
  )
}

export default BeFrame
