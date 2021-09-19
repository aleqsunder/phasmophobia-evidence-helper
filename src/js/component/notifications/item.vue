<template>
    <p class="notifications__item">
        {{ this.notification.message }}
    </p>
</template>

<script>
    export default {
        name: "notification",
        props: ['notification'],

        methods: {
            deleteNotification () {
                this.$store.commit('notifications/remove', this.notification.key)
            }
        },

        created () {
            setTimeout(this.deleteNotification, 2200)
        }
    }
</script>