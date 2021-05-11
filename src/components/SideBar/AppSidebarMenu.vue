<template>
  <div class="menu">
    <!-- <h2 class="p-m-0" style="color: white; text-align: center">Dashboard</h2> -->
    <Menu :model="items" />
  </div>
</template>

<script>
import Menu from "primevue/menu";
import { useRoute } from "vue-router";
import { ref, computed } from "vue";
// import { useAbility } from '@casl/vue';
import ability from "@/utils/permissions"

export default {
  components: { Menu },
  setup() {
    const route = useRoute();
    // const { can } = useAbility()
    const items = ref([
      {
        label: "Меню",
        icon: "pi pi-list",
        to: "/menu",
        class: computed(() => (route.path === "/menu" ? "active" : "")),
      },
      {
        label: "Страницы",
        icon: "pi pi-file",
        to: "/pages",
        class: computed(() => (route.path.includes("/pages") ? "active" : "")),
        visible: () => ability.can('access', '/pages')
      },
      {
        label: "Новости",
        icon: "pi pi-book",
        to: "/news",
        class: computed(() => (route.path === "/news" ? "active" : "")),
      },
      {
        label: "Статистика",
        icon: "pi pi-chart-bar",
        to: "/stats",
        class: computed(() => (route.path === "/stats" ? "active" : "")),
      },
      {
        label: "База",
        icon: "pi pi-table",
        to: "/base",
        class: computed(() => (route.path === "/base" ? "active" : "")),
      },
      {
        label: "Доступ",
        icon: "pi pi-lock",
        to: "/access",
        class: computed(() => (route.path === "/access" ? "active" : "")),
      },
      {
        label: "Ошибки",
        icon: "pi pi-ban",
        to: "/",
        class: computed(() => (route.path === "/errors" ? "active" : "")),
      },
    ]);
    return {
      items,
      ability
    };
  },
};
</script>

<style lang="scss" scoped>
.menu :deep(.p-menu) {
  width: auto;
  border-color: transparent;
  padding: 0px;
  background-color: var(--surface-800);
  .p-menuitem-link {
    border-left: 5px solid transparent;
  }
  .p-menuitem-link .p-menuitem-text,
  .p-menuitem-link .p-menuitem-icon,
  .p-menuitem-link:hover .p-menuitem-icon,
  .p-menuitem-link:hover .p-menuitem-text {
    color: white !important;
  }
  .active .p-menuitem-link {
    border-left-color: var(--primary-color);
    background-color: var(--surface-700);
    font-weight: 500; 
  }
  .p-menuitem-link:hover {
    background-color: var(--surface-700) !important;
  }
}
</style>
