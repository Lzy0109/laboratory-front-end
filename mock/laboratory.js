/**
  * @Author：李国烨
  * @Create： 2020/7/14
  * @Desc：实验室接口--假数据
  * @version: v1.0
 */
const count = 20;
const List = []

for (let i = 1; i <= count; i++){
  List.push({
    id: i,
    college_id: i,
    college_name: '学校' + i,
    english_name: 'eng-coll',
    name: '实验室' + i,
    lab_category_id: i,
    lab_category_name: '实验室类别' + i,
    lab_equipment_id: i, // 实验室器材
    max_seat: i * 10,
    lab_facility_id: i,
    field_id: i,
    field_name: '场地名称' + i,
    field_manager_id: i,
    field_manager: '负责人' + i,
    field_floor: '楼层' + i,
    field_room: '房间' + i,
    field_isIndoor: '室内/室外',
    field_height: 'h' + i,
    field_width: 'w' + i,
    field_long: 'l' + i,
    field_volumn: i
  })
}

module.exports = [
  {
    url: '/api/laboratory/infos',
    type: 'get',
    response: config => {
      return {
        code: 20000,
        data: {
          total: List.length,
          list: List
        }
      }
    }
  },
  {
    url: '/api/laboratory/detail',
    type: 'get',
    response: config => {
      let { id } = config.query
      console.log("id=" + id)
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
    url: '/api/laboratory/create',
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
    url: '/api/laboratory/delete',
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
    url:'/api/laboratory/modify',
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
