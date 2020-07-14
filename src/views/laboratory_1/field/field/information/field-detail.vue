<!--
    @Author: 刘梓伊
    @Date: 2020-06-15 16:27
    @Description: 实验室详情页面代码
    @Version: 1.0
-->
<template>
  <div class="app-container">
    <!-- 功能按钮 -->
    <div class="detail-button">
      <el-button type="primary" size="medium" @click="handleReturn">返回</el-button>
      <el-button type="primary" :disabled="isAble" size="medium" @click="beforeEdit">编辑信息</el-button>
      <el-button type="danger" size="medium" @click="beforeHandleDelete">删除</el-button>
      <el-button type="success" size="medium" @click="handleDownload">导出信息</el-button>
      <el-button type="primary" size="medium" @click="handleEquipmentDetail">查看器材</el-button>
      <el-button type="primary" size="medium" @click="handleFacilityDetail">查看设施</el-button>
    </div>
    <!-- 详细信息展示 -->
    <div class="form-style">
      <h2>实验室详细信息</h2>
      <el-form ref="dataForm" :model="dataForm" :rules="rules" hide-required-asterisk>
        <el-row type="flex" class="row-bg" justify="space-around">
          <!-- 英文名称 -->
          <el-col :span="6">
            <el-form-item label="英文名称" label-width="100px" prop="english_name">
              <span v-show="isRead">{{ dataForm.english_name }}</span>
              <el-input v-show="!isRead" v-model="dataForm.english_name" style="width: auto;" :readonly="isRead" />
            </el-form-item>
          </el-col>
          <!-- 中文名称 -->
          <el-col :span="6">
            <el-form-item label="中文名称" label-width="100px" prop="name">
              <span v-show="isRead">{{ dataForm.name }}</span>
              <el-input v-show="!isRead" v-model="dataForm.name" style="width: auto" :readonly="isRead" />
            </el-form-item>
          </el-col>
          <!-- 实验室分类 -->
          <el-col :span="6">
            <el-form-item label="实验室分类" label-width="100px" prop="lab_category_name">
              <span v-show="isRead">{{ dataForm.lab_category_name }}</span>
              <el-button v-show="!isRead" type="info" plain style="width: 165px" @click="handleOpenDialog('labCategoryDialogVisible')">
                {{ dataForm.lab_category_name === null ? '请选择' : dataForm.lab_category_name }}
              </el-button>
            </el-form-item>
          </el-col>
          <!-- 最大机位数 -->
          <el-col :span="6">
            <el-form-item label="最大机位数" label-width="100px" prop="max_seat">
              <span v-show="isRead">{{ dataForm.max_seat }}</span>
              <el-input v-show="!isRead" v-model.number="dataForm.max_seat" style="width: auto" :readonly="isRead" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <!-- 场地 -->
          <el-col :span="6">
            <el-form-item label="场地" label-width="100px" prop="field_id">
              <span v-show="isRead">{{ dataForm.field_name }}</span>
              <el-button v-show="!isRead" type="info" plain style="width: 165px" @click="handleOpenDialog('fieldDialogVisible')">
                {{ dataForm.field_name === null ? '请选择' : dataForm.field_name }}
              </el-button>
            </el-form-item>
          </el-col>
          <!-- 楼层 -->
          <el-col :span="6">
            <el-form-item label="楼层" label-width="100px">
              <span>{{ dataForm.field_floor }}</span>
              <!--<el-input v-model="dataForm.field_floor" style="width: auto" readonly />-->
            </el-form-item>
          </el-col>
          <!-- 房间号 -->
          <el-col :span="6">
            <el-form-item label="房间号" label-width="100px">
              <span>{{ dataForm.field_room }}</span>
              <!--<el-input v-model="dataForm.field_room" style="width: auto" readonly />-->
            </el-form-item>
          </el-col>
          <!-- 场地负责人 -->
          <el-col :span="6">
            <el-form-item label="场地负责人" label-width="100px">
              <span>{{ dataForm.field_manager }}</span>
              <!--<el-input v-model="dataForm.field_manager" style="width: auto" readonly />-->
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <!-- 可容纳人数 -->
          <el-col :span="6">
            <el-form-item label="可容纳人数" label-width="100px">
              <span>{{ dataForm.field_volumn }}</span>
              <!--<el-input v-model="dataForm.field_volumn" style="width: auto" readonly />-->
            </el-form-item>
          </el-col>
          <!-- 场地长度 -->
          <el-col :span="6">
            <el-form-item label="场地长度" label-width="100px">
              <span>{{ dataForm.field_long }}</span>
              <!--<el-input v-model="dataForm.field_long" style="width: auto" readonly />-->
            </el-form-item>
          </el-col>
          <!-- 场地宽度 -->
          <el-col :span="6">
            <el-form-item label="场地宽度" label-width="100px">
              <span>{{ dataForm.field_width }}</span>
              <!--<el-input v-model="dataForm.field_width" style="width: auto" readonly />-->
            </el-form-item>
          </el-col>
          <!-- 场地高度 -->
          <el-col :span="6">
            <el-form-item label="场地高度" label-width="100px">
              <span>{{ dataForm.field_height }}</span>
              <!--<el-input v-model="dataForm.field_height" style="width: auto" readonly />-->
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <!-- 室内or室外 -->
          <el-col :span="6">
            <el-form-item label="室内/室外" label-width="100px" prop="infoValidation">
              <span>{{ dataForm.field_isIndoor }}</span>
              <!--<el-input v-model="dataForm.field_isIndoor" style="width: auto" readonly />-->
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <!-- 编辑按钮 -->
      <el-collapse-transition>
        <div v-show="showSaveBtn" style="text-align: center">
          <el-button type="success" size="medium" @click="submitEdit('dataForm')">保存</el-button>
          <el-button type="primary" size="medium" @click="beforeCancelEdit('dataForm')">取消</el-button>
        </div>
      </el-collapse-transition>
    </div>
    <!-- 实验室分类radio组合框 -->
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
    <!-- 场地分类radio组合框 -->
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
</template>

