<template>
  <div class="app-container">
    <!-- 功能按钮 -->
    <div class="detail-button">
      <el-button type="primary" @click="handleReturn" size="medium">返回</el-button>
      <el-button type="success" @click="submitCreate('dataForm')" size="medium">创建</el-button>
    </div>
    <!-- 添加信息表单 -->
    <div class="form-style">
      <h2>新增设施</h2>
      <el-form ref="dataForm" :model="dataForm" :rules="rules">

      </el-form>
    </div>

  </div>
</template>

<script>
  // const fake_fieldList = [
  //   {
  //     id: 1,
  //     name: '场地1',
  //     number: 'CD01',
  //     building_id: '1',
  //     room_id: '1',
  //     long: '10',
  //     width: '10',
  //     height: '10',
  //     isIndoor: '室外',
  //     type: '类型1'
  //   },
  //   {
  //     id: 2,
  //     name: '场地2',
  //     number: 'CD02',
  //     building_id: '2',
  //     room_id: '2',
  //     long: '20',
  //     width: '20',
  //     height: '20',
  //     isIndoor: '室外',
  //     type: '类型2'
  //   },
  //   {
  //     id: 3,
  //     name: '场地3',
  //     number: 'CD03',
  //     building_id: '3',
  //     room_id: '3',
  //     long: '30',
  //     width: '30',
  //     height: '30',
  //     isIndoor: '室外',
  //     type: '类型3'
  //   }
  // ]
  // const fake_labCategoryList = [
  //   { id: 1, name: '种类1', number: 'ZL01' },
  //   { id: 2, name: '种类2', number: 'ZL02' },
  //   { id: 3, name: '种类3', number: 'ZL03' }
  // ]
  // const fake_ownerList = [
  //   { id: 1, name: '负责人1', number: 'FZ01' },
  //   { id: 2, name: '负责人2', number: 'FZ02' },
  //   { id: 3, name: '负责人3', number: 'FZ03' }
  // ]
  // 存储要改变的key
  const keyList = []

  export default {
    name: 'facility-create',
    data() {
      return {
        rules: {
          number: [
            { type: 'number', message: '请输入数字', trigger: 'blur' }
          ],
          infoValidation: [
            { type: 'string', message: '请输入', trigger: 'blur' }
          ]
        },
        dataForm: {

        },
        // fieldList: fake_fieldList,
        // labCategoryList: fake_labCategoryList,
        // labOwnerList: fake_ownerList
      }
    },
    created() {

    },
    methods: {
      submitCreate(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // 调用接口
            this.$message({
              message: '添加成功!',
              type: 'success'
            })
            console.log('success submit!!')
            console.log(this.dataForm)
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      /* 返回上一页 */
      handleReturn() {
        // this.$router.push({
        //   path: '' // 跳转到lab list页面
        // })
        this.$router.go(-1)
      },
      showFieldData(number) {
        console.log('number=' + number)
        if (!number) {
          for (const key in keyList) {
            if (!keyList.hasOwnProperty(key)) continue
            this.dataForm[keyList[key]] = ''
          }
        }
        const temp = fake_fieldList.filter(m => m.number === number).map(m => ({
          lab_field_number: m.number,
          lab_isIndoor: m.isIndoor,
          lab_height: m.height,
          lab_width: m.width,
          lab_long: m.long,
          lab_field_type: m.type,
          lab_building: m.building_id,
          lab_room: m.room_id
        })).pop()
        for (const key in temp) {
          this.dataForm[key] = temp[key]
          keyList.push(key)
        }
      }
    }
  }
</script>

<style scoped>
  .form-style{
    color: #5a5e66;
    background: #fff;
    box-shadow: 0 1px 4px rgba(0,21,41,.1);
    padding: 20px;
  }
  .detail-button{
    color: #5a5e66;
    background: #fff;
    box-shadow: 0 1px 4px rgba(0,21,41,.1);
    padding: 20px;
    margin-bottom: 20px;
  }
</style>
