<template>
    <div class="body">
        <div class="body__wrap-list">
            <Evidences title="selectedEvidence" items="selected" dispatch="unselect"/>
            <Evidences title="crossedOutEvidence" items="crossedOut" dispatch="uncrossOut"/>
        </div>
        <Evidences title="allEvidence" items="unselected" filter="ghosts/coincidingWith" dispatch="select" contextMenu="crossOut"/>
        <Ghosts title="ghosts" items="coinciding" dispatch="selectEvidence"/>
    </div>
</template>

<script>
    import Evidences from "./evidences"
    import Ghosts from "./ghosts"

    export default {
        name: "Body",
        components: {Evidences, Ghosts},
    }
</script>