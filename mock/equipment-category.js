/**
  * @Author：李国烨
  * @Create： 2020/7/14
  * @Desc：器材分类信息假数据
  * @version: v1.0
 */
const count = 20;
const List = []

for (let i = 1; i <= count; i++){
  List.push({
    id: i,
    name: '器材分类' + i,
    english_name: 'eng-equ' + i,
    description: 'desc-equ'
  })
}

module.exports = [
  {
    url: '/api/equipmentCategory/infos',
    type: 'get',
    response: config => {
      console.log('config query = ', config.query)
      let {pageNum, pageSize, name} = config.query
      if (!pageSize && !pageNum && !name){
        return {
          code: 20000,
          data: {
            total: List.length,
            list: List
          }
        }
      }
      const list = List.filter(m => m.name===name )
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
    url: '/api/equipmentCategory/detail',
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
  {
    url: '/api/equipmentCategory/create',
    type: 'post',
    response: config => {
      return {
        code: 20000,
        data: {
          msg: 'success'
        }
      }
    }
  },
  {
    url: '/api/equipmentCategory/delete',
    type: 'delete',
    response: config => {
      return {
        code: 20000,
        data: {
          msg: 'success'
        }
      }
    }
  },
  {
    url:'/api/equipmentCategory/modify',
    type: 'put',
    response: config => {
      return {
        code: 20000,
        data: {
          msg: 'success'
        }
      }
    }
  }
]
