<template>
  <Dialog
    header="Редактор пользователя"
    :closable="false"
    :visible="modelValue"
    :style="{ width: '80vw' }"
    :maximizable="true"
    :modal="true"
  >
    <div class="p-fluid p-formgrid p-grid p-mt-2" v-if="modelValue">
      <div class="p-field p-col-12 p-md-3">
        <label for="firstName">Имя</label>
        <InputText id="firstName" type="text" v-model="currentEditableUser.firstName" />
      </div>
      <div class="p-field p-col-12 p-md-3">
        <label for="lastName">Фамилия</label>
        <InputText id="lastName" type="text" v-model="currentEditableUser.lastName" />
      </div>
      <div class="p-field p-col-12 p-md-3">
        <label for="username">Логин</label>
        <InputText id="username" type="text" v-model="currentEditableUser.username" />
      </div>
      <div class="p-field p-col-12 p-md-3">
        <label for="email">Email</label>
        <InputText id="email" type="text" v-model="currentEditableUser.email" />
      </div>
      <div class="p-field p-col-12 p-md-3">
        <label for="password">Пароль</label>
        <template v-if="visiblePasswordField">
        <Password v-model="password" toggleMask />
        </template>
        <Button label="Изменть пароль" @click="visiblePasswordField = true" class="p-button-outlined" v-else/>
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
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum necessitatibus et
          ab ea quia, minima deleniti maxime nam error eos! Corporis voluptates
          voluptatem, sed eos quo ducimus repellendus tempora facere?
        </p>
      </div>
      <div class="p-col-12 p-md-3">
        <div class="user__plain-info p-p-1">
          <p>
            <b>Создан: </b>{{ new Date(currentEditableUser.created_at).toLocaleString() }}
          </p>
          <p>
            <b>Последний вход: </b
            >{{ new Date(currentEditableUser.last_auth).toLocaleString() }}
          </p>
          <div class="p-d-flex">
            <div class="p-mr-2"><b>Заблокировать</b></div>
            <InputSwitch v-model="currentEditableUser.blocked" class="p-inputtext-sm" />
          </div>
        </div>
      </div>
    </div>
    <DataTable
      :value="accessData"
      :scrollable="true"
      scrollHeight="400px"
      selectionMode="single"
      v-if="currentEditableUser.access"
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
        <div class="add-button" @click="pageSearchModal = true">
          Добавить страницу или модуль
        </div>
      </template>
    </DataTable>
    <template #footer>
      <Button label="Сохранить" icon="pi pi-check" class="p-mr-2" @click="save"/>
      <Button label="Отмена" icon="pi pi-check" @click="close" />
    </template>
  </Dialog>
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
import helpers from "./helpers";
import EditorPageAddModal from "./EditorPageAddModal.vue";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import Dialog from "primevue/dialog";
import Dropdown from "primevue/dropdown";
import Password from "primevue/password";
import InputSwitch from "primevue/inputswitch";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import { isEqual, cloneDeep } from "@/helpers/useCompare";
import { useConfirm } from "primevue/useconfirm";
import { computed, ref, watch, onMounted } from "vue";
import { useStore } from "vuex"
export default {
  components: {
    Button,
    InputText,
    Dropdown,
    Password,
    InputSwitch,
    Dialog,
    DataTable,
    Column,
    EditorPageAddModal,
  },
  emits: ["update:modelValue"],
  props: {
    userData: {
      type: Object,
      default: () => ({}),
    },
    modelValue: {
      type: Boolean,
      required: true,
    },
  },
  setup(props, { emit }) {
    onMounted(() => store.dispatch('users/loadUsersRole'))
    const store = useStore()
    const startStateEditableUser = ref();
    const currentEditableUser = ref();
    const confirm = useConfirm();
    const pageSearchModal = ref(false);
    const visiblePasswordField = ref(false)
    watch(props, () => {
      if (props.modelValue) {
        currentEditableUser.value = cloneDeep(props.userData);
        startStateEditableUser.value = cloneDeep(props.userData);
      }
    });

    const roleOptions = ref([
      { name: "Администратор", type: "admin" },
      { name: "Менеджер", type: "manager" },
    ]);
    const pageRole = ref([
      { name: "Редактор", type: "editor" },
      { name: "Контент менеджер", type: "contentManager" },
    ]);
    const password = ref();
    const checkChange = computed(() =>
      isEqual(startStateEditableUser.value, currentEditableUser.value)
    );
    const accessData = computed(() =>
      helpers.toArrayOfObject(currentEditableUser.value.access.pages)
    );
    function addAccess(page) {
      pageSearchModal.value = false;
      currentEditableUser.value.access.pages[page.id] = {
        role: page.role,
        page_name: page.Title,
      };
    }
    function deleteAccess(id) {
      delete currentEditableUser.value.access.pages[id]
    }
    function save(){
      let request = password.value && visiblePasswordField ? { ...currentEditableUser.value, password: password.value } : currentEditableUser.value
      helpers.buildRequest(currentEditableUser.value, password.value, store.state.users.roles)
      store.dispatch("users/changeData", request)
      emit("update:modelValue", false)
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
            emit("update:modelValue", false);
            visiblePasswordField.value = false
          },
        });
      } else {
        emit("update:modelValue", false);
        visiblePasswordField.value = false
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
      save
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
