<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="container">
        <el-dialog :visible.sync="dialogVisible" width="400px">
            <div class="scan">
                <h1>下载“开元通宝”手机APP</h1>
                <img class="code" src="../../assets/code.png"/>
                <span>如未下载app请扫码下载，<br>如已下载请跳过</span>
            </div>
            
        </el-dialog>
        <h1>APP下载后请按照以下步骤开始连接</h1>
        <div class="download-app-tip">
            <span id="download-app-tip">如未下载app请点<span style="cursor:pointer;color:rgb(23, 128, 219);" @click="handleScan()">此处</span>扫码下载</span>
        </div>
        <div class="steps">
            <ul>
                <li>
                    <img src="../../assets/step1.png"/>
                    <div class="step-instr">接入WIFI网络<br></div>
                    <img src="../../assets/line.png"/>
                </li>
                <li>
                    <img src="../../assets/step2.png"/>
                    <div class="step-instr">插入USB设备<br></div>
                    <img src="../../assets/line.png"/>
                </li>
                <li>
                    <img src="../../assets/step3.png"/>
                    <div class="step-instr">使用手机扫描配对二维码
                        <br>
                        <span style="font-size:10px;color:rgb(124, 122, 120);">请使用下载的app扫描二维码连接配对</span>
                    </div>
                </li>
            </ul>
        </div>
        <div class="content">
            <ul>
                <li id="first">
                    <img :src="wifiImgUrl" alt="wifi" id="wifi" class="img mask"/>
                    <span class="cover-first" v-if="!wifiStatus">去连接</span>
                    <div class="title">WIFI连接状态</div>
                    <div class="status">{{wifiTitle[wifiStatus]}}</div>
                </li>
                <li id="second">
                    <img :src="usbImgUrl" alt="usb" id="usb" class="img mask"/>
                    <span class="cover-second">去连接</span>
                    <div class="title">USB连接状态</div>
                    <div class="status">{{usbTitle[usbStatus]}}</div>
                </li>
                <li id="third">
                    <!-- <QrcodeVue class="code" :value="value"></QrcodeVue> -->
                    <!-- <img class="code" src="../../assets/code.png"/> -->
                    <el-button type="primary" size="mini" @click="handleClick()">扫码完成去设备匹配</el-button>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
// import QrcodeVue from 'qrcode.vue';
export default {
    components: {
        // QrcodeVue
    },
    computed:{
        wifiImgUrl:function(){
          return require("../../assets/"+this.wifiImg[this.wifiStatus]);
        },
        usbImgUrl:function(){
            return require("../../assets/"+this.usbImg[this.usbStatus]);
        }
    },
    data() {
        return {
            dialogVisible:false,
            wifiStatus:false, //wifi连接状态
            usbStatus:false, //usb连接状态
            wifiTitle:{true:"已连接",false:"未连接"},
            usbTitle:{true:"已连接",false:"未连接"},
            wifiImg:{true:'wifiLarge-connect.png',false:'wifiLarge-disconnect.png'},
            usbImg:{true:'usbLarge-connect.png',false:'usbLarge-disconnect.png'},
        }
    },
    created() {
        this.addListener()
    },
    methods: {
        addListener(){
            //注册监听
            window.chrome.webview.addEventListener('util.wifi.GetCurrentWIFIInfo', event => {console.log(event.data);
                this.handleListenerEvent(event.data)
            });
            window.chrome.webview.hostObjects.JSservinit.JSapiRouter("util.wifi.GetCurrentWIFIInfo",event=>{
                console.log(event)
            });
        },
        handleListenerEvent(data){
            let result = JSON.parse(data)
            //根据监听到的内容处理状态
            if(result.params.WlanState==1){
                document.getElementById('wifi').style.opacity = '1' //修改样式去掉遮罩
                this.wifiStatus = true
                this.wifiTitle.true = "已连接 "+ result.params.WlanName
            }
        },
        handleScan(){
            //点击扫码下载
            this.dialogVisible = true
        },
        handleClickWifi(){

        }
    },
}
</script>
<style scoped>
    .container{
        margin-top:50px;
        background-color:aliceblue;
        padding-top: 30px;
        height:520px;
    }
    h1{
        text-align: center;
    }
    .steps li{
        display: inline-block;
    }
    .content li{
        display: inline-block;
    }
    .download-app-tip{
        text-align: center;
        color:rgb(131, 131, 128);
        margin-top:20px;
    }
    .steps{
        margin:auto;
        margin-top:80px;
        text-align:center;
    }
    .content{
        margin:50px auto;
        /* text-align:center; */
    }
    .steps li div{
        margin-left:10px;
        margin-right:20px;
        text-align: left;
    }
    .steps li img{
        margin-left:10px;
    }
    .step-instr{
        display: inline-block;
    }
    #first{
        margin-left:77px;
        text-align: center;
    }
    #second{
        margin-left:360px;
        text-align: center;
    }
    #third{
        margin-left:360px;
        text-align: center;
    }
    .code{
        width:150px;
        height: 150px;
        display: block;
    }
    .el-button{
        margin-top:20px;
    }
    .title{
        margin-top:30px;
        font-size:10px;
        color:rgb(124, 122, 120)
    }
    .status{
        margin-top:20px;
    }
    .el-dialog .code{
        margin:auto;
    }
    .scan{
        text-align: center;
    }
    .scan h1{
        margin-bottom: 30px;
    }
    /* 给图片加遮罩 */
    .content .mask{
        opacity: 0.5; 
    }
    .cover-first{
        position:absolute;
        left:126px;
        top:450px;
        color:rgb(23, 125, 209);
        cursor: pointer;
    }
    .cover-second{
        position:absolute;
        left:576px;
        top:450px;
        color:rgb(23, 125, 209);
        cursor: pointer;
    }
    .img{
        cursor: pointer;
    }
</style>