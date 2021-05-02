<template>
  <h1 class="p-m-0">Менеджер web-страниц</h1>
  <small>Всего страниц: {{ $store.getters["pages/pagesCount"] }}</small>
  <div class="p-d-flex p-jc-between p-mt-4">
    <div>
      <span class="p-input-icon-left">
        <i class="pi pi-search" />
        <InputText type="text" placeholder="Поиск" />
      </span>
    </div>
    <div>
      <Button label="Новая страница" icon="pi pi-plus" @click="createPage" />
    </div>
  </div>
  <PageIndex :pages="pages" />
</template>

<script>
import { onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import PageIndex from "../components/Pages/PagesIndex";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import { computed } from "vue";
export default {
  components: { PageIndex, Button, InputText },
  setup() {
    const store = useStore();
    const router = useRouter();
    onMounted(() => {
      store.dispatch("pages/loadPagesCount");
      store.dispatch("pages/loadPages");
    });
    const pages = computed(() => store.getters["pages/pages"]);
    function createPage() {
      store.commit("pages/SET_EDITABLE_PAGE", {
        Title: "1",
        PageData: [{ data: "213" }],
        URL: "1",
      });
      router.push("/pages/new");
    }
    return {
      pages,
      createPage,
    };
  },
};
</script>

<style></style>
