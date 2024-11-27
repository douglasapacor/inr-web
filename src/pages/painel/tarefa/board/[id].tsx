import { PanelFrame } from "@/components";
import { NextPage } from "next";
import { useState } from "react";

const BoardContent: NextPage = () => {
  const [alerMessage, setAlerMessage] = useState("")
  const [showAlert, setShowAlert] = useState(false)
  return <PanelFrame
    alerMessage={alerMessage}
    showAlert={showAlert}
    title="Recursos"
    locals={[
      {
        href: "/painel/inicio",
        iconName: "home",
        text: "Home"
      },
      {
        href: "/painel/componente",
        iconName: "featured_play_list",
        text: "Recursos"
      }
    ]}
    closeAlert={() => {
      setShowAlert(false)
    }}
  ></PanelFrame>
}

export default BoardContent