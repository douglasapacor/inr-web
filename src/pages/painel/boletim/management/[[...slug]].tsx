import { PanelFrame } from "@/components"
import { deleteStyle } from "@/helpers/deleteStyle"
import { serverSide } from "@/helpers/serverside/boletimManagement"
import { boletimManagement } from "@/helpers/types/buletimManagement"
import { Add } from "@mui/icons-material"
import {
  Box,
  Button,
  Checkbox,
  Fab,
  FormControl,
  Grid,
  InputLabel,
  ListItemText,
  MenuItem,
  Modal,
  OutlinedInput,
  Paper,
  Select,
  SelectChangeEvent,
  Typography
} from "@mui/material"
import { GetServerSideProps, NextPage } from "next"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

export const getServerSideProps: GetServerSideProps<
  boletimManagement
> = async context => {
  return serverSide(context)
}

const BoletimContent: NextPage<boletimManagement> = props => {
  const [alerMessage, setAlerMessage] = useState("")
  const [showAlert, setShowAlert] = useState(false)
  const [deleteModal, setDeleteModal] = useState(true)
  const [sections, setSections] = useState<number[]>([])
  const router = useRouter()

  return (
    <PanelFrame
      alerMessage={alerMessage}
      showAlert={showAlert}
      title="Boletim"
      locals={[
        {
          href: "/painel/inicio",
          iconName: "home",
          text: "Home"
        },
        {
          href: "/painel/boletim",
          iconName: "list_alt",
          text: "Boletins"
        }
      ]}
      closeAlert={() => {
        setShowAlert(false)
      }}
    >
      <Paper sx={{ padding: 1 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Typography variant="body1">
              <strong>CONTEÚDO DO BOLETIM</strong>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Typography variant="body2" sx={{ color: "#BDBDBD" }}>
              Selecione quais as sessões estarão presente no boletim.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <FormControl fullWidth>
              <InputLabel id="sections-bulletin-item">
                Sessões do boletim
              </InputLabel>
              <Select
                labelId="sections-bulletin-item"
                label="Sessões do boletim"
                input={<OutlinedInput label="Sessões do boletim" />}
                multiple
                value={sections}
                renderValue={selected => `${selected.length} selecionado(s)`}
                onChange={(event: SelectChangeEvent<number[]>) => {
                  setSections(event.target.value as number[])
                }}
              >
                {props.sections.map(item => (
                  <MenuItem
                    key={`menu-item-section-${item.id}`}
                    value={item.id}
                  >
                    <Checkbox checked={sections.includes(item.id)} />
                    <ListItemText primary={item.name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {sections.map(section => (
            <Grid
              key={`item-section-selected-${section}`}
              item
              xs={2}
              sm={2}
              md={2}
              lg={2}
              xl={2}
            >
              <Box sx={{ width: "100%", height: "80px", background: "red" }}>
                {props.sections.find(findItem => findItem.id === section)?.name}
              </Box>
            </Grid>
          ))}
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
                    setDeleteModal(false)
                  }}
                >
                  Cancelar
                </Button>
                <Button variant="contained" color="success">
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

export default BoletimContent
