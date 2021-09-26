export default {
    namespaced: true,

    state () {
        return {
            list: []
        }
    },

    mutations: {
        add: (state, message) => state.list = [...state.list, {key: Date.now(), message}],
        remove: (state, key) => state.list = state.list.filter(notification => notification.key !== key)
    },

    getters: {
        firstThree: (state) => [...state.list].splice(0, 3)
    }
}