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
  template        : 'vuetify', //Use Vuetify template
  formidableName  : 'formidable', //Name of the main formidable field
  fieldName       : 'form-field', //TBD
  fieldResolver   : require('./Fields/'+style+'/index').default //TBD
});
```

In your page
```html

    <div id="app">
        <formidable
                action="destination-url"
                method="post"
                :fields="fields"
                @submit="onSubmit"
                @error="onError"
                >
        </formidable>
    </div>
    <script>
        new Vue({
            el:'#app',
            data:function(){return {
                fields:[
                    {name:'name',label:'Name',type:'text',placeholder:'username',required:true},
                    {name:'email',label:'Email',type:'email',required:true},
                    {name:'password',label:'Password',type:'password',placeholder:'',minLength:6},
                    {name:'roles',label:'Roles',type:'select',placeholder:'',values:{1:'one',2:'two'},multiple:true ,value:[1,2]},
                    {name:'active',label:'Active',type:'checkbox',placeholder:'',value:1},
                ]
            };},
            methods:{
                onSubmit(r){
                    console.log('onsubmit',r);
                },
                onError(e){
                    console.log('onError',e);
                }
            }

        });
    </script>
    
```


## Templating
Formidable integrates a template manager so you can easly switch between css frameworks without adapting or rewriting your code.
The template you want to use is specified in the plugin initialization, via the _template_ option;
each template is located under a folder with it's name, each folder has a index.js that resolves all the input types.
