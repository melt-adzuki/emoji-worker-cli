import { createRouter, createWebHistory } from "vue-router"

const routes = [
    { path: "/", component: () => import("./pages/Home.vue") },
    { path: "/hello", component: () => import("./pages/HelloWorld.vue") }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
