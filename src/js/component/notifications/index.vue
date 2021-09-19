<template>
    <div class="notifications">
        <notification v-for="notification in notifications" :key="notification.key" :notification="notification"/>
    </div>
</template>

<script>
    import notification from "./item"

    export default {
        name: "Notifications",
        components: {notification},

        computed: {
            notifications () {
                return this.$store.getters['notifications/firstThree']
            }
        }
    }
</script>