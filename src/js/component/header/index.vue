<template>
    <div class="header">
        <span class="header-title" v-text="config.PROJECT_NAME"/>
        <span class="header-version" v-text="config.VERSION"/>
        <Languages/>
    </div>
</template>

<script>
    import config from "../../config"
    import Languages from "../languages/index"

    export default {
        name: "Header",
        components: {Languages},

        data () {
            return {
                config
            }
        }
    }
</script>