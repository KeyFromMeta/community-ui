<template>
    <div class="navigator">
        <ul>
          <li><router-link to="/"><div class="grid-content" id="category0"><span>全部<br>{{totalNumber}}</span></div></router-link></li>
          <li v-for="(item,index) in categoryList" :key="index">
            <router-link  :to="'/' + item.type" @click="routeChange()">
              <div class="grid-content" :id="'category'+item.type" > 
                <span>{{categoryDict[item.type]}}<br>{{item.count}}</span>
              </div> 
            </router-link>
          </li>
        </ul>
    </div>  
</template>

<script>
import tableApi from '../api/table'
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name:'navigator',
    data(){
      return{
        categoryDict:[
          '','休闲','体育','冒险','动作','策略','角色扮演'
        ],
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
        state:0,
      }
    },
    created() {
      this.fetchData()
    },
    beforeDestroy(){
      this.$bus.$off('stateChange')
    },
    methods:{
      fetchData() {
          // 调用api获得分类信息
          var total = 0
          tableApi.getCategoryList().then(response => {
              for(let i=0; i<response.data.CategoryInfo.length;i++){
                this.categoryList[i].count = response.data.CategoryInfo[i].Count
                this.categoryList[i].type = response.data.CategoryInfo[i].Type
                total+=response.data.CategoryInfo[i].Count
              }
              this.totalNumber = total
          }).catch(err=>{
            this.$message.error(err.message)
            console.log(err)
          })
      },
      routeChange(){
        this.$bus.$emit('stateChange',['category'])
      },
      
    }
}
</script>

<style scoped>
  .active{
    box-shadow: 100px #cc070733;
  }
  .navigator{
    margin-left:1.8%;
  }
  ul{
    list-style-type: none;
  }
  li{
    display: inline-block;
    margin:5px;
  }
  .grid-content {
    width: 150px;
    height: 80px;
    border-radius: 8px;
    padding-top:8%;
  }
  #category0{
    background: url('../assets/allBg.png');
  }
  #category1{
    background: url('../assets/sportGameBg.png');
  }
  #category2{
    background: url('../assets/musicGameBg.png');
  }
  #category3{
    background: url('../assets/actionGameBg.png');
  }
  #category4{
    background: url('../assets/adventureGameBg.png');
  }
  #category5{
    background: url('../assets/rolePlayBg.png');
  }
  #category6{
    background: url('../assets/shooterGameBg.png');
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
