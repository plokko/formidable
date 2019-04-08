<template>
    <component
            :is="field.component"
            v-bind="bindings"

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
            bindings(){
                let bindings = Object.assign({},this.field);
                //Filter out reserved parameters
                ['field','is','value','errors','component'].forEach(k=>{delete bindings[k];});
                return bindings;
            }
        },
        methods:{
            onInput(value){
                if(this.field.name)
                    this.formidable.$emit('value-changed',{[this.field.name]:value})
            }
        },
    }
</script>