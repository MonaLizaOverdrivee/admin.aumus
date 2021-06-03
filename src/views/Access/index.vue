<template>
  <UserHeader v-model="search" @new-user-button-click="createUser"/>
  <UserTable :users="users" @select-user="editUser"/>
  <UserRoleEditor  ref="modal"/>
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
    const modal = ref(null)
    onMounted(() => {
      store.dispatch("users/loadUsersCount");
      store.dispatch("users/loadUsers");
    });
    const users = computed(() => store.getters["users/users"]);
    function createUser() {
    }
    // function editUser(user) {
    //   visibleRoleEditor.value = true
    //   dataUserEditable.value = user
    //   modal.value.close_('123')
    // }
    const editUser = (user) => modal.value.open(user)
    return {
      users,
      createUser,
      editUser,
      search,
      visibleRoleEditor,
      dataUserEditable,
      modal
    };
  },
};
</script>

<style></style>
