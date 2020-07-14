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
            <el-form-item label="实验室分类" label-width="100px" prop="lab_category_id">
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
    <div v-if="this.dataForm.id">
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
  </div>
</template>

<script>
// 实验室详情信息假数据

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
import { deleteLaboratoryInfoById, fetchLaboratoryInfoById, modifyLaboratoryInfo } from '@/api/laboratory_1/laboratory'
import { fetchFieldInfoById, fetchFieldInfos } from '@/api/laboratory_1/field'
import { fetchLaboratoryCategoryInfoById, fetchLaboratoryCategoryInfos } from '@/api/laboratory_1/laboratory-category'

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
        field_name: null,
        field_manager_id: null,
        field_manager: null,
        field_floor: null,
        field_room: null,
        field_isIndoor: null,
        field_height: null,
        field_width: null,
        field_long: null,
        field_volumn: null
      },
      tempData: null,
      tempDataByID: null,
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
    async getOriginalData() {
      const id = this.$route.query.id
      console.log('id=' + id)
      await fetchLaboratoryInfoById(id)
        .then(res => {
          this.dataForm = res.data.item;
        }).catch(err => {
          alert('获取信息失败' + err)
        })
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
          modifyLaboratoryInfo(this.dataForm).then(res => {
            this.$message({
              message: '修改成功',
              type: 'success'
            })
            this.afterEdit()
          }).catch(err => {
            this.$message({
              message: '修改失败' + err,
              type: 'error'
            })
          })
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
    async handleDelete() {
      await deleteLaboratoryInfoById(this.dataForm.id).then(() => {
        return true
      }).catch(() => {
        return false
      })
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
          id: this.dataForm.id
        }
      })
    },
    /* 根据实验室id获取实验的器材清单 */
    handleEquipmentDetail(id) {
      console.log('components-modules id =' + id)
      this.$router.push({
        name: 'Field_Equip_List',
        query: {
          id: this.dataForm.id
        }
      })
    },
    /* 获取实验室分类信息（radio组合框），可模糊查询 */
    async getLabCategoryList(keyword) {
      await fetchLaboratoryCategoryInfos(keyword).then(res => {
        this.labCategoryList = res.data.list;
      }).catch(err => {
        alert('获取实验室分类信息失败！' + err)
      })
    },
    /* 获取场地列表信息，可模糊查询 */
    async getFieldList(keyword) {
      console.log('调用获取场地列表信息接口')
      await fetchFieldInfos(keyword).then(res => {
        this.fieldList = res.data.list;
      }).catch(err => {
        alert('获取场地信息失败！' + err)
      })
    },
    /* 根据id获取实验室分类信息 */
    async fetchLabCategoryById(id) {
      await fetchLaboratoryCategoryInfoById(id).then(res => {
        this.tempDataByID = {
          lab_category_id: res.data.item.id,
          lab_category_name: res.data.item.name
        }
      }).catch(err => {
        alert('获取实验室分类信息内容失败！' + err)
        return null
      })
    },
    /* 获取根据场地id获取场地信息 */
    async fetchFieldById(id) {
      await fetchFieldInfoById(id).then(res => {
        this.tempDataByID = {
          field_id: res.data.item.id,
          field_name: res.data.item.name,
          field_manager_id: res.data.item.manager_id,
          field_manager: res.data.item.manager,
          field_floor: res.data.item.floor,
          field_room: res.data.item.room,
          field_isIndoor: res.data.item.isIndoor,
          field_height: res.data.item.height,
          field_width: res.data.item.width,
          field_long: res.data.item.long,
          field_volumn: res.data.item.volumn
        }
      }).catch(err => {
        alert('获取场地信息内容失败！' + err)
        return null
      })
    },
    /* 根据关键词打开dialog */
    async handleOpenDialog(dialogVisible) {
      this[dialogVisible] = true // 打开对应的dialog
      const option = allListName.filter(m => m.dialogVisibleName === dialogVisible).map(m => m.option).pop()
      console.log('option===' + option)
      if (option) {
        await this[option](); // 生成默认radio数据
      } else {
        this.$message({
          message: 'dialog null error!',
          type: 'error'
        })
      }
    },
    /* 测试 根据关键字获取对应方法 并返回查询出的数据 */
    async getMethodByKey(key, id) {
      let option = key2option.filter(m => m.key === key).map(m => m.option).pop()
      await this[option](id)
    },
    /* 抽取方法 将信息同步 */
    async handleSelect(data) {
      // 查询 选择的id的相关的数据
      await this.getMethodByKey(data.methodKey, data.select_id_value)
      let tempData = this.tempDataByID
      this.tempDataByID = null
      getSelectValue(data, this.dataForm, tempData)
      this.$refs['dataForm'].validateField(data.select_id_key) // 表单数据验证规则
      this[data.dialogVisibleKey] = false // 关闭对话框
    },
    /* radio组合框中的模糊查询 */
    handleQuery(data) {
      let keyword = data.queryKeyword
      let listName = data.listName
      const option = allListName.filter(m => m.key === listName).map(m => m.option).pop()
      // 根据option找出对应筛选方法
      if (option) {
        this[option](keyword)
      } else {
        return false
      }
    }
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
</style>

