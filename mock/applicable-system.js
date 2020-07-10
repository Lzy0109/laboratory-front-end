
const count = 20;
const List = []

for (let i = 1; i <= count; i++){
  List.push({
    id: i,
    name: 'appos' + i
  })
}

module.exports = [
  {
    url: '/api/applicableSystem/infos',
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
    url: '/api/applicableSystem/detail',
    type: 'get',
    response: config => {
      const {id} = config.query
      let tempData = List.filter(m => m.id === id * 1)
        .map(m => ({applicable_system_id:m.id,applicable_system_name: m.name})).pop()
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
