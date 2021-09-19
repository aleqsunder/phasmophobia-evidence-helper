import config from "../../config"
import * as list from "../../constants/lang/all"

export default {
    namespaced: true,

    state () {
        return {
            config,
            list,

            selectedLanguage: localStorage.getItem('peh--language') ?? config.PROJECT_LANGUAGE,
        }
    },

    mutations: {
        select (state, language) {
            if (Object.keys(state.list).includes(language)) {
                state.selectedLanguage = language
                localStorage.setItem('peh--language', language)
            }
        }
    },

    getters: {
        getByName: state => name => {
            return state.list[name]
        },

        list (state) {
            return state.list
        },

        names (state) {
            return Object.keys(state.list)
        },

        selected (state) {
            return state.list[state.selectedLanguage]
        },

        messages (state, getters) {
            return getters.selected.messages
        },

        evidences (state, getters) {
            return getters.selected.evidences
        },

        ghosts (state, getters) {
            return getters.selected.ghosts
        },
    }
}