<script setup lang="ts">
import { computed, ref } from "vue"
import { useRouter } from "vue-router"
import { useStore } from "../store"
import { Emojis } from "../types"
import Header from "../components/Header.vue"
import Container from "../components/Container.vue"
import headerImage from "../assets/header-admin_console.svg"
import draggable from "vuedraggable"

// region Variables
const router = useRouter()
const store = useStore()

const api = computed(() => {
    if (!store.state.api) {
        router.push("/")
        throw new Error("No API")
    }
    return store.state.api
})

const emojis = ref<Emojis["value"]>()
const isDeleteMode = ref<boolean>(false)
const isDraggable = ref<boolean>(false)
// endregion


// region Functions
function addEmoji(): void {
    const newEmoji = prompt("Enter emoji")
    if (newEmoji === "" || !newEmoji) return

    api.value.add(newEmoji)
        .then(result => emojis.value = result.value)
}

function deleteEmoji(index: number): void {
    api.value.delete(index)
        .then(result => emojis.value = result.value)
}

function onChange(event: any): void {
    api.value.move(event.moved.oldIndex, event.moved.newIndex)
        .then(result => emojis.value = result.value)
}
// endregion


// region Initialization
api.value.list()
    .then(result => emojis.value = result.value)
// endregion
</script>

<template>
    <Header :src="headerImage" />

    <Container>
        <draggable class="emojis" v-model="emojis" @change="onChange" item-key="id" v-bind="{ disabled: !isDraggable, animation: 250 }" >
            <template #item="{ element, index }">
                <div class="element" :class="isDraggable ? 'draggable' : ''">
                    <span>{{ element }}</span>
                    <span v-if="!isDeleteMode">{{ index }}</span>
                    <button v-else class="button" @click="deleteEmoji(index)"><img src="../assets/icon-close.svg"></button>
                </div>
            </template>
        </draggable>

        <div class="actions" v-if="emojis">
            <button class="button" @click="addEmoji"><img src="../assets/icon-add.svg"></button>
            <button class="button" @click="(isDraggable = !isDraggable) && (isDeleteMode = false)" :class="isDraggable ? 'highlighted' : ''"><img src="../assets/icon-swap-vertical.svg"></button>
            <button class="button" @click="(isDeleteMode = !isDeleteMode) && (isDraggable = false)" :class="isDeleteMode ? 'highlighted' : ''"><img src="../assets/icon-close.svg"></button>
        </div>
    </Container>
</template>

<style scoped>
.emojis {
    background-color: white;
    border-radius: 1rem;
}

.emojis > .element {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #eee;
    padding: 1rem;
    height: 1.5rem;
}

.emojis > .element.draggable {
    cursor: move;
}

.emojis > .element:first-child {
    border-top-left-radius: 1rem;
    border-top-right-radius: 1rem;
}

.emojis > .element:last-child {
    border-bottom-left-radius: 1rem;
    border-bottom-right-radius: 1rem;
    border-bottom-width: 0px;
}

.button {
    padding: 0;
    border: none;
    cursor: pointer;
    background-color: transparent;
}

.button > img {
    width: 1.5rem;
    height: 1.5rem;
}

.actions {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-top: 2rem;
}

.actions > .button {
    padding: 1rem;
    background-color: white;
}

.actions > .button.highlighted {
    background-color: #eee;
}

.actions > .button:active {
    background-color: #eee;
}

.actions > .button:first-child {
    border-top-left-radius: 1rem;
    border-bottom-left-radius: 1rem;
}

.actions > .button:last-child {
    border-top-right-radius: 1rem;
    border-bottom-right-radius: 1rem;
}

.actions > .button:not(last-child) {
    border-right: 1px solid #eee;
}

.actions > .button > img {
    width: 3rem;
    height: 3rem;
}
</style>
