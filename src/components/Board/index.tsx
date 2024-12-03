import { Box, Grid, Icon, Paper, Typography } from "@mui/material";
import { FC } from "react";

type boardType = {
  color: string
}

const Board: FC<boardType> = ({ ...props }) => {
  return <Paper elevation={2} sx={{ cursor: "pointer", backgroundColor: props.color, p: 1, height: 120 }}>
    <Grid container>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        <Typography variant="h6" sx={{ color: "white" }}>Nome do quadro</Typography>
      </Grid>
    </Grid>
  </Paper>
}

export default Board