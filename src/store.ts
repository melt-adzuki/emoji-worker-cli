import { createStore, useStore as vuexUseState } from "vuex"
import Api from "./api"

type State = { api: Api | null }

export const store = createStore<State>({
    state: {
        api: null,
    },
    mutations: {
        login(state, payload) {
            state.api = payload.api
        },
    },
})

export const useStore = () => vuexUseState<State>()
