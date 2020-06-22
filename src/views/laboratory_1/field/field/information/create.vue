<template>
  <div class="app-container">
    <!-- 功能按钮 -->
    <div class="detail-button">
      <el-button type="primary" @click="handleBack">返回</el-button>
      <el-button type="success" @click="submitCreate('dataForm')">创建</el-button>
    </div>
    <!-- 添加信息表单 -->
    <div class="form-style">
      <el-form ref="dataForm" :model="dataForm" :rules="rules">
        <el-row>
          <el-col :span="12">
            <el-form-item label="场地" label-width="100px" prop="infoValidation">
              <el-select v-model="dataForm.field_id" placeholder="场地" clearable>
                <el-option v-for="item in fieldList" :key="item.id" :label="item.name" :value="item.number">
                  <span>{{ item.name }}</span>
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="实验室种类" label-width="100px" prop="infoValidation">
              <el-select v-model="dataForm.lab_category_id" clearable placeholder="实验室种类">
                <el-option v-for="item in labCategoryList" :key="item.id" :label="item.name" :value="item.number">
                  <span>{{ item.name }}</span>
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="实验室名称" label-width="100px" prop="infoValidation">
              <el-input v-model="dataForm.lab_name" style="width: auto" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="实验室编号" label-width="100px" prop="infoValidation">
              <el-input v-model="dataForm.lab_num" style="width: auto" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="负责人" label-width="100px" prop="infoValidation">
              <el-select v-model="dataForm.lab_owner" clearable placeholder="负责人">
                <el-option v-for="item in labOwnerList" :key="item.id" :label="item.name" :value="item.number">
                  <span>{{ item.name }}</span>
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>

  </div>
</template>

<script>
const fake_fieldList = [
  { id: 1, name: '场地1', number: 'CD01' },
  { id: 2, name: '场地2', number: 'CD02' },
  { id: 3, name: '场地3', number: 'CD03' }
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
export default {
  name: 'LabCreate',
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
        field_id: '',
        lab_category_id: '',
        lab_num: '',
        lab_name: '',
        lab_owner: ''
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
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleBack() {
      this.$router.push({
        path: 'labtable'
      })
    }
  }
}
</script>

<style scoped>
  .form-style{
    color: #5a5e66;
    background: #fff;
    box-shadow: 0 1px 4px rgba(0,21,41,.1);
    padding:20px;
    margin-bottom: 49px;
  }
  .detail-button{
    color: #5a5e66;
    background: #fff;
    box-shadow: 0 1px 4px rgba(0,21,41,.1);
    padding:20px;
    margin-bottom: 49px;
  }
</style>
