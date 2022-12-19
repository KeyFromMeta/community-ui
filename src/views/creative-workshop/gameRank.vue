<template>
  <div class="content">
      <!-- 导航栏 -->
      <ul class="navigator">
        <li><router-link to="/creative/" ><div class="grid-content" id="category0"><span>全部<br>{{totalNumber}}</span></div></router-link></li>
        <li v-for="(item,index) in categoryList" :key="index">
          <router-link  :to="'/creative/' + item.type">
            <div class="grid-content" :id="'category'+item.type" > 
              <span>{{categoryDict[item.type]}}<br>{{item.count}}</span>
            </div> 
          </router-link>
        </li>
      </ul>
      <!-- 表格 -->
      <div class="game-rank-table">
        <el-table
          @filter-change="handleTagChange" 
          width="100%"
          :data="gameList"
          max-height="450"
          header-cell-style="background-color:rgba(255, 255, 255, 0.4);">
          <el-table-column
            label="" width="55px">
                <img src="./../../assets/configicon.png"/>
          </el-table-column>
          <el-table-column
            label="配置名称">
            <template slot-scope="scope">
              {{ scope.row.Name}}
            </template>
          </el-table-column>
          <el-table-column 
            label="适配游戏">
            <template slot-scope="scope">
              {{ scope.row.Game}}
            </template>
          </el-table-column>
          <el-table-column width="120"
            label="简介">
            <template slot-scope="scope">
              {{ scope.row.Info}}
            </template>
          </el-table-column>
          <el-table-column width="80"
            label="标签"
            column-key="filterTag" 
            :filters="[{text: '坐姿', value: 1}, {text: '站姿', value: 2}]"
            >
            <template slot-scope="scope">
              {{ transferTag(scope.row.Tag)}}
              <!-- {{scope.row.Category}} -->
            </template>
          </el-table-column>
          <el-table-column
            label="配置编码">
            <template slot-scope="scope">
              {{ scope.row.ConfigId}}
            </template>
          </el-table-column>
          <el-table-column
            label="上传者">
            <template slot-scope="scope">
              {{ scope.row.Owner}}
            </template>
          </el-table-column>
          <el-table-column
            label="上传时间" style="whiteSpace:pre-wrap">
            <template slot-scope="scope">
              {{ transferDate(scope.row.CreateTime) }}
            </template>
          </el-table-column>
          <el-table-column
            class="option" align="right">
            <template slot-scope="scope">
              <el-button type="text" @click="viewDetails(scope.row.Id)">
                    查看详情
              </el-button>
            </template>
          </el-table-column>
          <el-table-column
            class="option" align="right">
            <template slot-scope="scope">
              <el-button type="text"  @click="()=>{hasApplicated(scope.row.ConfigId)?scope.row.DownloadCount--:scope.row.DownloadCount++}">
                    {{'应用('+scope.row.DownloadCount+')'}}
              </el-button>
            </template>
          </el-table-column>
          <el-table-column
            class="option" label="操作" align="right">
            <template slot-scope="scope">
              <!-- <el-button type="text" :plain="true" 
              @click="()=>{hasLiked(scope.row.ConfigId)
              ?(() => {
                scope.row.LikeCount--;
                canceLike();
              })()
              :(()=>{
                scope.row.LikeCount++;
                likeSucess();
                })()
              }"> -->
              <el-button type="text" @click="()=>{
                var IsLiked = getIsLiked(scope.row.Id); 
                LikedProcess(scope.row.Id,IsLiked);               
              }">
                    {{'点赞('+scope.row.LikeCount+')'}}
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentPageChange"
            :current-page="currentPage"
            :page-sizes="[5, 10, 15, 20]"
            :page-size="limit"
            layout="->, total, sizes, prev, pager, next, jumper"
            :total="totalItem">
        </el-pagination>
      </div>
  </div>
  
</template>

