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
        <i>B</i>
      </button>
    </div>
    <div></div>
  </div>
  <pre>{{ $store.getters["pages/editablePage"] }}</pre>
</template>

<script>
import Button from "primevue/button";
import { reactive } from "vue";
import { useStore } from "vuex";
export default {
  components: { Button },
  props: ["id"],
  setup() {
    const store = useStore();
    const dataPage = reactive(store.getters["pages/editablePage"]);
    return {
      dataPage,
    };
  },
};
</script>

<style></style>
