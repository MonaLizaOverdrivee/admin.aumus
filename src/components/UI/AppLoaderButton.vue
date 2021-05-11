<template>
  <Button :label="text" :icon="icon" :class="classBtn" />
</template>

<script>
import Button from "primevue/button";
export default {
  components: { Button },
  props: {
    label: {
      type: String,
      required: true,
    },
    classBtn: {
      type: String,
    },
    iconBtn: {
      type: String,
    },
  },
  computed: {
    icon() {
      return this.$store.getters["loading/loadingButton"]
        ? "pi pi-spin pi-spinner"
        : this.iconBtn;
    },
    text() {
      return this.label;
    },
  },
};
</script>

<style></style>
