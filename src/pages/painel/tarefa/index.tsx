import { PanelFrame } from "@/components";
import Board from "@/components/Board";
import { Add } from "@mui/icons-material";
import { Box, Fab, Grid, Paper } from "@mui/material";
import { NextPage } from "next";
import { useState } from "react";

const Boards: NextPage = () => {
  const [alerMessage, setAlerMessage] = useState("")
  const [showAlert, setShowAlert] = useState(false)
  return <PanelFrame
    alerMessage={alerMessage}
    showAlert={showAlert}
    title="Quadros de tarefas"
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
      }
    ]}
    closeAlert={() => {
      setShowAlert(false)
    }}
    outsideContent={
      <Box
        sx={{ width: "100%", display: "flex", justifyContent: "flex-end" }}
      >
        <Fab
          color="primary"
          aria-label="add"
          onClick={() => {

          }}
        >
          <Add />
        </Fab>
      </Box>
    }
    dense
  >
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
        <Board color="#4CAF50" />
      </Grid>
    </Grid>
  </PanelFrame>
}

export default Boards