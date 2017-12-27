<template>
    <component
            v-bind:is="component"
            :field="field"
            :name="field.name"

            v-model="model"

            :errors="errors"
            ></component>
</template>
<script>
    export default {
        name: "form-field",
        props: {
            name:{type:String,required:true},
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
            field(){return this.formidable.getField(this.name);},
            errors(){return this.formidable.getFieldErrors();},
            model:{
                get(){return this.formidable.getFieldValue(this.name);},
                set(v){this.formidable.setFieldValue(this.name,v);}
            },
            component(){
                return this.formidable.resolveFieldComponentByName(this.name);
            }
        },
    }
</script>
<scss scoped>
</scss>