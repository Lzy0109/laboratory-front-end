/**
  * @Author：李国烨
  * @Create： 2020/7/1
  * @Desc：抽离方法
  * @version: v1.0
 */
/** 主要功能室将信息同步 *
*  data 由dialog传入的一组数据
 * dataForm 页面表单数据源
 * selectedData 根据dialog中选择的id查询出来的相关数据
 * return 无返回值
* */
function handleSelect(data, dataForm, selectedData) {
  let select_id_key = data.select_id_key
  let select_id_value = data.select_id_value
  // 根据选择的id变更数据 问题1如何根据id确定获取什么表的数据？ 传入供货商的name
  const selectData = selectedData
  let dataList = data.dataList
  //  如果查询的列表为空
  console.log('dataList= ' + dataList.length)
  if (dataList.length === 0) {
    dataForm[select_id_key] = null
    for (let key in selectData){
      if (selectData.hasOwnProperty(key)){
        dataForm[key] = selectData[key]
      }
    }
  } else {
    dataForm[select_id_key] = select_id_value
    for (let key in selectData){
      if (selectData.hasOwnProperty(key)){
        dataForm[key] = selectData[key]
      }
    }
  }
}

export function getSelectValue(data, dataForm, selectedData) {
  handleSelect(data, dataForm, selectedData)
  console.log('调用成功')
}
