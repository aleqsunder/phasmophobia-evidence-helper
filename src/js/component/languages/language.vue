<template>
    <p :class="['languages-item', {'languages-item--selected': language.messages.flag === selectedLanguage}]"
       :title="language.messages.name" @click="setLanguage">
        <img :src="flag" alt="">
    </p>
</template>

<script>
    export default {
        name: "language",
        props: ['name'],

        methods: {
            setLanguage () {
                this.$store.commit('languages/select', this.name)
            }
        },

        computed: {
            flag () {
                return `img/flags/${this.language.messages.flag}.png`
            },

            language () {
                return this.$store.getters['languages/getByName'](this.name)
            },

            selectedLanguage () {
                return this.$store.getters['languages/selected'].messages.flag
            }
        }
    }
</script>