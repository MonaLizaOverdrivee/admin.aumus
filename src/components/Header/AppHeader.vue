<template>
  <div class="p-d-flex p-jc-between">
    <div class="header__logo">
      <img src="@/assets/logo.png" alt="">
    </div>
    <div class="p-as-center p-d-flex">
      <span class="user__name p-as-center">{{ $store.getters["auth/fullName"] }}</span>
     <Button type="button" class="p-button-rounded p-button-text p-buttonsm" icon="pi pi-cog" @click="toggle" aria-haspopup="true" aria-controls="overlay_tmenu"/>
     <TieredMenu id="overlay_tmenu" ref="menu" :model="items" :popup="true" />
    </div>
  </div>
</template>

<script>
import Button from 'primevue/button';
import TieredMenu from 'primevue/tieredmenu';

export default {
  components: { Button, TieredMenu },
  data() {
    return {
      items: [
        {
          label: "Выход",
          icon: "pi pi-power-off",
          command: () => this.logOut()
        }
      ]
    }
  },
  methods: {
    logOut() {
      this.$store.dispatch("auth/logOut")
      this.$router.push('/auth')
    },
    toggle(event) {
      this.$refs.menu.toggle(event);
    }
  }
};
</script>

<style lang="scss" scoped>
.user__name {
  font-size: 15pt;
  color: var(--primary-color-text);
}
.header__logo {
  height: 80px;
  width: 80px;
  img {
    height: 100%;
    object-fit: cover;
    width: 100%;
  }
}
</style>
