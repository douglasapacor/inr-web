import { Banner, SiteFrame } from "@/components"
import { Favorite, Instagram, LinkedIn, ThumbUp } from "@mui/icons-material"
import {
  Box,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  IconButton,
  Typography
} from "@mui/material"
import { NextPage } from "next"

const inicio: NextPage = () => {
  return (
    <SiteFrame>
      <Banner />
      <Container>
        <Box sx={{ paddingY: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <Box
                sx={{
                  widht: "100%",
                  textAlign: "center",
                  fontFamily: "'Segoe UI', sans-serif"
                }}
              >
                <Typography variant="h4">DESTAQUES</Typography>
              </Box>
            </Grid>

            <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
              <Card elevation={3}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image="https://inrpublicacoes.com.br/sistema/img_up/1727283894.jpg"
                    alt="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Notícias
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      Falecimento do avô ou avó aposentada pode gerar pensão
                      para o neto? – (INSS).
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions disableSpacing>
                  <IconButton aria-label="add to favorites">
                    <Favorite />
                  </IconButton>
                  <IconButton aria-label="share">
                    <LinkedIn />
                  </IconButton>
                  <IconButton aria-label="share">
                    <ThumbUp />
                  </IconButton>
                  <IconButton aria-label="share">
                    <Instagram />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>

            <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
              <Card elevation={3}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image="https://inrpublicacoes.com.br/sistema/img_up/1727283894.jpg"
                    alt="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Notícias
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      Falecimento do avô ou avó aposentada pode gerar pensão
                      para o neto? – (INSS).
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions disableSpacing>
                  <IconButton aria-label="add to favorites">
                    <Favorite />
                  </IconButton>
                  <IconButton aria-label="share">
                    <LinkedIn />
                  </IconButton>
                  <IconButton aria-label="share">
                    <ThumbUp />
                  </IconButton>
                  <IconButton aria-label="share">
                    <Instagram />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>

            <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
              <Card elevation={3}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image="https://inrpublicacoes.com.br/sistema/img_up/1727283894.jpg"
                    alt="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Notícias
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      Falecimento do avô ou avó aposentada pode gerar pensão
                      para o neto? – (INSS).
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions disableSpacing>
                  <IconButton aria-label="add to favorites">
                    <Favorite />
                  </IconButton>
                  <IconButton aria-label="share">
                    <LinkedIn />
                  </IconButton>
                  <IconButton aria-label="share">
                    <ThumbUp />
                  </IconButton>
                  <IconButton aria-label="share">
                    <Instagram />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              PUBLICIDADE
            </Grid>

            <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
              <Card elevation={3}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image="https://inrpublicacoes.com.br/sistema/img_up/1727283894.jpg"
                    alt="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Notícias
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      Falecimento do avô ou avó aposentada pode gerar pensão
                      para o neto? – (INSS).
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions disableSpacing>
                  <IconButton aria-label="add to favorites">
                    <Favorite />
                  </IconButton>
                  <IconButton aria-label="share">
                    <LinkedIn />
                  </IconButton>
                  <IconButton aria-label="share">
                    <ThumbUp />
                  </IconButton>
                  <IconButton aria-label="share">
                    <Instagram />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>

            <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
              <Card elevation={3}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image="https://inrpublicacoes.com.br/sistema/img_up/1727283894.jpg"
                    alt="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Notícias
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      Falecimento do avô ou avó aposentada pode gerar pensão
                      para o neto? – (INSS).
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions disableSpacing>
                  <IconButton aria-label="add to favorites">
                    <Favorite />
                  </IconButton>
                  <IconButton aria-label="share">
                    <LinkedIn />
                  </IconButton>
                  <IconButton aria-label="share">
                    <ThumbUp />
                  </IconButton>
                  <IconButton aria-label="share">
                    <Instagram />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>

            <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
              <Card elevation={3}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image="https://inrpublicacoes.com.br/sistema/img_up/1727283894.jpg"
                    alt="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Notícias
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      Falecimento do avô ou avó aposentada pode gerar pensão
                      para o neto? – (INSS).
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions disableSpacing>
                  <IconButton aria-label="add to favorites">
                    <Favorite />
                  </IconButton>
                  <IconButton aria-label="share">
                    <LinkedIn />
                  </IconButton>
                  <IconButton aria-label="share">
                    <ThumbUp />
                  </IconButton>
                  <IconButton aria-label="share">
                    <Instagram />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              PUBLICIDADE
            </Grid>

            <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
              <Card elevation={3}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image="https://inrpublicacoes.com.br/sistema/img_up/1727283894.jpg"
                    alt="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Notícias
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      Falecimento do avô ou avó aposentada pode gerar pensão
                      para o neto? – (INSS).
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions disableSpacing>
                  <IconButton aria-label="add to favorites">
                    <Favorite />
                  </IconButton>
                  <IconButton aria-label="share">
                    <LinkedIn />
                  </IconButton>
                  <IconButton aria-label="share">
                    <ThumbUp />
                  </IconButton>
                  <IconButton aria-label="share">
                    <Instagram />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>

            <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
              <Card elevation={3}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image="https://inrpublicacoes.com.br/sistema/img_up/1727283894.jpg"
                    alt="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Notícias
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      Falecimento do avô ou avó aposentada pode gerar pensão
                      para o neto? – (INSS).
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions disableSpacing>
                  <IconButton aria-label="add to favorites">
                    <Favorite />
                  </IconButton>
                  <IconButton aria-label="share">
                    <LinkedIn />
                  </IconButton>
                  <IconButton aria-label="share">
                    <ThumbUp />
                  </IconButton>
                  <IconButton aria-label="share">
                    <Instagram />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>

            <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
              <Card elevation={3}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image="https://inrpublicacoes.com.br/sistema/img_up/1727283894.jpg"
                    alt="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Notícias
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      Falecimento do avô ou avó aposentada pode gerar pensão
                      para o neto? – (INSS).
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions disableSpacing>
                  <IconButton aria-label="add to favorites">
                    <Favorite />
                  </IconButton>
                  <IconButton aria-label="share">
                    <LinkedIn />
                  </IconButton>
                  <IconButton aria-label="share">
                    <ThumbUp />
                  </IconButton>
                  <IconButton aria-label="share">
                    <Instagram />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              PUBLICIDADE
            </Grid>
          </Grid>
        </Box>
      </Container>
    </SiteFrame>
  )
}

export default inicio
