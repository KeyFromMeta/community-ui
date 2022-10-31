<template>
  <div class="app-container">
    <search-bar></search-bar>
    <!-- <navigator/> -->
    <!-- <middle-bar></middle-bar> -->
    <div class="content-container">
      <!--指定组件的呈现位置-->
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
// import navigator from './components/navigator.vue'
import SearchBar from './components/searchBar.vue'
// import MiddleBar from './components/middleBar.vue'

export default {
  components: {SearchBar},
  name: 'App',
}
</script>
<style>
   .app-container{
    margin-top:-29px;
    background: url('../src/assets/background.png') repeat; 
    /* background-color: aquamarine; */
  }
</style>
