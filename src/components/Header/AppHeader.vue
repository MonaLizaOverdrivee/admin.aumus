<template>
  <div class="p-d-flex p-jc-between">
    <div class="header__logo">
      <img src="@/assets/logo.png" alt="">
    </div>
    <div class="p-as-center">
      <span class="user__name">Администратор</span>
    </div>
  </div>
</template>

<script>
export default {};
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
