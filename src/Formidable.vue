<template>
    <form
        :class="formClass"
        @submit.prevent="onSubmit"
        >
        <slot v-if="showSuccess" name="success"></slot>
        <template v-else>
            <slot name="error" :error="error">
                <div class="alert alert-danger" v-if="error">{{error}}<button type=button class="close" aria-label="Close" @click="error=null"><span aria-hidden="true">&times;</span></button></div>
            </slot>
            <slot name="before"></slot>
            <!-- Field rendering scoped slot -->
            <slot name="fields" :fields="fieldData">
                <div>
                    <template v-for="field in fieldData">
                        <component :is="{template:'<div><slot></slot></div>'}">
                        <form-field
                                :name="field.name"
                                :key="field.name"
                                ></form-field>
                        </component>

                    </template>
                </div>
            </slot>
            <slot></slot>
        </template>
    </form>
</template>
<script>
    export default {
        name: "formidable",
        props: {

            formClass   : {type:[String,Array,Object], default:''},

            action      : { type:String, default:'' },
            method      : { type:String, default:'post'},

            fields      : { type:Array, required:true,},


        },
        data() {
            let fieldValues = {};
            let fieldErrors = {};
            for(let field of this.fields)
            {
                if(field.name)
                {
                    fieldValues[field.name] = field.value ===undefined?'':field.value;
                    fieldErrors[field.name] = null;
                }
            }

            return {
                fieldValues,
                fieldErrors,
                error:null,
                showSuccess:false,//Show success slot if completed
            };
        },
        mounted() {
        },
        computed: {

            fieldComponents(){
                let field=require('./FormField.vue');

                let map =  {};

                for(let field of this.fields){
                    if(field.name){
                        map[field.name]=Vue.extend({
                            extends:field,
                            data(){return {
                                formidable:this,
                                name:field.name
                            };}
                        });
                    }
                }
                return map;
            },

            fieldData(){
                let fields = this.fields.map((field)=>{
                    return Object.assign({},field,{
                            errors:this.fieldErrors[field.name]
                        });
                });
                return fields;
            },

            fieldMap(){
                let map =  {};
                let unmapped=[];
                for(let field of this.fields){
                    if(field.name)
                        map[field.name]=field;
                    else
                        unmapped.push(field);
                }
                return map;
            },
        },
        methods: {

            onSubmit()
            {
                this.submit();
            },
            submit(){
                this.error=null;
                axios({
                    method : this.method,
                    url    : this.action,
                    data   : this.fieldValues,
                }).then((r)=>{
                    this.$emit('submit',r);
                    if(this.$slots.success)
                        this.showSuccess=true;
                })
                    .catch((e)=>{
                        this.$emit('error',e);

                        if(e.response && e.response.status === 422 && e.response.data)
                        {
                            let errors = this.processErrors(e.response.data.errors);
                            console.log({errors});
                            //--- fill errors ---//
                            for(let k in this.fieldErrors)
                            {
                                console.warn('error ['+k+']',errors[k] );
                                this.fieldErrors[k] = errors[k] || null;
                            }
                            this.error = e.response.data.message;
                        }else{
                            this.error = e.response?`Error ${e.response.status}: `+e.response.statusText:e;
                        }
                    });

            },
            processErrors(errors)
            {
                let err={};
                for(let key in errors)
                {
                    let error = errors[key];
                    if(!key.includes('.'))
                        err[key] = error;
                    else{

                        let list = key.split('.');

                        let tmp=err;

                        while(list.length>0)
                        {
                            let e  = list.shift();
                            if(typeof tmp[e] === "undefined")
                                tmp[e] = list.length>0?{} : error;
                            tmp=tmp[e];
                        }

                    }
                }
                return err;
            },

            getField(name){
                return this.fieldMap[name];
            },
            getFieldValue(name){
                return this.fieldValues[name];
            },
            setFieldValue(name,value){
                this.fieldValues[name] = value;
                this.$emit('input',this.fieldValues);
            },
            getFieldErrors(name){
                return this.fieldErrors[name];
            },

            resolveFieldComponentByName(name){
                let field = this.fieldMap[name];
                if(field.component)
                    return field.component;
                return this.resolveFieldComponent(field.type);
            },

            resolveFieldComponent(type){}

        },
        components: {
            'form-field'        : require('./FormField.vue'),
        },
        filters: {
            getFieldcomponent(field){

                if(field.component)
                    return field.component;
                switch(field.type)
                {
                    case 'textarea':
                        return 'input-textarea';
                    case 'select':
                        return 'input-select';
                    case 'vselect':
                        return 'v-select';
                    case 'checkbox':
                        return 'input-checkbox';
                    default:
                        return 'input-text';
                }
            }
        }
    }
</script>
<scss scoped>
</scss>