<template>
  <component :is="layout"></component>
  <Toast />
  <Notification />
  <ConfirmDialog />
</template>

<script>
import AdminLayout from "./layout/AdminLayout";
import AuthLayout from "./layout/AuthLayout";
import ConfirmDialog from "primevue/confirmdialog";
import Notification from "@/components/Notification"
import Toast from "primevue/toast";

export default {
  components: { AdminLayout, AuthLayout, ConfirmDialog, Toast, Notification },
  computed: {
    layout() {
      return this.$route.meta.layout ? "auth-layout" : "admin-layout";
    },
  },
};
</script>

<style>
body {
  margin: 0 8px;
  background: var(--surface-800);
  font-family: apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial,
    sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
}
</style>
