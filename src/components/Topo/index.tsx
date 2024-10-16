import {
  Avatar,
  Badge,
  Box,
  Button,
  Container,
  Grid,
  Icon,
  IconButton,
  Typography
} from "@mui/material"
import Image from "next/image"
import type { FC } from "react"

export const Topo: FC = ({ ...props }) => {
  return (
    <div
      style={{
        width: "100%",
        height: 100
      }}
    >
      <Container>
        <Grid container justifyContent="space-between">
          <Grid item xs={12} sm={6} md={6} lg={3} xl={3}>
            <Box
              sx={{
                width: "100%",
                height: 100,
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <a href="/site/inicio">
                <Image
                  src="https://inrpublicacoes.com.br/site/img/topo/logo_inr.svg"
                  width="161"
                  height="81"
                  alt="INR Logo"
                />
              </a>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={6} lg={4} xl={4}>
            <Box
              sx={{
                width: "100%",
                height: 100,
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Grid container>
                <Grid item xs={12} sm={12} md={9} lg={9} xl={9}>
                  <Grid container justifyContent="center" alignItems="center">
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                      <Box
                        sx={{
                          width: "100%",
                          height: "100%",
                          textAlign: "center",
                          p: 0.7
                        }}
                      >
                        <Typography variant="body2">
                          <strong>Nome do usuário</strong>
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                      <Box
                        sx={{
                          width: "100%",
                          height: "100%",
                          display: "flex",
                          justifyContent: "center",
                          p: 0.7
                        }}
                      >
                        <IconButton>
                          <Badge badgeContent={5} color="primary">
                            <Icon>notifications</Icon>
                          </Badge>
                        </IconButton>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                      <Box
                        sx={{
                          width: "100%",
                          height: "100%",
                          display: "flex",
                          justifyContent: "center",
                          p: 0.7
                        }}
                      >
                        <IconButton>
                          <Icon>person</Icon>
                        </IconButton>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                      <Box
                        sx={{
                          width: "100%",
                          height: "100%",
                          display: "flex",
                          justifyContent: "center",
                          p: 0.7
                        }}
                      >
                        <IconButton>
                          <Icon>settings</Icon>
                        </IconButton>
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
                  <Box
                    sx={{
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "column"
                    }}
                  >
                    <Box sx={{ marginBottom: 0.7 }}>
                      <Avatar>H</Avatar>
                    </Box>

                    <Button size="small">sair</Button>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}
