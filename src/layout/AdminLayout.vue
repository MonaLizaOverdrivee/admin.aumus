<template>
  <div class="p-d-flex p-flex-column" style="height: 100vh">
    <AppHeader />
    <div class="p-grid p-mt-0 layout">
      <div class="p-p-0 p-col-1 layout__sidebar">
        <AppSidebarMenu />
      </div>
      <div
        class="p-col-11 p-d-flex p-pr-3 p-pl-0 p-pt-0 layout__body"
        style="height: 850px"
      >
        <div class="p-shadow-10 p-col-12 body__container">
          <ScrollPanel style="width: 100%; height: 100%" class="custombar">
            <router-view />
          </ScrollPanel>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppSidebarMenu from "../components/SideBar/AppSidebarMenu";
import AppHeader from "@/components/Header/AppHeader"
import ScrollPanel from "primevue/scrollpanel";
export default {
  mounted() {
    this.$nextTick(() => {
      this.$store.dispatch("auth/autoLogin").catch(() => this.$router.push('/auth'))
    })
  },
  components: { AppSidebarMenu, AppHeader, ScrollPanel },
};
</script>

<style lang="scss" scoped>
::v-deep(.p-scrollpanel) {
  &.custombar {
    .p-scrollpanel-wrapper {
      border-right: 9px solid var(--surface-b);
    }

    .p-scrollpanel-bar {
      background-color: var(--primary-color);
      opacity: 1;
      transition: background-color 0.2s;

      &:hover {
        background-color: #007ad9;
      }
    }
  }
}
.layout .layout__body {
  border-radius: 10px;
  // height: 99vh;
}
.body__container {
  border-radius: 10px;
  background-color: var(--surface-a);
}
.layout__sidebar {
  align-self: self-start;
  position: sticky;
  top: 0;
}
</style>
