<template>
  <Toast />
</template>

<script>
import Toast from "primevue/toast";
import { useStore } from "vuex";
import { watch, computed } from "vue";
import { useToast } from "primevue/usetoast";

export default {
  components: { Toast },
  setup() {
    const store = useStore();
    const notification = computed(() => store.getters['notification/notification'])
    const toast = useToast();
    watch(notification.value, () => {
      toast.add({
        severity: notification.value.severity,
        summary: notification.value.summary,
        detail: notification.value.detail,
        life: 3000,
      });
    });
    return {};
  },
};
</script>

<style></style>
