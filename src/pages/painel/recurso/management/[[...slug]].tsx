import { PanelFrame } from "@/components"
import security from "@/config/actions/security"
import { useContextMaster } from "@/context/Master"
import fetchApi from "@/lib/fetchApi"
import { ArrowBackIosNew, Delete, Save } from "@mui/icons-material"
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  Paper,
  Select,
  SelectChangeEvent,
  Switch,
  TextField,
  Typography
} from "@mui/material"
import { GetServerSideProps, NextPage } from "next"
import { useRouter } from "next/router"
import { useState } from "react"
type mo = "visualizing" | "creating" | ""
type ic = "visibility" | "create" | ""
type feature = {
  id: number
  name: string
  canonical: string
  actions: number[]
  active: boolean
  visible: boolean
  deviceComponentsId: number
  icon: string
  path: string
  createdName: string
  createdAt: Date
  updatedName: string | null
  updatedAt: Date | null
}
type deviceList = { id: number; name: string; deviceid: number }
type featureManagement = {
  locationIcon: ic
  mode: mo
  deviceList: deviceList[]
  deviceListSize: number
  feature: feature | null
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
  featureManagement
> = async context => {
  try {
    if (!context.req.cookies["master-key-inr"]) throw new Error("2")

    const urlSlug = context.params?.slug
    if (!urlSlug) throw new Error("1")

    let icon: ic = "visibility"
    let mode: mo = "visualizing"
    let feature: feature | null = null

    if (urlSlug[0] === "new") {
      icon = "create"
      mode = "creating"
    } else {
      const response = await fetchApi.get(
        security.feature.select(+urlSlug[0]),
        {
          headers: {
            Authorization: context.req.cookies["master-key-inr"]
          }
        }
      )

      if (response.success) feature = response.data
    }

    const compList = await fetchApi.post(
      security.deviceComponent.search,
      {
        name: "",
        deviceId: 0,
        limit: 5,
        offset: 0
      },
      {
        headers: {
          Authorization: context.req.cookies["master-key-inr"]
        }
      }
    )

    if (!compList.success) throw new Error("3")

    return {
      props: {
        locationIcon: icon,
        mode: mode,
        deviceList: compList.data.list,
        deviceListSize: compList.data.count,
        feature
      }
    }
  } catch (error: any) {
    return {
      props: {
        locationIcon: "",
        mode: "",
        deviceList: [],
        deviceListSize: 0,
        feature: null
      },
      redirect: {
        destination: `/painel/inicio?erro=${error.message}`
      }
    }
  }
}

const recursoSelecionado: NextPage<featureManagement> = props => {
  const [id, setId] = useState<number | null>(
    props.feature ? props.feature.id : null
  )
  const [name, setName] = useState(props.feature ? props.feature.name : "")
  const [canonical, setCanonical] = useState(
    props.feature ? props.feature.canonical : ""
  )
  const [actions, setActions] = useState(
    props.feature ? props.feature.actions : []
  )
  const [active, setActive] = useState(
    props.feature ? props.feature.active : false
  )
  const [visible, setVisible] = useState(
    props.feature ? props.feature.visible : false
  )
  const [deviceList, setDeviceList] = useState<deviceList[]>(props.deviceList)
  const [deviceComponentsId, setDeviceComponentsId] = useState(
    props.feature ? props.feature.deviceComponentsId : 0
  )
  const [icon, setIcon] = useState(props.feature ? props.feature.icon : "")
  const [path, setPath] = useState(props.feature ? props.feature.path : "")
  const [page, setPage] = useState(1)
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
          name
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
          name: name
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

  const loadMoreItems = async (e: any) => {
    const bottom =
      e.target.scrollHeight === e.target.scrollTop + e.target.clientHeight

    if (bottom && deviceList.length < props.deviceListSize) {
      const dataSearch = await fetchApi.post(
        security.deviceComponent.search,
        {
          name: "",
          deviceId: 0,
          limit: 5,
          offset: page
        },
        {
          headers: {
            Authorization: ctx.user ? ctx.user.credential : ""
          }
        }
      )

      if (!dataSearch.success) throw new Error(dataSearch.message)

      setDeviceList(list => [...list, ...dataSearch.data.list])
      setPage(p => {
        return p + 1
      })
    }
  }

  return (
    <PanelFrame
      alerMessage={alerMessage}
      showAlert={showAlert}
      title="Recursos"
      loading={loading}
      locals={[
        {
          href: "/painel/inicio",
          iconName: "home",
          text: "Home"
        },
        {
          href: "/painel/recurso",
          iconName: "featured_play_list",
          text: "Recursos"
        },
        {
          href:
            props.mode === "creating"
              ? "/painel/recurso/management/new"
              : `/painel/recurso/management/${
                  router.query.slug ? router.query.slug[0] : ""
                }`,
          iconName: props.locationIcon,
          text:
            props.mode === "creating"
              ? "Criando recurso"
              : "Vizualizando recurso"
        }
      ]}
      closeAlert={() => {
        setShowAlert(false)
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Paper sx={{ padding: 2 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                <TextField
                  label="Nome do recurso"
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
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                <TextField
                  label="Nome Canónico"
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

              <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
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
              </Grid>

              <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
                <FormControlLabel
                  control={<Switch checked={visible} />}
                  label="Visivel"
                  onChange={(_, checked) => {
                    setVisible(checked)
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                <FormControl fullWidth>
                  <InputLabel id="componentSelect">Componente</InputLabel>
                  <Select
                    value={deviceComponentsId}
                    MenuProps={{
                      PaperProps: {
                        onScroll: loadMoreItems
                      },
                      style: {
                        maxHeight: 335
                      }
                    }}
                    label="Componente"
                    labelId="componentSelect"
                    onChange={(e: SelectChangeEvent<number>) => {
                      setDeviceComponentsId(+e.target.value)
                    }}
                  >
                    <MenuItem value={0}>Selecione...</MenuItem>
                    {deviceList.map(device => (
                      <MenuItem
                        key={`device-item-${new Date().getDate()}-${
                          device.id
                        }-${device.deviceid}`}
                        value={device.id}
                      >
                        {device.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                <TextField
                  label="ícone"
                  fullWidth
                  value={icon}
                  inputProps={{
                    maxLength: 40
                  }}
                  onChange={e => {
                    setIcon(e.target.value)
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                <TextField
                  label="Path"
                  fullWidth
                  value={path}
                  inputProps={{
                    maxLength: 40
                  }}
                  onChange={e => {
                    setPath(e.target.value)
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Box
                  sx={{
                    width: "100%",
                    border: "0.8px solid #757575",
                    borderRadius: 1,
                    paddingTop: 1,
                    paddingLeft: 2,
                    paddingRight: 2,
                    paddingBottom: 3
                  }}
                >
                  <Grid container spacing={1}>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                      <Typography variant="body2">Ações do recurso</Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                      <Typography variant="caption" color="#BDBDBD">
                        <strong>
                          Selecione quais as ações o recurso possuirá e poderá
                          fornecer aos usuários.
                        </strong>
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
                      <FormControlLabel
                        control={<Checkbox defaultChecked />}
                        label="Leitura"
                      />
                    </Grid>
                  </Grid>
                </Box>
              </Grid>

              {props.feature && (
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                  <Typography variant="caption">
                    <strong>Criado por: </strong>
                    {props.feature.createdName}
                    <strong> em: </strong>
                    {new Date(
                      props.feature.createdAt
                    ).toLocaleDateString()}{" "}
                    {new Date(props.feature.createdAt).toLocaleTimeString()}
                    {props.feature && props.feature.updatedAt ? (
                      <>
                        <strong> Editado por: </strong>
                        {props.feature.updatedName}
                        <strong> em: </strong>
                        {new Date(
                          props.feature.updatedAt
                        ).toLocaleDateString()}{" "}
                        {new Date(props.feature.updatedAt).toLocaleTimeString()}
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

export default recursoSelecionado
