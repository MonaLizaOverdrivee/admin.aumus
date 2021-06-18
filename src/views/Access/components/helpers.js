export default class {
  static addBaseRole(obj) {
    return { ...obj, role: "contentManager" };
  }
  static toArrayOfObject(obj) {
    return obj ? Object.keys(obj).map((itm) => ({ id: itm, ...obj[itm] })) : []
  }
  static buildRequest(user, pass, roles) {
    const userRole = user.role.type
    const request = { ...user, role: roles[userRole] };
    if (pass) request.password = pass;
    if (userRole === "admin") request.access = null;
    if(userRole === "manager" && !request.access) request.access.module.push("/pages")
    return request;
  }
}
