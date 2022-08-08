<script setup lang="ts">
import { computed, ref } from "vue"
import { useRouter } from "vue-router"
import { useStore } from "../store"
import { Emojis } from "../types"
import Header from "../components/Header.vue"
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
const newEmoji = ref<string>("")
const isDeleteMode = ref<boolean>(false)
// endregion


// region Functions
function addEmoji(): void {
    if (newEmoji.value === "") return

    api.value.add(newEmoji.value)
        .then(result => emojis.value = result.value)

    newEmoji.value = ""
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
    <Header title="Admin console" :username="api.username" />

    <draggable v-model="emojis" @change="onChange" item-key="id" v-bind="{ disabled: isDeleteMode, animation: 250 }" >
        <template #item="{ element, index }">
            <p>
                <span>{{ index }}</span>
                <span>{{ element }}</span>
                <button v-if="isDeleteMode" @click="deleteEmoji(index)">❌</button>
            </p>
        </template>
    </draggable>

    <div>
        <input type="text" v-model="newEmoji" />
        <button @click="addEmoji">Add</button>
    </div>

    <div>
        <input type="checkbox" name="delete" v-model="isDeleteMode" />
        <label for="delete">Show delete button</label>
    </div>
</template>
