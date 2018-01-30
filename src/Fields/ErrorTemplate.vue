<template>
    <div class="error">
        <strong>{{error.title}}</strong>
        <p>{{error.description}}</p>
        <button type=button @click="close" class="close">X</button>

    </div>
</template>
<script>
    export default {
        props: {
            error:{type:Object,default(){return {title:'Error',description:'',status:null};}},
            type:{type:String,default:"error",},
        },
        methods:{
            close(){
                this.$emit('close');
            }
        }
    }
</script>