<!--
    @Author: 刘梓伊
    @Description: 添加实验室信息界面
    @Date: 2020-06-15 16:14
    @Version: 1.0
-->
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
            <el-form-item label="实验室分类" label-width="100px" prop="lab_category_id">
              <el-button type="info" plain style="width: 165px" @click="handleOpenDialog('labCategoryDialogVisible')">
                {{ dataForm.lab_category_name === null ? '请选择' : dataForm.lab_category_name }}
              </el-button>
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
            <el-form-item label="场地" label-width="100px" prop="field_id">
              <el-button type="info" plain style="width: 165px" @click="handleOpenDialog('fieldDialogVisible')">
                {{ dataForm.field_name === null ? '请选择' : dataForm.field_name }}
              </el-button>
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
      <!-- 实验室分类dialog -->
      <dictionary-for-select
        title="实验室分类"
        listName="labCategoryList"
        idKey="lab_category_id"
        methodKey="labCategory"
        dialogVisibleKey="labCategoryDialogVisible"
        :currentDialogVisible = "labCategoryDialogVisible"
        :currentList = "labCategoryList"
        :currentSelectedItem = "dataForm.lab_category_id"
        @handleCancel="labCategoryDialogVisible = !labCategoryDialogVisible"
        @handleQuery="handleQuery"
        @handleSelect="handleSelect"
      >
      </dictionary-for-select>
      <!-- 场地dialog -->
      <dictionary-for-select
        title="场地"
        listName="fieldList"
        idKey="field_id"
        methodKey="field"
        dialogVisibleKey="fieldDialogVisible"
        :currentDialogVisible = "fieldDialogVisible"
        :currentList = "fieldList"
        :currentSelectedItem = "dataForm.field_id"
        @handleCancel="fieldDialogVisible = !fieldDialogVisible"
        @handleQuery="handleQuery"
        @handleSelect="handleSelect"
      >
      </dictionary-for-select>
    </div>

  </div>
</template>

<script>
  // 场地列表信息 假数据
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
  // 假数据radio列表
  const fakeList = [
  { id: 1, pre_name: 'c1', name: 'radio内容1', phone: '13512341234' },
  { id: 2, pre_name: 'c1', name: 'radio内容2', phone: '16812341234' },
  { id: 3, pre_name: 'c1', name: 'radio内容3', phone: '13812341234' },
  { id: 4, pre_name: 'c1', name: 'radio内容4', phone: '13812341234' },
  { id: 5, pre_name: 'c1', name: 'radio内容5', phone: '13812341234' },
  { id: 6, pre_name: 'c1', name: 'radio内容6', phone: '13812341234' },
  { id: 7, pre_name: 'c1', name: 'radio内容7', phone: '13812341234' },
  { id: 8, pre_name: 'c1', name: 'radio内容8', phone: '13812341234' },
  { id: 9, pre_name: 'c1', name: 'radio内容9', phone: '13812341234' },
  { id: 10, pre_name: 'c1', name: 'radio内容10', phone: '13812341234' },
  { id: 11, pre_name: 'c1', name: 'radio内容11', phone: '13812341234' },
  { id: 12, pre_name: 'c2', name: 'radio内容12', phone: '13812341234' },
  { id: 13, pre_name: 'c2', name: 'radio内容13', phone: '13812341234' },
  { id: 14, pre_name: 'c2', name: 'radio内容14', phone: '13812341234' },
  { id: 15, pre_name: 'c2', name: 'radio内容15', phone: '13812341234' },
  { id: 16, pre_name: 'c2', name: 'radio内容16', phone: '13812341234' },
  { id: 17, pre_name: 'c3', name: 'radio内容17', phone: '13812341234' },
  { id: 18, pre_name: 'c3', name: 'radio内容18', phone: '13812341234' },
  { id: 19, pre_name: 'c3', name: 'radio内容19', phone: '13812341234' },
  { id: 20, pre_name: 'c3', name: 'radio内容20', phone: '13812341234' },
  { id: 21, pre_name: 'c3', name: 'radio内容21', phone: '13812341234' },
  { id: 22, pre_name: 'c3', name: 'radio内容22', phone: '13812341234' }
]

  const allListName = [
    { key: 'labCategoryList', dialogVisibleName: 'labCategoryDialogVisible', option: 'getLabCategoryList' },
    { key: 'fieldList', dialogVisibleName: 'fieldDialogVisible', option: 'getFieldList' }
  ]

  const key2option = [
    {key: 'labCategory', option: 'fetchLabCategoryById'},
    {key: 'field', option: 'fetchFieldById'}
  ]

