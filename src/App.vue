<template>
  <div class="app-container">
    <Layout></Layout>
  </div>
</template>
<script>
import Layout from '../src/layout/Layout'
export default {
  components: {Layout},
  name: 'App',
}
</script>
<style>
   .app-container{
    /* margin-top:-29px; */
    background-image: url('../src/assets/background.png'); 
    background-size: cover;
    background-repeat:no-repeat;
    height:720px;
    width:1280px;
  }
</style>
