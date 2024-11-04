import { DataGrid, PanelFrame } from "@/components"
import security from "@/config/actions/security"
import { useGlobalCtx } from "@/context/Global"
import fetchApi from "@/lib/fetchApi"
import { Add } from "@mui/icons-material"
import {
  Box,
  Button,
  Divider,
  Fab,
  Grid,
  Icon,
  Paper,
  TextField,
  Typography
} from "@mui/material"
import { NextPage } from "next"
import { useRouter } from "next/router"
import { useState } from "react"

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
  const globalCtx = useGlobalCtx()
  const router = useRouter()
  const deleteAcao = (id: number) => {}
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
        {
          headers: {
            Authorization: globalCtx.user ? globalCtx.user.credential : ""
          }
        }
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
                    deleteAcao(id)
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
    </PanelFrame>
  )
}

export default acoes
