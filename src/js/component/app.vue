<template>
    <Header/>
    <Body/>
    <Footer/>
</template>

<script>
    import Header from "./header/index"
    import Body from "./body/index"
    import Footer from "./footer/index"

    export default {
        name: "app",
        components: {Header, Body, Footer}
    }
</script>