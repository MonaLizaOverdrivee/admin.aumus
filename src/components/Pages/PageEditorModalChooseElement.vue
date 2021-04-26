<template>
  <div class="p-grid">
    <div class="p-col-3 menu_side p-p-0"><PanelMenu :model="items" /></div>
    <div class="p-col content_side">
      <TabView>
        <TabPanel header="Стиль">
          <img src="" alt="" />
        </TabPanel>
        <TabPanel header="Контент">
          <Editor v-model="selectedElement.data" editorStyle="height: 300px" />
          <p>{{ selectedElement.data }}</p>
        </TabPanel>
      </TabView>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import PanelMenu from "primevue/panelmenu";
import Editor from "primevue/editor";
import TabView from "primevue/tabview";
import TabPanel from "primevue/tabpanel";
export default {
  components: { PanelMenu, Editor, TabView, TabPanel },
  setup() {
    const editorValue = ref("");
    const selectedElement = ref({
      data: "5",
    });
    const items = ref([
      {
        label: "Шапка",
        icon: "pi pi-clone",
        items: [
          {
            label: "Edit",
          },
        ],
      },
      {
        label: "Заголовок",
        icon: "pi pi-info-circle",
        items: [
          {
            label: "Заголовок 1го уровня",
          },
          {
            label: "Заголовок 2го уровня",
          },
        ],
      },
      {
        label: "Текст",
        icon: "pi pi-pencil",
        items: [
          {
            label: "Текст",
            command: () =>
              (selectedElement.value = {
                type: "text",
                style: "s_1",
                data: "",
              }),
          },
          {
            label: "Текст с картинкой слева",
          },
          {
            label: "Текст с картинкой справа",
          },
          {
            label: "Текст на белой подложке с фоном",
          },
        ],
      },
      {
        label: "Список",
        icon: "pi pi-list",
        items: [
          {
            label: "Edit",
            icon: "pi pi-fw pi-pencil",
          },
        ],
      },
      {
        label: "Изображение",
        icon: "pi pi-image",
        items: [
          {
            label: "Edit",
            icon: "pi pi-fw pi-pencil",
          },
        ],
      },
      {
        label: "Таблица",
        icon: "pi pi-table",
        items: [
          {
            label: "New",
            icon: "pi pi-fw pi-user-plus",
          },
          {
            label: "Delete",
            icon: "pi pi-fw pi-user-minus",
          },
        ],
      },
      {
        label: "Секция",
        icon: "pi pi-th-large",
        items: [
          {
            label: "New",
            icon: "pi pi-fw pi-user-plus",
          },
          {
            label: "Delete",
            icon: "pi pi-fw pi-user-minus",
          },
        ],
      },
      {
        label: "Фото-галлерея",
        icon: "pi pi-images",
        items: [
          {
            label: "Edit",
            icon: "pi pi-fw pi-pencil",
          },
        ],
      },
      {
        label: "Новостной блок",
        icon: "pi pi-book",
        items: [
          {
            label: "Edit",
            icon: "pi pi-fw pi-pencil",
          },
        ],
      },
    ]);

    return { items, editorValue, selectedElement: selectedElement };
  },
};
</script>

<style scoped>
.menu_side {
  border-right: 1px solid gray;
}
</style>
