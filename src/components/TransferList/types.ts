export type contentListType = {
  id: number
  name: string
}

export type customListType = {
  content: contentListType[]
  checked: contentListType[]
}

export type transferList = {
  in: customListType[]
}
