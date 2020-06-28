<template>
  <div class="app-container">
    <!-- 功能按钮 -->
    <div class="detail-button">
      <el-button type="primary" size="medium" @click="handleReturn">返回</el-button>
      <el-button type="success" size="medium" @click="submitCreate('dataForm')">创建</el-button>
    </div>
    <!-- 添加信息表单 -->
    <div class="form-style">
      <h2>新建耗材信息</h2>
      <el-form ref="dataForm" :model="dataForm" :rules="rules">
        <el-row type="flex" class="row-bg" justify="space-around">
          <el-col :span="8">
            <el-form-item label="种类" label-width="100px" prop="infoValidation">
              <el-select v-model="dataForm.lab_consumable_category_id" style="width: 160px;" placeholder="耗材种类" clearable filterable>
                <!--获取数据库信息动态生成option-->
                <el-option v-for="item in consumableCategoryList" :key="item.id" :label="item.name" :value="item.id">
                  <span style="float: left">编号:{{ item.id }}</span>
                  <span style="float: right; color: #8492a6; font-size: 12px">名称:{{ item.name }}</span>
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="规格" label-width="100px" prop="infoValidation">
              <el-input v-model="dataForm.specification" style="width: auto" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="单位" label-width="100px" prop="infoValidation">
              <el-input v-model="dataForm.unit" style="width: auto" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="数量" label-width="100px" prop="infoValidation">
              <el-input v-model="dataForm.quantity" style="width: auto" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script>
const fake_consumableCategoryList = [
  { id: 1, name: '耗材种类1' },
  { id: 2, name: '耗材种类2' }
]
export default {
  name: 'ConsumableCreate',
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
        lab_consumable_category_id: null,
        specification: null,
        unit: null,
        quantity: null
      },
      consumableCategoryList: []
    }
  },
  created() {
    this.getConsumableCategoryList()
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
          console.log(this.dataForm)
          this.$router.go(-1)
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
    /* 获取耗材种类列表信息 */
    getConsumableCategoryList() {
      // 调用接口
      console.log('调用获取软件分类列表信息接口')
      // 暂用假数据
      this.consumableCategoryList = fake_consumableCategoryList
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
