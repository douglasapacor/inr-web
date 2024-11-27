import { PanelFrame } from "@/components"
import security from "@/config/actions/security"
import { useContextMaster } from "@/context/Master"
import { deleteStyle } from "@/helpers/deleteStyle"
import { serverSide } from "@/helpers/serverside/group"
import { featureGroupType, groupType } from "@/helpers/types/group"
import fetchApi from "@/lib/fetchApi"
import {
  ArrowBackIosNew,
  Check,
  Close,
  Delete,
  Save
} from "@mui/icons-material"
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Grid,
  Icon,
  InputLabel,
  MenuItem,
  Modal,
  Paper,
  Select,
  Switch,
  TextField,
  Typography
} from "@mui/material"
import { GetServerSideProps, NextPage } from "next"
import { useRouter } from "next/router"
import { useState } from "react"

export const getServerSideProps: GetServerSideProps<
  groupType
> = async context => {
  return serverSide(context)
}

const GrupoManagement: NextPage<groupType> = props => {
  const [id, setId] = useState<number | null>(props.group.id)
  const [alerMessage, setAlerMessage] = useState("")
  const [showAlert, setShowAlert] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState("")
  const [canon, setCanon] = useState("")
  const [active, setActive] = useState(true)
  const [featureList, setFeatureList] = useState<featureGroupType[]>(
    props.features
  )
  const router = useRouter()
  const ctx = useContextMaster()

  const requestConfirmation = () => {
    setDeleteModal(true)
  }

  const deleteComponent = async () => {
    try {
      if (!id) throw new Error("Erro ao excluir Recurso")

      setDeleteModal(false)
      setLoading(true)

      const response = await fetchApi.del(
        security.group.delete(id),
        ctx.user ? ctx.user.credential : ""
      )

      if (response.success) {
        setLoading(false)
        setAlerMessage(response.message || "")
        setShowAlert(true)
        router.push(`/painel/grupo`)
      } else throw new Error(response.message)
    } catch (error: any) {
      setDeleteModal(false)
      setLoading(false)
      setAlerMessage(error.message)
      setShowAlert(true)
    }
  }

  const create = async () => {
    try {
      setLoading(true)

      const apiResult = await fetchApi.post(
        security.group.new,
        {},
        ctx.user ? ctx.user.credential : ""
      )

      if (!apiResult.success) throw new Error(apiResult.message)

      setLoading(false)
      setAlerMessage(apiResult.message || "")
      setShowAlert(true)

      setId(apiResult.data.id)

      router.push(`/painel/grupo/management/${apiResult.data.id}`)
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
        security.group.update(id),
        {},
        ctx.user ? ctx.user.credential : ""
      )

      if (!apiResult.success) throw new Error(apiResult.message)

      setLoading(false)
      setAlerMessage(apiResult.message || "")
      setShowAlert(true)

      router.push(`/painel/grupo/management/${id}`)
    } catch (error: any) {
      setLoading(false)
      setAlerMessage(error.message)
      setShowAlert(true)
    }
  }

  const saveGroup = async () => {
    if (props.pageMode === "creating") await create()
    else if (props.pageMode === "visualizing") await update()
  }

  return (
    <PanelFrame
      alerMessage={alerMessage}
      showAlert={showAlert}
      title="Grupo de segurança"
      locals={[
        {
          href: "/painel/inicio",
          iconName: "home",
          text: "Home"
        },
        {
          href: "/painel/grupo",
          iconName: "group_work",
          text: "Grupo de segurança"
        },
        {
          href:
            props.pageMode === "creating"
              ? "/painel/grupo/management/new"
              : `/painel/grupo/management/${
                  router.query.slug ? router.query.slug[0] : ""
                }`,
          iconName: props.locationIcon,
          text:
            props.pageMode === "creating"
              ? "Criando Grupo de segurança"
              : "Vizualizando Grupo de segurança"
        }
      ]}
      closeAlert={() => {
        setShowAlert(false)
      }}
      loading={loading}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Paper sx={{ padding: 2 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
                <TextField
                  label="Nome do grupo"
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
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
                <TextField
                  label="Nome canónico"
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
              <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center"
                  }}
                >
                  <FormControlLabel
                    control={
                      <Switch
                        checked={active}
                        onChange={(_, checked) => {
                          setActive(checked)
                        }}
                      />
                    }
                    label="Ativo"
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center"
                  }}
                >
                  <FormControlLabel
                    control={
                      <Switch
                        checked={active}
                        onChange={(_, checked) => {
                          setActive(checked)
                        }}
                      />
                    }
                    label="Super"
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
                <FormControl fullWidth>
                  <InputLabel id="colorSelect">cor</InputLabel>
                  <Select fullWidth labelId="colorSelect" label="cor">
                    <MenuItem value={undefined}>Selecione uma cor</MenuItem>
                    {props.colors.map((c, i) => (
                      <MenuItem
                        key={`item-color-${i}`}
                        value={c.code}
                        sx={{ background: c.code }}
                      >
                        {c.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Box
                  sx={{
                    width: "100%",
                    border: theme => `1px solid ${theme.palette.primary.dark}`,
                    background: theme => theme.palette.secondary.contrastText,
                    p: 2
                  }}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                      <Typography variant="body2">Funções do grupo</Typography>
                    </Grid>

                    {props.features.map((f, i) => (
                      <Grid
                        key={`function-item-key-${i}`}
                        item
                        xs={12}
                        sm={4}
                        md={4}
                        lg={4}
                        xl={4}
                      >
                        <Paper sx={{ p: 2 }} elevation={1}>
                          <Grid container spacing={1}>
                            <Grid
                              key={`function-item-key-${i}`}
                              item
                              xs={4}
                              sm={4}
                              md={4}
                              lg={4}
                              xl={4}
                            >
                              <Box
                                sx={{
                                  width: "100%",
                                  height: "100%",
                                  display: "flex",
                                  justifyContent: "center",
                                  alignContent: "center",
                                  alignItems: "center",
                                  border: theme =>
                                    `1px solid ${theme.palette.primary.main}`,
                                  borderRadius: 1
                                }}
                              >
                                <Icon>{f.icon}</Icon>
                              </Box>
                            </Grid>
                            <Grid
                              key={`function-item-key-${i}`}
                              item
                              xs={8}
                              sm={8}
                              md={8}
                              lg={8}
                              xl={8}
                            >
                              <Grid container spacing={1} alignContent="center">
                                <Grid
                                  item
                                  xs={12}
                                  sm={12}
                                  md={12}
                                  lg={12}
                                  xl={12}
                                >
                                  <Box
                                    sx={{
                                      width: "100%",
                                      height: "100%",
                                      display: "flex",
                                      alignItems: "center",
                                      border: theme =>
                                        `1px solid ${theme.palette.primary.main}`,
                                      borderRadius: 1,
                                      fontSize: 14,
                                      textTransform: "lowercase",
                                      pl: 1
                                    }}
                                  >
                                    nome: {f.name}
                                  </Box>
                                </Grid>
                                <Grid
                                  item
                                  xs={12}
                                  sm={12}
                                  md={12}
                                  lg={12}
                                  xl={12}
                                >
                                  <Box
                                    sx={{
                                      width: "100%",
                                      height: "100%",
                                      display: "flex",
                                      alignItems: "center",
                                      border: theme =>
                                        `1px solid ${theme.palette.primary.main}`,
                                      borderRadius: 1,
                                      fontSize: 14,
                                      textTransform: "lowercase",
                                      pl: 1
                                    }}
                                  >
                                    Path: {f.path}
                                  </Box>
                                </Grid>
                                <Grid
                                  item
                                  xs={12}
                                  sm={12}
                                  md={12}
                                  lg={12}
                                  xl={12}
                                >
                                  <Box
                                    sx={{
                                      width: "100%",
                                      height: "100%",
                                      display: "flex",
                                      alignItems: "center",
                                      border: theme =>
                                        `1px solid ${theme.palette.primary.main}`,
                                      borderRadius: 1,
                                      fontSize: 14,
                                      textTransform: "lowercase",
                                      pl: 1
                                    }}
                                  >
                                    {f.deviceComponentsName}
                                  </Box>
                                </Grid>
                                <Grid
                                  item
                                  xs={12}
                                  sm={12}
                                  md={12}
                                  lg={12}
                                  xl={12}
                                >
                                  <Box
                                    sx={{
                                      width: "100%",
                                      display: "flex",
                                      justifyContent: "center",
                                      alignContent: "center"
                                    }}
                                  >
                                    <Box
                                      sx={{
                                        width: "100%",
                                        height: "100%",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        border: theme =>
                                          `1px solid ${theme.palette.primary.main}`,
                                        borderRadius: 1,
                                        fontSize: 14,
                                        textTransform: "lowercase",
                                        p: 1
                                      }}
                                    >
                                      {f.visible ? (
                                        <Icon color="success">visibility</Icon>
                                      ) : (
                                        <Icon color="error">VisibilityOff</Icon>
                                      )}
                                    </Box>
                                  </Box>
                                </Grid>
                                <Grid
                                  item
                                  xs={12}
                                  sm={12}
                                  md={12}
                                  lg={12}
                                  xl={12}
                                >
                                  <Box
                                    sx={{
                                      width: "100%",
                                      height: "100%",
                                      display: "flex",
                                      alignItems: "center",
                                      justifyItems: "center",
                                      justifyContent: "center",
                                      textAlign: "center"
                                    }}
                                  >
                                    <FormControlLabel
                                      control={
                                        <Switch
                                          checked={f.checked}
                                          onChange={(_, checked) => {}}
                                        />
                                      }
                                      label={
                                        f.checked ? "incluido" : "não incluido"
                                      }
                                    />
                                  </Box>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Paper>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
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
                router.push("/painel/grupo")
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

            <Button variant="contained" endIcon={<Save />} onClick={saveGroup}>
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

export default GrupoManagement
