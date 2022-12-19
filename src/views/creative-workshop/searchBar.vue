<template>
    <div class="search-bar">
        <el-input prefix-icon="el-icon-search" v-model="keyWord" placeholder="搜索配置名称/适配游戏名称/用户名" @keyup.enter.native="search" clearable @clear="handleEmpty">
            <el-button slot="suffix" type="text"  @click="search()" >搜索</el-button>
        </el-input>
    </div>
</template>
<script>
export default {
  name:'searchBar',
  data() {
    return {
      keyWord: '',
    }
  },
  beforeDestroy(){
    this.$bus.$off('changeSizeOrPage')
    this.$bus.$off('sendKeyWord')
    this.$bus.$off('stateChange')
    this.$bus.$off('getKeyWord')
  },
  mounted(){
    this.$bus.$on('changeSizeOrPage',()=>{
      this.$bus.$emit('sendKeyWord',this.keyWord)
    }),
    this.$bus.$on('getKeyWord',()=>{
      this.$bus.$emit('sendKeyWord',this.keyWord)
    })
  },
  methods:{ 
    search(){        
        if(this.keyWord==''){
          this.$message({
            showClose: true,
            message: '尚未输入关键字',
            type: 'error'
          });
        }else{
          this.$bus.$emit('stateChange',['search',this.keyWord])
        }
    },
    handleEmpty(){
      this.$bus.$emit('stateChange',['search',this.keyWord])
    }
  }
}
</script>
<style>
    .search-bar{
        margin:15px 4%;
        width:91%;
    }
    .search-bar .el-input__inner{
        height:50px;
        margin-top: 20px;
        margin-left:8px;
        /*字体*/
        font-family: Rajdhani-SemiBold;
        font-size: 20px;
        font-weight: 600;
        line-height: 30px;
        letter-spacing: 0px;
        color: #4C526A;
        z-index: 1;
        border:0px;
    }
    .search-bar .el-icon-search{
        font-size:30px; 
        margin-top:27px;
        margin-left:10px;
        color: #b8b9bd; 
    }
    .search-bar .el-button{
        margin-top: 17px;
        line-height: 30px;
        font-family: AlibabaPuHuiTiR;
        font-size: 20px;
        font-weight: normal;
        letter-spacing: 0.54px;

        /* Primary/Blue */
        color: #0256FF;
    }
</style>
<style scoped>
  /deep/.el-input__prefix {
        left: 20px;
      }
  /deep/.el-input--prefix .el-input__inner {
      padding-left: 60px;
  }
</style>