import api from '@/api';

class User {
  constructor(role) {
    this.userRole = role
  }
  async getRole() {
    const { data } = api.users.getUserRole()
    this.userRole = data
  }
}


// async function getRole() {
//   const { data } = await api.users.getUserRole()
//   return data
// }
function useUser() {
  return new User()
}
export { User, useUser };