import isEqual from "lodash/isEqual";
import cloneDeep from "lodash/cloneDeep";

export default class Helpers {
  static equal(a, b) {
    return isEqual(a, b)
  }
  static clone(a, b) {
    return cloneDeep(a, b)
  }
}