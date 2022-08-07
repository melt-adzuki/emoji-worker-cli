<script setup lang="ts">
defineProps<{ title: string, username?: string }>()
</script>

<template>
    <div class="container">
        <div class="title">{{ title }}</div>
        <div class="username">{{ username ?? "Not yet logged in" }}</div>
    </div>
</template>

<style scoped>
.container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 2rem;
    background-color: gainsboro;
}

.title {
    font-size: 1.5rem;
    font-weight: bold;
}
</style>
