<template>
    <div class="item">
        <h3 class="item__title" v-text="normalizedTitle"/>
        <ul v-if="itemsLength > 0" class="item__content">
            <li class="item__content-li" v-for="(item, key) in normalizedItems" :key="key" @click="callback(key)">
                {{ item }}
                <ul v-if="selectedEvidences.length === 2" class="item__content-li__massive">
                    <template v-for="evidence in ghostEvidence(item)">
                        <li v-if="!selectedEvidences.includes(evidence)" class="item__content-li__massive-item" v-text="normalizedEvidence(evidence)"/>
                    </template>
                </ul>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "GhostTemplate",
        props: ['title', 'items', 'dispatch'],

        methods: {
            callback (name) {
                this.$store.dispatch(`ghosts/${this.dispatch}`, name)
            },

            ghostEvidence (name) {
                return this.$store.getters['ghosts/getByName'](name)
            },

            normalizedEvidence (name) {
                return this.$store.getters['evidences/getByName'](name)
            },
        },

        computed: {
            normalizedTitle () {
                return this.$store.getters['languages/messages'][this.title]
            },

            normalizedItems () {
                return this.$store.getters[`ghosts/${this.items}`]
                    .reduce((object, item) => (object[item] = item, object), {})
            },

            selectedEvidences () {
                return this.$store.getters['evidences/selected']
            },

            itemsLength () {
                return Object.keys(this.normalizedItems).length
            },
        }
    }
</script>