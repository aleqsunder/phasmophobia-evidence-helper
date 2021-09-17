<template>
    <p :class="['languages-item', {'languages-item--selected': this.language.messages.flag === selectedLanguage}]"
       :title="this.language.messages.name" @click="setLanguage">
        <img :src="flag" alt="">
    </p>
</template>

<script>
    export default {
        name: "language",
        props: ['language', 'selectedLanguage'],

        methods: {
            setLanguage () {
                this.$emit('setLanguage', this.language.messages.flag)
            }
        },

        computed: {
            flag () {
                return `img/flags/${this.language.messages.flag}.png`
            }
        }
    }
</script>