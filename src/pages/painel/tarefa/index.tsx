import { PanelFrame } from "@/components";
import { Add } from "@mui/icons-material";
import { Box, Fab } from "@mui/material";
import { NextPage } from "next";
import { useState } from "react";

const Boards: NextPage = () => {
  const [alerMessage, setAlerMessage] = useState("")
  const [showAlert, setShowAlert] = useState(false)
  return <PanelFrame
    alerMessage={alerMessage}
    showAlert={showAlert}
    title="Tarefas"
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
  ></PanelFrame>
}

export default Boards