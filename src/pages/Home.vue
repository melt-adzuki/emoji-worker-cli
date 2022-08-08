<script setup lang="ts">
import { reactive } from "vue"
import { User } from "../types"
import { useRouter } from "vue-router"
import { useStore } from "../store"
import Api from "../api"
import Header from "../components/Header.vue"

const router = useRouter()
const store = useStore()

const user = reactive<User>({
    username: "",
    password: "",
})

const submit = async () => {
    const api = new Api(user)
    await api.auth()

    store.commit("login", { api })
    await router.push("/admin")
}
</script>

<template>
    <div>
        <Header title="Login" />

        <input v-model="user.username" type="text" placeholder="Username" />
        <input v-model="user.password" type="password" placeholder="Password" />
        <button @click="submit">Submit</button>
    </div>
</template>
