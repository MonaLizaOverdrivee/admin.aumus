import { ref, computed } from 'vue'
import { isEqual, cloneDeep } from "@/use/useCompare";

const emptyFields = {
  username: "",
  email: "",
  confirmed: true,
  blocked: false,
  role: {
    id: 4,
    name: "Admin",
    description: "admin",
    type: "",
  },
  access: null,
  last_auth: null,
  firstName: "",
  lastName: "",
  created_at: "",
  updated_at: "",
};

export default () => {
  const display = ref(false)
  const startStateEditableUser = ref(cloneDeep(emptyFields));
  const currentEditableUser = ref(cloneDeep(emptyFields));
  const password = ref('')
  const roleOptions = ref([
    { name: "Администратор", type: "admin" },
    { name: "Менеджер", type: "manager" },
  ]);
  const checkChange = computed(() =>
      isEqual(startStateEditableUser.value, currentEditableUser.value)
    );
  return {
    checkChange,
    display,
    currentEditableUser,
    roleOptions,
    startStateEditableUser,
    password
  }
}