<template>
  <div class="app-container">
    <!-- 功能按钮 -->
    <div class="detail-button">
      <el-button type="primary" @click="handleReturn" size="medium">返回</el-button>
      <el-button type="success" @click="submitCreate('dataForm')" size="medium">创建</el-button>
    </div>
    <!-- 添加信息表单 -->
    <div class="form-style">
      <h2>新增实验室</h2>
      <el-form ref="dataForm" :model="dataForm" :rules="rules">
        <el-row type="flex" class="row-bg" justify="space-around">
          <el-col :span="8">
            <el-form-item label="英文名称" label-width="100px" prop="number">
              <el-input v-model="dataForm.english_name" style="width: auto" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="中文名称" label-width="100px" prop="name">
              <el-input v-model="dataForm.name" style="width: auto" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="实验室分类" label-width="100px" prop="number">
              <el-select v-model="dataForm.lab_category_id" style="width: 160px;" placeholder="实验室分类" filterable clearable>
                <!--获取数据库信息动态生成option-->
                <el-option v-for="item in labCategoryList" :key="item.id" :label="item.name" :value="item.id">
                  <span style="float: left">编号:{{ item.id }}</span>
                  <span style="float: right; color: #8492a6; font-size: 12px">名称:{{ item.name }}</span>
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
          <el-col :span="8">
            <el-form-item label="最大机位数" label-width="100px" prop="name">
              <el-input v-model="dataForm.max_seat" style="width: auto" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="场地" label-width="100px" prop="name">
              <el-select v-model="dataForm.field_id" style="width: 160px;" placeholder="场地" filterable clearable @change="showFieldData(dataForm.field_id)">
                <!--获取数据库信息动态生成option-->
                <el-option v-for="item in fieldList" :key="item.id" :label="item.name" :value="item.id">
                  <span style="float: left">编号:{{ item.id }}</span>
                  <span style="float: right; color: #8492a6; font-size: 12px">名称:{{ item.name }}</span>
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="楼层" label-width="100px" prop="number">
              <el-input v-model="dataForm.field_floor" style="width: auto" readonly />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
          <el-col :span="8">
            <el-form-item label="房间编号" label-width="100px" prop="name">
              <el-input v-model="dataForm.field_room" style="width: auto" readonly />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="场地负责人" label-width="100px" prop="name">
              <el-input v-model="dataForm.field_manager" style="width: auto" readonly />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="可容纳人数" label-width="100px" prop="number">
              <el-input v-model="dataForm.field_volumn" style="width: auto" readonly />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
          <el-col :span="8">
            <el-form-item label="场地长度" label-width="100px" prop="number">
              <el-input v-model="dataForm.field_long" style="width: auto" readonly />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="场地宽度" label-width="100px" prop="name">
              <el-input v-model="dataForm.field_width" style="width: auto" readonly />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="场地高度" label-width="100px" prop="number">
              <el-input v-model="dataForm.field_height" style="width: auto" readonly />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
          <el-col>
            <el-form-item label="室内/室外" label-width="100px" prop="name">
              <el-input v-model="dataForm.field_isIndoor" style="width: auto" readonly />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>

  </div>
</template>

<script>
const fake_fieldList = [
  {
    id: 1,
    name: '场地1名称',
    field_manager_id: 1,
    field_manager: '负责人1',
    floor: '楼层',
    room: '房间号',
    isIndoor: '室内/室外',
    height: '高度',
    width: '宽度',
    long: '长度',
    volumn: '最大容纳人数'
  },
  {
    id: 2,
    name: '场地2名称',
    field_manager_id: 2,
    field_manager: '负责人2',
    floor: '楼层',
    room: '房间号',
    isIndoor: '室内/室外',
    height: '高度',
    width: '宽度',
    long: '长度',
    volumn: '最大容纳人数'
  },
  {
    id: 3,
    name: '场地3名称',
    field_manager_id: 3,
    field_manager: '负责人3',
    floor: '楼层',
    room: '房间号',
    isIndoor: '室内/室外',
    height: '高度',
    width: '宽度',
    long: '长度',
    volumn: '最大容纳人数'
  }
]
const fake_labCategoryList = [
  { id: 1, name: '种类1', number: 'ZL01' },
  { id: 2, name: '种类2', number: 'ZL02' },
  { id: 3, name: '种类3', number: 'ZL03' }
]
const fake_ownerList = [
  { id: 1, name: '负责人1', number: 'FZ01' },
  { id: 2, name: '负责人2', number: 'FZ02' },
  { id: 3, name: '负责人3', number: 'FZ03' }
]
// 存储要改变的key
const keyList = []

export default {
  name: 'field-create',
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
        id: null,
        college_id: null,
        college_name: null,
        english_name: null,
        name: null,
        lab_category_id: null,
        lab_category_name: null,
        lab_equipment_id: null, // 实验室器材
        max_seat: null,
        lab_facility_id: null,
        field_id: null
      },
      fieldList: fake_fieldList,
      labCategoryList: fake_labCategoryList,
      labOwnerList: fake_ownerList
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
      const temp = fake_fieldList.filter(m => m.id === number).map(m => ({
        field_name: m.name,
        field_manager_id: m.field_manager_id,
        field_manager: m.field_manager,
        field_floor: m.floor,
        field_room: m.room,
        field_isIndoor: m.isIndoor,
        field_height: m.height,
        field_width: m.width,
        field_long: m.long,
        field_volumn: m.volumn
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
