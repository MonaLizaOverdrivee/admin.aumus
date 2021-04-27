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
  <p>{{ value }}</p>
</template>

<script>
import TabView from "primevue/tabview";
import TabPanel from "primevue/tabpanel";
import Editor from "primevue/editor";
import { ref, watch } from "vue";
export default {
  components: { TabView, TabPanel, Editor },
  emits: ["data-component"],
  setup(_, { emit }) {
    const value = ref("sss");
    watch(value, () => emit("data-component", value.value));
    return {
      value,
    };
  },
};
</script>

<style></style>
