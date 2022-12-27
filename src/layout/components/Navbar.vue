<template>
    <div class="navbar">
        <el-menu router :default-active="$route.path" class="el-menu" mode="horizontal" @select="handleSelect">
            <el-menu-item class="logo"><img src="../../assets/titleLogo.png" class="logo"/></el-menu-item>
            <el-menu-item index="/">操作配置</el-menu-item>
            <el-menu-item index="/plan">方案配置</el-menu-item>
            <el-menu-item index="/creative">创意社区</el-menu-item>
        </el-menu>
        <div class="right-menu">
            <div class="status">
                <ul>
                    <li class="wifi-status">
                        <img :src="wifiImgUrl" alt="wifi"/>
                        <span>{{wifiTitle[wifiStatus]}}</span>
                    </li>
                    <li class="blue-tooth-status">
                        <img :src="blueToothImgUrl" alt="blueTooth"/>
                        <span>{{blueToothTitle[blueToothStatus]}}</span>
                    </li>
                    <li class="user-avatar">
                        <img src="../../assets/avatar.png"/>
                        <span>{{userName}}</span>
                    </li>
                </ul>
            </div>
            <div class="control-button">
                <ul>
                    <!-- <li>
                        <img src="../../assets/reduce.png"/>
                    </li>
                    <li>
                        <img src="../../assets/expand.png"/>
                    </li> -->
                    <li>
                        <img @click="handleClose" src="../../assets/close.png" />
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name:'Navbar',

    computed:{
        wifiImgUrl:function(){
          return require("../../assets/"+this.wifiImg[this.wifiStatus]);
        },
        blueToothImgUrl:function(){
            return require("../../assets/"+this.blueToothImg[this.blueToothStatus]);
        }
    },
    data() {
      return {
        wifiStatus:false, //wifi连接状态
        blueToothStatus:false, //蓝牙连接状态
        wifiTitle:{true:"已连接",false:"未连接"},
        blueToothTitle:{true:"已连接",false:"未连接"},
        wifiImg:{true:'wifiMini-connect.png',false:'wifiMini-disconnect.png'},
        blueToothImg:{true:'blueToothMini-connect.png',false:'blueToothMini-disconnect.png'},
        userName:"test"
      };
    },
    mounted() {
        this.$bus.$on('wifiStateChange',(data)=>{
            if(data.WlanState=='1'){
                this.wifiStatus = true
            }else if(data.WlanState=='0'){
                this.wifiStatus = false
            }
        })
        this.$bus.$on('usbStateChange',(data)=>{
            if(data.connected=='1'){
                this.usbStatus = true
            }else if(data.connected=='0'){
                this.usbStatus = false
            }
        })
    },
    methods: {
      handleSelect(key, keyPath) {
       console.log(key,keyPath)
      },
      handleClose(){
        window.chrome.webview.addEventListener('message',event=>{console.log(event)})
        window.chrome.webview.hostObjects.JSserveinit.JSapiRouter("util.window.close","")
      }
    }
}
</script>
<style scoped>
.el-menu{
    background-color:#f7f7f700;
    width:500px;
    float: left;
}
.el-menu.el-menu--horizontal{
    width:500px;
    border-bottom: none;
}
.logo{
    cursor: auto;
}
ul{
    list-style-type: none;
}
.status{
    margin-right:20px;
}
.status li{
    display: inline-block;
    margin-left:50px;
}
.status img{
    margin-right:10px;
}
.control-button li{
    display: inline-block;
    margin-left:30px;
    cursor: pointer;
}
.status{
    display: inline-block;
    margin-right:10px;
}
.control-button{
    display: inline-block;
}
.right-menu{
    float:right;
}
</style>