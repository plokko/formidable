<template>
    <!-- input group -->
    <div class="form-group">
        <label class="col-form-label" v-if="field.type!='hidden'">{{ field.label || name }}</label>
        <input
                :class="{'form-control':true,'is-invalid':this.errors}"
                :type="field.type||'text'"
                :value="value"

                :disabled="field.disabled"
                :required="field.required"
                :minlength="field.minLength"
                :maxLength="field.maxLength"

                @input="onInput"
                />
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
        },
        methods:{
            onInput(event){
                this.$emit('input',event.target.value);
            }
        }
    }
</script>
