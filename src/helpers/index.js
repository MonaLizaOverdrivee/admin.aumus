import isEqual from "lodash/isEqual";
import cloneDeep from "lodash/cloneDeep";

export default class Helpers {
  static equal(a, b) {
    return isEqual(a, b)
  }
  static clone(a, b) {
    return cloneDeep(a, b)
  }
  static withCapital(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
  }
}