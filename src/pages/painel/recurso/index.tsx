import { DataGrid, PanelFrame } from "@/components"
import security from "@/config/actions/security"
import { useContextMaster } from "@/context/Master"
import { deleteStyle } from "@/helpers/deleteStyle"
import fetchApi from "@/lib/fetchApi"
import { Add } from "@mui/icons-material"
import {
  Box,
  Button,
  Divider,
  Fab,
  Grid,
  Icon,
  Modal,
  Paper,
  TextField,
  Typography
} from "@mui/material"
import { NextPage } from "next"
import { useRouter } from "next/router"
import { useState } from "react"

const recursos: NextPage = () => {
  const [alerMessage, setAlerMessage] = useState("")
  const [showAlert, setShowAlert] = useState(false)
  const [name, setName] = useState("")
  const [canonical, setCanonical] = useState("")
  const [deviceId, setDeviceId] = useState(0)
  const [active, setActive] = useState(false)
  const [visible, setVisible] = useState(false)
  const [icon, setIcon] = useState("")
  const [path, setPath] = useState("")
  const [gridData, setGridData] = useState([])
  const [count, setCount] = useState(0)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [gridLoading, setGridLoading] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [deleteThis, setDeleteThis] = useState<number | null>(null)
  const ctx = useContextMaster()
  const router = useRouter()

  const requestConfirmation = (id: number) => {
    setDeleteThis(id)
    setDeleteModal(true)
  }

  const deleteComponent = async () => {
    try {
      if (!deleteThis) throw new Error("Erro ao excluir recurso")

      setGridLoading(true)
      setDeleteModal(false)

      const response = await fetchApi.del(
        security.feature.delete(deleteThis),
        ctx.user ? ctx.user.credential : ""
      )

      if (response.success) {
        setGridLoading(false)
        setAlerMessage(response.message || "")
        setShowAlert(true)
        search()
      } else throw new Error(response.message)
    } catch (error: any) {
      setDeleteModal(false)
      setGridLoading(false)
      setAlerMessage(error.message)
      setShowAlert(true)
    }
  }

  const search = async () => {
    try {
      setGridLoading(true)

      const dataSearch = await fetchApi.post(
        security.feature.search,
        {
          name: name,
          canonical: canonical,
          active: active,
          visible: visible,
          deviceComponentsId: deviceId,
          icon: icon,
          path: path,
          limit: rowsPerPage,
          offset: page
        },
        ctx.user ? ctx.user.credential : ""
      )

      if (!dataSearch.success) throw new Error(dataSearch.message)

      setCount(dataSearch.data.count)
      setGridData(dataSearch.data.list)
      setGridLoading(false)
    } catch (error: any) {
      setGridLoading(false)
      setAlerMessage(error.message)
      setShowAlert(true)
    }
  }

  return (
    <PanelFrame
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
      outsideContent={
        <Box
          sx={{ width: "100%", display: "flex", justifyContent: "flex-end" }}
        >
          <Fab
            color="primary"
            aria-label="add"
            onClick={() => {
              router.push("/painel/recurso/management/new")
            }}
          >
            <Add />
          </Fab>
        </Box>
      }
    >
      <Paper sx={{ padding: 2 }}>
        <Grid container spacing={2} alignItems="center" textAlign="center">
          <Grid item xs={12} sm={12} md={5} lg={5} xl={5}>
            <TextField
              fullWidth
              label="Nome"
              value={name}
              onKeyDown={e => {
                if (e.key === "Enter") {
                  search()
                }
              }}
              onChange={event => {
                setName(event.target.value)
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={5} lg={5} xl={5}>
            <TextField
              fullWidth
              label="Identificação númérica"
              value={deviceId}
              onChange={event => {
                setDeviceId(+event.target.value)
              }}
              onKeyDown={e => {
                if (e.key === "Enter") {
                  search()
                }
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
            <Button variant="contained" fullWidth onClick={search}>
              Buscar
            </Button>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Typography variant="body1">Recursos existentes</Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Divider />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <DataGrid
              data={gridData}
              loading={gridLoading}
              headers={[
                {
                  text: "Nome",
                  attrName: "name",
                  align: "center"
                },
                {
                  text: "Identificação númérica",
                  attrName: "deviceid",
                  align: "center"
                }
              ]}
              hasActions
              actions={[
                {
                  icon: <Icon>visibility</Icon>,
                  name: "showComponent",
                  text: "Visualizar"
                },
                {
                  icon: <Icon>delete</Icon>,
                  name: "deleteComponent",
                  text: "Excluir"
                }
              ]}
              actionTrigger={(id: number, actionName: string) => {
                switch (actionName) {
                  case "showComponent":
                    router.push(`/painel/componente/management/${id}`)
                    break
                  case "deleteComponent":
                    requestConfirmation(id)
                    break
                }
              }}
              pagination={{
                count: count,
                page: page,
                rowsPerPage: rowsPerPage,
                rowsPerPageOptions: [10, 20, 30, 60],
                onPageChange(page) {
                  setPage(page)
                },
                onRowsPerPageChange(rowsPerPAge) {
                  setRowsPerPage(rowsPerPAge)
                }
              }}
            />
          </Grid>
        </Grid>
      </Paper>
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
                    setDeleteThis(null)
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

export default recursos
