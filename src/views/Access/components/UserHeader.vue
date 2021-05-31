<template>
  <h1 class="p-m-0">Менеджер пользователей</h1>
  <small>Всего пользователей: {{ $store.getters["users/usersCount"] }}</small>
  <div class="p-d-flex p-jc-between p-mt-4">
    <div>
      <span class="p-input-icon-left">
        <i class="pi pi-search" />
        <InputText type="text" placeholder="Поиск" :value="modelValue" @input="$emit('update:modelValue')"/>
      </span>
    </div>
    <div>
      <Button label="Новый пользователь" icon="pi pi-plus" @click="$emit('new-user-button-click')" />
    </div>
  </div>
</template>

<script>
import Button from "primevue/button";
import InputText from "primevue/inputtext";
export default {
  components: { Button, InputText },
  emits: ['new-user-button-click'],
  props: {
    modelValue: {
      type: String,
      default: ""
  }
}
}
</script>

<style>

</style>