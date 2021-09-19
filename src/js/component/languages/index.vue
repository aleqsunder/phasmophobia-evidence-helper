<template>
    <div class="languages">
        <Language v-for="name in this.$store.getters['languages/names']" :name="name"/>
    </div>
</template>

<script>
    import Language from "./language"

    export default {
        name: "Languages",
        components: {Language}
    }
</script>