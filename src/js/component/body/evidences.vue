<template>
    <div class="item">
        <h3 class="item__title" v-text="normalizedTitle"/>
        <transition-group v-if="itemsLength > 0" name="item__content" tag="ul" class="item__content">
            <li v-for="(item, key) in normalizedItems" :class="['item__content-li', {'item__content-li--hidden': item.hidden}]"
                :key="key" @click="callback(key)" @contextmenu.prevent="rightClickCallback(key)" v-text="item.name"/>
        </transition-group>
        <h5 v-else class="item__content item_title" v-text="$store.getters['languages/messages'].empty"/>
    </div>
</template>

<script>
    export default {
        name: "EvidenceTemplate",
        props: {
            title:       [String, Number],
            items:       {type: String, default: () => 'list'},
            dispatch:    {type: String, default: () => null},
            contextMenu: {type: String, default: () => null},
            filter:      {type: String, default: () => null}
        },

        methods: {
            callback (name) {
                if (this.dispatch) {
                    this.$store.dispatch(`evidences/${this.dispatch}`, name)
                }
            },

            rightClickCallback (name) {
                if (this.contextMenu) {
                    this.$store.dispatch(`evidences/${this.contextMenu}`, name)
                }
            },

            getData (key) {
                let name = this.$store.getters[`evidences/getByName`](key),
                    hidden = false

                if (this.filter) {
                    if (this.$store.getters[this.filter](key).length === 0) {
                        hidden = true
                    }
                }

                return {name, hidden}
            }
        },

        computed: {
            normalizedTitle () {
                return this.$store.getters['languages/messages'][this.title]
            },

            normalizedItems () {
                return this.$store.getters[`evidences/${this.items}`]
                    .reduce((object, item) => (object[item] = this.getData(item), object), {})
            },

            itemsLength () {
                return Object.keys(this.normalizedItems).length
            }
        }
    }
</script>