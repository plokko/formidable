<template>
    <!-- input group -->
    <div :class="{'form-check':true,disabled:field.disabled}">
        <label class="form-check-label">
            <input
                   :class="{'form-check-input':true,'is-invalid':this.errors}"
                   type="checkbox"

                   value="1"
                   :required="field.required"
                   :disabled="field.disabled"

                   :checked="!!value"
                   @change="onInput"
                    />
            {{ field.label || name }}
        </label>
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
        methods :{
            onInput(event){
                this.$emit('input',event.target.checked?1:0);
            }
        }
    }
</script>
