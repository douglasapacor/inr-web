import { Button, Grid } from "@mui/material"
import { FC, useState } from "react"
import CustomList from "./CustomList"
import { contentListType, transferList } from "./types"

const TransferList: FC<transferList> = ({ ...props }) => {
  const [leftChecked, setLeftChecked] = useState<contentListType[]>([])
  const [rightChecked, setRightChecked] = useState<contentListType[]>([])

  const checkLeft = (value: contentListType) => {
    const currentIndex = leftChecked.indexOf(value)
    const newLeftChecked = [...leftChecked]

    if (currentIndex === -1) {
      newLeftChecked.push(value)
    } else {
      newLeftChecked.splice(currentIndex, 1)
    }

    setLeftChecked(newLeftChecked)
  }

  const checkRight = (value: contentListType) => {
    const currentIndex = rightChecked.indexOf(value)
    const newRightChecked = [...rightChecked]

    if (currentIndex === -1) {
      newRightChecked.push(value)
    } else {
      newRightChecked.splice(currentIndex, 1)
    }

    setRightChecked(newRightChecked)
  }

  return (
    <Grid
      container
      spacing={1}
      sx={{ justifyContent: "center", alignItems: "center" }}
    >
      <Grid item xs={12} sm={5} md={5} lg={5} xl={5}>
        <CustomList content={props.in} checked={leftChecked} />
      </Grid>

      <Grid item xs={12} sm={2} md={2} lg={2} xl={2}>
        <Grid container direction="column" sx={{ alignItems: "center" }}>
          <Button
            sx={{ my: 1 }}
            variant="outlined"
            size="small"
            disabled={props.in.length === 0}
            aria-label="Mover selecionados para direita"
          >
            &gt;
          </Button>

          <Button
            sx={{ my: 1 }}
            variant="outlined"
            size="small"
            // disabled={props.out.length === 0}
            aria-label="Mover selecionados para esquerda"
          >
            &lt;
          </Button>
        </Grid>
      </Grid>

      <Grid item xs={12} sm={5} md={5} lg={5} xl={5}>
        <CustomList content={[]} checked={rightChecked} />
      </Grid>
    </Grid>
  )
}

export default TransferList
