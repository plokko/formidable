<template>

    <component
            :is="field.switch?'v-switch':'v-checkbox'"
            :label="field.label || name"

            :dark="field.dark"
            :clearable="field.clearable"
            :auto-grow="field.autoGrow"
            :append-icon="field.appendIcon"
            :box="field.box"

            v-model="model"
            :error-messages="field.errors||[]"
            ></component>
</template>
<scss>
</scss>
<script>
    import Field from '../Field';
    export default{
        extends: Field,
    }
</script>
