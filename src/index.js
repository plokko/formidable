import Formidable from './Formidable';

//export default Formidable;

export default {
    install(Vue, options) {
        let style= options && options.style?options.style:'bootstrap4';
        console.log({options,style})
        options = Object.assign({
            //Defaults
            formidableName  : 'formidable',
            fieldName       : 'form-field',
            fieldResolver   : require('./Fields/'+style+'/index').default
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