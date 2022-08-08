import { createApp } from "vue"
import { store } from "./store"
import "./style.css"
import App from "./App.vue"
import Toast, { PluginOptions, POSITION } from "vue-toastification"
import router from "./router"

const toastOptions: PluginOptions = {
    transition: "Vue-Toastification__fade",
    maxToasts: 1,
    newestOnTop: true,
    position: POSITION.BOTTOM_CENTER,
    timeout: 5000,
    closeOnClick: true,
    pauseOnFocusLoss: false,
    pauseOnHover: false,
    draggable: true,
    draggablePercent: 0.6,
    showCloseButtonOnHover: false,
    hideProgressBar: true,
    icon: true,
    rtl: false,
}

createApp(App)
    .use(router)
    .use(store)
    .use(Toast, toastOptions)
    .mount("#app")
