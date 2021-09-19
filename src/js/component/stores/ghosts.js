export default {
    namespaced: true,

    state () {
        return {

        }
    },

    actions: {
        selectEvidence ({ commit, getters }, name) {
            commit('evidences/set', getters.getByName(name), {root: true})
        }
    },

    getters: {
        getByName: (state, getters) => name => {
            return getters.list[name]
        },

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

        coinciding (state, getters, rootState, rootGetters) {
            return Object.keys(getters.list).filter(ghost => {
                return rootGetters['evidences/selected'].every(evidence => getters.list[ghost].includes(evidence))
            })
        }
    }
}