<script>
  import tableApi from './../../api/table'
  export default {
    name:'gameRank',
    data() {
      return {
        totalItem: 0, // 当前总的记录数
        currentPage:1,//当前页数
        limit:5, //每页条目数
        gameList:[],//得到的配置列表
        currentCategory:'',//当前的游戏分类
        categoryDict:[
          '全部','休闲','体育','冒险','动作','策略','角色扮演'
        ],
        tags:[],//选中的标签
        tagDict:['','坐姿','站姿'],
        keyWord:'',
        state:1, //用来区分是返回分类结果还是关键字搜索结果，1是分类，2是搜索
        categoryList:[
          {
            count:0,
            type:1
          },
          {
            count:0,
            type:2,
          },
          {
            count:0,
            type:3,
          },
          {
            count:0,
            type:4,
          },
          {
            count:0,
            type:5,
          },
          {
            count:0,
            type:6
          }
        ],
        totalNumber:0, //所有分类加起来总的记录数
      }
    },
    mounted() {
      this.$bus.$on('stateChange',(data)=>{
        //由searchBar主动向gameRank同步关键字
        if(data[0]=='category'){
          this.state = 1
        }else if(data[0]=='search'){
          this.keyWord = data[1]
          this.state = 2
          this.fetchData()
        }
      }),
      this.$bus.$off('sendKeyWord').$on('sendKeyWord',(key)=>{
        this.keyWord = key
        this.fetchData()
      })
      
    },
    created() {
      this.init()
    },
    beforeDestroy(){
      this.$bus.$off('stateChange')
      //this.$bus.$off('sendKeyWord')
      this.$bus.$off('changeSizeOrPage')
      //this.$bus.$off('getKeyWord')
    },
    methods:{
      init(){
        this.$nextTick(function () {
           this.$bus.$emit('getKeyWord')
        })
      },
      fetchData(){
        var currentUrlArr = window.location.href.split("/")
        this.currentCategory = Number(currentUrlArr[currentUrlArr.length-1]==''?0:currentUrlArr[currentUrlArr.length-1])
        console.log('关键字为：',this.keyWord,"当前页：",this.currentPage,"条目数：",this.limit,"分类为:",this.categoryDict[this.currentCategory],
        "tag为：",this.tags)
        tableApi.getListBySearchKey(this.keyWord,this.currentPage,this.limit,this.tags,this.currentCategory).then(response => {
          this.gameList = response.data.ConfigBoardList
          this.totalItem = response.data.TotalNum
          //获取分类信息
          var total = 0
          for(let i=0; i<response.data.CategoryInfo.length;i++){
            this.categoryList[i].count = response.data.CategoryInfo[i].Count
            this.categoryList[i].type = response.data.CategoryInfo[i].Type
            total+=response.data.CategoryInfo[i].Count
          }
          this.totalNumber = total
        }).catch(err=>{
          //this.$message.error(err.message)
          console.log(err)
        })
      },
      handleTagChange(filters){
        this.currentPage = 1
        this.tags = filters.filterTag
        this.fetchData()
      },
      handleSizeChange(val) {
        //改变每页的条目数
        this.$bus.$emit('changeSizeOrPage') //每次修改发送同步消息
        this.limit = val
        this.currentPage=1
        this.fetchData()
        //console.log(`每页 ${val} 条`);
      },
      handleCurrentPageChange(val) {
        //改变当前的页数
        this.$bus.$emit('changeSizeOrPage') //每次修改发送同步消息
        this.currentPage = val
        this.fetchData()
        //console.log(`当前页: ${val}`);
      },
      transferTag(tag){
        //将tag从整个字符串分成若干个标签
        var tags = tag.split(',')
        var str = ''
        for(var i in tags){
          str += this.tagDict[tags[i]]+'\n'
        }
        return str
      },
      getIsLiked(id){
        for(let i=0;i<this.gameList.length;i++){
          if(id==this.gameList[i].Id){
            return this.gameList[i].IsLiked
          }
        }
      },
      LikedProcess(id,IsLiked){
        //console.log("id为：",id,"状态为：",IsLiked)
        var likedType = (IsLiked==true?2:1);//已经喜欢了则取消点赞，否则点赞
        if(IsLiked==true){
          this.$confirm('已经点赞，是否取消点赞?', '提示', {
            confirmButtonText: '是',
            cancelButtonText: '否',
            type: 'warning'
          }).then(() => {
            tableApi.liked(id,likedType).then(response=>{
              console.log(response)
            }).catch(err=>{
              console.log(err)
            });

            for(let i=0;i<this.gameList.length;i++){
              if(id==this.gameList[i].Id){
                this.gameList[i].LikeCount--;
                this.gameList[i].IsLiked = false;
                //console.log('id为：',id,"更新后的计数为：",this.gameList[i].LikeCount,"更新后的状态为",this.gameList[i].IsLiked)
              }
            }
            this.$message({
              type: 'success',
              message: '取消点赞!'
            });
          }).catch(()=>{})
        }else{
          tableApi.liked(id,likedType).then(response=>{
            console.log(response)
          }).catch(err=>{
            console.log(err)
          });

          for(let i=0;i<this.gameList.length;i++){
            if(id==this.gameList[i].Id){
              this.gameList[i].LikeCount++;
              this.gameList[i].IsLiked = true;
              //console.log('id为：',id,"更新后的计数为：",this.gameList[i].LikeCount,"更新后的状态为",this.gameList[i].IsLiked)
            }
          }

          this.$message({
            message: '点赞成功，感谢您的支持',
            type: 'success'
          });
        }
      },
      hasApplicated(id){
        const set = new Set(this.applicatedList)
        if(set.has(id)){
          this.removeFromApplicatedList(id)
          return true
        }else{
          this.addToApplicatedList(id)
          return false
        }
      },
      addToApplicatedList(id){
        this.applicatedList.push(id)
      },
      removeFromApplicatedList(id){
        for(let i=0;i<this.applicatedList.length;i++){
          if(id==this.applicatedList[i]){
            this.applicatedList.splice(i,1)
            break
          }
        }
      },
      transferDate(time) {
        //将创建日期由时间戳转换为yyyy-mm-dd hh:mm:ss
        var unixTimestamp = new Date(time*1000);
        var commonTime = unixTimestamp.toLocaleString()
        return commonTime
      },
      async viewDetails(id){
        console.log(JSON.stringify({profileId:id}))
        var result = await window.chrome.webview.hostObjects.kfmJsApi.call("biz.gameProfile.preview",JSON.stringify({profileId:id}))
        console.log(result)
      }
    }
  }
