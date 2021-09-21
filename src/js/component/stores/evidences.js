export default {
    namespaced: true,

    state () {
        return {
            selected: JSON.parse(localStorage.getItem('peh--selected')) ?? [],
            crossedOut: JSON.parse(localStorage.getItem('peh--crossedOut')) ?? [],
        }
    },

    actions: {
        select ({ commit, getters, rootGetters }, name) {
            if (rootGetters['ghosts/coincidingWith'](name).length === 0) {
                return commit('notifications/add', rootGetters['languages/messages'].emptyGhostList(getters.getByName(name)), {root: true})
            }

            commit('select', name)
        },

        unselect ({ commit }, name) {
            commit('unselect', name)
        },

        crossOut ({ commit }, name) {
            commit('crossOut', name)
        },

        uncrossOut ({ commit }, name) {
            commit('uncrossOut', name)
        },
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

        crossOut (state, name) {
            state.crossedOut = [...state.crossedOut, name]
            localStorage.setItem('peh--crossedOut', JSON.stringify(state.crossedOut))
        },

        uncrossOut (state, name) {
            state.crossedOut = state.crossedOut.filter(e => e !== name)
            localStorage.setItem('peh--crossedOut', JSON.stringify(state.crossedOut))
        },

        set (state, evidences) {
            state.selected = evidences
        }
    },

    getters: {
        getByName: (state, getters, rootState, rootGetters) => name => {
            return rootGetters['languages/evidences'][name]
        },

        list (state, getters, rootState, rootGetters) {
            return Object.filter(rootGetters['languages/evidences'], evidence => state.crossedOut.includes(evidence), true)
        },

        unselected (state, getters) {
            return Object.keys(getters.list).filter(evidence => !state.selected.includes(evidence))
        },

        selected (state) {
            return state.selected
        },

        crossedOut (state) {
            return state.crossedOut
        }
    }
}