<script setup lang="ts">
import { computed } from "vue"
import { useRouter } from "vue-router"
import Header from "../components/Header.vue"
import { useStore } from "../store"

const router = useRouter()
const store = useStore()

const username = computed(() => store.state.api?.username)

if (!username.value) router.push("/")
</script>

<template>
    <Header title="Admin console" :username="username" />
</template>
