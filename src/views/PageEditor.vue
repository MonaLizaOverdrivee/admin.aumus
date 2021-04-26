<template>
  <div class="p-d-flex p-jc-between">
    <h1 class="p-m-0">{{ dataPage.Title }}</h1>
    <div>
      <Button label="Сохранить" icon="pi pi-check" class="p-button-success" />
      <Button label="Выход" icon="pi pi-times" class="p-button-danger p-ml-2" />
    </div>
  </div>
  <div class="p-d-flex p-mt-3">
    <div>
      <button
        style="
          border: 1px solid black;
          border-radius: 3px;
          font-weight: bold;
          padding: 0 5px;
          color: gray;
          font-size: 14pt;
          margin: 0 5px;
        "
      >
        B</button
      ><button
        style="
          border: 1px solid black;
          border-radius: 3px;
          padding: 0 5px;
          color: gray;
          font-size: 14pt;
        "
      >
        <i>B</i></button
      ><button
        style="
          border: 1px solid black;
          border-radius: 3px;
          padding: 0 5px;
          color: gray;
          font-size: 14pt;
          margin-left: 5px;
        "
      >
        <i><i class="pi pi-link"></i></i>
      </button>
    </div>
    <div></div>
  </div>
  <hr />
  <div class="p-d-flex p-flex-column">
    <div v-for="itm in dataPage.PageData" :key="itm">
      <pre>{{ itm }}</pre>
    </div>
  </div>
  <div class="p-d-flex p-jc-center">
    <Button
      icon="pi pi-plus"
      class="p-button-rounded p-button-outlined p-button-lg"
      @click="addElement"
    />
  </div>
  <pre>{{ dataPage }}</pre>
  <Dialog
    header="Выберете элемент"
    v-model:visible="display"
    :style="{ width: '80vw' }"
    :maximizable="true"
    :modal="true"
  >
    <PageEditorModalChooseElement />
    <template #footer>
      <Button label="Отмена" icon="pi pi-times" @click="close" class="p-button-text" />
      <Button label="Выбрать" icon="pi pi-check" @click="close" autofocus />
    </template>
  </Dialog>
</template>

<script>
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import PageEditorModalChooseElement from "../components/Pages/PageEditorModalChooseElement";
import { reactive, ref } from "vue";
import { useStore } from "vuex";
export default {
  components: { Button, PageEditorModalChooseElement, Dialog },
  props: ["id"],
  setup() {
    const store = useStore();
    const dataPage = reactive(store.getters["pages/editablePage"]);
    const display = ref(false);
    function addElement() {
      display.value = true;
    }
    function close() {
      display.value = false;
    }
    return {
      dataPage,
      addElement,
      display,
      close,
    };
  },
};
</script>

<style>
.p-tabview .p-tabview-panels {
  padding: 1.25rem 0 !important;
}
</style>
