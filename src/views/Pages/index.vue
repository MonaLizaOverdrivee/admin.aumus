<template>
  <h1 class="p-m-0">Менеджер web-страниц</h1>
  <small>Всего страниц: {{ $store.getters["pages/pagesCount"] }}</small>
  <div class="p-d-flex p-jc-between p-mt-4">
    <div>
      <span class="p-input-icon-left">
        <i class="pi pi-search" />
        <InputText type="text" placeholder="Поиск" v-model="search" />
      </span>
    </div>
    <div>
      <Button label="Новая страница" icon="pi pi-plus" @click="createPage" />
    </div>
  </div>
  <PagesTable :pages="pages" />
</template>

<script>
import { onMounted, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import PagesTable from "./components/PagesTable";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import { computed } from "vue";
export default {
  components: { PagesTable, Button, InputText },
  setup() {
    const store = useStore();
    const router = useRouter();
    const search = ref("");
    onMounted(() => {
      store.dispatch("pages/loadPagesCount");
      store.dispatch("pages/loadPages");
    });
    const pages = computed(() => store.getters["pages/pages"]);
    function createPage() {
      store.commit("pages/SET_EDITABLE_PAGE", {
        Title: "",
        PageData: [],
        URL: "",
      });
      router.push("/pages/new");
    }
    return {
      pages,
      createPage,
      search,
    };
  },
};
</script>

<style></style>
