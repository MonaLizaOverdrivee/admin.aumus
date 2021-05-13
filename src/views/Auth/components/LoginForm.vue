<template>
  <form class="p-fluid p-input-filled" @submit.prevent="onSubmit">
    <div class="p-field">
      <label for="login">Email</label>
      <InputText
        id="login"
        type="email"
        v-model="email"
        aria-describedby="login-help"
        :class="{ 'p-invalid': eError }"
        @focus="invalidSubmitMessage = ''"
      />
      <small id="login-help" class="p-error">{{ eError }}</small>
    </div>
    <div class="p-field">
      <label for="password">Пароль</label>
      <InputText
        id="password"
        type="password"
        v-model="password"
        :class="{ 'p-invalid': pError }"
        @focus="invalidSubmitMessage = ''"
      />
      <small id="password-help" class="p-error">{{ pError }}</small>
    </div>
    <Button label="Войти" @click="onSubmit" v-if="!loader" />
    <div class="p-d-flex p-jc-center" v-else>
      <ProgressSpinner style="width: 40px; height: 40px" strokeWidth="8" />
    </div>
    <div class="p-text-center">
      <small class="p-error" v-if="invalidSubmitMessage">{{
        invalidSubmitMessage
      }}</small>
    </div>
  </form>
</template>

<script>
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import ProgressSpinner from "primevue/progressspinner";
import * as yup from "yup";
import { ref } from "vue"
import { useField, useForm } from "vee-validate";
import { useStore } from "vuex"
import { useRouter } from "vue-router"

export default {
  components: { InputText, Button, ProgressSpinner },
  setup() {
    const store = useStore()
    const router = useRouter()
    const loader = ref(false);
    const invalidSubmitMessage = ref('')
    const schema = yup.object({
       email: yup.string().trim().required("Это обязательное поле").email("Введите корректный email"),
       password: yup.string().trim().required("Это обязательное поле"),
     })
    const { handleSubmit } = useForm({validationSchema: schema});
    const { value: email, errorMessage: eError } = useField('email')
    const { value: password, errorMessage: pError } = useField('password')
    const onSubmit = handleSubmit(async (data) => {
      try {
        loader.value = true
        await store.dispatch('auth/login', data)
        loader.value = false
        router.push('/')
      } catch (error) {
         loader.value = false
        invalidSubmitMessage.value = "Неправильный логин или пароль"
      }
    })
    return {
      email,
      password,
      onSubmit,
      eError,
      pError,
      invalidSubmitMessage,
      loader
    };
  },
};
</script>
