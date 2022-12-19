import request from '../utils/request'
export default {
  //获取默认配置列表
  getDefaultList(){
    return request({
      url:'/configboard/mainpage',
      method:'get'
    })
  },
  //根据分类/页码/每页条目数获取配置列表
  getCertainCategoryList(currentCategory,page,limit) {
    let data = {"category":currentCategory,"page":page,"max_num":limit};
    return request({
      url: '/configboard/',
      method: 'post',
      data:data
    })
  },
  //通过关键字、标签、分类 搜索获取配置列表
  getListBySearchKey(keyword,page,max_num,tags,category){
    let data = {"searchkey":keyword,"page":page,"max_num":max_num,"tags":tags,"category":category}
    return request({ 
      url:'/configboard/search',
      method:'post',
      data:data
    })
  },
  //获得每个分类的总条目数
  getCategoryList(){
    return request({
      url:'/configboard/categorylist',
      method:'get',
    })
  },
  liked(id,likedType){
    let data = {'id':id,"liketype":likedType}
    return request({
      url:'/configboard/like',
      method:'post',
      data:data
    })
  }
}
