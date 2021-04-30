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
import { ref } from "vue";
export default {
  components: { TabView, TabPanel, Editor },
  emits: ["data-component"],
  setup() {
    const value = ref("sss");
    function htmlParce() {
      let newString = "";
      let start = 0;

      while (start < value.value.length) {
        const strtIndex = value.value.indexOf("<p>", start) + 3;
        const endIndex = value.value.indexOf("</p>", start);
        newString += value.value.substring(strtIndex, endIndex);
        start = endIndex + 4;
      }

      return newString.trim();
    }
    return {
      value,
      htmlParce,
    };
  },
};
</script>

<style></style>
