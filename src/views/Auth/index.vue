<template>
  <div class="p-grid auth">
    <div class="p-col-6 auth__logo p-d-flex p-ai-center p-jc-center">
      <img src="@/assets/logo.png" alt="" />
    </div>
    <div class="p-col-6 auth__form p-d-flex p-ai-center p-jc-center">
      <div class="p-p-3">
        <h1>Вход в систему</h1>
        <LoginForm />
      </div>
    </div>
  </div>
</template>

<script>
import LoginForm from "./components/LoginForm"

export default {
  components: { LoginForm }
};
</script>

<style lang="scss" scoped>
.auth {
  height: 100vh;
  .auth__form {
    // background-color: var(--primary-color);
    color: var(--primary-color-text);
  }
  .auth__logo {
    background-color: #fff;
    img {
      height: 40%;
      animation-duration: 2s;
      animation-name: slidein;
      animation-iteration-count: infinite;
      animation-direction: alternate;
    }
    @keyframes slidein {
      from {
        transform: translateY(0);
      }
      to {
        transform: translateY(15px);
      }
    }
  }
}
</style>
