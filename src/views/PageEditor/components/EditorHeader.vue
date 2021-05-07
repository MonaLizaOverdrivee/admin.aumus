<template>
  <div class="p-d-flex p-jc-between">
    <div class="title">
      <input
        type="text"
        class="title__input"
        :placeholder="title || 'Название страницы'"
        :value="title"
        @input="$emit('update:title', $event.target.value)"
      />
    </div>
    <div>
      <AppLoaderButton
        label="Сохранить"
        iconBtn="pi pi-save"
        classBtn="p-button-success"
        @click="$emit('save')"
      />
      <Button
        label="Выход"
        icon="pi pi-times"
        class="p-button-danger p-ml-2"
        @click="$emit('exit')"
      />
    </div>
  </div>
  <div class="p-mt-2 p-d-flex p-mb-4">
    <div class="p-mr-2"><strong>Адрес: </strong></div>
    <div class="url__wrapper">
    <span class="url__domain">https://aumsu.ru</span><input type="text" class="url__input" placeholder="" :value="URL" @input="$emit('update:URL', $event.target.value)"/>
    </div>
  </div>
</template>

<script>
import Button from "primevue/button";
import AppLoaderButton from "@/components/UI/AppLoaderButton";

export default {
  props: {
    title: {
      type: String,
      default: "",
    },
    URL: {
      type: String,
      default: "",
    },
  },
  emits: ["save", "exit", "update:title", "update:URL"],
  components: { Button, AppLoaderButton },
};
</script>

<style lang="scss" scoped>
.url__wrapper {
  border-bottom: 1px solid gray
}
.url__domain {
  color: var(--text-color-secondary);
  cursor: default;
}
.url__input {
  border: none;
  outline: none;
  font-size: 16px;
  color: var(--primary-color);
  font-weight: 500;
  &:focus {
    background-color: var(--indigo-50);
    }
}
.title {
  flex: 1 1 auto;
  .title__input {
    border: none;
    outline: none;
    font-size: 32px;
    font-weight: 400;
    &:focus {
      background-color: var(--indigo-50);
    }
  }
  .title__icon {
    font-size: 20px;
  }
}
</style>
