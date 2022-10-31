<template>
    <div class="middle-bar">
        <span id="config">配置清单</span>
        <el-dropdown>
            <span class="el-dropdown-link">
                筛选&nbsp;&nbsp;&nbsp;&nbsp;<i class="el-icon-config"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>全部</el-dropdown-item>
                <el-dropdown-item>动作游戏</el-dropdown-item>
                <el-dropdown-item>动作游戏</el-dropdown-item>
                <el-dropdown-item>动作游戏</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
</template>
<script>
export default {
  name:'middleBar',
  data() {
    return {
      label: ''
    }
  }
}
</script>
<style scoped>
    .middle-bar{
        width:90%;
        height:50px;
        margin:30px auto;
    }
    #config{
        font-family: Inter-Medium;
        font-size: 23px;
        font-weight: 500;
        line-height: 22.08px;
        letter-spacing: -0.8px;
        color: #020D37;
        border-bottom: 3px solid #020D37;
        padding-bottom:5px;
    }
    .el-dropdown{
        font-family: Inter-Medium;
        font-size: 23px;
        font-weight: 500;
        line-height: 22.08px;
        letter-spacing: -0.8px;
        color: #4C526A;
        float:right;
    }
    .el-dropdown-item{
        font-family: AlibabaPuHuiTiR;
        font-size: 14px;
        font-weight: normal;
        line-height: 24px;
        letter-spacing: 0px;
    }
    .el-icon-config {
        background: url('../assets/selecticon.png') center center no-repeat;
        background-size: 50px;
    }
    
    .el-icon-config:before {
        content: "11";
        visibility: hidden;
    }
</style>
