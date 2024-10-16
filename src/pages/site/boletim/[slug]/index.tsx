import { SiteFrame } from "@/components"
import { Container, Grid } from "@mui/material"
import { GetServerSideProps, NextPage } from "next"

type newsProps = {
  title: string | string[] | undefined
}

export const getServerSideProps: GetServerSideProps<
  newsProps
> = async context => {
  return {
    props: {
      title: context.params?.slug
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
              fontSize: "2.2rem",
              backgroundImage:
                "url('https://inrpublicacoes.com.br/site/img/icones/textura_banner.png'), url('https://inrpublicacoes.com.br/site/img/noticias/banner.jpg')",
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
              alignItems: "center"
            }}
          >
            <h1
              style={{
                fontFamily: "RobotoSlab",
                fontWeight: "normal",
                textTransform: "uppercase",
                color: "#fff"
              }}
            >
              {props.title}
            </h1>
          </section>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Container>qweqweq</Container>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Container>qweqweq</Container>
        </Grid>
      </Grid>
    </SiteFrame>
  )
}

export default BeFrame
