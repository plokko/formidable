<template>
    <!-- input group -->

    <div class="form-group">
        <label class="col-form-label" v-if="field.type!='hidden'">{{ field.label || name }}</label>
        <textarea
                :class="{'form-control':true,'is-invalid':this.errors}"

                :disabled="field.disabled"
                :required="field.required"
                :minlength="field.minLength"
                :maxLength="field.maxLength"
                :rows="field.rows"
                :cols="field.cols"

                v-text="value"
                @input="onInput"
                ></textarea>
        <small class="form-text text-muted" v-if="field.helpText">{{field.helpText}}</small>

        <div  v-if="errors"
              v-for="error in errors"
              v-text="error"
              class="invalid-feedback"
                ></div>
    </div>
</template>
<script>
    import Field from '../Field';
    export default{
        extends : Field,
        methods:{
            onInput(event){
                this.$emit('input',event.target.value);
            }
        }
    }
</script>
