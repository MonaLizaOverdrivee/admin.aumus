export default class {
  static addBaseRole(obj) {
    return { ...obj, role: "contentManager" }
  }
  static toArrayOfObject(obj) {
    return Object.keys(obj).map(itm => ({id: itm, ...obj[itm]}))
  }
}