<template>
  <div class="p-d-flex p-jc-between">
    <h1 class="p-m-0">{{ dataPage.Title }}</h1>
    <div>
      <Button
        label="Сохранить"
        icon="pi pi-check"
        class="p-button-success"
        @click="savePage"
      />
      <Button
        label="Выход"
        icon="pi pi-times"
        class="p-button-danger p-ml-2"
        @click="$router.push('/pages')"
      />
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
    {{ $attrs.emit }}
    <component
      v-for="(itm, i) in dataPage.PageData"
      :key="itm"
      :is="itm.type + '-view_' + itm.style"
      :data="itm.data"
      :bg="itm.bg"
      @up="upElement(i, i - 1)"
      @down="downElement(i, i + 1)"
    />
  </div>
  <div class="p-d-flex p-jc-center p-my-2">
    <Button
      icon="pi pi-plus"
      class="p-button-rounded p-button-outlined p-button-lg"
      @click="addElementManagerOpen"
    />
  </div>
  <pre>{{ dataPage }}</pre>
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
        <component
          v-if="$route.query.type"
          :is="nameComponentContent"
          ref="componentContent"
        >
          <strong>Цвета блока: </strong><ColorPicker v-model="bgElement" />
        </component>
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
        @click="close"
        class="p-button-text"
      />
      <Button label="Выбрать" icon="pi pi-check" @click="addElementToPage" />
    </template>
  </Dialog>
</template>

<script>
import ColorPicker from "primevue/colorpicker";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import menuItems from "../db/uiElements";
import PanelMenu from "primevue/panelmenu";
import * as uiEditorComponents from "../db/uiEditorComponents";
import * as uiViewComponents from "../db/uiViewComponents";
import { reactive, ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
export default {
  components: {
    Button,
    Dialog,
    PanelMenu,
    ColorPicker,
    ...uiEditorComponents,
    ...uiViewComponents,
  },
  props: ["id"],
  setup() {
    const router = useRouter();
    const route = useRoute();
    const store = useStore();
    const dataPage = reactive(store.getters["pages/editablePage"]);
    const display = ref(false);
    const componentContent = ref(null);
    const bgElement = ref("ffffff");
    const menu = ref([]);
    function addElementManagerOpen() {
      display.value = true;
      console.dir();
    }
    function close() {
      display.value = false;
      router.push({ query: {} });
    }
    function addElementToPage() {
      store.commit("pages/SET_PAGE_DATA_ELEMENT", {
        type: route.query.type,
        style: route.query.style,
        order: dataPage.PageData.length,
        data: componentContent.value.getElementData(),
        bg: "#" + bgElement.value,
      });
      bgElement.value = "ffffff";
      close();
    }
    function savePage() {
      if (route.fullPath === "/pages/new") {
        store.dispatch("pages/saveNewPage");
      } else {
        store.dispatch("pages/saveEditablePage");
      }
    }
    onMounted(() => {
      menu.value = getMenuItem();
    });
    function getMenuItem() {
      const menuParse = menuItems.map((itm) => {
        const items = itm.items.map((subitm, index) => ({
          label: subitm.label,
          to: `?type=${itm.type}&style=${index + 1}`,
          class: computed(() => "active"),
        }));
        return {
          label: itm.label,
          icon: itm.icon,
          items,
        };
      });
      return menuParse;
    }
    function upElement(old_index, new_index) {
      dataPage.PageData.splice(
        new_index,
        0,
        dataPage.PageData.splice(old_index, 1)[0]
      );
    }
    function downElement(old_index, new_index) {
      dataPage.PageData.splice(
        new_index,
        0,
        dataPage.PageData.splice(old_index, 1)[0]
      );
    }
    const nameComponentContent = computed(
      () => route.query.type + "-content_" + route.query.style
    );

    return {
      dataPage,
      addElementManagerOpen,
      display,
      close,
      addElementToPage,
      savePage,
      componentContent,
      menu,
      nameComponentContent,
      bgElement,
      upElement,
      downElement,
    };
  },
};
</script>

<style>
.p-tabview .p-tabview-panels {
  padding: 1.25rem 0 !important;
}
</style>
