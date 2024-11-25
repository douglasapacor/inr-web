import {
  Box,
  Button,
  Grid,
  Modal,
  Paper,
  TextField,
  Typography
} from "@mui/material"
import { PanelFrame } from "@/components"
import security from "@/config/actions/security"
import { useContextMaster } from "@/context/Master"
import fetchApi from "@/lib/fetchApi"
import { ArrowBackIosNew, Delete, Save } from "@mui/icons-material"
import { GetServerSideProps, NextPage } from "next"
import { useRouter } from "next/router"
import { useState } from "react"
import { acaoManagement, action } from "@/helpers/types/acao"
import { locationIcon, pageMode } from "@/helpers/types/geral"
import { deleteStyle } from "@/helpers/deleteStyle"

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

  let icon: locationIcon = ""
  let mode: pageMode = ""
  let action: action | null = null

  if (urlSlug[0] === "new") {
    icon = "create"
    mode = "creating"
  } else {
    icon = "visibility"
    mode = "visualizing"

    const response = await fetchApi.get(
      security.action.select(+urlSlug[0]),
      context.req.cookies["master-key-inr"]
    )

    if (response.success) {
      action = response.data
    }
  }

  return {
    props: { locationIcon: icon, mode: mode, action }
  }
}

const acaoSelecionada: NextPage<acaoManagement> = props => {
  const [id, setId] = useState<number | null>(
    props.action ? props.action.id : null
  )
  const [name, setName] = useState(props.action ? props.action.name : "")
  const [canonical, setCanonical] = useState(
    props.action ? props.action.canonical : ""
  )
  const [alerMessage, setAlerMessage] = useState("")
  const [showAlert, setShowAlert] = useState(false)
  const [loading, setLoading] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const router = useRouter()
  const ctx = useContextMaster()

  const create = async () => {
    try {
      setLoading(true)

      const apiResult = await fetchApi.post(
        security.action.new,
        {
          name: name,
          canonical: canonical
        },
        ctx.user ? ctx.user.credential : ""
      )

      if (!apiResult.success) throw new Error(apiResult.message)

      setLoading(false)
      setAlerMessage(apiResult.message || "")
      setShowAlert(true)

      const newId = apiResult.data.id
      setId(newId)
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
        ctx.user ? ctx.user.credential : ""
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

  const requestConfirmation = () => {
    setDeleteModal(true)
  }

  const deleteAction = async () => {
    try {
      if (!id) throw new Error("Erro ao excluir Ação")

      setDeleteModal(false)
      setLoading(true)

      const response = await fetchApi.del(
        security.action.delete(id),
        ctx.user ? ctx.user.credential : ""
      )

      if (response.success) {
        setLoading(false)
        setAlerMessage(response.message || "")
        setShowAlert(true)
        router.push(`/painel/acao`)
      } else throw new Error(response.message)
    } catch (error: any) {
      setDeleteModal(false)
      setLoading(false)
      setAlerMessage(error.message)
      setShowAlert(true)
    }
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

            <Button variant="contained" endIcon={<Save />} onClick={saveAction}>
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
                  onClick={deleteAction}
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

export default acaoSelecionada
