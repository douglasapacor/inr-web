type sectionType = {
  id: number
  name: string
}

export type boletimManagement = {
  sections: sectionType[]
}

const constructor = (): boletimManagement => {
  return {
    sections: []
  }
}

export { constructor }
