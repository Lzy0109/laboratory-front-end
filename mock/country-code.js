
const count = 20;
const List = []

for (let i = 1; i <= count; i++){
  List.push({
    id: i,
    name: 'c-code-' + i
  })
}

module.exports = [
  {
    url: '/api/countryCode/infos',
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
    url: '/api/countryCode/detail',
    type: 'get',
    response: config => {
      const {id} = config.query
      let tempData = List.filter(m => m.id === id * 1)
        .map(m => ({country_code_id:m.id,country_code_name: m.name})).pop()
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
