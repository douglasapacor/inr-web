import { PanelFrame } from "@/components"
import security from "@/config/actions/security"
import { useContextMaster } from "@/context/Master"
import fetchApi from "@/lib/fetchApi"
import { ArrowBackIosNew, Delete, Save } from "@mui/icons-material"
import {
  Box,
  Button,
  Grid,
  Modal,
  Paper,
  TextField,
  Typography
} from "@mui/material"
import { GetServerSideProps, NextPage } from "next"
import { useRouter } from "next/router"
import { useState } from "react"
type mo = "visualizing" | "creating" | ""
type ic = "visibility" | "create" | ""
type component = {
  id: number
  name: string
  deviceId: string
  createdName: string
  createdAt: Date
  updatedName: string | null
  updatedAt: Date | null
}
type componentManagement = {
  locationIcon: ic
  mode: mo
  component: component | null
}
const deleteStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "#FAFAFA",
  border: "2px solid #000",
  boxShadow: 24,
  p: 2
}
export const getServerSideProps: GetServerSideProps<
  componentManagement
> = async context => {
  const urlSlug = context.params?.slug

  if (!urlSlug) {
    return {
      props: { locationIcon: "", mode: "", component: null },
      redirect: {
        destination: "/painel/inicio?erro=2"
      }
    }
  }

  if (!context.req.cookies["master-key-inr"]) {
    return {
      props: { locationIcon: "", mode: "", component: null },
      redirect: {
        destination: "/painel/inicio?erro=3"
      }
    }
  }

  let icon: ic = ""
  let mode: mo = ""
  let component: component | null = null

  if (urlSlug[0] === "new") {
    icon = "create"
    mode = "creating"
  } else {
    icon = "visibility"
    mode = "visualizing"

    const response = await fetchApi.get(
      security.deviceComponent.select(+urlSlug[0]),
      {
        headers: {
          Authorization: context.req.cookies["master-key-inr"]
        }
      }
    )

    if (response.success) {
      component = response.data
    }
  }

  return {
    props: { locationIcon: icon, mode: mode, component }
  }
}

const componentSelecionada: NextPage<componentManagement> = props => {
  const [id, setId] = useState<number | null>(
    props.component ? props.component.id : null
  )
  const [name, setName] = useState(props.component ? props.component.name : "")
  const [deviceId, setDeviceId] = useState(
    props.component ? props.component.deviceId : 0
  )
  const [alerMessage, setAlerMessage] = useState("")
  const [showAlert, setShowAlert] = useState(false)
  const [loading, setLoading] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const router = useRouter()
  const ctx = useContextMaster()

  const requestConfirmation = () => {
    setDeleteModal(true)
  }

  const create = async () => {
    try {
      setLoading(true)

      const apiResult = await fetchApi.post(
        security.deviceComponent.new,
        {
          name,
          deviceId
        },
        {
          headers: {
            authorization: ctx.user ? ctx.user.credential : ""
          }
        }
      )

      if (!apiResult.success) throw new Error(apiResult.message)

      setLoading(false)
      setAlerMessage(apiResult.message || "")
      setShowAlert(true)

      const newId = apiResult.data.id
      setId(newId)
      router.push(`/painel/componente/management/${newId}`)
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
        security.deviceComponent.update(id),
        {
          name: name,
          deviceId: deviceId
        },
        {
          headers: {
            authorization: ctx.user ? ctx.user.credential : ""
          }
        }
      )

      if (!apiResult.success) throw new Error(apiResult.message)

      setLoading(false)
      setAlerMessage(apiResult.message || "")
      setShowAlert(true)

      router.push(`/painel/componente/management/${id}`)
    } catch (error: any) {
      setLoading(false)
      setAlerMessage(error.message)
      setShowAlert(true)
    }
  }

  const deleteComponent = async () => {
    try {
      if (!id) throw new Error("Erro ao excluir Componente")

      setDeleteModal(false)
      setLoading(true)

      const response = await fetchApi.del(security.deviceComponent.delete(id), {
        headers: {
          Authorization: ctx.user ? ctx.user.credential : null
        }
      })

      if (response.success) {
        setLoading(false)
        setAlerMessage(response.message || "")
        setShowAlert(true)
        router.push(`/painel/componente`)
      } else throw new Error(response.message)
    } catch (error: any) {
      setDeleteModal(false)
      setLoading(false)
      setAlerMessage(error.message)
      setShowAlert(true)
    }
  }

  const saveComponent = async () => {
    if (props.mode === "creating") await create()
    else if (props.mode === "visualizing") await update()
  }

  return (
    <PanelFrame
      alerMessage={alerMessage}
      showAlert={showAlert}
      title="Componente"
      loading={loading}
      locals={[
        {
          href: "/painel/inicio",
          iconName: "home",
          text: "Home"
        },
        {
          href: "/painel/componente",
          iconName: "settings_input_component",
          text: "Ações"
        },
        {
          href:
            props.mode === "creating"
              ? "/painel/componente/management/new"
              : `/painel/componente/management/${
                  router.query.slug ? router.query.slug[0] : ""
                }`,
          iconName: props.locationIcon,
          text:
            props.mode === "creating"
              ? "Criando componente"
              : "Vizualizando componente"
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
                  label="Nome do componente"
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
                  label="identificação númérica"
                  fullWidth
                  value={deviceId}
                  inputProps={{
                    maxLength: 40
                  }}
                  onChange={e => {
                    setDeviceId(+e.target.value)
                  }}
                />
              </Grid>

              {props.component && (
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                  <Typography variant="caption">
                    <strong>Criado por: </strong>
                    {props.component.createdName}
                    <strong> em: </strong>
                    {new Date(
                      props.component.createdAt
                    ).toLocaleDateString()}{" "}
                    {new Date(props.component.createdAt).toLocaleTimeString()}
                    {props.component && props.component.updatedAt ? (
                      <>
                        <strong> Editado por: </strong>
                        {props.component.updatedName}
                        <strong> em: </strong>
                        {new Date(
                          props.component.updatedAt
                        ).toLocaleDateString()}{" "}
                        {new Date(
                          props.component.updatedAt
                        ).toLocaleTimeString()}
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
                router.push("/painel/componente")
              }}
            >
              Voltar
            </Button>

            <Button
              variant="contained"
              color="error"
              endIcon={<Delete />}
              onClick={() => {
                requestConfirmation()
              }}
            >
              excluir
            </Button>

            <Button
              variant="contained"
              endIcon={<Save />}
              onClick={saveComponent}
            >
              Salvar
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Modal
        open={deleteModal}
        onClose={() => {
          setDeleteModal(false)
        }}
      >
        <Box sx={deleteStyle}>
          <Grid container>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  p: 1
                }}
              >
                <h4>EXCLUSÃO DE CONTEÚDO</h4>
              </Box>
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <Box
                sx={{
                  paddingLeft: 4,
                  paddingRight: 4,
                  marginBottom: 4
                }}
              >
                Você tem certeza que deseja excluir esse item ? Essa ação é
                irreversível.
              </Box>
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <Box sx={{ display: "flex", justifyContent: "space-around" }}>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => {
                    setDeleteModal(false)
                  }}
                >
                  Cancelar
                </Button>
                <Button
                  variant="contained"
                  color="success"
                  onClick={deleteComponent}
                >
                  Confirmar
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </PanelFrame>
  )
}

export default componentSelecionada
