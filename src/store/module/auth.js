export default {
  namespaced: true,
  state() {
    return {
      user: {
        fullName: "",
        token: "",
        mail: "",
        role: "manager",
        access: {
          pages: {
            1: "editor",
            2: "contentManager",
          },
          modules: [],
        },
      },
    };
  },
  getters: {
    userAccess: ({ user }) => user.access,
    role: ({ user }) => user.role,
  },
};
