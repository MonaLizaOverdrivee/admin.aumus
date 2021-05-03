<template>
  <div class="p-grid">
    <div class="p-col-3 menu_side p-p-0"><PanelMenu :model="menu" /></div>
    <div class="p-col content_side">
      <component :is="nameComponent" />
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import menuItems from "../../db/uiElements";
import PanelMenu from "primevue/panelmenu";
import TextContent_1 from "./UiElements/Text/Text_1/TextContent_1";
export default {
  components: { PanelMenu, TextContent_1 },
  setup() {
    onMounted(() => {
      menu.value = getMenuItem();
    });
    const route = useRoute();
    const menu = ref([]);
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
    const nameComponent = computed(
      () => route.query.type + "-content_" + route.query.style
    );

    return {
      menu,
      nameComponent,
    };
  },
};
</script>

<style scoped>
.menu_side {
  border-right: 1px solid gray;
}
</style>
