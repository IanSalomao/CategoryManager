import { createApp } from "vue";
import router from "./Router";
import App from "./App.vue";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "bootstrap";

createApp(App).use(router).mount("#app");
