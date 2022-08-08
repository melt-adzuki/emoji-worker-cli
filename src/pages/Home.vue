<script setup lang="ts">
import { reactive } from "vue"
import { User } from "../types"
import { useRouter } from "vue-router"
import { useStore } from "../store"
import Api from "../api"
import Header from "../components/Header.vue"
import headerImage from "../assets/header-login.svg"
import Container from "../components/Container.vue"

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
        <Header :src="headerImage" />

        <Container>
            <div class="inner">
                <input v-model="user.username" @keypress.enter="submit" type="text" placeholder="Username" />
                <input v-model="user.password" @keypress.enter="submit" type="password" placeholder="Password" />
                <button @click="submit">Submit</button>
            </div>
        </Container>
    </div>
</template>

<style scoped>
.inner {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    width: 100%;
    padding: 2rem;
    border-radius: 1rem;
    background-color: white;
}

.inner > * {
    padding: 1rem;
}

.inner > input {
    border: none;
    background-color: #fafafa;
}

.inner > input:focus-visible {
    outline: none;
}

.inner > button {
    border: none;
    border-radius: 0.5rem;
    background-color: black;
    color: white;
    padding: 1rem;
    cursor: pointer;
    margin-top: 1rem;
}
</style>
