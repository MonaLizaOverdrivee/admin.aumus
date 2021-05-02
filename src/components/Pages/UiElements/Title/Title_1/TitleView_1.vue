<template>
  <ElementViewWrapper :bg="bg">
    <h2 class="p-mt-5 p-mb-0">{{ data }}</h2>
  </ElementViewWrapper>
</template>

<script>
import ElementViewWrapper from "../../ElementViewWrapper";
export default {
  components: { ElementViewWrapper },
  props: ["data", "bg"],
};
</script>

<style></style>
