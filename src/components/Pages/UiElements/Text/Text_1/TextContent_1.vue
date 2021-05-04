<template>
  <TabView>
    <TabPanel header="Стиль">
      <img src="" alt="" />
      <slot />
    </TabPanel>
    <TabPanel header="Контент">
      <Editor v-model="dataElement" editorStyle="height: 300px" />
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
  setup() {
    const dataElement = ref("");
    function getElementData() {
      if(dataElement.value.indexOf("<p>")  === -1) return dataElement.value;
      let newString = "";
      let start = 0;
      while (start < dataElement.value.length) {
        const strtIndex = dataElement.value.indexOf("<p>", start) + 3;
        const endIndex = dataElement.value.indexOf("</p>", start);
        newString += dataElement.value.substring(strtIndex, endIndex);
        start = endIndex + 4;
      }

      return newString.trim();
    }
    return {
      dataElement,
      getElementData,
    };
  },
};
</script>

<style></style>
