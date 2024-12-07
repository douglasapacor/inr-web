import { PanelFrame } from "@/components"
import theme from "@/styles/theme"
import { Box, Grid, Icon, Paper, Typography } from "@mui/material"
import { NextPage } from "next"
import { useState } from "react"

type boardType = {
  name: string
}

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
                  <Box sx={{ width: "100%", padding: 1 }}>
                    <Typography variant="body2">
                      <strong>Título column</strong>
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                  <Paper sx={{ minHeight: 100 }} elevation={6}>
                    <Grid container>
                      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        <Box
                          sx={{
                            width: "100%",
                            paddingTop: 1,
                            paddingLeft: 1
                          }}
                        >
                          <Typography variant="body2">Título card</Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        <Box
                          sx={{
                            width: "100%",
                            padding: 1
                          }}
                        >
                          <Box
                            sx={{
                              width: "100%",
                              minHeight: "80px",
                              background: "#E0E0E0",
                              borderRadius: 1,
                              wordWrap: "break-word",
                              whiteSpace: "normal",
                              p: 0.5
                            }}
                          >
                            asdasd asd asdasds sad ad asdasdas asd ad
                          </Box>
                        </Box>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                  <div id="TaskButtonAddCard">
                    <Icon fontSize="large">add_circle_outline</Icon>
                  </div>
                </Grid>
              </Grid>
            </div>
            <div id="TaskColumnAdd">
              <Icon fontSize="large">add_circle_outline</Icon>
            </div>
          </div>
        </Grid>
      </Grid>
    </PanelFrame>
  )
}

export default BoardContent
