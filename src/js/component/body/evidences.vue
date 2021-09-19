<template>
    <div class="item">
        <h3 class="item__title" v-text="normalizedTitle"/>
        <transition-group v-if="itemsLength > 0" name="item__content" tag="ul" class="item__content">
            <li class="item__content-li" v-for="(item, key) in normalizedItems" :key="key" @click="callback(key)" v-text="item"/>
        </transition-group>
        <h5 v-else class="item__content item_title" v-text="$store.getters['languages/messages'].empty"/>
    </div>
</template>

<script>
    export default {
        name: "EvidenceTemplate",
        props: ['title', 'items', 'dispatch'],

        methods: {
            callback (name) {
                this.$store.dispatch(`evidences/${this.dispatch}`, name)
            },

            getName (key) {
                return this.$store.getters[`evidences/getByName`](key)
            }
        },

        computed: {
            normalizedTitle () {
                return this.$store.getters['languages/messages'][this.title]
            },

            normalizedItems () {
                return this.$store.getters[`evidences/${this.items}`]
                    .reduce((object, item) => (object[item] = this.getName(item), object), {})
            },

            itemsLength () {
                return Object.keys(this.normalizedItems).length
            }
        }
    }
</script>