<template>
  <Button :label="text" :icon="icon" :class="classBtn" :disabled="loadingButton"/>
</template>

<script>
import Button from "primevue/button";
import { mapGetters } from 'vuex'
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
    ...mapGetters('loading', ['loadingButton']),
    icon() {
      return this.loadingButton ? "pi pi-spin pi-spinner" : this.iconBtn;
    },
    text() {
      return this.label;
    },
  },
};
</script>

<style></style>
