<template>
  <ElementViewWrapper :bg="bg" :index="index">
    <p v-html="data" class="p-my-2"></p>
  </ElementViewWrapper>
</template>
<script>
import ElementViewWrapper from "../../ElementViewWrapper";
export default {
  components: { ElementViewWrapper },
  props: ["data", "bg", "index"],
};
</script>

<style></style>
