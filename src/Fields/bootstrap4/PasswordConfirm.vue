<template>
    <div>
        <div class="form-group">
            <label class="col-form-label">{{ field.label || name }}</label>
            <input
                    :class="{'form-control':true,'is-invalid':this.errors}"
                    type="password"
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
        <div class="form-group">
            <label class="col-form-label">{{ field.repeatLabel || 'Confirm' }}</label>
            <input
                    :class="{'form-control':true,'is-invalid':this.errors}"
                    type="password"
                    ref="repeat"

                    :disabled="field.disabled"
                    :required="field.required"
                    :minlength="field.minLength"
                    :maxLength="field.maxLength"
                    />
            <small class="form-text text-muted" v-if="field.repeatHelpText">{{field.helpText}}</small>

            <div  v-if="errors"
                  v-for="error in errors"
                  v-text="error"
                  class="invalid-feedback"
            ></div>
        </div>
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
