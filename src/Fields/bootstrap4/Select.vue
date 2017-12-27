<template>
    <div class="form-group">
        <label class="col-form-label">{{ field.label || name }}</label>

        <select
                :class="{'form-control':true,'is-invalid':this.errors}"

                v-model="model"

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
    import Field from '../Field';
    export default{
        extends: Field
    }
</script>
