import apiConfigs from "../apiConfigs"

const management = {
  board: {
    findMembers: (query: string) =>
      `${apiConfigs.management}/board/find-members?${query}`
  }
}

export default management
