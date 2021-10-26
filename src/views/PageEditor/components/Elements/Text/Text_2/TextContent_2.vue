<template>
  <TabView>
    <TabPanel header="Стиль">
      <img src="" alt="" />
      {{ $route.query.type }}
    </TabPanel>
    <TabPanel header="Контент">
      <FileUpload mode="basic" :customUpload="true" :maxFileSize="1000000" chooseLabel="Выбрать картинку" @uploader="load"/>
      <Editor v-model="value" editorStyle="height: 300px" class="p-mt-2"/>
    </TabPanel>
  </TabView>
</template>

<script>
import TabView from "primevue/tabview";
import FileUpload from 'primevue/fileupload';
import TabPanel from "primevue/tabpanel";
import Editor from "primevue/editor";
import api from '@/api'
import { ref, watch } from "vue";
import { useStore } from "vuex";
export default {
  components: { TabView, TabPanel, Editor, FileUpload },
  emits: ["data-component"],
  setup() {
    const store = useStore();
    const value = ref("sss");
    watch(value, () =>
      store.commit("pages/SET_DATA_ELEMENT", htmlParce(value.value))
    );
    function htmlParce(str) {
      return str.slice(3, str.length - 4);
    }
    function load(e){
      console.log(e.files)
      api.upload.uploadFile(e.files[0])
    }
    return {
      value,
      load
    };
  },
};
</script>

<style></style>
