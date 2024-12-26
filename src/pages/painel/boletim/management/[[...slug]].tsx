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

  const [sectionsSelected, setSectionsSelected] = useState<number[]>([])
  const [boletinContent, setBoletinContent] = useState<{ id: number; name: string; itens: [] }[]>([])

  const router = useRouter()

  const computeSections = () => { }

  useEffect(() => {
    for (let i = 0; i < sectionsSelected.length; i++) {
      const finded = boletinContent.find(b => b.id === sectionsSelected[i])

      if (finded) { } else { }
    }
  }, [sectionsSelected])

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
                value={boletinContent.map(b => b.id)}
                renderValue={selected => `${selected.length} selecionado(s)`}
                onChange={(event: SelectChangeEvent<number[]>) => {
                  setSectionsSelected(event.target.value as number[])
                }}
              >
                {props.sections.map(item => (
                  <MenuItem
                    key={`menu-item-section-${item.id}`}
                    value={item.id}
                  >
                    <Checkbox checked={boletinContent.map(b => b.id).includes(item.id)} />
                    <ListItemText primary={item.name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          {/*  */}
        </Grid>
      </Paper>
      <Modal
        open={deleteModal}
        onClose={() => {
          setDeleteModal(false)
        }}
      >
        <Box sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "#FAFAFA",
          boxShadow: 24,
          p: 2
        }}>
          <Grid container>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </PanelFrame>
  )
}

export default BoletimContent