<script>
// 实验室详情信息假数据
const fakeData = {
  id: 1,
  college_id: '1',
  college_name: '学校名称',
  english_name: 'test-en',
  name: '实验室',
  lab_category_id: 1,
  lab_category_name: '实验室类别1',
  lab_equipment_id: 1, // 实验室器材
  max_seat: 100,
  lab_facility_id: 1,
  field_id: 1,
  field_name: '场地1名称',
  field_manager_id: 1,
  field_manager: '负责人1',
  field_floor: '楼层',
  field_room: '房间号',
  field_isIndoor: '室内/室外',
  field_height: '高度',
  field_width: '宽度',
  field_long: '长度',
  field_volumn: '最大容纳人数'
}
// radio组合框假数据
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
// 指向对应对话框
const allListName = [
  { key: 'labCategoryList', dialogVisibleName: 'labCategoryDialogVisible', option: 'getLabCategoryList' },
  { key: 'fieldList', dialogVisibleName: 'fieldDialogVisible', option: 'getFieldList' }
]
// 指向根据id获取的方法
const key2option = [
  {key: 'labCategory', option: 'fetchLabCategoryById'},
  {key: 'field', option: 'fetchFieldById'}
]

import { getSelectValue } from '@/utils/get-select-value'
import { isChinese, isEnglish } from '@/utils/fieldValidate'
import DictionaryForSelect from '@/components/DictionaryForSelect'

