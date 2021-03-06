import Formidable from './Formidable';
import ErrorTemplate from './Fields/ErrorTemplate'
import FormField from './FormField'

export default {
    install(Vue, options) {
        let style = options && options.template?options.template:'bootstrap4';''
        let template = require(`./Fields/${style}/index`).default;//'./Fields/'+style+'/index'

        options = Object.assign({
            //Defaults
            formidableName  : 'formidable',
            fieldName       : 'form-field',
            resolver        : template.resolver,
        },options);

        //Load main Formidable component
        Vue.component(options.formidableName,{
            extends:Formidable,
            components:{
                errorTemplate:template.errorTemplate||ErrorTemplate
            },
            methods:{
                resolveFieldComponent: options.resolver,
            },
        });

        //Load form-field component
        Vue.component(options.fieldName,FormField);
    }
};