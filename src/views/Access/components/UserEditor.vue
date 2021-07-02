<template>
  <form @submit.prevent="updateValue">
    <div class="p-fluid p-formgrid p-grid p-mt-2">
      <div class="p-field p-col-12 p-md-3">
        <label for="firstName">Имя</label>
        <InputText id="firstName" type="text" v-model="userName" :class="{ 'p-invalid': nameError }" />
        <small id="firstName-help" class="p-error">{{ nameError }}</small>
      </div>
      <div class="p-field p-col-12 p-md-3">
        <label for="lastName">Фамилия</label>
        <InputText id="lastName" type="text" v-model="userSurname" :class="{ 'p-invalid': surnameError }" />
        <small id="lastName-help" class="p-error">{{ surnameError }}</small>
      </div>
      <div class="p-field p-col-12 p-md-3">
        <label for="username">Логин</label>
        <InputText id="username" type="text" v-model="userLogin" :class="{ 'p-invalid': loginError }" />
        <small id="username-help" class="p-error">{{ loginError }}</small>
      </div>
      <div class="p-field p-col-12 p-md-3">
        <label for="email">Email</label>
        <InputText id="email" type="text" v-model="userEmail" :class="{ 'p-invalid': emailError }" />
        <small id="email-help" class="p-error">{{ emailError }}</small>
      </div>
      <div class="p-field p-col-12 p-md-3">
        <label for="password">Пароль</label>
        <Password v-model="password" toggleMask />
      </div>
      <div class="p-field p-col-12 p-md-3">
        <label for="role">Роль</label>
        <Dropdown
          v-model="currentEditableUser.role.type"
          :options="roleOptions"
          optionLabel="name"
          optionValue="type"
          placeholder="Выберете роль"
        />
      </div>
      <div class="p-col-12 p-md-6">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum necessitatibus et ab ea quia, minima
          deleniti maxime nam error eos! Corporis voluptates voluptatem, sed eos quo ducimus repellendus
          tempora facere?
        </p>
      </div>
      <div class="p-col-12 p-md-3">
        <div class="user__plain-info p-p-1">
          <p><b>Создан: </b>{{ new Date(currentEditableUser.created_at).toLocaleString() }}</p>
          <p><b>Последний вход: </b>{{ new Date(currentEditableUser.last_auth).toLocaleString() }}</p>
          <div class="p-d-flex">
            <div class="p-mr-2"><b>Заблокировать</b></div>
            <InputSwitch v-model="currentEditableUser.blocked" class="p-inputtext-sm" />
          </div>
        </div>
      </div>
    </div>
  </form>
  <DataTable
    :value="accessData"
    :scrollable="true"
    scrollHeight="400px"
    selectionMode="single"
    v-if="visibleAccessTable"
  >
    <Column field="id" header="ID" style="min-width: 200px" />
    <Column field="page_name" header="Название страницы" style="min-width: 200px" />
    <Column field="role" header="Доступ" style="min-width: 200px">
      <template #body="{ data }">
        <div class="p-d-flex" style="width: 100%">
          <div class="p-mr-1" style="flex: 1 1 0">
            <div class="p-fluid">
              <Dropdown
                v-model="currentEditableUser.access.pages[data.id].role"
                :options="pageRole"
                optionLabel="name"
                optionValue="type"
                placeholder="Выберете тип роли"
              />
            </div>
          </div>
          <div>
            <Button
              icon="pi pi-times"
              class="p-button-outlined p-button-danger"
              @click="deleteAccess(data.id)"
            />
          </div>
        </div>
      </template>
    </Column>
    <template #footer>
      <div class="add-button" @click="pageSearchModal = true">Добавить страницу или модуль</div>
    </template>
  </DataTable>
  <Dialog
    header="Добавить доступ"
    v-model:visible="pageSearchModal"
    :modal="true"
    :closable="false"
    :style="{ width: '40vw' }"
  >
    <EditorPageAddModal @choose-page="addAccess" />
    <template #footer>
      <Button label="Отмена" @click="pageSearchModal = false" />
    </template>
  </Dialog>
</template>

<script>
import useUserCredentials from "../use/useUserCredentials"
import InputText from "primevue/inputtext";
import Password from "primevue/password"
import helpers from "./helpers";
import EditorPageAddModal from "./EditorPageAddModal.vue";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import Dropdown from "primevue/dropdown";
import InputSwitch from "primevue/inputswitch";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import { isEqual, cloneDeep } from "@/helpers/useCompare";
import { useConfirm } from "primevue/useconfirm";
import { computed, ref, onMounted } from "vue";
import { useStore } from "vuex";
export default {
  components: {
    Password,
    Button,
    Dropdown,
    InputSwitch,
    Dialog,
    DataTable,
    Column,
    EditorPageAddModal,
    InputText,
  },
  emits:['close-modal'],
  props: {
    userData: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props, { emit }) {
    onMounted(() => {
      store.dispatch("users/loadUsersRole");
    });
    const store = useStore();
    const startStateEditableUser = ref(cloneDeep(props.userData));
    const currentEditableUser = ref(cloneDeep(props.userData));
    const confirm = useConfirm();
    const pageSearchModal = ref(false);
    const visiblePasswordField = ref(false);
    const roleOptions = ref([
      { name: "Администратор", type: "admin" },
      { name: "Менеджер", type: "manager" },
    ]);
    const pageRole = ref([
      { name: "Редактор", type: "editor" },
      { name: "Контент менеджер", type: "contentManager" },
    ]);
    const password = ref();
    const checkChange = computed(() => isEqual(startStateEditableUser.value, currentEditableUser.value));
    const accessData = computed(() => helpers.toArrayOfObject(currentEditableUser.value.access?.pages));
    const visibleAccessTable = computed(() => currentEditableUser.value.role.type === "manager");
    function addAccess(page) {
      pageSearchModal.value = false;
      helpers.addPageToAccess(currentEditableUser.value, page);
    }
    function deleteAccess(id) {
      delete currentEditableUser.value.access.pages[id];
    }
    function save() {
      const request = helpers.buildRequest(
        currentEditableUser.value,
        password.value,
        store.state.users.roles
      );
      const funcName = request.id ? "changeData" : "create";
      store.dispatch(`users/${funcName}`, request);
      emit("close-modal", false);
    }
    function close() {
      if (!checkChange.value) {
        confirm.require({
          message: "Есть не сохраненные данные, всё ровно выйти?",
          header: "Подтвердите действие",
          icon: "pi pi-exclamation-triangle",
          acceptLabel: "Да",
          rejectLabel: "Нет",
          accept: () => {
            emit("close-modal", false);
            visiblePasswordField.value = false;
          },
        });
      } else {
        emit("close-modal", false);
        visiblePasswordField.value = false;
      }
    }
    return {
      close,
      checkChange,
      startStateEditableUser,
      currentEditableUser,
      roleOptions,
      password,
      accessData,
      pageRole,
      pageSearchModal,
      addAccess,
      deleteAccess,
      visiblePasswordField,
      save,
      visibleAccessTable,
      ...useUserCredentials(currentEditableUser.value)
    };
  },
};
</script>

<style lang="scss" scoped>
.user__plain-info {
  border-radius: 8px;
}
.add-button {
  width: 100%;
  height: 100%;
  text-align: center;
  cursor: pointer;
  padding: 1rem;
  font-style: oblique;
  text-decoration: underline;
  color: var(--surface-600);
  &:hover {
    background: var(--surface-300);
    text-decoration: none;
  }
}
:deep(.p-datatable-footer) {
  padding: 0;
}
</style>
