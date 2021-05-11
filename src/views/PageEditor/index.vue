<template>
  <EditorHeader
    v-model:title="dataPage.Title"
    v-model:URL="dataPage.URL"
    @save="savePage"
    @exit="$router.push('/pages')"
  />
  <!-- {{ $store.getters["auth/editor"] }} -->
  role: {{ role }} <br />
  change: {{ $ability.can("change", role) }} <br />
  create: {{ $ability.can("create", role) }} <br />
  access: {{ $ability.can("access", "/pages") }} <br />
  route: {{ $route.params.id }}
  <!-- <div class="p-d-flex p-mt-3">
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
  <br> -->
  <div class="p-d-flex p-flex-column">
    <ElementViewWrapper
      v-for="(itm, i) in dataPage.PageData"
      :key="itm"
      :index="i"
      :role="role"
      :visible="itm.visible"
      :qntElements="dataPage.PageData.length - 1"
      :bg="itm.bg"
      @up="upElement(i, i - 1)"
      @down="downElement(i, i + 1)"
      @delete="deleteElement(i)"
      @hidden="hiddenElement(i)"
      @openElementManager="editElementManagerOpen(i)"
      @openElementManagerBetween="betweenElementManagerOpen(i)"
    >
      <component :is="itm.type + '-view_' + itm.style" :data="itm.data" />
    </ElementViewWrapper>
  </div>
  <div class="p-d-flex p-jc-center p-my-2" v-if="$ability.can('create', role)">
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
      <div class="p-col-3 menu_side p-p-0" v-if="$ability.can('create', role)">
        <PanelMenu :model="menu" />
      </div>
      <div class="p-col content_side">
        <keep-alive v-if="$route.query.type">
          <component :is="nameComponentContent" ref="componentContent">
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
      <Button label="Отмена" icon="pi pi-times" @click="close" class="p-button-text" />
      <Button label="Выбрать" icon="pi pi-check" @click="addElementToPage" />
    </template>
  </Dialog>
</template>

<script>
import ColorPicker from "primevue/colorpicker";
import PanelMenu from "primevue/panelmenu";
import Dialog from "primevue/dialog";
import Button from "primevue/button";
import AppLoaderButton from "@/components/UI/AppLoaderButton";
import ElementViewWrapper from "./components/ElementViewWrapper";
import menuItems from "./components/Elements/elementsItemMenu";
import EditorHeader from "./components/EditorHeader";
import * as EditorElements from "./components/Elements/importEditorElements";
import * as ViewElements from "./components/Elements/importViewElements";
import { reactive, ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute, onBeforeRouteLeave } from "vue-router";
import { useConfirm } from "primevue/useconfirm";
export default {
  components: {
    EditorHeader,
    ElementViewWrapper,
    AppLoaderButton,
    Button,
    Dialog,
    PanelMenu,
    ColorPicker,
    ...EditorElements,
    ...ViewElements,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const store = useStore();
    const role = computed(() => store.getters["auth/userAccess"].pages[route.params.id]);
    const confirm = useConfirm();
    const dataPage = reactive(store.getters["pages/editablePage"]);
    const display = ref(false);
    const componentContent = ref(null);
    const bgElement = ref("ffffff");
    const menu = ref([]);
    const editIndex = ref(null);
    const modeMangerElement = ref("");

    //editHeader
    async function savePage() {
      if (route.fullPath === "/pages/new") {
        await store.dispatch("pages/saveNewPage");
      } else {
        await store.dispatch("pages/saveEditablePage");
      }
    }
    //ElementManager
    function addElementManagerOpen() {
      modeMangerElement.value = "new";
      display.value = true;
    }
    function editElementManagerOpen(i) {
      display.value = true;
      editIndex.value = i;
      modeMangerElement.value = "edit";
      router
        .replace({
          query: {
            type: dataPage.PageData[i].type,
            style: dataPage.PageData[i].style,
          },
        })
        .then(() => (componentContent.value.dataElement = dataPage.PageData[i].data));
    }
    function betweenElementManagerOpen(i) {
      display.value = true;
      modeMangerElement.value = "between";
      editIndex.value = i;
    }
    //####################################################
    onMounted(() => {
      menu.value = getMenuItem();
    });
    const nameComponentContent = computed(
      () => route.query.type + "-content_" + route.query.style
    );
    function close() {
      display.value = false;
      editIndex.value = null;
      modeMangerElement.value = "";
      router.push({ query: {} });
    }
    function addElementToPage() {
      const element = {
        type: route.query.type,
        style: route.query.style,
        data: componentContent.value.getElementData(),
        visible: true,
        bg: "#" + bgElement.value,
      };
      if (modeMangerElement.value === "new") {
        store.commit("pages/SET_PAGE_DATA_ELEMENT", element);
      } else if (modeMangerElement.value === "edit") {
        store.commit("pages/SET_PAGE_DATA_EDIT_ELEMENT", {
          element,
          i: editIndex.value,
        });
      } else {
        store.commit("pages/SET_PAGE_DATA_ELEMENT_BETWEEN", {
          data: element,
          i: editIndex.value,
        });
      }
      bgElement.value = "ffffff";
      close();
    }
    function getMenuItem() {
      const menuParse = menuItems.map((itm) => {
        const items = itm.items.map((subitm, index) => ({
          label: subitm.label,
          to: `?type=${itm.type}&style=${index + 1}`,
          style: computed(() =>
            route.query.type === itm.type && route.query.style === `${index + 1}`
              ? "background-color: var(--surface-c)"
              : ""
          ),
        }));
        return {
          label: itm.label,
          icon: itm.icon,
          items,
        };
      });
      return menuParse;
    }
    //WrapperElement
    function upElement(old_index, new_index) {
      dataPage.PageData.splice(new_index, 0, dataPage.PageData.splice(old_index, 1)[0]);
    }
    function downElement(old_index, new_index) {
      dataPage.PageData.splice(new_index, 0, dataPage.PageData.splice(old_index, 1)[0]);
    }
    function deleteElement(i) {
      confirm.require({
        message: "Действительно удалить этот элемент?",
        header: "Подтвердите действие",
        icon: "pi pi-exclamation-triangle",
        acceptLabel: "Да",
        rejectLabel: "Нет",
        accept: () => {
          store.commit("pages/DELETE_ELEMENT", i);
        },
      });
    }
    function hiddenElement(i) {
      store.commit("pages/CHANGE_VISIBLE_ELEMENT", i);
    }

    onBeforeRouteLeave((to, from, next) => {
      if (!store.getters["pages/compare"]) {
        confirm.require({
          message: "Есть несохранённые данные, всё равно выйти?",
          header: "Подтвердите действие",
          icon: "pi pi-exclamation-triangle",
          acceptLabel: "Да",
          rejectLabel: "Нет",
          accept: () => next(),
          reject: () => next(false),
        });
      } else next();
    });
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
      editElementManagerOpen,
      betweenElementManagerOpen,
      modeMangerElement,
      deleteElement,
      hiddenElement,
      role,
    };
  },
};
</script>

<style scoped>
.content_side :deep(.p-tabview-panels) {
  padding: 1.25rem 0 !important;
}
</style>
