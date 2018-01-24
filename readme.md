# Formidable-Vue
A Vuejs form helper


## Installation
Install it via npm with `npm i formidable-vue`

## Usage
Add Formidable as a plugin in your main Javascript file:

```javascript

import Formidable from 'formidable-vue';
Vue.use(Formidable);

```
You can set optional settings in the parameter during inizialization:
```javascript

import Formidable from 'formidable-vue';
Vue.use(Formidable,{
  style           :'vuetify', //Use Vuetify style
  formidableName  : 'formidable', //Name of the main formidable field
  fieldName       : 'form-field', //TBD
  fieldResolver   : require('./Fields/'+style+'/index').default //TBD
});
```