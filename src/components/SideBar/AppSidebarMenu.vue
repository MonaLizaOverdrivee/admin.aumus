<template>
  <h2 class="p-m-0" style="color: white; text-align: center">Dashboard</h2>
  <Menu :model="items" />
</template>

<script>
import Menu from "primevue/menu";
import { useRoute } from "vue-router";
import { ref, computed } from "vue";

export default {
  components: { Menu },
  setup() {
    const route = useRoute();
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
    ]);
    return {
      items,
    };
  },
};
</script>

<style>
div.p-menu {
  width: auto;
  border-color: transparent;
  padding: 0px;
  background-color: var(--surface-800);
}
.p-menuitem {
  border-left: 4px solid transparent;
}
.active {
  border-left: 4px solid var(--primary-color);
  background-color: var(--surface-700);
  /* font-weight: 500; */
}
.p-menu .p-menuitem-link .p-menuitem-text,
.p-menu .p-menuitem-link .p-menuitem-icon,
.p-menu .p-menuitem-link:hover .p-menuitem-icon,
.p-menu .p-menuitem-link:hover .p-menuitem-text {
  color: white !important;
}
.p-menu .p-menuitem-link:hover {
  background-color: var(--surface-700) !important;
}
</style>
