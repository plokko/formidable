<template>
    <component
            v-bind:is="getFieldcomponent(field)"
            :field="field"
            :name="field.name"

            :value="value"
            @input="onInput"

            :error="error"
            ></component>
</template>
<script>
    export default {
        name: "form-field",
        props: {
            field:{type:Object,required:true},
            value:{required:true},

            error:{},

            componentPrefix:{type:String,default:'field'},
            componentMap:{type:Object,required:false,default:null,},
        },
        data() {
            return {};
        },

        methods: {
            onInput(value){
                this.$emit('input',value);
            },

            getFieldcomponent(field){
                if(field.component)
                    return field.component;

                if(this.componentMap && this.componentMap[field.type]){
                    return this.componentMap[field.type];
                }
                else
                    return this.componentPrefix+'-'+field.type;
            }

        },
        components: {
            'field-text'        : require('./FormIdable/Input.vue'),
            'field-checkbox'    : require('./FormIdable/Checkbox.vue'),
            'field-select'      : require('./FormIdable/Select.vue'),
            'field-textarea'    : require('./FormIdable/Textarea.vue'),
        }
    }
</script>
<scss scoped>
</scss>