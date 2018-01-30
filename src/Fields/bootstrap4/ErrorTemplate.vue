<template>
    <div class="alert alert-danger">
        <strong>{{error.title}}</strong>
        <p v-if="error.description">{{error.description}}</p>
    </div>
</template>
<script>
    export default{
        extends: require('../ErrorTemplate'),
    }
</script>