import { getSelectValue } from '@/utils/get-select-value'
import { isChinese, isEnglish } from '@/utils/fieldValidate'
import DictionaryForSelect from '@/components/DictionaryForSelect'

export default {
  name: 'field-create',
  components: {
    DictionaryForSelect
  },
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
      // 校验规则
      rules: {
        name: [
          { required: true, trigger: 'blur', validator: validateIsChinese }
        ],
        english_name: [
          { required: true, message: '请输入', trigger: 'blur' },
          { required: true, trigger: 'blur', validator: validateIsEnglish }
        ],
        lab_category_id: [
          { type: 'number', message: '请输入', trigger: 'change', required: true }
        ],
        field_id: [
          { type: 'number', message: '请输入', trigger: 'change', required: true }
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

      labCategoryDialogVisible: false,
      fieldDialogVisible: false,

      fieldList: [],
      labCategoryList: [],
    }
  },
  created() {

  },
  methods: {
    /* 提交表单信息 */
    submitCreate(formName) {
      // 验证输入合法性
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 调用接口
          this.$message({
            message: '添加成功!',
            type: 'success'
          })
          console.log('submit')
          console.log(this.dataForm)
        } else {
          console.log('error')
          return false
        }
      })
    },
    /* 返回上一页 */
    handleReturn() {
      this.$router.go(-1)
    },
    /* 获取实验室分类列表信息 */
    getLabCategoryList(keyword) {
      console.log('调用获取实验室分类列表信息接口')
      if (!keyword) {
        this.labCategoryList = fakeList
        return false
      }
      // 调用接口
      // 暂用假数据 作为筛选， 实际通过后台进行筛选
      this.labCategoryList = fakeList.filter(m => m.pre_name === keyword).map(m => ({
        id: m.id,
        pre_name: m.pre_name,
        name: m.name
      }))
    },
    /* 获取场地列表信息 */
    getFieldList(keyword) {
      console.log('调用获取场地列表信息接口')
      if (!keyword) {
        this.fieldList = fakeList
        return false
      }
      // 调用接口
      // 暂用假数据 作为筛选， 实际通过后台进行筛选
      this.fieldList = fakeList.filter(m => m.pre_name === keyword).map(m => ({
        id: m.id,
        pre_name: m.pre_name,
        name: m.name
      }))
    },
    /* 根据id获取软件分类信息 */
    fetchLabCategoryById(id) {
      return {
       lab_category_name: 'test'
      }
    },
    /* 根据id获取场地信息 */
    fetchFieldById(id) {
      return {
        field_name: '场地1名称'
      }
    },
    /* 根据关键词打开dialog */
    handleOpenDialog(dialogVisible) {
      this[dialogVisible] = true // 打开对应的dialog
      // 调用获取方法，用于生成radio
      const option = allListName.filter(m => m.dialogVisibleName === dialogVisible).map(m => m.option).pop()
      console.log('option===' + option)
      if (option) {
        this[option]()
      } else {
        this.$message({
          message: 'dialog null error!',
          type: 'error'
        })
      }
    },
    /* 测试 根据关键字获取对应方法 并返回查询出的数据 */
    getMethodByKey(key, id) {
      let option = key2option.filter(m => m.key === key).map(m => m.option).pop()
      return this[option](id)
    },
    /* 抽取方法 将信息同步 */
    handleSelect(data) {
      // 查询选择的id相关的数据
      let tempData = this.getMethodByKey(data.methodKey, data.select_id_value)
      getSelectValue(data, this.dataForm, tempData)
      // 表单数据验证规则
      this.$refs['dataForm'].validateField(data.select_id_key)
      // 关闭对话框
      console.log('data.dialogVisibleKey = ' + data.dialogVisibleKey)
      this[data.dialogVisibleKey] = false
    },
    /* 模糊查询 */
    handleQuery(data) {
      console.log('data=>' + data.listName + ',' + data.queryKeyword)
      let keyword = data.queryKeyword
      let listName = data.listName
      const option = allListName.filter(m => m.key === listName).map(m => m.option).pop()
      console.log('option=' + option)
      console.log('keyword=' + keyword)
      if (option) {
        this[option](keyword)
      } else {
        return false
      }
    },
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
