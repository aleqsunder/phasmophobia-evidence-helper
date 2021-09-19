export default {
    namespaced: true,

    state () {
        return {
            selected: JSON.parse(localStorage.getItem('peh--selected')) ?? []
        }
    },

    actions: {
        select ({ commit, getters, rootGetters }, name) {
            commit('select', name)

            if (rootGetters['ghosts/coinciding'].length === 0) {
                commit('unselect', name)
                commit('notifications/add', rootGetters['languages/messages'].emptyGhostList(getters.getByName(name)), {root: true})
            }
        },

        unselect ({ commit }, name) {
            commit('unselect', name)
        }
    },

    mutations: {
        select (state, name) {
            if (state.selected.length < 3 && !state.selected.includes(name)) {
                state.selected = [...state.selected, name]
            }

            localStorage.setItem('peh--selected', JSON.stringify(state.selected))
        },

        unselect (state, name) {
            state.selected = state.selected.filter(e => e !== name)
            localStorage.setItem('peh--selected', JSON.stringify(state.selected))
        },

        set (state, evidences) {
            state.selected = evidences
        }
    },

    getters: {
        getByName: (state, getters) => name => {
            return getters.list[name]
        },

        list (state, getters, rootState, rootGetters) {
            return rootGetters['languages/evidences']
        },

        unselected (state, getters) {
            return Object.keys(getters.list).filter(evidence => !state.selected.includes(evidence))
        },

        selected (state) {
            return state.selected
        }
    }
}