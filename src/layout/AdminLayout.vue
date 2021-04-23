<template>
  <div class="p-grid layout">
    <div class="p-p-0 layout__sidebar">
      <AppSidebarMenu />
    </div>
    <div class="p-col p-d-flex p-pr-3 p-pl-0 p-pt-0 layout__body">
      <div class="p-shadow-10 p-col body__container">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import AppSidebarMenu from "../components/SideBar/AppSidebarMenu";
export default {
  components: { AppSidebarMenu },
};
</script>

<style scoped>
.layout .layout__body {
  border-radius: 10px;
  min-height: 99vh;
}
.body__container {
  border-radius: 10px;
  background-color: var(--surface-a);
}
</style>
