import {createApp} from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Notifications from '@kyvg/vue3-notification'

import './assets/styles/style.scss'

createApp(App)
    .use(router)
    .use(store)
    .use(Notifications)
    .mount("#app");
