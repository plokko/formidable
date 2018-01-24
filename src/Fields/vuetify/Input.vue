<template>
    <v-text-field
        :label="field.label || name"
        v-model="model"

        :required="field.required"
        :disabled="field.disabled"



        :dark="field.dark"
        :clearable="field.clearable"
        :auto-grow="field.autoGrow"
        :append-icon="field.appendIcon"
        :box="field.box"

        ></v-text-field>
</template>
<script>
    import Field from '../Field';
    export default{
        extends: Field
    }
</script>
