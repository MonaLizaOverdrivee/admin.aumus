<template>
  <div class="p-fluid p-grid p-flex-column">
    <div class="p-col p-field">
      <InputText v-model="search" placeholder="Поиск"/>
    </div>
    <div class="p-col">
      <table style="width: 100%">
        <tr>
          <td
            class="p-d-flex p-justify-between"
            v-for="itm in pagesSummary"
            :key="itm"
          >
            <a href="#" @click.prevent="choosePage(itm)">{{ itm.Title }}</a>
            <span>Модуль</span>
          </td>
        </tr>
      </table>
      <pre>
        {{pagesSummary}}
      </pre>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import helpers from "./helpers"
import InputText from "primevue/inputtext";
export default {
  components: { InputText },
  mounted() {
    this.$nextTick(() => this.$store.dispatch("pages/loadSearchPage", "Локальные"));
  },
  computed: {
    ...mapGetters('pages', ['pagesSummary'])
  },
  methods: {
    choosePage(page) {
      this.$emit('choose-page', helpers.addBaseRole(page))
    }
  }
};
</script>

<style></style>
