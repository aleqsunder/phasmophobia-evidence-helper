export default {
    namespaced: true,

    state () {
        return {
            types: {
                selected: 'filterSelected',
                crossedOut: 'filterCrossedOut'
            }
        }
    },

    actions: {
        selectEvidence: ({ commit, getters }, name) => commit('evidences/set', getters.getByName(name), {root: true})
    },

    getters: {
        getByName: (state, getters) => name => getters.list[name],

        list (state, getters, rootState, rootGetters) {
            const ghosts = rootGetters['languages/ghosts']

            return {
                [ghosts.spirit]:      ['emp', 'radio', 'book'],
                [ghosts.wraith]:      ['emp', 'laser', 'radio'],
                [ghosts.phantom]:     ['radio', 'finger', 'laser'],
                [ghosts.poltergeist]: ['radio', 'finger', 'book'],
                [ghosts.banshee]:     ['laser', 'finger', 'orb'],
                [ghosts.jinn]:        ['temp', 'finger', 'emp'],
                [ghosts.mare]:        ['orb', 'radio', 'book'],
                [ghosts.revenant]:    ['orb', 'temp', 'book'],
                [ghosts.shade]:       ['book', 'emp', 'temp'],
                [ghosts.demon]:       ['finger', 'book', 'temp'],
                [ghosts.yurei]:       ['orb', 'laser', 'temp'],
                [ghosts.oni]:         ['temp', 'emp', 'laser'],
                [ghosts.hantu]:       ['finger', 'orb', 'temp'],
                [ghosts.yokai]:       ['radio', 'orb', 'laser'],
                [ghosts.goryo]:       ['emp', 'finger', 'laser'],
                [ghosts.myling]:      ['emp', 'finger', 'book'],
            }
        },

        filterSelected: (state, getters, rootState, rootGetters) => (ghost, item) =>
            rootGetters['evidences/selected'].concat(item).every(evidence => getters.list[ghost].includes(evidence)),

        filterCrossedOut: (state, getters, rootState, rootGetters) => (ghost, item) =>
            !rootGetters['evidences/crossedOut'].concat(item).some(evidence => getters.list[ghost].includes(evidence)),

        coinciding: (state, getters) => Object.keys(getters.list)
            .filter(ghost => getters.filterSelected(ghost, []))
            .filter(ghost => getters.filterCrossedOut(ghost, [])),

        coincidingWith: (state, getters) => (item, type = 'selected') => {
            if (!Object.keys(state.types).includes(type)) {
                return []
            }

            let ghosts = Object.keys(getters.list)

            for (let index of Object.keys(state.types)) {
                ghosts = ghosts.filter(ghost => getters[state.types[index]](ghost, type === index ? item: []))
            }

            return ghosts
        },

        coincidingSelectedWith: (state, getters) => item => getters.coincidingWith(item, 'selected'),
        coincidingCrossedOutWith: (state, getters) => item => getters.coincidingWith(item, 'crossedOut'),
    }
}