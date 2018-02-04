export default {

    errorTemplate : require('./ErrorTemplate'),

    resolver(type){
        switch(type){
            /*
            case 'textarea' : return require('./Textarea');
            //*/
            case 'checkbox' : return require('./Checkbox');
            case 'select'   : return require('./Select');
            //Default component
            case 'textarea':case 'text':
            default         : return require('./Input');
        }
    }
};