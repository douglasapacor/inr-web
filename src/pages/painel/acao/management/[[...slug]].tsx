import { PanelFrame } from "@/components"
import security from "@/config/actions/security"
import { useGlobalCtx } from "@/context/Global"
import fetchApi from "@/lib/fetchApi"
import { ArrowBackIosNew, Save } from "@mui/icons-material"
import { Box, Button, Grid, Paper, TextField } from "@mui/material"
import { GetServerSideProps, NextPage } from "next"
import { useRouter } from "next/router"
import { useContext, useState } from "react"
type mo = "visualizing" | "creating" | ""
type ic = "visibility" | "create" | ""
type acaoManagement = {
  locationIcon: ic
  mode: mo
}

export const getServerSideProps: GetServerSideProps<
  acaoManagement
> = async context => {
  const urlSlug = context.params?.slug

  if (!urlSlug) {
    return {
      props: { locationIcon: "", mode: "" },
      redirect: {
        destination: "/painel/inicio?erro=2"
      }
    }
  }

  let icon: ic = ""
  let mode: mo = ""

  if (urlSlug[0] === "new") {
    icon = "create"
    mode = "creating"
  } else {
    icon = "visibility"
    mode = "visualizing"
  }

  return {
    props: { locationIcon: icon, mode: mode }
  }
}

const acaoSelecionada: NextPage<acaoManagement> = props => {
  const [name, setName] = useState("")
  const [canonical, setCanonical] = useState("")
  const [alerMessage, setAlerMessage] = useState("")
  const [showAlert, setShowAlert] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const globalContext = useGlobalCtx()

  const create = async () => {
    try {
      setLoading(true)

      const apiResult = await fetchApi.post(
        security.action.new,
        {
          name: name,
          canonical: canonical
        },
        {
          headers: {
            authorization: globalContext.user?.credential
          }
        }
      )

      if (!apiResult.success) throw new Error(apiResult.message)

      setLoading(false)
      setAlerMessage(apiResult.message || "")
      setShowAlert(true)

      const newId = apiResult.data.id
      router.push(`/painel/acao/management/${newId}`)
    } catch (error: any) {
      setLoading(false)
      setAlerMessage(error.message)
      setShowAlert(true)
    }
  }

  const update = async () => {
    try {
      setLoading(true)

      const id = router.query.slug ? router.query.slug[0] : ""

      const apiResult = await fetchApi.post(
        security.action.update(id),
        {
          name: name,
          canonical: canonical
        },
        {
          headers: {
            authorization: globalContext.user?.credential
          }
        }
      )

      if (!apiResult.success) throw new Error(apiResult.message)

      setLoading(false)
      setAlerMessage(apiResult.message || "")
      setShowAlert(true)

      const newId = apiResult.data.id
      router.push(`/painel/acao/management/${newId}`)
    } catch (error: any) {
      setLoading(false)
      setAlerMessage(error.message)
      setShowAlert(true)
    }
  }

  const saveAction = async () => {
    if (props.mode === "creating") await create()
    else if (props.mode === "visualizing") await update()
  }

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
          href:
            props.mode === "creating"
              ? "/painel/acao/management/new"
              : `/painel/acao/management/${
                  router.query.slug ? router.query.slug[0] : ""
                }`,
          iconName: props.locationIcon,
          text: props.mode === "creating" ? "Criando ação" : "Vizualizando ação"
        }
      ]}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Paper sx={{ padding: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <TextField
                  label="Nome"
                  fullWidth
                  value={name}
                  inputProps={{
                    maxLength: 40
                  }}
                  onChange={e => {
                    setName(e.target.value)
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <TextField
                  label="Nome canónico"
                  fullWidth
                  value={canonical}
                  inputProps={{
                    maxLength: 40
                  }}
                  onChange={e => {
                    setCanonical(e.target.value)
                  }}
                />
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

            <Button variant="contained" endIcon={<Save />} onClick={saveAction}>
              Salvar
            </Button>
          </Box>
        </Grid>
      </Grid>
    </PanelFrame>
  )
}

export default acaoSelecionada
