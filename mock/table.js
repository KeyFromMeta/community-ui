const { Random } = require('mockjs')
const Mock = require('mockjs')
Random.extend({
  fit_game: function() {
    var fit_game = ['原神', '香肠派对', '艾尔登法环', '文明6']
    return this.pick(fit_game, 2, 3)
  }
})
Random.extend({
  label: function() {
    var label = ['动作游戏', '多姿使用', '动作游戏1', '坐姿使用2']
    return this.pick(label, 2, 3)
  }
})
const data = Mock.mock({
  'items|30': [{
    id: '@id', // 配置id
    title: '@sentence(1, 3)', // 配置名称
    fit_game: ('@fit_game'), // 适配游戏
    intro: '@sentence(10,20)', // 简介说明
    label: ('@label'), // 标签
    author: 'name', // 上传人
    update_time: '@datetime' // 更新时间
  }]
})

module.exports = [
  {
    url: '/vue-admin-template/table/list',
    type: 'get',
    response: config => {
      const items = data.items
      return {
        code: 20000,
        data: {
          total: items.length,
          items: items
        }
      }
    }
  }
]
