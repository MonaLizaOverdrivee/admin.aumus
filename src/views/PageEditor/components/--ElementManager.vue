<template>
  <Dialog
    header="Менеджер элементов"
    :closable="false"
    v-model:visible="display"
    :style="{ width: '80vw' }"
    :maximizable="true"
    :modal="true"
  >
    <div class="p-grid">
      <div class="p-col-3 menu_side p-p-0"><PanelMenu :model="menu" /></div>
      <div class="p-col content_side">
        <keep-alive v-if="$route.query.type">
          <component
            :is="nameComponentContent"
            :dataElement="data"
            @output-data="setDataElement"
          >
            <strong>Цвета блока: </strong><ColorPicker v-model="bgElement" />
          </component>
        </keep-alive>
        <div
          class="p-d-flex p-jc-center p-ai-center"
          style="height: 100%; color: gray"
          v-else
        >
          <h1>Выбирете элемент из списка</h1>
        </div>
      </div>
    </div>
    <template #footer>
      <Button
        label="Отмена"
        icon="pi pi-times"
        @click="$emit('close')"
        class="p-button-text"
      />
      <Button label="Выбрать" icon="pi pi-check" @click="$emit('accept')" />
    </template>
  </Dialog>
</template>

<script>
import { reactive, ref } from "vue";
export default {
  emits: ["close", "accept"],
  props: {
    dataElement: {
      type: Object,
      default: null,
    },
  },
  setup() {
    const bgElement = ref("");
    const element = reactive({
      // type: route.query.type,
      // style: route.query.style,
      data: null,
      visible: true,
      bg: "#" + bgElement.value,
    });
    function setDataElement(newData) {
      element.data = newData;
    }
    return {
      setDataElement,
    };
  },
};
</script>

<style></style>
