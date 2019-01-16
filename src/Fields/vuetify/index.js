import ErrorTemplate from './ErrorTemplate'
import Checkbox from './Checkbox';
import Select from './Select';
import Input from './Input';
export default {

    errorTemplate : ErrorTemplate,

    resolver(type){
        switch(type){
            /*
            case 'textarea' : return require('./Textarea');
            //*/
            case 'checkbox' : return Checkbox;
            case 'select'   : return Select;
            //Default component
            case 'textarea':case 'text':
            default         : return Input;
        }
    }
};