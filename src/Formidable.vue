<template>
    <form
        :class="formClass"
        @submit.prevent="onSubmit"
        >
        <slot v-if="showSuccess" name="success"></slot>
        <template v-else>
            <slot name="error" :error="error">
                <error-template
                        v-if="error"
                        :error="error"
                        type="error"
                        @close="error=null"
                        ></error-template>
            </slot>
            <slot name="before"></slot>
            <!-- Field scoped slot //-->

            <slot name="fields"
                  :fields="fieldData"
                  >
                    <template
                            v-for="(field,name) in fieldData"
                            >
                            <form-field
                                    :field="field"
                                    :key="name"
                                    ></form-field>
                    </template>
            </slot>
            <!--// Field slot-->
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

            this.$on('value-changed',(values)=>{
                for(let k in values){
                    if(this.fieldValues[k]!==undefined)
                        this.fieldValues[k]=values[k];
                }
            });
        },
        computed: {

            fieldData(){
                let formidable=this;
                let fields = this.fields.map((field)=>{
                    return {
                        ...field,
                        //formidable:this,
                        bus:this.bus,
                        value:this.fieldValues[field.name],
                        errors:this.fieldErrors[field.name],
                        component:  this.resolveFieldComponent(field.type),
                    };
                });
                return fields;
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
                            //TODO:Check
                            this.error={
                                title: e.response.data.message,
                                description:'',
                                status:e.response.status,
                            };
                        }else{
                            let title='error';
                            let description = '';
                            let status=null;
                            if(e.response){
                                title       = e.response.statusText;
                                description = e.response.data && e.response.data.message?e.response.data.message:'';
                                status      = e.response.status;

                            }else{
                                title = e;

                            }

                            this.error = {
                                title,
                                description,
                                status,
                                response:e.response,
                            };
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

            resolveFieldComponent(type){error('resolveFieldComponent not implemented!');}

        },
        components: {
            'form-field' : require('./FormField.vue'),
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