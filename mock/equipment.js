
const count = 20;
const List = []

for (let i = 1; i <= count; i++){
  List.push({
    id: i,
    number: '123456' + i,
    name: '器材123456' + i,
    english_name: 'english-name' + i,
    lab_equipment_category_name: '分类1' + i,
    lab_equipment_category_id: i,
    lab_brand_id: i,
    brand_name: '品牌111' + i,
    lab_equipment_model_id: i,
    equipment_model_name: '型号111' + i,
    lab_unit_id: i,
    lab_unit_name: '单位111' + i,
    lab_manufacturer_id: i,
    manufacturer_name: '生产商111' + i,
    manufacturer_telephone: '12345678911' + i,
    lab_supplier_id: i,
    supplier_name: '供货商111' + i,
    supplier_telephone: '12345678922' + i,

    quantity: '数量101' + i,
    unit_price: '单价1' + i,
    total_price: '总价101' + i,
    country_code_id: i,
    country_code_name: '国码0000000000' + i,
    production_date: '2020-06-06' + i,

    bills_number: '单据号0000000000' + i,
    purchase_date: '2020-06-06' + i,
    field_id: i,
    field_name: '存放场所111' + i,
    expenditure: '经费来源111' + i,
    purchase_method: '购买方式111' + i,
    warranty: '保修期111' + i,
    IP: '附件IP111' + i,
    URL: '附件URL111' + i,

    status: 4,
    status_name: '报废',
    usage: '用途' + i
  })
}

module.exports = [
  {
    url: '/api/equipment/infos',
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
    url: '/api/equipment/detail',
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
    url: '/api/equipment/create',
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
    url: '/api/equipment/delete',
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
    url:'/api/equipment/modify',
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
