<template>
  <UserHeader v-model="search" @new-user-button-click="createUser"/>
  <UserTable :users="users" @select-user="editUser"/>
  <UserRoleEditor v-model="visibleRoleEditor" :userData="dataUserEditable"/>
</template>

<script>
import { onMounted, ref } from "vue";
import { useStore } from "vuex";
import UserTable from "./components/UserTable";
import UserRoleEditor from "./components/UserRoleEditor"
import UserHeader from "./components/UserHeader"
import { computed } from "vue";
export default {
  components: { UserTable, UserRoleEditor, UserHeader },
  setup() {
    const store = useStore();
    const search = ref("");
    const dataUserEditable = ref()
    const visibleRoleEditor = ref(false)
    onMounted(() => {
      store.dispatch("users/loadUsersCount");
      store.dispatch("users/loadUsers");
    });
    const users = computed(() => store.getters["users/users"]);
    function createUser() {
    }
    function editUser(user) {
      visibleRoleEditor.value = true
      dataUserEditable.value = user
    }
    return {
      users,
      createUser,
      editUser,
      search,
      visibleRoleEditor,
      dataUserEditable,
    };
  },
};
</script>

<style></style>
