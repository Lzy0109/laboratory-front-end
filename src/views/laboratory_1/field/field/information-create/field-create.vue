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
import { createLaboratoryInfo } from '@/api/laboratory_1/laboratory'
import { fetchFieldInfoById, fetchFieldInfos } from '@/api/laboratory_1/field'
import { fetchLaboratoryCategoryInfoById, fetchLaboratoryCategoryInfos } from '@/api/laboratory_1/laboratory-category'

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
          createLaboratoryInfo(this.dataForm).then(res => {
            this.$message({
              message: '添加成功',
              type: 'success'
            })
            this.$router.go(-1)
          }).catch(err => {
            this.$message({
              message: '添加失败',
              type: 'error'
            })
          })
        } else {
          this.$message({
            message: '添加失败！请注意输入内容',
            type: 'error'
          })
          return false
        }
      })
    },
    /* 返回上一页 */
    handleReturn() {
      this.$router.go(-1)
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
          field_name: res.data.item.name
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
