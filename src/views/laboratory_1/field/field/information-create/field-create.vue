<template>
  <div class="app-container">
    <!-- 功能按钮 -->
    <div class="detail-button">
      <el-button type="primary" size="medium" @click="handleReturn">返回</el-button>
      <el-button type="success" size="medium" @click="submitCreate('dataForm')">创建</el-button>
    </div>
    <!-- 添加信息表单 -->
    <div class="form-style">
      <h2>新增实验室</h2>
      <el-form ref="dataForm" :model="dataForm" :rules="rules" hide-required-asterisk>
        <el-row type="flex" class="row-bg" justify="space-around">
          <el-col :span="8">
            <el-form-item label="中文名称" label-width="100px" prop="name">
              <el-input v-model="dataForm.name" style="width: auto" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="英文名称" label-width="100px" prop="english_name">
              <el-input v-model="dataForm.english_name" style="width: auto" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="实验室分类" label-width="100px" prop="lab_category_name">
              <!-- 新版 -->
              <el-input v-model="dataForm.lab_category_name" style="width: auto" @blur="checkLabCategory(dataForm.lab_category_name)" />
              <div v-show="showCategoryCheckingSuccessMessage" class="check_message_success"><span>{{ categoryCheckingMessage }}</span></div>
              <div v-show="showCategoryCheckingErrorMessage" class="check_message_error"><span>{{ categoryCheckingMessage }}</span></div>
              <!-- 旧版 -->
              <!--<el-select v-model="dataForm.lab_category_id" style="width: 160px;" placeholder="实验室分类" filterable clearable>
                &lt;!&ndash;获取数据库信息动态生成option&ndash;&gt;
                <el-option v-for="item in labCategoryList" :key="item.id" :label="item.name" :value="item.id">
                  <span style="float: left">编号:{{ item.id }}</span>
                  <span style="float: right; color: #8492a6; font-size: 12px">名称:{{ item.name }}</span>
                </el-option>
              </el-select>-->
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 新版 -->
        <el-row>
          <el-col :span="8">
            <el-form-item label="最大机位数" label-width="100px" prop="max_seat">
              <el-input v-model.number="dataForm.max_seat" style="width: auto" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="场地" label-width="100px" prop="field_name">
              <el-input v-model="dataForm.field_name" style="width: auto" @blur="checkField(dataForm.field_name)" />
              <div v-show="showFieldCheckingSuccessMessage" class="check_message_success"><span>{{ fieldCheckingMessage }}</span></div>
              <div v-show="showFieldCheckingErrorMessage" class="check_message_error"><span>{{ fieldCheckingMessage }}</span></div>
            </el-form-item>
          </el-col>
        </el-row>
      <!-- 旧版内容 -->
      <!--  <el-row type="flex" class="row-bg" justify="space-around">
          <el-col :span="8">
            <el-form-item label="最大机位数" label-width="100px" prop="name">
              <el-input v-model="dataForm.max_seat" style="width: auto" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="场地" label-width="100px" prop="name">
              <el-select v-model="dataForm.field_id" style="width: 160px;" placeholder="场地" filterable clearable @change="showFieldData(dataForm.field_id)">
                &lt;!&ndash;获取数据库信息动态生成option&ndash;&gt;
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
        </el-row>-->

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

import { isChinese } from '@/utils/fieldValidate'
import { isEnglish } from '@/utils/fieldValidate'
export default {
  name: 'FieldCreate',
  data() {
    const validateIsChinese = (rule, value, callback) => {
      if (!isChinese(value)) {
        callback(new Error('请输入中文'))
      } else {
        callback()
      }
    }
    const validateIsEnglish = (rule, value, callback) => {
      if (!isEnglish(value)) {
        callback(new Error('请输入英文'))
      } else {
        callback()
      }
    }
    return {
      rules: {
        name: [
          { required: true, trigger: 'blur', validator: validateIsChinese }
        ],
        english_name: [
          { required: true, message: '请输入', trigger: 'blur' },
          { required: true, trigger: 'blur', validator: validateIsEnglish }
        ],
        lab_category_name: [
          { type: 'string', message: '请输入', trigger: 'blur', required: true }
        ],
        field_name: [
          { type: 'string', message: '请输入', trigger: 'blur', required: true }
        ],
        max_seat: [
          { type: 'number', message: '请输入', trigger: 'blur', required: true }
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
        field_id: null,
        field_name: null
      },
      showCategoryCheckingSuccessMessage: false,
      showCategoryCheckingErrorMessage: false,
      categoryCheckingMessage: null,

      showFieldCheckingSuccessMessage: false,
      showFieldCheckingErrorMessage: false,
      fieldCheckingMessage: null,

      fieldList: fake_fieldList,
      labCategoryList: fake_labCategoryList,
      labOwnerList: fake_ownerList
    }
  },
  created() {

  },
  methods: {
    submitCreate(formName) {
      // 验证部分数据是否正确
      if (this.showCategoryCheckingErrorMessage || this.showFieldCheckingErrorMessage) {
        this.$message({
          message: '表单的内容存在错误，请修改后再保存，否则请取消编辑',
          type: 'error'
        })
        return false
      }
      // 验证输入合法性
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
    },
    checkLabCategory(value) {
      console.log('check lab category ' + value)
      // 检查输入的内容是否存在
      if (!value) {
        this.showCategoryCheckingSuccessMessage = false
        this.showCategoryCheckingErrorMessage = false
        return
      }
      const flag = this.labCategoryList.filter(m => m.name === value).pop()
      if (flag) {
        this.showCategoryCheckingErrorMessage = false
        this.showCategoryCheckingSuccessMessage = true
        this.categoryCheckingMessage = '该分类存在，可选择'
        this.dataForm.lab_category_name = flag.name
        this.dataForm.lab_category_id = flag.id
      } else {
        this.showCategoryCheckingSuccessMessage = false
        this.showCategoryCheckingErrorMessage = true
        this.categoryCheckingMessage = '该分类不存在，不可选用'
      }
    },
    checkField(value) {
      console.log('check Field')
      // 检查输入的内容是否存在
      if (!value) {
        this.showFieldCheckingSuccessMessage = false
        this.showFieldCheckingErrorMessage = false
        return
      }
      const flag = this.fieldList.filter(m => m.name === value).pop()
      if (flag) {
        this.showFieldCheckingErrorMessage = false
        this.showFieldCheckingSuccessMessage = true
        this.fieldCheckingMessage = '该场地存在，可选择'
        this.dataForm.field_id = flag.id
        this.getFieldDataById()
      } else {
        this.showFieldCheckingSuccessMessage = false
        this.showFieldCheckingErrorMessage = true
        this.fieldCheckingMessage = '该场地不存在，不可选用'
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
  .check_message_success{
    display: inline-block;
    color: #67C23A;
    font-size: 12px;
    line-height: 1;
    padding-top: 4px;
    position: absolute;
    top: 100%;
    left:0
  }
  .check_message_error{
    display: inline-block;
    color: #F56C6C;
    font-size: 12px;
    line-height: 1;
    padding-top: 4px;
    position: absolute;
    top: 100%;
    left:0
  }
</style>
