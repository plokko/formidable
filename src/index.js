import Formidable from './Formidable';

//export default Formidable;

export default {
    install(Vue, options) {
        let fieldStyle=options.fieldStyle||'bootstrap4';
        options = Object.assign({
            //Defaults
            formidableName  : 'formidable',
            fieldName       : 'form-field',
            fieldResolver   : require('./Fields/'+fieldStyle+'/index').default
        },options);

        console.info({
            extends:Formidable,
            methods:{
                resolveFieldComponent:options.resolveFieldComponent
            },
        });

        //Load main Formidable component
        Vue.component(options.formidableName,{
            extends:Formidable,
            methods:{
                resolveFieldComponent:options.fieldResolver
            },
        });

        //Load form-field component
        Vue.component(options.fieldName,require('./FormField'));
    }
};