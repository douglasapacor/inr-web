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
import { DataGrid, PanelFrame } from "@/components"
import security from "@/config/actions/security"
import { useContextMaster } from "@/context/Master"
import fetchApi from "@/lib/fetchApi"
import { Add } from "@mui/icons-material"
import { NextPage } from "next"
import { useRouter } from "next/router"
import { useState } from "react"
import { deleteStyle } from "@/helpers/deleteStyle"


const acoes: NextPage = () => {
  const [alerMessage, setAlerMessage] = useState("")
  const [showAlert, setShowAlert] = useState(false)
  const [name, setName] = useState("")
  const [canon, setCanon] = useState("")
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

  const deleteAction = async () => {
    try {
      if (!deleteThis) throw new Error("Erro ao excluir Ação")
      setGridLoading(true)
      setDeleteModal(false)

      const response = await fetchApi.del(
        security.action.delete(deleteThis),
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
        security.action.search,
        {
          name: name,
          canonical: canon,
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

  const handlePage = async (p: number) => {
    try {
      setGridLoading(true)
      setPage(p)

      const dataSearch = await fetchApi.post(
        security.action.search,
        {
          name: name,
          canonical: canon,
          limit: rowsPerPage,
          offset: p
        },
        ctx.user ? ctx.user.credential : ""
      )

      if (!dataSearch.success) throw new Error(dataSearch.message)

      setGridData(dataSearch.data.list)
      setCount(dataSearch.data.count)
      setGridLoading(false)
    } catch (error: any) {
      setGridLoading(false)
      setAlerMessage(error.message)
      setShowAlert(true)
    }
  }

  const handleRowsPerPage = async (rpp: number) => {
    try {
      setGridLoading(true)
      setRowsPerPage(rpp)

      const dataSearch = await fetchApi.post(
        security.action.search,
        {
          name: name,
          canonical: canon,
          limit: rpp,
          offset: page
        },
        ctx.user ? ctx.user.credential : ""
      )

      if (!dataSearch.success) throw new Error(dataSearch.message)

      setGridData(dataSearch.data.list)
      setCount(dataSearch.data.count)
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
      title="Ações"
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
              router.push("/painel/acao/management/new")
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
              label="Nome canónico"
              value={canon}
              onChange={event => {
                setCanon(event.target.value)
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
            <Typography variant="body1">Ações existentes</Typography>
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
                  text: "Nome canónico",
                  attrName: "canonical",
                  align: "center"
                }
              ]}
              hasActions
              actions={[
                {
                  icon: <Icon>visibility</Icon>,
                  name: "showAction",
                  text: "Visualizar"
                },
                {
                  icon: <Icon>delete</Icon>,
                  name: "deleteAction",
                  text: "Excluir"
                }
              ]}
              actionTrigger={(id: number, actionName: string) => {
                switch (actionName) {
                  case "showAction":
                    router.push(`/painel/acao/management/${id}`)
                    break
                  case "deleteAction":
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
                  handlePage(page)
                },
                onRowsPerPageChange(rowsPerPAge) {
                  handleRowsPerPage(rowsPerPAge)
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

export default acoes
