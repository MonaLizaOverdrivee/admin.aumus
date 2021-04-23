<template>
  <div class="p-mt-2">
    <DataTable
      :value="pages"
      :scrollable="true"
      scrollHeight="400px"
      selectionMode="single"
      @row-click="consolee($event.data)"
    >
      <Column field="Title" header="Название страницы" style="min-width: 200px"></Column>
      <Column field="URL" header="URL" style="min-width: 200px"></Column>
      <Column field="created_at" header="Создано" style="min-width: 200px">
        <template #body="slotProps">
          {{ new Date(slotProps.data.created_at).toLocaleDateString() }}
        </template>
      </Column>
      <Column field="updated_at" header="Обновлено" style="min-width: 200px">
        <template #body="slotProps">
          {{ new Date(slotProps.data.updated_at).toLocaleDateString() }}
        </template>
      </Column>
      <Column field="id" header="ID" style="min-width: 200px"></Column>
    </DataTable>
  </div>
</template>

<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { ref } from "vue";

export default {
  components: { DataTable, Column },
  props: ["pages"],
  setup() {
    const store = useStore();
    const router = useRouter();
    const products = ref([
      {
        code: 34,
        name: "asdsad",
        category: "asdbvcvb",
        quantity: 12,
        price: 230,
      },
    ]);
    function consolee(dataPage) {
      router.push(`/pages/${dataPage.id}`);
      store.commit('pages/SET_EDITABLE_PAGE', dataPage)
    }
    return { products, consolee };
  },
};
</script>

<style>
.p-datatable-wrapper {
  border-radius: 8px;
}
</style>
