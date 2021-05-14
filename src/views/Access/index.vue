<template>
  <h1 class="p-m-0">Менеджер пользователей</h1>
  <small>Всего пользователей: {{ $store.getters["users/usersCount"] }}</small>
  <div class="p-d-flex p-jc-between p-mt-4">
    <div>
      <span class="p-input-icon-left">
        <i class="pi pi-search" />
        <InputText type="text" placeholder="Поиск" v-model="search" />
      </span>
    </div>
    <div>
      <Button label="Новый пользователь" icon="pi pi-plus" @click="createUser" />
    </div>
  </div>
  <UserTable :users="users" />
</template>

<script>
import { onMounted, ref } from "vue";
import { useStore } from "vuex";
import UserTable from "./components/UserTable";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import { computed } from "vue";
export default {
  components: { UserTable, Button, InputText },
  setup() {
    const store = useStore();
    const search = ref("");
    onMounted(() => {
      store.dispatch("users/loadUsersCount");
      store.dispatch("users/loadUsers");
    });
    const users = computed(() => store.getters["users/users"]);
    function createUser() {
    }
    return {
      users,
      createUser,
      search,
    };
  },
};
</script>

<style></style>
