import { PanelFrame } from "@/components";
import { Grid, Paper } from "@mui/material";
import { NextPage } from "next";
import { useState } from "react";

type boardType = {
  name: string
}

const BoardContent: NextPage = () => {
  const [alerMessage, setAlerMessage] = useState("")
  const [showAlert, setShowAlert] = useState(false)
  return <PanelFrame
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
      }, {
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
    <Grid container>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>

      </Grid>
    </Grid>
  </PanelFrame>
}

export default BoardContent