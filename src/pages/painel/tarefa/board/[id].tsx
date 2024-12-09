import { PanelFrame } from "@/components"
import { Add, Edit, MoreHoriz } from "@mui/icons-material"
import { Box, Button, Grid, Icon, Paper, Typography } from "@mui/material"
import { NextPage } from "next"
import { useState } from "react"


const BoardContent: NextPage = () => {
  const [alerMessage, setAlerMessage] = useState("")
  const [showAlert, setShowAlert] = useState(false)
  return (
    <PanelFrame
      alerMessage={alerMessage}
      showAlert={showAlert}
      title="Nome do quadro"
      locals={[
        {
          href: "/painel/inicio",
          iconName: "home",
          text: "Home"
        },
        {
          href: "/painel/tarefa",
          iconName: "dashboard",
          text: "Tarefas"
        },
        {
          href: "/painel/tarefa/board/sadasdasdad",
          iconName: "space_dashboard",
          text: "nome do quadro"
        }
      ]}
      closeAlert={() => {
        setShowAlert(false)
      }}
      dense
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Box
            sx={{
              width: "100%",
              height: "60px",
              p: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "end",
              background: theme => theme.palette.primary.main
            }}
          >
            Participantes
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <div id="TaskContainer">
            <div id="TaskColumn">
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                  <Grid container spacing={1} sx={{ color: "white", fontSize: "10pt" }}>
                    <Grid item xs={10} sm={10} md={10} lg={10} xl={10}>
                      <Box sx={{ paddingLeft: 2 }}>Titulo</Box>
                    </Grid>
                    <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
                      <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <div>
                          <MoreHoriz fontSize="small" />
                        </div>
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                  <Box sx={{
                    width: "100%",
                    height: "70px",
                    background: "#424242",
                    borderRadius: 1,
                  }}>
                    <div style={{
                      color: "white",
                      fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Noto Sans, Ubuntu, Droid Sans, Helvetica Neue, sans-serif",
                      fontSize: "14px",
                      fontWeight: "400",
                      width: "100%",
                      marginBottom: "4px",
                      padding: "6px"
                    }}>
                      <Grid container spacing={2}>
                        <Grid item xs={10} sm={10} md={10} lg={10} xl={10}>titulo card</Grid>
                        <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
                          <div>
                            <MoreHoriz fontSize="small" />
                          </div>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}></Grid>
                      </Grid>
                    </div>
                  </Box>
                </Grid>

                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                  <Button sx={{ color: "white" }} variant="text" fullWidth startIcon={<Add />}>Adicionar Cartão</Button>
                </Grid>
              </Grid>
            </div>

            <div id="TaskColumnAdd">
              <Button sx={{ color: "white" }} variant="text" fullWidth startIcon={<Add />}>Adicionar Lista</Button>
            </div>
          </div>
        </Grid>
      </Grid>
    </PanelFrame >
  )
}

export default BoardContent
