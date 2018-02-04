<template>
    <v-text-field
        :label="field.label || name"
        v-model="model"

        :type="field.type"

        :required="field.required"
        :disabled="field.disabled"

        :rules="rules"

        :dark="field.dark"
        :clearable="field.clearable"
        :auto-grow="field.autoGrow"
        :append-icon="field.appendIcon"
        :box="field.box"

        :multi-line="field.multiLine || field.type=='textarea'"

        :error-messages="field.errors||[]"

    ></v-text-field>
</template>
<script>
    import Field from '../Field';
    export default{
        extends: Field,
        methods:{
        },
        computed:{
            rules(){
                let rules = [];

                switch(this.field.type){
                    case 'email':
                        rules.push( (v) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v)||'');//Todo: add email error message
                        break;
                    default:
                }

                return rules;
            }
        }
    }
</script>
