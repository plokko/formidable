export default function(type){
    switch(type){
        /*
        case 'checkbox' : return require('./Checkbox');
        case 'select'   : return require('./Select');
        case 'textarea' : return require('./Textarea');
        //*/
        //Default component
        default         : return require('./Input');
    }
};