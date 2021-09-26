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
        getByName: state => name => state.list[name],
        list:      state => state.list,
        names:     state => Object.keys(state.list),
        selected:  state => state.list[state.selectedLanguage],

        messages:  (state, getters) => getters.selected.messages,
        evidences: (state, getters) => getters.selected.evidences,
        ghosts:    (state, getters) => getters.selected.ghosts,
    }
}