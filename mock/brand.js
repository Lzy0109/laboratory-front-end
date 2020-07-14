/**
  * @Author：李国烨
  * @Create： 2020/7/11
  * @Desc：品牌信息假数据
  * @version: v1.0
 */
const count = 20;
const List = []

for (let i = 1; i <= count; i++){
  List.push({
    id: i,
    name: 'brand-' + i
  })
}

module.exports = [
  {
    url: '/api/brand/infos',
    type: 'get',
    response: config => {
      console.log('config query = ', config.query.keyword)
      let temp_keyword = config.query.keyword
      if (!temp_keyword){
        return {
          code: 20000,
          data: {
            total: List.length,
            list: List
          }
        }
      }
      const list = List.filter(m => m.name===temp_keyword )
      return {
        code: 20000,
        data: {
          total: list.length,
          list: list
        }
      }
    }
  },
  {
    url: '/api/brand/detail',
    type: 'get',
    response: config => {
      const {id} = config.query
      let tempData = List.filter(m => m.id === id * 1).pop()
      // console.log({...tempData})
      return {
        code: 20000,
        data: {
          item: tempData
        }
      }
    }
  },
]
