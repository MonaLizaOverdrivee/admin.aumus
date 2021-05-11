// import api from "@/api"
import { updatePermissions } from "@/utils/permissions"
// import { AbilityBuilder } from '@casl/ability';

export default {
  namespaced: true,
  state() {
    return {
      user: {
        fullName: "",
        token: "",
        mail: "",
        role: "admin",
        access: {
          pages: {
            3: "editor",
            2: "contentManager",
          },
          modules: ['/pages'],
        },
      },
    };
  },
  getters: {
    userAccess: ({ user }) => user.access,
    role: ({ user }) => user.role,
  },
  actions: {
    async login({ state }) {
      try {
        // const { data } = await api.auth.logIn('art', 'Q123456e')
        // console.log(data)
        //{role: data.user.role.type, modules: data.user.access.modules}
        updatePermissions({role: 'manager', modules: state.user.access.modules})

      } catch (error) {
        console.log(error)
      }
    }
  }
};
