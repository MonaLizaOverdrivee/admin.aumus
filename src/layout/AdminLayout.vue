<template>
  <div class="p-grid layout">
    <div class="p-p-0 p-col-1 layout__sidebar">
      <AppSidebarMenu />
    </div>
    <div class="p-col-11 p-d-flex p-pr-3 p-pl-0 p-pt-0 layout__body">
      <div class="p-shadow-10 p-col-12 body__container">
        <ScrollPanel style="width: 100%; height: 100%">
          <router-view />
        </ScrollPanel>
      </div>
    </div>
  </div>
</template>

<script>
import AppSidebarMenu from "../components/SideBar/AppSidebarMenu";
import ScrollPanel from "primevue/scrollpanel";
export default {
  components: { AppSidebarMenu, ScrollPanel },
};
</script>

<style scoped>
.layout .layout__body {
  border-radius: 10px;
  height: 99vh;
}
.body__container {
  border-radius: 10px;
  background-color: var(--surface-a);
}
</style>
