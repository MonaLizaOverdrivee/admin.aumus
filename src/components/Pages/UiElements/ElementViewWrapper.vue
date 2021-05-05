<template>
  <div :style="'background-color: ' + bg" class="wrapper__container" @mouseover="doVisibleOptionBar" @mouseleave="doInvisbleOptionsBar">
    <div class="option__bar" v-if="displayOptionBar">
      <div class="p-grid">
        <div class="p-col"></div>
        <div class="p-col p-d-flex p-jc-center add_button">
          <Button icon="pi pi-plus" class="p-button-rounded p-button-sm" @click="$emit('openElementManagerBetween')"/>
        </div>
        <div class="p-col p-d-flex p-jc-end">
          <span class="p-buttonset p-mr-2">
            <Button label="Контент" class="p-button-sm" @click="$emit('openElementManager')"/>
            <Button icon="pi pi-trash" class="p-button-sm" @click="$emit('delete')"/>
            <Button icon="pi pi-power-off" class="p-button-sm" @click="$emit('hidden')"/>
          </span>
          <span class="p-buttonset">
            <Button icon="pi pi-arrow-down" class="p-button-sm " @click="$emit('down')" :disabled="lastElement"/>
            <Button icon="pi pi-arrow-up" class="p-button-sm " @click="$emit('up')" :disabled="firstElement"/>
          </span>
        </div>
      </div>
    </div>
    <div class="container" v-if="visible">
      <slot />
    </div>
      <div class="p-py-5 p-d-flex p-jc-center hidden_element" v-else>
        <div class="p-as-end p-mr-2"><span class="pi pi-eye-slash hidden_element__icon"></span></div>
        <div><span class="hidden_element__icon">элемент скрыт</span></div>
      </div>
  </div>
</template>
<script>
import Button from "primevue/button";
export default {
  components: { Button },
  emits: ['up', 'down', 'openElementManager', 'openElementManagerBetween', 'delete', 'hidden'],
  props: {
    bg: {
      type: String,
      default: "#ffffff",
    },
    index: {
      type: Number,
      required: true
    },
    visible: {
      type: Boolean,
      required: true,
    },
    qntElements: {
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
      return this.index === 0
    },
    lastElement() {
      return this.index === this.qntElements
    }
  },
  methods: {
    doVisibleOptionBar() {
      this.displayOptionBar = true
    },
    doInvisbleOptionsBar() {
      this.displayOptionBar = false
    },
  }
};
</script>

<style scoped>
.hidden_element {
  background-color: var(--surface-200);
  color: var(--surface-400);
  cursor: default;
}
.hidden_element__icon {
  font-size: 2rem;
}
.add_button {
  margin-top: -1.16rem;
}
.wrapper__container {
  position: relative;
  border: 1px solid transparent;
}
.wrapper__container:hover {
  border: 1px dashed gray;
}
.option__bar {
  position: absolute;
  left: 0;
  right: 0;
  padding: 0 0.2rem 0 0;
}
</style>
