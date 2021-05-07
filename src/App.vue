<template>
<div class="p-d-flex p-flex-column" style="height: 100vh">
  <AppHeader />
  <AdminLayout />
</div>
  <Toast />
  <ConfirmDialog />
</template>

<script>
import AdminLayout from "./layout/AdminLayout";
import AppHeader from "@/components/Header/AppHeader"
import ConfirmDialog from 'primevue/confirmdialog';
import Toast from 'primevue/toast';

export default {
  components: { AdminLayout, AppHeader, ConfirmDialog, Toast },
};
</script>

<style>
body {
  margin: 0 8px;
  background: var(--surface-800);
  font-family: apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
}
</style>
