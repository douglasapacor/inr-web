import apiConfigs from "../apiConfigs"

const legacy = {
  boletim: {
    description: (id: number) => `${apiConfigs.legacy}/description/${id}`,
    news: {
      home: `${apiConfigs.legacy}/news`,
      select: (id: string) => `${apiConfigs.legacy}/news/${id}`
    },
    legislation: {
      home: `${apiConfigs.legacy}/legislation`,
      select: (id: string) => `${apiConfigs.legacy}/legislation/${id}`
    },
    jurisprudence: {
      home: `${apiConfigs.legacy}/jurisprudence`,
      select: (id: string) => `${apiConfigs.legacy}/jurisprudence/${id}`
    },
    opinion: {
      home: `${apiConfigs.legacy}/opinion`,
      select: (id: string) => `${apiConfigs.legacy}/opinion/${id}`
    },
    questionAndAnswer: {
      home: `${apiConfigs.legacy}/questions-answers`,
      select: (id: string) => `${apiConfigs.legacy}/questions-answers/${id}`
    },
    messagesEditors: {
      home: `${apiConfigs.legacy}/messages-editors`,
      select: (id: string) => `${apiConfigs.legacy}/messages-editors/${id}`
    },
    pareceres: {
      home: `${apiConfigs.legacy}/pareceres`,
      select: (id: string) => `${apiConfigs.legacy}/pareceres/${id}`
    }
  }
}

export default legacy
