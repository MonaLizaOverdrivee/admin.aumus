<template>
  <div class="p-grid">
    <div class="p-col-3 menu_side p-p-0"><PanelMenu :model="menu" /></div>
    <div class="p-col content_side">
      <component :is="nameComponent" @data-component="dataRecord" />
      <p>{{ selectedElement.data }}</p>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import menuItems from "../../db/uiElements";
import PanelMenu from "primevue/panelmenu";
import Text_1 from "./UiElements/Text/Text_1";
export default {
  components: { PanelMenu, Text_1 },
  setup() {
    onMounted(() => {
      menu.value = getMenuItem();
    });
    const route = useRoute();
    const editorValue = ref("");
    const selectedElement = ref({
      type: route.query.type,
      style: route.query.style,
      data: "5",
    });
    const menu = ref([]);
    function dataRecord(d) {
      selectedElement.value.data = d;
    }
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
    const nameComponent = computed(() => route.query.type + "_" + route.query.style);

    return {
      menu,
      editorValue,
      selectedElement: selectedElement,
      nameComponent,
      dataRecord,
    };
  },
};
</script>

<style scoped>
.menu_side {
  border-right: 1px solid gray;
}
</style>
