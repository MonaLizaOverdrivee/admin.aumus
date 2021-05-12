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
import { updatePermissions } from "@/utils/permissions"

export default {
  mounted() {
    this.$nextTick(() => {
      const user = JSON.parse(localStorage.getItem('user'))
      this.$store.commit('auth/SET_TOKEN', localStorage.getItem('token'))
      this.$store.commit('auth/SET_USER', user)
      updatePermissions({role: user.role.type, modules: user.access.modules})
      console.log(this.$store.state.auth.user)
    })
  },
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
