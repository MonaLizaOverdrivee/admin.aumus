<script>
import { h } from "vue";
export default {
  render() {
    return h("p", {
      innerHTML: this.data,
      class: ["p-m-0"],
    });
  },
  props: ["data"],
};
</script>

<style></style>
