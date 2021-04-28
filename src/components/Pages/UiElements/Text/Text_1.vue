<template>
  <TabView>
    <TabPanel header="Стиль">
      <img src="" alt="" />
      {{ $route.query.type }}
    </TabPanel>
    <TabPanel header="Контент">
      <Editor v-model="value" editorStyle="height: 300px" />
    </TabPanel>
  </TabView>
</template>

<script>
import TabView from "primevue/tabview";
import TabPanel from "primevue/tabpanel";
import Editor from "primevue/editor";
import { ref, watch } from "vue";
import { useStore } from "vuex";
export default {
  components: { TabView, TabPanel, Editor },
  emits: ["data-component"],
  setup() {
    const store = useStore();
    const value = ref("sss");
    watch(value, () => store.commit("pages/SET_DATA_ELEMENT", value.value));
    return {
      value,
    };
  },
};
</script>

<style></style>
