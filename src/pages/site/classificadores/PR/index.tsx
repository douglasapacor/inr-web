import { SiteFrame } from "@/components"
import { Grid } from "@mui/material"
import { NextPage } from "next"

const ClassifiersPR: NextPage = props => {
  return (
    <SiteFrame>
      <Grid container>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <section
            style={{
              width: "100%",
              height: "250px",
              fontSize: "1.4rem",
              backgroundImage: `url('/images/textura_banner.png'), url('/images/header_areas/banner_pr.jpg')`,
              backgroundPosition: "left top, center top",
              backgroundSize: "auto auto, 100%",
              backgroundRepeat: "repeat, no-repeat",
              backgroundColor: "#006092",
              backgroundBlendMode: "difference, multiply",
              backgroundAttachment: "scroll, fixed",
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
              Classificadores INR PR
            </h1>
          </section>
        </Grid>
      </Grid>
    </SiteFrame>
  )
}

export default ClassifiersPR
