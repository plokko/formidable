<template>
    <div class="form-group">
        <label class="col-form-label">{{ field.label || name }}</label>

        <select
                :class="{'form-control':true,'is-invalid':this.errors}"

                v-model="_value"

                :disabled="field.disabled"
                :required="field.required"
                :multiple="field.multiple"

                >
                <!--<option v-if="!field.required && !field.multiple"></option>-->
                <option v-for="(label,value) in field.values"
                        :value="''+value"
                        >{{label}}</option>
        </select>
        <small class="form-text text-muted" v-if="field.helpText">{{field.helpText}}</small>

        <div  v-if="errors"
              v-for="error in errors"
              v-text="error"
              class="invalid-feedback"
                ></div>
    </div>
</template>
<script>
    export default{
        props:{
            field:{type:Object,required:true,},
            value:{required:true,},
            name:{},
            errors:{required:false,default:null},
        },
        data()
        {
            return {}
        },
        computed:{
            _value:{
                get(){return this.value;},
                set(v){
                    this.$emit('input',v);

                }
            }
        },
        methods:{
            onInput(event){
                let value = event.target.value;

                if(this.field.multiple){
                    value = Array.from(event.target.selectedOptions).map(o=>{return o.value;})
                }

                console.log('emit-input',{value});
                this.$emit('input',value);
            }
        }
    }
</script>
