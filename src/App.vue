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
    background-size: 100%;
    background-repeat:repeat;

  }
</style>
