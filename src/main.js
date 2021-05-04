import { createApp } from "vue";
import "primevue/resources/themes/bootstrap4-light-purple/theme.css";
import "primeflex/primeflex.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import PrimeVue from "primevue/config";
import "./assets/theme.css";
import ConfirmationService from "primevue/confirmationservice";
import ToastService from 'primevue/toastservice';

createApp(App)
  .use(store)
  .use(router)
  .use(PrimeVue)
  .use(ConfirmationService)
  .use(ToastService)
  .mount("#app");
