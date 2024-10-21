import { PanelFrame } from "@/components"
import { Paper } from "@mui/material"
import { NextPage } from "next"
import { useState } from "react"

const acaoSelecionada: NextPage = () => {
  const [alerMessage, setAlerMessage] = useState("")
  const [showAlert, setShowAlert] = useState(false)
  const [loading, setLoading] = useState(false)

  return (
    <PanelFrame
      alerMessage={alerMessage}
      showAlert={showAlert}
      title="Ações"
      loading={loading}
      locals={[
        {
          href: "/painel/inicio",
          iconName: "home",
          text: "Home"
        },
        {
          href: "/painel/acao",
          iconName: "bolt",
          text: "Ações"
        },
        {
          href: `/painel/acao/${1}`,
          iconName: "visibility",
          text: "Vizualizando ação"
        }
      ]}
    >
      <Paper sx={{ padding: 2 }}>action</Paper>
    </PanelFrame>
  )
}

export default acaoSelecionada
