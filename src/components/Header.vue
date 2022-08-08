<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';

defineProps<{ src: string, option?: string }>()

const router = useRouter()
const isHome = computed(() => router.currentRoute.value.path === "/")
</script>

<template>
    <div class="header">
        <div class="inner">
            <button class="button" v-if="!isHome" @click="router.push('/')">
                <img src="../assets/icon-chevron-back.svg" />
            </button>
            <div class="spacer" v-else></div>
            <img class="image" :src="src" />
        </div>
    </div>
</template>

<style scoped>
.header {
    width: 100%;
    background-color: white;
}

.inner {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    margin: auto;
    max-width: 768px;
    padding: 3rem 0 3rem 3rem;
    height: 15em;
    gap: 1rem;
}

.button {
    padding: 0;
    border: none;
    cursor: pointer;
    background-color: transparent;
}

.button > img {
    width: 2rem;
    height: 2rem;
}

.image {
    width: 15rem;
}
</style>
