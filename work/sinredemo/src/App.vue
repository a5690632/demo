<template>
  <div id="app" class="main home" >
    <menuSinre>
      
    </menuSinre>
  </div>
</template>

<script>
  import menuSinre from "./components/menu.vue"

  export default {
    name: 'app',
    data(){
      return{


      }
    },
    components:{
       menuSinre,


    }
    
  }
</script>

<style>
  #app {
  font-size: 14px;

}
.clearfix::after{
  display: block;
  clear: both;
  content:"";
}
ul ,li,body{
  margin:0;
  padding: 0;
}
</style>
