// // import { useRoute } from "vue-router";
// import { useStore } from "vuex";
// // const route = useRoute();
// const store = useStore();

class Element {
  constructor({ type, style }) {
    this.type =type
    this.style = style
    this.index = null;
    this.bg = null;
    this.data = null
  }
  addOnpage(mode, command) {
    const action = {
      new: () => {
        command("pages/SET_PAGE_DATA_ELEMENT", { element: this.getModel(), index: this.index });
      },
      edit: () => {
        command("pages/SET_PAGE_DATA_EDIT_ELEMENT", { element: this.getModel(), index: this.index });
      },
    };
    action[mode]();
  }
  addData(data, index = null) {
    this.data = data
    this.index = index
    return this
  }
  addBg(bg) {
    this.bg = '#' + bg
    return this
  }
  getModel() {
    return {
      type: this.type,
      style: this.style,
      bg: this.bg,
      data: this.data,
      visible: true
    };
  }
}


export { Element };
