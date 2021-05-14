<template>
  <div class="p-mt-2 pages_table">
    <DataTable
      :value="users"
      :scrollable="true"
      scrollHeight="400px"
      selectionMode="single"
      @row-click="selectUser($event.data)"
    >
      <Column
        header="Ф.И.О"
        style="min-width: 200px"
      >
         <template #body="slotProps">
          {{ slotProps.data.firstName + " " + slotProps.data.lastName }}
        </template>
      </Column>
      <Column field="username" header="Логин" style="min-width: 200px" />
      <Column header="Роль" style="min-width: 200px">
         <template #body="slotProps">
          {{ slotProps.data.role.name }}
        </template>
      </Column>
      <Column field="email" header="Email" style="min-width: 200px" />
      <Column field="last_auth" header="Последний вход" style="min-width: 200px">
        <template #body="slotProps">
          {{ new Date(slotProps.data.last_auth).toLocaleString() }}
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";

export default {
  components: { DataTable, Column },
  props: ["users"],
  setup() {
    function selectUser(dataUser) {
      console.log(dataUser)
    }
    return { selectUser };
  },
};
</script>

<style scoped>
</style>
