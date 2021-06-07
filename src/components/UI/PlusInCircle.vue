<template>
  <div class="p-d-flex p-jc-center p-my-2" v-if="$ability.can('create', role)">
    <Button
      icon="pi pi-plus"
      class="p-button-rounded p-button-outlined p-button-lg"
    />
  </div>
</template>

<script>
import Button from "primevue/button";
export default {
components: { Button },
}
</script>

<style>

</style>