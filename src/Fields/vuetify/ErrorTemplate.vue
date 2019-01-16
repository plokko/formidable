<template>
    <v-alert
        :type="type"
        :value="true"
        :dismissible="true"
        @input="close"
        >

        <strong>{{error.title}}</strong>
        <p v-if="error.description">{{error.description}}</p>
    </v-alert>
</template>
<script>
    import ErrorTemplate from '../ErrorTemplate'
    export default{
        extends: ErrorTemplate,
    }
</script>
