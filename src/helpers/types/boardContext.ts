export type participantsType = { id: number; photo: string; nome: string }
export type cardsType = { id: number; name: string }
export type columnsType = { id: number; name: string; cards: cardsType[] }

export type boardContext = {
  boardName: string
  participants: participantsType[]
  columns: columnsType[]
}

const constructor = (): boardContext => {
  return {
    boardName: "tarefas do doido",
    participants: [],
    columns: []
  }
}

export { constructor }
