<template>
  <div class="p-field p-col-12 p-md-3">
    <label for="firstName">Имя</label>
    <InputText id="firstName" type="text" :value="name" @input="$emit('update:name')" />
  </div>
  <div class="p-field p-col-12 p-md-3">
    <label for="lastName">Фамилия</label>
    <InputText id="lastName" type="text" :value="surname" />
  </div>
  <div class="p-field p-col-12 p-md-3">
    <label for="username">Логин</label>
    <InputText id="username" type="text" v-model="userLogin" />
  </div>
  <div class="p-field p-col-12 p-md-3">
    <label for="email">Email</label>
    <InputText id="email" type="text" v-model="userEmail" />
  </div>
  <div class="p-field p-col-12 p-md-3">
    <label for="password">Пароль</label>
    <Password v-model="userName" toggleMask />
  </div>
</template>

<script>
import { valid } from "@/services/validation";
import InputText from "primevue/inputtext";
import Password from "primevue/password";
import { useField, useForm } from "vee-validate";
import { toRefs } from "@vue/reactivity";
export default {
  components: { InputText, Password },
  emits: ["update:name", "update:surname", "update:login", "update:email", "update:password"],
  props: {
    name: {
      type: String,
      default: "",
    },
    surname: {
      type: String,
      default: "",
    },
    login: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      default: "",
    },
    password: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    const { name, surname, login, email } = toRefs(props);
    const { handleSubmit } = useForm();

    const { value: userName, errorMessage: nameError } = useField("name", valid.base);
    userName.value = name.value;

    const { value: userSurname, errorMessage: surnameError } = useField("surname", valid.base);
    userSurname.value = surname.value;

    const { value: userLogin, errorMessage: loginError } = useField("login", valid.base);
    userLogin.value = login.value;

    const { value: userEmail, errorMessage: emailError } = useField("email", valid.email);
    userEmail.value = email.value;

    const updateValue = handleSubmit((data) => {
      console.log(data);
    });
    return {
      userName,
      nameError,
      userSurname,
      surnameError,
      userLogin,
      loginError,
      emailError,
      userEmail,
      updateValue,
    };
  },
};
</script>

<style></style>
