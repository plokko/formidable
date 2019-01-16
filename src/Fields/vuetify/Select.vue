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

            :item-text="field.itemText|field.itemValue|'text'"
            :item-value="field.itemValue|'value'"

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