export default {
  name: 'field-detail',
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
      dataForm: null,
      tempData: null,
      // 校验信息规则
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
      isRead: true,
      isAble: false,
      showSaveBtn: false,

      labCategoryDialogVisible: false,
      fieldDialogVisible: false,

      labCategoryList: [],
      fieldList: []
    }
  },
  // 渲染页面时加载
  created() {
    this.getOriginalData()
  },
  methods: {
    /* 根据实验室id获取数据 */
    getOriginalData() {
      // 暂用假数据
      this.dataForm = fakeData
      const id = this.$route.query.id
      console.log(id)
    },
    /* 返回上一页 */
    handleReturn() {
      this.$router.go(-1)
    },
    /* 点击编辑按钮，保存修改前的数据，打开input框，显示保存取消按钮 */
    beforeEdit() {
      this.showSaveBtn = !this.showSaveBtn
      // 保存修改前数据
      this.tempData = { ...this.dataForm }
      // 使input为非readonly
      this.isRead = false
      // 显示保存信息按钮
      this.showSaveBtn = true
      // 设为不可用,防止暂存数据出错
      this.isAble = true
    },
    /* 编辑后，还原修改前所有状态 */
    afterEdit() {
      this.tempData = null
      this.isRead = true
      this.showSaveBtn = false
      this.isAble = false
    },
    /* 提交编辑的内容，显示提示信息 */
    submitEdit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$message({
            message: '修改成功',
            type: 'success'
          })
          // 根据返回信息重新复制dataForm
          console.log('submit')
          // 修改成功后操作
          this.afterEdit()
        } else {
          this.$message({
            message: '修改的内容存在错误，请修改后再保存，否则请取消编辑',
            type: 'error'
          })
          console.log('error')
          return false
        }
      })
    },
    /* 取消编辑，调用afterEdit方法 */
    cancelEdit(formName) {
      this.dataForm = { ...this.tempData }
      this.$refs[formName].clearValidate()
      this.afterEdit()
    },
    /* 取消编辑，显示提示信息 */
    beforeCancelEdit(formName) {
      this.$confirm('修改信息还没保存, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.cancelEdit(formName)
        this.$message({
          message: '已取消',
          type: 'success'
        })
      }).catch(() => {
        console.log('已取消退出')
      })
    },
    /* 删除操作，根据实验室id调用接口 */
    handleDelete() {
      if (this.dataForm.id) {
        console.log(this.dataForm.id)
        return true
      } else {
        return false
      }
    },
    /* 点击删除按钮的提示信息 */
    beforeHandleDelete() {
      this.$confirm('此操作将删除该信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (this.handleDelete()) {
          this.$message({
            type: 'success',
            message: '删除成功'
          })
          this.$router.go(-1)
        } else {
          this.$message({
            type: 'warning',
            message: '删除失败'
          })
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    /* 导出信息 */
    handleDownload() {
      console.log('导出')
    },
    /* 根据实验室id获取实验室的设施清单 */
    handleFacilityDetail(id) {
      console.log('facility-components-modules id =' + id)
      this.$router.push({
        name: 'Field_Fac_List',
        query: {
          id: id
        }
      })
    },
    /* 根据实验室id获取实验的器材清单 */
    handleEquipmentDetail(id) {
      console.log('components-modules id =' + id)
      this.$router.push({
        name: 'Field_Equip_List',
        query: {
          id: id
        }
      })
    },
    /* 获取场地列表信息，可模糊查询 */
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
    /* 根据id获取实验室分类信息 */
    fetchLabCategoryById(id) {
      return {
        lab_category_name: 'test'
      }
    },
    /* 获取根据场地id获取场地信息 */
    fetchFieldById(id) {
      return   {
        field_name: '场地1名称',
        field_manager_id: 1,
        field_manager: '负责人1',
        field_floor: '楼层',
        field_room: '房间号',
        field_isIndoor: '室内/室外',
        field_height: '高度',
        field_width: '宽度',
        field_long: '长度',
        field_volumn: '最大容纳人数'
      }
    },
    /* 获取实验室分类信息（radio组合框），可模糊查询 */
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
    /* radio组合框中的模糊查询 */
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

<!-- 悬浮input鼠标状态 -->
<style>
  input {
    cursor: auto;
  }
</style>

<style scoped>
  .form-style{
    color: #5a5e66;
    background: #fff;
    box-shadow: 0 1px 4px rgba(0,21,41,.1);
    padding: 10px 20px;
  }
  .detail-button{
    color: #5a5e66;
    background: #fff;
    box-shadow: 0 1px 4px rgba(0,21,41,.1);
    padding:20px;
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

