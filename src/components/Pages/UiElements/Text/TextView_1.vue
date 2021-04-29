<script>
import { h } from "vue";
export default {
  render() {
    return h("p", {
      innerHTML: this.data,
    });
  },
  props: ["data"],
};
</script>

<style></style>
