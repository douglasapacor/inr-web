class ComponenteAmbiental {
  path: string
  icon: string
  name: string

  constructor(path: string, icon: string, name: string) {
    this.path = path
    this.icon = icon
    this.name = name
  }
}

class Ambiente {
  aplication: ComponenteAmbiental[]
  usuario: ComponenteAmbiental[]

  constructor() {
    this.aplication = []
    this.usuario = []
  }
}

class Usuario {
  nome: string = ""
  foto: string = ""
  authorized: boolean = false
  ambiente: Ambiente

  constructor() {
    this.ambiente = new Ambiente()
  }

  authorize() {
    this.authorized = true
  }

  logout() {
    this.authorized = false
  }
}

export class ContextoGlobal {
  usuario: Usuario

  constructor() {
    this.usuario = new Usuario()
  }
}

export const globalCtxDefault: ContextoGlobal = new ContextoGlobal()
