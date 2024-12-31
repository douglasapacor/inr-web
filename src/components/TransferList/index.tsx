import {
  Box,
  Button,
  Checkbox,
  Grid,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  TextField
} from "@mui/material"
import { useState } from "react"
import { transferList, transferListBasics } from "./types"
import { Search } from "@mui/icons-material"

const TransferList = <T extends transferListBasics>(
  properties: transferList<T>
): JSX.Element => {
  const [leftChecked, setLeftChecked] = useState<T[]>([])
  const [rightChecked, setRightChecked] = useState<T[]>([])
  const [rightList, setRightList] = useState<T[]>([])

  const leftHandleToggle = (value: T) => () => {
    const currentIndex = leftChecked.indexOf(value)
    const newChecked = [...leftChecked]

    if (currentIndex === -1) {
      newChecked.push(value)
    } else {
      newChecked.splice(currentIndex, 1)
    }

    setLeftChecked(newChecked)
  }

  const rightHandleToggle = (value: T) => () => {
    const currentIndex = rightChecked.indexOf(value)
    const newChecked = [...rightChecked]

    if (currentIndex === -1) {
      newChecked.push(value)
    } else {
      newChecked.splice(currentIndex, 1)
    }

    setRightChecked(newChecked)
  }

  const leftToRight = () => {
    const list = leftChecked.filter(value => !rightList.includes(value))
    setRightList(list)
  }

  const rightToLeft = () => {
    const newList = rightList.filter(value => !rightChecked.includes(value))

    setRightChecked([])
    setRightList(newList)

    const cleanLeft = leftChecked.filter(value => newList.includes(value))

    setLeftChecked(cleanLeft)
  }

  return (
    <Grid
      container
      spacing={2}
      sx={{ justifyContent: "center", alignItems: "center" }}
    >
      <Grid item xs={12} sm={5} md={5} lg={5} xl={5}>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Grid
              container
              spacing={1}
              sx={{ justifyContent: "center", alignItems: "center" }}
            >
              <Grid item xs={10} sm={10} md={10} lg={10} xl={10}>
                <TextField variant="outlined" fullWidth placeholder="buscar" />
              </Grid>

              <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
                <Button fullWidth variant="contained">
                  <Search />
                </Button>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Paper sx={{ overflow: "auto", height: 500 }}>
              <List dense component="div" role="list">
                {properties.source.map((item: T) => {
                  return (
                    <ListItemButton
                      key={`transfer-list-item-${item.id}-item-button`}
                      role="listitem"
                      onClick={leftHandleToggle(item)}
                      disabled={rightList.includes(item)}
                    >
                      <ListItemIcon>
                        <Checkbox
                          checked={leftChecked.includes(item)}
                          disableRipple
                          inputProps={{
                            "aria-labelledby": `transfer-list-item-${item.id}-label`
                          }}
                        />
                      </ListItemIcon>

                      <ListItemText
                        id={`transfer-list-item-${item.id}-label`}
                        primary={item.name}
                      />
                    </ListItemButton>
                  )
                })}
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12} sm={2} md={2} lg={2} xl={2}>
        <Grid container direction="column" sx={{ alignItems: "center" }}>
          <Button
            sx={{ my: 2 }}
            variant="outlined"
            size="small"
            disabled={leftChecked.length === 0}
            aria-label="Mover selecionados para direita"
            fullWidth
            onClick={leftToRight}
          >
            &gt;
          </Button>

          <Button
            sx={{ my: 2 }}
            variant="outlined"
            size="small"
            disabled={rightChecked.length === 0}
            aria-label="Mover selecionados para esquerda"
            fullWidth
            onClick={rightToLeft}
          >
            &lt;
          </Button>
        </Grid>
      </Grid>

      <Grid item xs={12} sm={5} md={5} lg={5} xl={5}>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Box
              sx={{
                width: "100%",
                height: 56,
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              selecionados
            </Box>
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Paper sx={{ overflow: "auto", height: 500 }}>
              <List dense component="div" role="list">
                {rightList.map((item: T) => {
                  return (
                    <ListItemButton
                      key={`transfer-list-item-${item.id}-item-button`}
                      role="listitem"
                      onClick={rightHandleToggle(item)}
                    >
                      <ListItemIcon>
                        <Checkbox
                          checked={rightChecked.includes(item)}
                          disableRipple
                          inputProps={{
                            "aria-labelledby": `transfer-list-item-${item.id}-label`
                          }}
                        />
                      </ListItemIcon>

                      <ListItemText
                        id={`transfer-list-item-${item.id}-label`}
                        primary={item.name}
                      />
                    </ListItemButton>
                  )
                })}
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        <Grid container>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            debug:
          </Grid>
          <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
            {JSON.stringify(leftChecked)}
          </Grid>
          <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
            {JSON.stringify(rightChecked)}
          </Grid>
          <Grid item xs={6} sm={6} md={6} lg={6} xl={6}></Grid>
          <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
            {JSON.stringify(rightList)}
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        <Button
          fullWidth
          variant="contained"
          onClick={() => {
            properties.out && properties.out(rightList)
          }}
        >
          Confirmar
        </Button>
      </Grid>
    </Grid>
  )
}

export default TransferList
