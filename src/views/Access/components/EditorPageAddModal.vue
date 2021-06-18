<template>
  <div class="p-fluid p-grid p-flex-column">
    <div class="p-col p-field">
      <div class="p-inputgroup">
      <InputText v-model="searchValue" placeholder="Поиск" @keyup.enter="toSearch" @click="toSearch"/>
         <Button icon="pi pi-search" />
         <Button icon="pi pi-times" class="p-button-outlined" v-if="searchValue" @click="toReset"/>
      </div>
    </div>
    <div class="p-col">
      <table style="width: 100%">
        <tr>
          <td class="p-d-flex p-justify-between" v-for="itm in pagesSummary" :key="itm">
            <a href="#" @click.prevent="choosePage(itm)">{{ itm.Title }}</a>
            <span>Модуль</span>
          </td>
        </tr>
      </table>
      <pre>
        {{ pagesSummary }}
      </pre>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import helpers from "./helpers";
import InputText from "primevue/inputtext";
import Button from "primevue/button"
export default {
  components: { InputText, Button },
  mounted() {
    this.$nextTick(() => this.$store.dispatch("pages/loadSearchPage", { query: '' }));
  },
  data(){
    return {
      searchValue: ''
    }
  },
  computed: {
    ...mapGetters("pages", ["pagesSummary"]),
  },
  methods: {
    choosePage(page) {
      this.$emit("choose-page", helpers.addBaseRole(page));
    },
    toSearch() {
        this.$store.dispatch("pages/loadSearchPage", { query: this.searchValue })
    },
    toReset() {
      this.searchValue = ''
      this.toSearch()
    }

  },
};
</script>

<style></style>
