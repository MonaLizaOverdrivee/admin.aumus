<template>
  <Dialog
    header="Редактор пользователя"
    :closable="false"
    :visible="modelValue"
    :style="{ width: '80vw' }"
    :maximizable="true"
    :modal="true"
  >
    <UserEditor :userData="userData" v-if="modelValue" @close-modal="$emit('update:modelValue', false)" ref="form"/>
    <template #footer>
      <AppLoaderButton label="Сохранить" icon="pi pi-check" classBtn="p-mr-2" @click="save" />
      <Button label="Отмена" icon="pi pi-times" @click="close" />
    </template>
  </Dialog>
</template>

<script>
import Dialog from "primevue/dialog";
import Button from "primevue/button";
import AppLoaderButton from "@/components/UI/AppLoaderButton";
import UserEditor from "./UserEditor.vue";
import { ref } from "vue"

export default {
  components: {
    Button,
    Dialog,
    AppLoaderButton,
    UserEditor,
  },
  emits: ["update:modelValue"],
  props: {
    userData: {
      type: Object,
    },
    modelValue: {
      type: Boolean,
      required: true,
    },
  },
  setup() {
    const form = ref(null)
    function close() {
      form.value.close()
    }
    function save() {
      form.value.save()
    }
    return {
      close,
      form,
      save
    }
  }
};
</script>
