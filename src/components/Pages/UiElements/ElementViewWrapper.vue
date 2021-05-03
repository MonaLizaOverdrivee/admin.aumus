<template>
  <div :style="'background-color: ' + bg" class="wrapper__container" @mouseover="doVisibleOptionBar" @mouseleave="doInvisbleOptionsBar">
    <div class="option__bar" v-if="displayOptionBar">
      <span class="p-buttonset p-mr-2">
        <Button label="Контент" class="p-button-sm" @click="$emit('open-elementManager')"/>
        <Button icon="pi pi-trash" class="p-button-sm" @click="deleteElement"/>
        <Button icon="pi pi-power-off" class="p-button-sm" />
      </span>
      <span class="p-buttonset">
        <Button icon="pi pi-arrow-up" class="p-button-sm " @click="$emit('up')" :disabled="firstElement"/>
        <Button icon="pi pi-arrow-down" class="p-button-sm " @click="$emit('down')" :disabled="lastElement"/>
      </span>
    </div>
    <div class="container">
      <slot />
    </div>
  </div>
</template>
<script>
import Button from "primevue/button";
export default {
  components: { Button },
  emits: ['up', 'down', 'open-elementManager'],
  props: {
    bg: {
      type: String,
      default: "#ffffff",
    },
    index: {
      type: Number,
      required: true,
    }
  },
  data() {
    return {
      displayOptionBar: false,
    }
  },
  computed: {
    firstElement() {
      return !this.index
    },
    lastElement() {
      return this.index === this.$store.getters['pages/qntElements'] - 1
    }
  },
  methods: {
    doVisibleOptionBar() {
      this.displayOptionBar = true
    },
    doInvisbleOptionsBar() {
      this.displayOptionBar = false
    },
    deleteElement() {
      this.$store.commit('pages/DELETE_ELEMENT', this.index)
    }
  }
};
</script>

<style scoped>
.wrapper__container {
  position: relative;
}
.option__bar {
  position: absolute;
  top: 0;
  right: 0;
  padding: 0 0.2rem 0 0;
}
</style>
