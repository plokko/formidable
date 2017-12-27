import Formidable from './Formidable';

//export default Formidable;

export default {
    install(Vue, options) {
        options = Object.assign({
            formidableName:'formidable',
            fieldName:'form-field',
            resolveFieldComponent(type){
                switch(type){
                    case 'checkbox' : return require('./Formidable/Checkbox.vue');
                    case 'select'   : return require('./Formidable/Select.vue');
                    case 'textarea' : return require('./Formidable/Textarea.vue');
                    //Default component
                    default         : return require('./Formidable/Input.vue');
                }
            }
        },options);


        Vue.component(options.formidableName,{
            extends:Formidable,
            methods:{
                resolveFieldComponent:options.resolveFieldComponent
            },
        });

        Vue.component(options.fieldName,require('./FormField'));
    }
};