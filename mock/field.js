/**
  * @Author：李国烨
  * @Create： 2020/7/11
  * @Desc：场地信息假数据
  * @version: v1.0
 */
const count = 20;
const List = []

for (let i = 1; i <= count; i++){
  List.push({
    id: i,
    name: 'field-' + i,
    manager_id: i,
    manager: 'manager' + i,
    floor: 'f' + i,
    room: 'room' + i,
    isIndoor: '室内',
    height: 'h'+i,
    width: 'w' + i,
    long: 'l' + i,
    volumn: i * 10
  })
}

module.exports = [
  {
    url: '/api/field/infos',
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
    url: '/api/field/detail',
    type: 'get',
    response: config => {
      const {id} = config.query
      let tempData = List.filter(m => m.id === id * 1).pop()
      return {
        code: 20000,
        data: {
          item: tempData
        }
      }
    }
  },
]
