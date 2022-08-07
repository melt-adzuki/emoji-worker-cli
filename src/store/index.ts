import { createStore } from "vuex"

const store = createStore({
    state: {
        count: 1
    },
    mutations: {
        increment(state) {
            state.count *= 2
        }
    },
})

export default store
