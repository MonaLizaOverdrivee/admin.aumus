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
    {{ checkChange }} <br />
    <!-- <pre>{{ startStateEditableUser }}</pre> <br /> -->
    <pre>{{ currentEditableUser }} </pre>
    <br />
    <template #footer>
      <Button label="Сохранить" icon="pi pi-check" class="p-mr-2" />
      <Button label="Отмена" icon="pi pi-check" @click="close" />
    </template>
  </Dialog>
</template>

<script>
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import Dialog from "primevue/dialog";
import Dropdown from "primevue/dropdown";
import Password from "primevue/password";
import InputSwitch from "primevue/inputswitch";
import { isEqual, cloneDeep } from "@/use/useCompare";
import { useConfirm } from "primevue/useconfirm";
import { computed, reactive, ref } from "vue";
export default {
  components: { Button, InputText, Dropdown, Password, InputSwitch, Dialog },
  emits: ["close-modal", "update:modelValue"],
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
    const startStateEditableUser = cloneDeep(props.userData);
    const currentEditableUser = reactive(cloneDeep(props.userData));
    const confirm = useConfirm();

    const roleOptions = ref([
      { name: "Администратор", type: "admin" },
      { name: "Менеджер", type: "editor" },
    ]);
    const password = ref();
    const checkChange = computed(() =>
      isEqual(startStateEditableUser, currentEditableUser)
    );
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
          },
        });
      } else {
        emit("update:modelValue", false);
      }
    }
    return {
      close,
      checkChange,
      startStateEditableUser,
      currentEditableUser,
      roleOptions,
      password,
    };
  },
};
</script>

<style scoped>
.user__plain-info {
  border-radius: 8px;
}
</style>
