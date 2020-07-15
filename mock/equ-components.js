/**
 * @Author：李国烨
 * @Create： 2020/7/14
 * @Desc：器材零部件信息假数据
 * @version: v1.0
 */
const count = 20;
const List = []

for (let i = 1; i <= count; i++){
  List.push({
    id: i,
    number: '器材零部件编号'+i,
    name: '器材零部件名称'+i,
    english_name: 'english_name'+i,
    lab_equipment_parts_category_id: i,
    lab_equipment_parts_category_name: '器材零部件种类'+i,
    lab_brand_id: i,
    brand_name: '品牌'+i,
    lab_model_id: i,
    model_name: '型号' + i,
    lab_unit_id: i,
    lab_unit_name: '单位'+i,
    lab_manufacturer_id: i,
    manufacturer_name: '生产商' + i,
    manufacturer_telephone: '12345678911',
    lab_supplier_id: i,
    supplier_name: '供货商' + i,
    supplier_telephone: '12345678922',

    specification: '规格',
    quantity: '数量',
    unit_price: '单价',
    total_price: '总价',

    // 适用器材（applicative_equipment）

    country_code_id: 1,
    country_code_name: '国码',
    production_date: '2020-07-01',

    bills_number: '单据号',
    purchase_date: '2020-07-01',
    field_id: i,
    field_name: '存放场所'+i,
    expenditure: '经费来源',
    purchase_method: '购买方式',
    warranty: '保修期',
  })
}

module.exports = [
  {
    url: '/api/components/infos',
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
    url: '/api/components/detail',
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
    url: '/api/components/create',
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
    url: '/api/components/delete',
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
    url:'/api/components/modify',
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
