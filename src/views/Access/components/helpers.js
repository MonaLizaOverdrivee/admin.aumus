export default class {
  static addBaseRole(obj) {
    return { ...obj, role: "contentManager" };
  }
  static toArrayOfObject(obj) {
    return Object.keys(obj).map((itm) => ({ id: itm, ...obj[itm] }));
  }
  static buildRequest(model, pass, roles) {
    const userRole = model.role.type
    const request = { ...model, role: roles[userRole] };
    if (pass) request.password = pass;
    if (userRole === "admin") request.access = null;
    if(userRole === "manager" && !request.access) request.access.module.push("/pages")
    return request;
  }
}
