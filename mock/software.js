const Mock = require('mockjs')

const count = 20;
const List = []

for (let i = 1; i <= count; i++){
  List.push({
    id: i,
    name: '软件' + i,
    number: 'sw-i234',
    english_name: 'english-name',
    size: '软件大小（暂留）',
    lab_software_category_id: i,
    lab_software_category_name: 'swcate' + i,
    applicable_system_id: i,
    applicable_system_name: '适用系统' + i,
    version: '版本号' + i,
    price_id: i,
    price_name: '单价' + i,
    lab_brand_id: i,
    brand_name: '品牌' + i,
    lab_unit_id: i,
    lab_unit_name: '单位' + i,
    specification: '规格',

    country_code_id: i,
    country_code_name: '国码' + i,
    production_date: '2020-07-03',

    lab_manufacturer_id: i,
    manufacturer_name: '生厂商' + i,
    manufacturer_telephone: '生厂商电话',
    lab_supplier_id: i,
    supplier_name: '供货商' + i,
    supplier_telephone: '供货商电话',
    course_id: i,
    course_name: '适用课程' + i
  })
}

module.exports = [
  {
    url: '/api/software/infos',
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
    url: '/api/software/detail',
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
    url: '/api/software/create',
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
    url: '/api/software/delete',
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
    url:'/api/software/modify',
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
