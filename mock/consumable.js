
const count = 20;
const List = []

for (let i = 1; i <= count; i++){
  List.push({
    id: i,
    number: '0w0' + i,
    name: '耗材名称' + i,
    english_name: 'english-name' + i,
    lab_consumable_category_id: i,
    lab_consumable_category_name: '耗材种类' + i,
    lab_brand_id: i,
    brand_name: '品牌' + i,
    lab_model_id: i,
    model_name: '型号' + i,
    lab_unit_id: i,
    lab_unit_name: '单位' + i,
    specification: '规格' + i,
    specialized: true,
    lab_manufacturer_id: i,
    manufacturer_name: '生产商' + i,
    manufacturer_telephone: 'i2345678911',
    lab_supplier_id: i,
    supplier_name: '供货商' + i,
    supplier_telephone: '22345678922',


    // 适用器材（applicative_equipment）

    bills_number: '单据号' + i,
    purchase_date: '2020-01-01',
    field_id: i,
    field_name: '存放场所' + i,
    expenditure: '经费来源' + i,
    purchase_method: '购买方式' + i,
    warranty: '保修期' + i,

    quantity: '数量' + i,
    unit_price: '单价' + i,
    total_price: '总价' + i,
    country_code_id: i,
    country_code_name: '国码' + i,
    production_date: '2020-07-01',
  })
}

module.exports = [
  {
    url: '/api/consumable/infos',
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
    url: '/api/consumable/detail',
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
    url: '/api/consumable/create',
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
    url: '/api/consumable/delete',
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
    url:'/api/consumable/modify',
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