</script>
  <style>
    /* 搜索栏样式 */
    /* .search-bar{
        margin:30px 4%;
        width:90%;
    }
    .search-bar .el-input__inner{
        height:50px;
        margin-top: 20px;
        margin-left:25px;
        font-family: Inter-Medium;
        font-size: 20px;
        font-weight: 600;
        line-height: 30px;
        letter-spacing: 0px;
        color: #4C526A;
        z-index: 1;
        border:0px;
    }
    .search-bar .el-icon-search{
        font-size:35px; 
        margin-top:27px;
        color: #b8b9bd; 
    }
    .search-bar .el-button{
        margin-top: 17px;
        line-height: 30px;
        font-family: AlibabaPuHuiTiR;
        font-size: 20px;
        font-weight: normal;
        letter-spacing: 0.54px;
        color: #0256FF;
    } */
    /* 导航栏部分的样式 */
    .active{
      box-shadow: 100px #cc070733;
    }
    .navigator{
      margin-left:4.7%;
      width:100%;
    }
    .navigator ul{
      list-style-type: none;
    }
    .navigator li{
      display: inline-block;
      margin:7px;
    }
    .grid-content {
      width: 153px;
      height: 80px;
      border-radius: 8px;
      padding-top:8%;
    }
    #category0{
      background: url('./../../assets/allBg.png');
    }
    #category1{
      background: url('./../../assets/sportGameBg.png');
    }
    #category2{
      background: url('./../../assets/musicGameBg.png');
    }
    #category3{
      background: url('./../../assets/actionGameBg.png');
    }
    #category4{
      background: url('./../../assets/adventureGameBg.png');
    }
    #category5{
      background: url('./../../assets/rolePlayBg.png');
    }
    #category6{
      background: url('./../../assets/shooterGameBg.png');
    }
    .navigator a{
      text-decoration: none;
      font-family: Inter-SemiBold;
      font-size: 25px;
      font-weight: 600;
      line-height: 38.96px;
      letter-spacing: -0.9px;
      color: #EEEEEE;
      text-align:center;
    }
    .grid-content:hover {
      transform: scale(1.2);
      z-index: 1;
    }
    a.router-link-exact-active.active .grid-content{
      box-shadow: 3px 3px 3px 3px #376c90;
      transform: scale(1.09);
    }
    </style>
    <style scoped>
    /* 表格样式 */
    .content{
      width:100%;
    }
    .game-rank-table{
      width:90%;
      margin:0px auto;
      margin-top:30px;
      padding-bottom:30px;
    }
    /deep/ .el-pagination .el-input__inner{
      background-color:#fff0;
      border: 2px;
    }
    .el-pagination{
        padding-top:20px;
        height:40px;
        font-family: HarmonyOS_Sans_SC;
        font-size: 14px;
        font-weight: normal;
        line-height: 24px;
        letter-spacing: 0px;
        color: #606266;
        background-color: rgba(255, 255, 255, 0.9);
    }
    .el-table{
      font-family: Inter-Medium;
      font-size: 14px;
      font-weight: 500;
      line-height: 22.08px;
      letter-spacing: -0.8px;
      /* Font color/Title Dark */
      color: #4C526A;
    }
    /deep/ .el-table, /deep/ .el-table__expanded-cell{
      background-color: rgba(255, 255, 255, 0.5);
    }
    /* 表格内背景颜色 */
    /deep/ .el-table th,
    /deep/ .el-table tr,
    /deep/ .el-table td {
      background-color: rgba(255, 255, 255, 0.5);
    }
  /deep/.el-pagination button:disabled,
  /deep/.el-pagination .btn-next, 
  /deep/.el-pagination .btn-prev,
  /deep/.el-pager li {
    background: center center no-repeat #fff0;
  }
  /deep/ .el-select__caret el-input__icon el-icon-arrow-up{
    color: #020202;
    font-size: 20px;
  }
  /deep/.el-table__column-filter-trigger i {
    color: #0d0d0e;
    font-size: 30px;
    content:url('./../../assets/Vector.png')
  }
  /deep/.el-select .el-input .el-select__caret {
    color: #0c0c0c;
    font-size: 18px;
  }
</style>