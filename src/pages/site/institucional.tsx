import { SiteFrame } from "@/components"
import { Box, Container, Grid, Icon, Typography } from "@mui/material"
import { NextPage } from "next"
import React, { FC } from "react"

const CentralisedBoxIcon: FC<{ iconName: string; text: string }> = ({
  ...props
}) => {
  return (
    <Box
      sx={{
        width: "100%"
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Icon fontSize="large">{props.iconName}</Icon>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Typography variant="body2" sx={{ textAlign: "center" }}>
            {props.text}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  )
}

const Institucional: NextPage = () => {
  return (
    <SiteFrame>
      <Grid container>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <section
            style={{
              width: "100%",
              height: 250,
              fontSize: "1.7rem",
              backgroundImage:
                "url('/images/textura_banner.png'), url('/images/header_areas/institucional/banner.jpg')",
              backgroundPosition: "left top, center top",
              backgroundSize: "auto auto, 100%",
              backgroundRepeat: "repeat, no-repeat",
              backgroundColor: "#006092",
              backgroundBlendMode: "difference, multiply",
              position: "relative",
              overflow: "hidden",
              margin: "0 auto 0",
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <h1
              style={{
                fontFamily: "RobotoSlab",
                fontWeight: "normal",
                textTransform: "uppercase",
                color: "#fff"
              }}
            >
              Institucional
            </h1>
          </section>
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <section style={{ width: "100%" }}>
            <Container>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center"
                }}
              >
                <h1
                  style={{
                    fontFamily: "RobotoSlab",
                    fontWeight: "normal",
                    color: "#006092",
                    fontSize: "2.2em"
                  }}
                >
                  Quem somos
                </h1>
              </Box>
            </Container>
          </section>
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <section
            style={{
              width: "100%",
              fontSize: "0.8em",
              textAlign: "justify",
              fontFamily: "Arial, Helvetica, sans-serif"
            }}
          >
            <Container>
              <p>
                O&nbsp;<strong>INR</strong>
                <strong>&nbsp;</strong>começou a dar seus primeiros passos no
                fim da década de 1980, época em que o artigo 236 da Constituição
                Federal ainda era um grande mistério para o mundo jurídico
                nacional.
              </p>
              <p>
                Ao longo destas três décadas, as{" "}
                <strong>
                  Publicações&nbsp;<strong>INR</strong>&nbsp;
                </strong>
                assumiram papel de destaque no cenário notarial e registral
                brasileiro.
              </p>
              <p>
                E hoje, com cerca de 5000 leitores, o&nbsp;<strong>INR</strong>
                <strong>&nbsp;</strong>quer dar mais um importante passo, ser a
                publicação mais buscada e lida no meio notarial e registral. E
                ter você como um&nbsp;<strong>Assinante INR</strong>&nbsp;é um
                privilégio, pois nossa finalidade é entregar conteúdo de
                qualidade e de muita relevância para a sua rotina.
              </p>
              <p>
                Seja&nbsp;<strong>Assinante INR</strong>
                <strong>&nbsp;</strong>e receba o mais importante
                periódico&nbsp;editado por uma empresa especializada e dirigido
                a você&nbsp;Notário e Registrador do Brasil.
              </p>
            </Container>
          </section>
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <section>
            <Container>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center"
                }}
              >
                <h1
                  style={{
                    fontFamily: "RobotoSlab",
                    fontWeight: "normal",
                    color: "#006092",
                    fontSize: "2.2em"
                  }}
                >
                  O que fazemos
                </h1>
              </Box>
            </Container>
          </section>
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <section>
            <Container>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center"
                }}
              >
                <h1
                  style={{
                    fontFamily: "RobotoSlab",
                    fontWeight: "normal",
                    color: "#006092",
                    fontSize: "2.2em"
                  }}
                >
                  Informamos (Boletim Eletrônico INR)
                </h1>
              </Box>
            </Container>
          </section>
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Container>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
                <CentralisedBoxIcon iconName="library_books" text="Notícias" />
              </Grid>
              <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
                <CentralisedBoxIcon
                  iconName="menu_book"
                  text="Jurisprudência"
                />
              </Grid>
              <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
                <CentralisedBoxIcon
                  iconName="library_books"
                  text="Legislação"
                />
              </Grid>
              <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
                <CentralisedBoxIcon iconName="question_answer" text="Opnião" />
              </Grid>
              <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
                <CentralisedBoxIcon
                  iconName="live_help"
                  text="Perguntas e Respostas"
                />
              </Grid>
              <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
                <CentralisedBoxIcon
                  iconName="library_books"
                  text="Mensagens dos Editores"
                />
              </Grid>

              {/* divisão */}

              <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
                <CentralisedBoxIcon iconName="library_books" text="Notícias" />
              </Grid>
              <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
                <CentralisedBoxIcon
                  iconName="menu_book"
                  text="Jurisprudência"
                />
              </Grid>
              <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
                <CentralisedBoxIcon
                  iconName="library_books"
                  text="Legislação"
                />
              </Grid>
              <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
                <CentralisedBoxIcon iconName="question_answer" text="Opnião" />
              </Grid>
              <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
                <CentralisedBoxIcon
                  iconName="live_help"
                  text="Perguntas e Respostas"
                />
              </Grid>
              <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
                <CentralisedBoxIcon
                  iconName="library_books"
                  text="Mensagens dos Editores"
                />
              </Grid>
            </Grid>
          </Container>
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <section>
            <Container>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center"
                }}
              >
                <h1
                  style={{
                    fontFamily: "RobotoSlab",
                    fontWeight: "normal",
                    color: "#006092",
                    fontSize: "2.2em"
                  }}
                >
                  Instruímos
                </h1>
              </Box>
            </Container>
          </section>
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Container>
            <Grid
              container
              spacing={3}
              justifyContent="center"
              alignItems="center"
            >
              <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
                <CentralisedBoxIcon
                  iconName="library_books"
                  text="Consultoria"
                />
              </Grid>

              <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
                <CentralisedBoxIcon iconName="library_books" text="Cursos" />
              </Grid>

              <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
                <CentralisedBoxIcon iconName="library_books" text="TV INR" />
              </Grid>
            </Grid>
          </Container>
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Box sx={{ width: "100%", background: "#E0E0E0", padding: 1 }}>
            <Container>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center"
                    }}
                  >
                    <h1
                      style={{
                        fontFamily: "RobotoSlab",
                        fontWeight: "normal",
                        color: "#006092",
                        fontSize: "1.8em"
                      }}
                    >
                      Dirigentes das Publicações INR
                    </h1>
                  </Box>
                </Grid>

                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                  <Grid
                    container
                    spacing={2}
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                      foto
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                      foto
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                      foto
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                  Nome
                </Grid>

                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                  texto
                </Grid>

                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                  email
                </Grid>
              </Grid>
            </Container>
          </Box>
        </Grid>
      </Grid>
    </SiteFrame>
  )
}

export default Institucional
