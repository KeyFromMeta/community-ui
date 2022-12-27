<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="container">
        <el-dialog :visible.sync="dialogVisible" width="400px">
            <div class="scan">
                <h1>下载“开元通宝”手机APP</h1>
                <!-- <img class="code" src="../../assets/code.png"/> -->
                <div class="qrcode" ref="downloadUrl"></div>
                <span id="tip">如未下载app请扫码下载，<br>如已下载请跳过</span>
                <!-- <el-button id="download-button" type="primary" size="mini">点击刷新二维码</el-button> -->
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
            <ul id="below">
                <li id="first">
                    <img :src="wifiImgUrl" alt="wifi" id="wifi" class="img mask"/>
                    <!-- <span class="cover-first" v-if="!wifiStatus">去连接</span> -->
                    <div class="title">WIFI连接状态</div>
                    <div class="status">{{wifiTitle[wifiStatus]}}</div>
                </li>
                <li id="second">
                    <img :src="usbImgUrl" alt="usb" id="usb" class="img mask"/>
                    <!-- <span class="cover-second">去连接</span> -->
                    <div class="title">USB连接状态</div>
                    <div class="status">{{usbTitle[usbStatus]}}</div>
                </li>
                <li id="third">
                    <div @click="handleFreshCode()" class="qrcode" ref="qrCodeUrl">
                        <span class="occupy">连接wifi后点击获取二维码</span>                           
                    </div>
                    <!-- <QrcodeVue class="code" :value='value'></QrcodeVue>  -->
                    <!-- <img class="code" src="../../assets/code.png"/> -->
                    <div class="sensor-tip">
                        <span>已接入传感器数量{{2}}台</span>
                    </div>
                </li>
            </ul>
            <router-link to="/plan"><el-button id="configNet-button" type="primary" size="mini">已完成配对，前往方案配置</el-button></router-link>
        </div>
    </div>
