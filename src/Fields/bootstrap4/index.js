export default {
    errorTemplate : require('./ErrorTemplate'),
    resolver(type){
        switch(type){
            case 'checkbox' : return require('./Checkbox');
            case 'select'   : return require('./Select');
            case 'textarea' : return require('./Textarea');
            //Default component
            default         : return require('./Input');
        }
        return "--this should not be imported--"
    }
};