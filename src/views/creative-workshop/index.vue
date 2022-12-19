<template>
  <div class="container">
    <search-bar></search-bar>
    <div class="content-container">
      <!--指定组件的呈现位置-->
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import SearchBar from './searchBar.vue'

export default {
  components: {SearchBar},
  name: 'App',
}
</script>