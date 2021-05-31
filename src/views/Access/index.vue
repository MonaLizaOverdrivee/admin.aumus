<template>
  <UserHeader v-model="search" @new-user-button-click="createUser"/>
  <UserTable :users="users" @select-user="editUser"/>
  <Dialog
     header="Редактор пользователя"
     :closable="false"
    v-model:visible="visibleRoleEditor"
    :style="{ width: '80vw' }"
    :maximizable="true"
    :modal="true"
  >
    <UserRoleEditor :userData="dataUserEditable" @close-modal="clsoseModalWithCheck"/>
  </Dialog>
</template>

<script>
import { onMounted, ref } from "vue";
import { useStore } from "vuex";
import Dialog from "primevue/dialog";
import UserTable from "./components/UserTable";
import UserRoleEditor from "./components/UserRoleEditor"
import UserHeader from "./components/UserHeader"
import { useConfirm } from "primevue/useconfirm";
import { computed } from "vue";
export default {
  components: { UserTable, UserRoleEditor, UserHeader, Dialog },
  setup() {
    const store = useStore();
    const confirm = useConfirm()
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
      dataUserEditable.value = user
      visibleRoleEditor.value = true
    }
    function clsoseModalWithCheck(check) {
      console.log(check)
      if(!check){
        confirm.require({
        message: "Есть не сохраненные данные, всё ровно выйти?",
        header: "Подтвердите действие",
        icon: "pi pi-exclamation-triangle",
        acceptLabel: "Да",
        rejectLabel: "Нет",
        accept: () => {
          visibleRoleEditor.value = false
        },
      });
      } else {
         visibleRoleEditor.value = false
      }
      
     
    }
    return {
      users,
      createUser,
      editUser,
      search,
      visibleRoleEditor,
      dataUserEditable,
      clsoseModalWithCheck
    };
  },
};
</script>

<style></style>
