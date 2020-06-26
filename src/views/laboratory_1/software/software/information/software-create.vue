<template>
  <div class="app-container">
    <!-- 功能按钮 -->
    <div class="detail-button">
      <el-button type="primary" size="medium" @click="handleReturn">返回</el-button>
      <el-button type="success" size="medium" @click="submitCreate('dataForm')">创建</el-button>
    </div>
    <!-- 添加信息表单 -->
    <div class="form-style">
      <h2>新建软件</h2>
      <el-form ref="dataForm" :model="dataForm" :rules="rules">
        <el-row type="flex" class="row-bg" justify="space-around">
          <el-col :span="8">
            <el-form-item label="软件名称" label-width="100px" prop="infoValidation">
              <el-input v-model="dataForm.name" style="width: auto" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="软件大小" label-width="100px" prop="number">
              <el-input v-model="dataForm.size" style="width: auto" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="软件种类" label-width="100px" prop="infoValidation">
              <el-select v-model="dataForm.lab_software_category_id" style="width: 185px;" clearable filterable placeholder="软件种类">
                <!--获取数据库信息动态生成option-->
                <el-option v-for="item in softwareCategoryList" :key="item.id" :label="item.name" :value="item.id">
                  <span style="float: left">编号:{{ item.id }}</span>
                  <span style="float: right; color: #8492a6; font-size: 12px">名称:{{ item.name }}</span>
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
          <el-col :span="8">
            <el-form-item label="适用系统" label-width="100px" prop="infoValidation">
              <el-input v-model="dataForm.applicable_system" style="width: auto" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="软件版本号" label-width="100px" prop="infoValidation">
              <el-input v-model="dataForm.version" style="width: auto" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="价格" label-width="100px" prop="infoValidation">
              <el-input v-model="dataForm.price" style="width: auto" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="row-bg">
          <el-col :span="8">
            <el-form-item label="发行方名称" label-width="100px" prop="infoValidation">
              <el-input v-model="dataForm.publisher_name" style="width: auto" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="使用说明" label-width="100px" prop="infoValidation">
              <el-input v-model="dataForm.attachment_id" style="width: auto" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script>

// 存储要改变的key
// eslint-disable-next-line no-unused-vars
const keyList = []

export default {
  name: 'SoftwareCreate',
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
        name: '',
        lab_software_category_id: '',
        size: '',
        applicable_system: '',
        version: '',
        price: '',
        publisher_name: '',
        attachment_id: ''
      },
      softwareCategoryList: []
    }
  },
  created() {
    this.getSoftwareCategoryList()
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
    /* 获取软件分类列表信息 */
    getSoftwareCategoryList() {
      // 调用接口
      console.log('调用获取软件分类列表信息接口')
      // 暂用假数据
      this.softwareCategoryList.push({ id: 1, name: '分类1' }, { id: 2, name: 'cate2' })
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
