const security = {
  user: {
    new: "/new",
    select: (id: string) => `/${id}`,
    update: (id: string) => `/${id}/update`,
    delete: (id: string) => `/${id}/delete`,
    search: "/",
    authentication: "/authentication",
    recoveryPassword: "/recovery_password",
    confirmRecovery: "/confirm_recovery"
  },
  group: {
    new: "/new",
    select: (id: string) => `/${id}`,
    update: (id: string) => `/${id}/update`,
    delete: (id: string) => `/${id}/delete`,
    search: "/"
  },
  feature: {
    new: "/new",
    select: (id: string) => `/${id}`,
    update: (id: string) => `/${id}/update`,
    delete: (id: string) => `/${id}/delete`,
    search: "/"
  },
  deviceComponent: {
    new: "/new",
    select: (id: string) => `/${id}`,
    update: (id: string) => `/${id}/update`,
    delete: (id: string) => `/${id}/delete`,
    search: "/"
  },
  action: {
    new: "/new",
    select: (id: string) => `/${id}`,
    update: (id: string) => `/${id}/update`,
    delete: (id: string) => `/${id}/delete`,
    search: "/"
  }
}

export default security
