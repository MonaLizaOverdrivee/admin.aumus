
class User {
  constructor(user) {
    this.user = user;
    this.userRole = {
      admin: { description: "admin", id: 4, name: "Admin", type: "admin" },
      manager: { description: "manager", id: 3, name: "Manager", type: "manager" },
    };
  }

  changeMainRole(type) {
    this.user.role = this.userRole[type];
  }
  addDefaultManagerRole() {}
  addNewAccess() {}
  getData() {
    return this.user;
  }
  getRole() {
  }
}

export { User };
