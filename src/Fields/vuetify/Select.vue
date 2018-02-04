<template>
    <v-select
            :label="field.label || name"

            :required="field.required"
            :disabled="field.disabled"

            :dark="field.dark"
            :clearable="field.clearable"
            :auto-grow="field.autoGrow"
            :append-icon="field.appendIcon"
            :box="field.box"

            :hint="field.hint"

            :multiple="field.multiple"

            :items="field.values"

            v-model="model"
            :error-messages="field.errors||[]"
            ></v-select>
</template>
<script>
    import Field from '../Field';
    export default{
        extends: Field,
        name: "select",
    }
</script>
<scss scoped>
</scss>