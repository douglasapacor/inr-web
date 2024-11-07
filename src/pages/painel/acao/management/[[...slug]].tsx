import { PanelFrame } from "@/components"
import security from "@/config/actions/security"
import { useGlobalCtx } from "@/context/Global"
import fetchApi from "@/lib/fetchApi"
import { ArrowBackIosNew, Save } from "@mui/icons-material"
import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material"
import { GetServerSideProps, NextPage } from "next"
import { useRouter } from "next/router"
import { useState } from "react"
type mo = "visualizing" | "creating" | ""
type ic = "visibility" | "create" | ""
type action = {
  id: number
  name: string
  canonical: string
  createdName: string
  createdAt: Date
  updatedName: string | null
  updatedAt: Date | null
}
type acaoManagement = {
  locationIcon: ic
  mode: mo
  action: action | null
}

export const getServerSideProps: GetServerSideProps<
  acaoManagement
> = async context => {
  const urlSlug = context.params?.slug

  if (!urlSlug) {
    return {
      props: { locationIcon: "", mode: "", action: null },
      redirect: {
        destination: "/painel/inicio?erro=2"
      }
    }
  }

  let icon: ic = ""
  let mode: mo = ""
  let action: action | null = null

  if (urlSlug[0] === "new") {
    icon = "create"
    mode = "creating"
  } else {
    icon = "visibility"
    mode = "visualizing"

    const response = await fetchApi.get(security.action.select(urlSlug[0]))

    if (response.success) {
      action = response.data
    }
  }

  return {
    props: { locationIcon: icon, mode: mode, action }
  }
}

const acaoSelecionada: NextPage<acaoManagement> = props => {
  const [id] = useState<number | null>(props.action ? props.action.id : null)
  const [name, setName] = useState(props.action ? props.action.name : "")
  const [canonical, setCanonical] = useState(
    props.action ? props.action.canonical : ""
  )
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

      if (!id) throw new Error("Erro ao editar.")

      const apiResult = await fetchApi.put(
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

      router.push(`/painel/acao/management/${id}`)
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
      closeAlert={() => {
        setShowAlert(false)
      }}
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

              {props.action && (
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                  <Typography variant="caption">
                    <strong>Criado por: </strong>
                    {props.action.createdName}
                    <strong> em: </strong>
                    {new Date(props.action.createdAt).toLocaleDateString()}{" "}
                    {new Date(props.action.createdAt).toLocaleTimeString()}
                    {props.action && props.action.updatedAt ? (
                      <>
                        <strong> Editado por: </strong>
                        {props.action.updatedName}
                        <strong> em: </strong>
                        {new Date(
                          props.action.updatedAt
                        ).toLocaleDateString()}{" "}
                        {new Date(props.action.updatedAt).toLocaleTimeString()}
                      </>
                    ) : (
                      ""
                    )}
                  </Typography>
                </Grid>
              )}
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
