<template>
    <component
            :is="field.component"
            :field="field"
            :errors="field.errors"
            :value="field.value"
            @input="onInput"
            ></component>
</template>
<script>
    export default {
        name: "form-field",
        props: {
            field:{type:Object,required:true},
        },
        data() {

            let formidable=this.$parent;
            // find Formidable parent
            while(formidable && formidable.$options.name!='formidable')
                formidable=formidable.$parent;
            return {
                formidable
            };
        },

        computed:{
        },
        methods:{
            onInput(value){
                if(this.field.name)
                    this.formidable.$emit('value-changed',{[this.field.name]:value})
            }
        }
    }
</script>