import { PanelFrame } from "@/components"
import Editor from "@/components/Editor"
import {
  cardContentStyle,
  CssSelect,
  CssTextField
} from "@/helpers/cardContentStyle"
import { serverSide } from "@/helpers/serverside/boardContext"
import { boardContext } from "@/helpers/types/boardContext"
import {
  Add,
  ArrowBack,
  ArrowBackIos,
  ArrowDownward,
  ArrowForward,
  ArrowForwardIos,
  ArrowUpward,
  AttachFile,
  Close,
  Delete,
  Edit,
  KeyboardArrowDown,
  KeyboardArrowUp,
  MoreHoriz,
  Send,
  Visibility
} from "@mui/icons-material"
import {
  Avatar,
  Box,
  Button,
  Chip,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Modal,
  OutlinedInput,
  Stack,
  Tooltip,
  Typography
} from "@mui/material"
import { GetServerSideProps, NextPage } from "next"
import { useState } from "react"

export const getServerSideProps: GetServerSideProps<
  boardContext
> = async context => {
  return serverSide(context)
}

const BoardContent: NextPage<boardContext> = ({ ...props }) => {
  const [alerMessage, setAlerMessage] = useState("")
  const [showAlert, setShowAlert] = useState(false)
  const [cardModal, setCardModal] = useState(true)

  const [boardContent, setBoardContent] = useState<boardContext>(props)

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [cardEl, setCardEl] = useState<null | HTMLElement>(null)

  const open = Boolean(anchorEl)
  const openCard = Boolean(cardEl)

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleCardClick = (event: any) => {
    setCardEl(event.currentTarget)
  }

  const handleCardClose = () => {
    setCardEl(null)
  }

  return (
    <PanelFrame
      alerMessage={alerMessage}
      showAlert={showAlert}
      title="Nome do quadro"
      locals={[
        {
          href: "/painel/inicio",
          iconName: "home",
          text: "Home"
        },
        {
          href: "/painel/tarefa",
          iconName: "dashboard",
          text: "Tarefas"
        },
        {
          href: "/painel/tarefa/board/sadasdasdad",
          iconName: "space_dashboard",
          text: "nome do quadro"
        }
      ]}
      closeAlert={() => {
        setShowAlert(false)
      }}
      outsideContent={
        <Box sx={{ width: "100%", display: "flex", justifyContent: "end" }}>
          <Button variant="contained" startIcon={<ArrowBack />}>
            voltar
          </Button>
        </Box>
      }
      dense
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Box
            sx={{
              width: "100%",
              height: "60px",
              p: 2,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "end",
              background: theme => theme.palette.primary.main
            }}
          >
            <Typography variant="body1" sx={{ marginRight: 1, color: "white" }}>
              integrantes:
            </Typography>

            {boardContent.participants.map((part, index) => (
              <Tooltip key={`participant-number-${index}`} title={part.nome}>
                <Avatar sx={{ width: 24, height: 24 }} />
              </Tooltip>
            ))}
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <div id="TaskContainer">
            {props.columns.map((cloumn, cIndex) => (
              <div key={`column-id-${cloumn.id}-key-${cIndex}`} id="TaskColumn">
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Grid
                      container
                      spacing={1}
                      sx={{ color: "white", fontSize: "10pt" }}
                    >
                      <Grid item xs={10} sm={10} md={10} lg={10} xl={10}>
                        <Box sx={{ paddingLeft: 2, userSelect: "none" }}>
                          {cloumn.name}
                        </Box>
                      </Grid>

                      <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
                        <Box sx={{ display: "flex", justifyContent: "center" }}>
                          <div
                            style={{ cursor: "pointer" }}
                            onClick={handleClick}
                          >
                            <MoreHoriz fontSize="small" />
                          </div>
                        </Box>

                        <Menu
                          anchorEl={anchorEl}
                          open={open}
                          onClose={handleClose}
                          sx={{
                            "& .MuiMenu-paper": {
                              backgroundColor: "#212121",
                              color: "white"
                            }
                          }}
                        >
                          <MenuItem onClick={handleClose}>
                            <ListItemIcon>
                              <Edit fontSize="small" sx={{ color: "white" }} />
                            </ListItemIcon>
                            <ListItemText>Renomear lista</ListItemText>
                          </MenuItem>
                          <MenuItem onClick={handleClose}>
                            <ListItemIcon>
                              <Delete
                                fontSize="small"
                                sx={{ color: "white" }}
                              />
                            </ListItemIcon>
                            <ListItemText>Excluir lista</ListItemText>
                          </MenuItem>
                          <MenuItem onClick={handleClose}>
                            <ListItemIcon>
                              <Add fontSize="small" sx={{ color: "white" }} />
                            </ListItemIcon>
                            <ListItemText>Adicionar cartão</ListItemText>
                          </MenuItem>
                          <Divider sx={{ my: 0.5 }} />
                          <MenuItem onClick={handleClose}>
                            <ListItemIcon>
                              <ArrowBack
                                fontSize="small"
                                sx={{ color: "white" }}
                              />
                            </ListItemIcon>
                            <ListItemText>Mover p/ Esquerda</ListItemText>
                          </MenuItem>
                          <MenuItem onClick={handleClose}>
                            <ListItemIcon>
                              <ArrowForward
                                fontSize="small"
                                sx={{ color: "white" }}
                              />
                            </ListItemIcon>
                            <ListItemText>Mover p/ Direita</ListItemText>
                          </MenuItem>
                          <MenuItem onClick={handleClose}>
                            <ListItemIcon>
                              <ArrowBackIos
                                fontSize="small"
                                sx={{ color: "white" }}
                              />
                            </ListItemIcon>
                            <ListItemText>Mover p/ o inicio</ListItemText>
                          </MenuItem>
                          <MenuItem onClick={handleClose}>
                            <ListItemIcon>
                              <ArrowForwardIos
                                fontSize="small"
                                sx={{ color: "white" }}
                              />
                            </ListItemIcon>
                            <ListItemText>Mover p/ o fim</ListItemText>
                          </MenuItem>
                        </Menu>
                      </Grid>
                    </Grid>
                  </Grid>

                  {cloumn.cards.map((cards, cardIndex) => (
                    <Grid
                      key={`column-id-${cloumn.id}-key-${cIndex}-card-id-${cards.id}-key-${cardIndex}`}
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
                          height: "70px",
                          background: "#424242",
                          borderRadius: 1,
                          cursor: "pointer"
                        }}
                        onClick={() => {}}
                      >
                        <div
                          style={{
                            color: "white",
                            fontFamily: [
                              "-apple-system",
                              "BlinkMacSystemFont",
                              "Segoe UI",
                              "Roboto",
                              "Noto Sans",
                              "Ubuntu",
                              "Droid Sans",
                              "Helvetica Neue",
                              "sans-serif"
                            ].join(","),
                            fontSize: "14px",
                            fontWeight: "400",
                            width: "100%",
                            marginBottom: "4px",
                            padding: "6px"
                          }}
                        >
                          <Grid container spacing={2}>
                            <Grid
                              sx={{ userSelect: "none" }}
                              item
                              xs={10}
                              sm={10}
                              md={10}
                              lg={10}
                              xl={10}
                            >
                              {cards.name}
                            </Grid>

                            <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
                              <div
                                style={{ cursor: "pointer" }}
                                onClick={handleCardClick}
                              >
                                <MoreHoriz fontSize="small" />
                              </div>
                            </Grid>

                            <Grid
                              item
                              xs={12}
                              sm={12}
                              md={12}
                              lg={12}
                              xl={12}
                            ></Grid>
                          </Grid>
                          <Menu
                            anchorEl={cardEl}
                            open={openCard}
                            onClose={handleCardClose}
                            sx={{
                              "& .MuiMenu-paper": {
                                backgroundColor: "#212121",
                                color: "white"
                              }
                            }}
                          >
                            <MenuItem onClick={handleCardClose}>
                              <ListItemIcon>
                                <Visibility
                                  fontSize="small"
                                  sx={{ color: "white" }}
                                />
                              </ListItemIcon>
                              <ListItemText>Visualizar</ListItemText>
                            </MenuItem>
                            <MenuItem onClick={handleCardClose}>
                              <ListItemIcon>
                                <Edit
                                  fontSize="small"
                                  sx={{ color: "white" }}
                                />
                              </ListItemIcon>
                              <ListItemText>Renomear cartão</ListItemText>
                            </MenuItem>
                            <MenuItem onClick={handleCardClose}>
                              <ListItemIcon>
                                <ArrowDownward
                                  fontSize="small"
                                  sx={{ color: "white" }}
                                />
                              </ListItemIcon>
                              <ListItemText>Mover p/ baixo</ListItemText>
                            </MenuItem>
                            <MenuItem onClick={handleCardClose}>
                              <ListItemIcon>
                                <KeyboardArrowDown
                                  fontSize="small"
                                  sx={{ color: "white" }}
                                />
                              </ListItemIcon>
                              <ListItemText>Mover p/ o fim</ListItemText>
                            </MenuItem>
                            <MenuItem onClick={handleCardClose}>
                              <ListItemIcon>
                                <ArrowUpward
                                  fontSize="small"
                                  sx={{ color: "white" }}
                                />
                              </ListItemIcon>
                              <ListItemText>Mover p/ cima</ListItemText>
                            </MenuItem>
                            <MenuItem onClick={handleCardClose}>
                              <ListItemIcon>
                                <KeyboardArrowUp
                                  fontSize="small"
                                  sx={{ color: "white" }}
                                />
                              </ListItemIcon>
                              <ListItemText>Mover p/ o início</ListItemText>
                            </MenuItem>
                          </Menu>
                        </div>
                      </Box>
                    </Grid>
                  ))}

                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Button
                      sx={{ color: "white" }}
                      variant="text"
                      fullWidth
                      startIcon={<Add />}
                    >
                      Adicionar Cartão
                    </Button>
                  </Grid>
                </Grid>
              </div>
            ))}

            <div id="TaskColumnAdd">
              <Button
                sx={{ color: "white" }}
                variant="text"
                fullWidth
                startIcon={<Add />}
              >
                Adicionar Lista
              </Button>
            </div>
          </div>
        </Grid>
      </Grid>

      <Modal
        open={cardModal}
        onClose={() => {
          setCardModal(false)
        }}
      >
        <Box sx={cardContentStyle}>
          <Grid container spacing={2}>
            <Grid item xs={11} sm={11} md={11} lg={11} xl={11}>
              <CssTextField
                fullWidth
                label="Título"
                InputProps={{ style: { color: "white" } }}
                variant="standard"
              />
            </Grid>

            <Grid item xs={1} sm={1} md={1} lg={1} xl={1}>
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center"
                }}
              >
                <IconButton>
                  <Close sx={{ color: "white" }} />
                </IconButton>
              </Box>
            </Grid>

            <Grid item xs={12} sm={12} md={7} lg={7} xl={7}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                  <Editor />
                </Grid>

                <Grid item xs={12} sm={11} md={11} lg={11} xl={11}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      position: "relative",
                      width: "100%",
                      height: "73px",
                      background: "#424242",
                      border: "1px solid white",
                      borderRadius: 1,
                      p: 1,
                      overflowY: "hidden",
                      overflowX: "scroll",
                      "&::-webkit-scrollbar": {
                        height: "8px"
                      },
                      "&::-webkit-scrollbar-track": {
                        background: "#424242"
                      },
                      "&::-webkit-scrollbar-thumb": {
                        background: "#212121",
                        backgroundClip: "padding-box",
                        borderRadius: "10px",
                        border: "2px solid transparent"
                      }
                    }}
                  >
                    <Stack direction="row" spacing={1}>
                      <Chip
                        label="asdasd"
                        onDelete={() => {
                          console.log("asdasdasd")
                        }}
                      />
                    </Stack>
                  </Box>
                </Grid>

                <Grid item xs={12} sm={1} md={1} lg={1} xl={1}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "100%",
                      height: "100%"
                    }}
                  >
                    <IconButton>
                      <AttachFile sx={{ color: "white" }} />
                    </IconButton>
                  </Box>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} sm={12} md={5} lg={5} xl={5}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                  <FormControl fullWidth>
                    <InputLabel
                      sx={{
                        color: "white",
                        "&.Mui-focused": { color: "white" }
                      }}
                    >
                      Coluna
                    </InputLabel>
                    <CssSelect
                      variant="outlined"
                      fullWidth
                      labelId="columnSelect"
                      label="Coluna"
                      value={1}
                      onChange={e => {}}
                      MenuProps={{
                        PaperProps: {
                          sx: {
                            bgcolor: "#212121",
                            color: "white"
                          }
                        }
                      }}
                    >
                      <MenuItem value={1}>Coluna</MenuItem>
                      <MenuItem value={2}>Coluna2</MenuItem>
                    </CssSelect>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                  <FormControl fullWidth>
                    <InputLabel
                      sx={{
                        color: "white",
                        "&.Mui-focused": { color: "white" }
                      }}
                      id="stateSelect"
                    >
                      Status
                    </InputLabel>
                    <CssSelect
                      fullWidth
                      variant="outlined"
                      labelId="stateSelect"
                      label="Status"
                      onChange={e => {}}
                      MenuProps={{
                        PaperProps: {
                          sx: {
                            bgcolor: "#212121",
                            color: "white"
                          }
                        }
                      }}
                    >
                      <MenuItem value={undefined}>Status</MenuItem>
                    </CssSelect>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                  <FormControl fullWidth>
                    <InputLabel
                      sx={{
                        color: "white",
                        "&.Mui-focused": { color: "white" }
                      }}
                      id="participantes-id-select"
                    >
                      Participantes
                    </InputLabel>
                    <CssSelect
                      labelId="participantes-id-select"
                      multiple
                      value={[]}
                      input={
                        <OutlinedInput
                          id="select-multiple-participantes-chip"
                          label="Participantes"
                        />
                      }
                      MenuProps={{
                        PaperProps: {
                          sx: {
                            bgcolor: "#212121",
                            color: "white"
                          }
                        }
                      }}
                      renderValue={(selected: any) => (
                        <Box
                          sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}
                        >
                          {selected.map((value: any) => (
                            <Chip key={value} label={value} />
                          ))}
                        </Box>
                      )}
                    >
                      <MenuItem value={"asd"}>sddasdasd</MenuItem>
                    </CssSelect>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                  <FormControl fullWidth>
                    <InputLabel
                      sx={{
                        color: "white",
                        "&.Mui-focused": { color: "white" }
                      }}
                      id="dep-id-select"
                    >
                      Dependencias
                    </InputLabel>
                    <CssSelect
                      labelId="dep-id-select"
                      multiple
                      value={[]}
                      input={
                        <OutlinedInput
                          id="select-multiple-chip"
                          label="Dependencias"
                        />
                      }
                      MenuProps={{
                        PaperProps: {
                          sx: {
                            bgcolor: "#212121",
                            color: "white"
                          }
                        }
                      }}
                      renderValue={(selected: any) => (
                        <Box
                          sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}
                        >
                          {selected.map((value: any) => (
                            <Chip key={value} label={value} />
                          ))}
                        </Box>
                      )}
                    >
                      <MenuItem value={"asd"}>sddasdasd</MenuItem>
                    </CssSelect>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                  <Typography variant="caption" sx={{ marginLeft: 1 }}>
                    Atividades:
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                  <FormControl fullWidth>
                    <CssTextField
                      multiline
                      maxRows={3}
                      placeholder="Adicione um comentário"
                      InputProps={{
                        style: { color: "white" },
                        endAdornment: (
                          <IconButton>
                            <Send sx={{ color: "white" }} />
                          </IconButton>
                        )
                      }}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                  <Box
                    sx={{
                      position: "relative",
                      width: "100%",
                      height: 306,
                      background: "#212121",
                      borderRadius: 1,
                      p: 1,
                      overflowY: "scroll",
                      "&::-webkit-scrollbar": {
                        width: "8px"
                      },
                      "&::-webkit-scrollbar-track": {
                        background: "#212121"
                      },
                      "&::-webkit-scrollbar-thumb": {
                        background: "#424242",
                        backgroundClip: "padding-box",
                        borderRadius: "10px",
                        border: "2px solid transparent"
                      }
                    }}
                  >
                    <Grid container>
                      <Grid item xs={12} sm={1} md={1} lg={1} xl={1}>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "100%"
                          }}
                        >
                          <Avatar sx={{ width: 28, height: 28 }} />
                        </Box>
                      </Grid>

                      <Grid item xs={12} sm={11} md={11} lg={11} xl={11}>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "center",
                            height: "100%",
                            pl: 1
                          }}
                        >
                          <Typography variant="caption">
                            asdasdasdasds asdasdasdasds asdasdasdasds
                            asdasdasdasds asdasdasdasds asdasdasdasds
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </PanelFrame>
  )
}

export default BoardContent