</template>
<script>
// import QrcodeVue from 'qrcode.vue';
import QRCode from 'qrcodejs2';
export default {
    components: {
        // QrcodeVue
        // eslint-disable-next-line vue/no-unused-components
        QRCode
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
        this.init()
        this.addWifiListener()
        this.addUsbListener()
    },
    methods: {
        createDownloadQrCode(codeContent){
            //生成app下载二维码
            this.$refs.downloadUrl.innerHTML = ""
            var qrcode = new QRCode(this.$refs.downloadUrl,{
                text:codeContent,//可以是链接，也可以是文本
                width:150,//二维码的宽度
                height:150,//二维码的高度
                colorLight:'#ffffff',//二维码背景色
                colorDark:'#000000',//二维码前景色，以实现红码为例
                correctLevel: QRCode.CorrectLevel.H, //纠错等级
            })
            qrcode.makeCode();
        },
        createConfigNetQrcode(codeContent){
            //生成配网二维码
            this.$refs.qrCodeUrl.innerHTML = ""
            var qrcode = new QRCode(this.$refs.qrCodeUrl,{
                text:codeContent,//可以是链接，也可以是文本
                width:150,//二维码的宽度
                height:150,//二维码的高度
                colorLight:'#ffffff',//二维码背景色
                colorDark:'#000000',//二维码前景色，以实现红码为例
                correctLevel: QRCode.CorrectLevel.H, //纠错等级
            })
            qrcode.makeCode();
        },
        init(){
            //初始化usb状态
            window.chrome.webview.addEventListener('message', event => this.handler(event.data));
			window.chrome.webview.hostObjects.JSservinit.JSapiRouter("util.usb.GetCurrentKeystoneConnection","");
            //初始化wifi状态
            // window.chrome.webview.addEventListener('message', event => this.handler(event.data));
			window.chrome.webview.hostObjects.JSservinit.JSapiRouter("util.wifi.GetCurrentWIFIInfo","");
        },
        handler(data){
            let result = JSON.parse(data)
            console.log(result.eventName)
            switch(result.eventName){
                case 'util.wifi.GetCurrentWIFIInfo':{
                    this.initWifi(result)
                    break;
                }
                case 'util.wifi.WIFIStateChange':{
                // window.chrome.webview.addEventListener('message', event => this.handler(event.data));
		window.chrome.webview.hostObjects.JSservinit.JSapiRouter("util.wifi.GetCurrentWIFIInfo","");
                    this.handleFreshCode()
                    break;
                }
                case 'util.usb.GetCurrentKeystoneConnection':{
                    this.initUsb(result)
                    break;
                }
                case 'util.usb.keystoneConnectStateChange':{
            // window.chrome.webview.addEventListener('message', event => this.handler(event.data));
			window.chrome.webview.hostObjects.JSservinit.JSapiRouter("util.usb.GetCurrentKeystoneConnection","");
                    break;
                }
                case 'util.wifi.WlanConfigure':{
                    // this.codeValue = result.params.config
                    this.createConfigNetQrcode(result.params.config)
                    break;
                }
                case 'util.wifi.DownloadInfo': {
                    this.createDownloadQrCode(result.params.config)
                    break;
                }
            }
        },
        addWifiListener(){
            //监听wifi状态
            // window.chrome.webview.addEventListener('message', event => this.handler(event.data));
			window.chrome.webview.hostObjects.JSservinit.JSapiRouter("util.wifi.WIFIStateChange",""); 
        },
        addUsbListener(){
            //监听usb状态
            // window.chrome.webview.addEventListener('message', event => this.handler(event.data));
			window.chrome.webview.hostObjects.JSservinit.JSapiRouter("util.usb.keystoneConnectStateChange",""); 
        },
        initWifi(result){
            this.$bus.$emit('wifiStateChange',result.params)
            if(result.params.WlanState=='1'){
                document.getElementById('wifi').style.opacity = '1' //修改样式去掉遮罩
                //document.getElementById('first').style.margin= '30px' //修改样式去掉遮罩
                this.wifiStatus = true
                this.wifiTitle.true = "已连接 "+ result.params.WlanName
            }else if(result.params.WlanState=='0'){
                document.getElementById('wifi').style.opacity = '0.5' //修改样式去掉遮罩
                //document.getElementById('first').style.margin= '77px'
                this.wifiStatus = false
                this.wifiTitle.true = "未连接"
            }
        },
        initUsb(result){
            this.$bus.$emit('usbStateChange',result.params)
            if(result.params.connected=='1'){
                document.getElementById('usb').style.opacity = '1' //修改样式去掉遮罩
                this.usbStatus = true
                this.usbTitle.true = "已连接 开元通宝"
            }else if(result.params.connected=='0'){
                document.getElementById('usb').style.opacity = '0.5' //修改样式去掉遮罩
                this.usbStatus = false
                this.usbTitle.true = "未连接"
            }
        },
        handleScan(){
            //点击扫码下载
            this.dialogVisible = true
            this.$nextTick(()=>{
                this.createDownloadQrCode('123') //待删
            // window.chrome.webview.addEventListener('message', event => this.handler(event.data));
			window.chrome.webview.hostObjects.JSservinit.JSapiRouter("util.wifi.DownloadInfo","");
            })
        },
        handleFreshCode(){
            //刷新配网二维码
            // window.chrome.webview.addEventListener('message', event => this.handler(event.data));
			window.chrome.webview.hostObjects.JSservinit.JSapiRouter("util.wifi.WlanConfigure","");
        },
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
    
    /* 下载app弹框*/
    .download-app-tip{
        text-align: center;
        color:rgb(131, 131, 128);
        margin-top:20px;
    }
    .el-dialog .qrcode{
        margin:auto;
    }
    .scan{
        text-align: center;
    }
    .scan h1{
        margin-bottom: 30px;
    }
    #tip{
        margin-top:30px;
        display: inline-block;
    }
    
    /*步骤条样式*/
    .steps{
        margin:auto;
        margin-top:80px;
        text-align:center;
    }
    .steps li{
        display: inline-block;
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

    /*步骤条下方内容*/
    .content{
        margin:50px auto;
        /* text-align:center; */
    }
    .content li{
        display: inline-block;
        width:120px;
    }
    #first{
        margin-left:70px;
        text-align: center;
    }
    #second{
        margin-left:320px;
        text-align: center;
        padding:auto;
    }
    #third{
        margin-left:370px;
        text-align: center;
    }
    .sensor-tip{
        /* text-align: center; */
        color:rgb(131, 131, 128);
        margin-top:15px;
        margin-left:30px;
    }

    /* 下方标题 */
    .title{
        margin-top:30px;
        font-size:10px;
        color:rgb(124, 122, 120)
    }
    /* 下方状态 */
    .status{
        margin-top:20px;
    }

    /* 二维码 */
    .qrcode{
        width:150px;
        height: 150px;
        display: block;
        cursor: pointer;
    }
    .occupy{
        width: 150px;
        padding-top:70px;
        height:90px;
        text-align: center;
        display: inline-block;
        color:rgb(120, 120, 124);
        border:dashed 1px rgb(150 190 231);
    }

    /* 跳转按钮 */
    #configNet-button{
        margin-top:20px;
        margin-left:990px;
    }
    a:-webkit-any-link {
        color: aliceblue;
        cursor: pointer;
        text-decoration: none;
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