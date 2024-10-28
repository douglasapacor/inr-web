import { PanelFrame } from "@/components"
import { ArrowBackIosNew, BackHand, Save } from "@mui/icons-material"
import { Box, Button, Grid, Paper, TextField } from "@mui/material"
import { NextPage } from "next"
import { useRouter } from "next/router"
import { useState } from "react"

const acaoSelecionada: NextPage = () => {
  const [alerMessage, setAlerMessage] = useState("")
  const [showAlert, setShowAlert] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const slug = router.query.slug
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
          href: `/painel/acao/management/${1}`,
          iconName: "visibility",
          text: "Vizualizando ação"
        }
      ]}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Paper sx={{ padding: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <TextField label="Nome" fullWidth />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <TextField label="Nome canónico" fullWidth />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between"
            }}
          >
            <Button
              variant="contained"
              color="warning"
              endIcon={<ArrowBackIosNew />}
              onClick={() => {
                router.push("/painel/acao")
              }}
            >
              Voltar
            </Button>
            <Button variant="contained" endIcon={<Save />}>
              Salvar
            </Button>
          </Box>
        </Grid>
      </Grid>
    </PanelFrame>
  )
}

export default acaoSelecionada
