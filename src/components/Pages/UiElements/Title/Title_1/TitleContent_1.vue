<template>
  <TabView>
    <TabPanel header="Стиль">
      <img src="" alt="" />
      {{ $route.query.type }}
      <slot />
    </TabPanel>
    <TabPanel header="Контент">
      <div class="p-fluid">
        <div class="p-field">
          <label for="firstname1">Заголовок:</label>
          <InputText id="firstname1" type="text" v-model="dataElement" />
        </div>
      </div>
    </TabPanel>
  </TabView>
</template>

<script>
import TabView from "primevue/tabview";
import TabPanel from "primevue/tabpanel";
import InputText from "primevue/inputtext";
import { ref } from "vue";
export default {
  components: { TabView, TabPanel, InputText },
  setup() {
    const dataElement = ref("");
    function getElementData() {
      return dataElement.value;
    }
    return {
      dataElement,
      getElementData,
    };
  },
};
</script>

<style></style>
