import { createApp } from "vue";
import App from "./App.vue";
// import vuetify from "./plugins/vuetify";
import store from "./store/store";
import router from "./router/router";



import "./assets/scss/main.scss";

const app = createApp(App);
app.use(store);
app.use(router);
app.mount("#app");
