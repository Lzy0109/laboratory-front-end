<!--
    @Author 李国烨
    @Date 2020/6/19 11:02
    @Description: 软件分类信息创建页面
    @Version 1.0
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
      <h2>新建软件分类信息</h2>
      <el-form ref="dataForm" :model="dataForm" :rules="rules" hide-required-asterisk>
        <el-row type="flex" class="row-bg" justify="space-around">
          <el-col>
            <el-form-item label="分类名称" label-width="100px" prop="name">
              <el-input v-model="dataForm.name" style="width: auto" />
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="英文名称" label-width="100px" prop="english_name">
              <el-input v-model="dataForm.english_name" style="width: auto" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
          <el-col>
            <el-form-item label="分类描述" label-width="100px" prop="description">
              <el-input v-model="dataForm.description" type="textarea" :autosize="{ minRows:2,maxRows:5 }" style="width: 600px" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script>

import { isChinese, isEnglish } from '@/utils/fieldValidate'
import { createSoftwareCategoryInfo } from '@/api/laboratory_1/software-category'
export default {
  name: 'category-create',
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
        description: [
          { required: true, type: 'string', message: '请输入', trigger: 'blur' }
        ]
      },
      dataForm: {
        name: '',
        english_name: '',
        description: ''
      }
    }
  },
  methods: {
    /**
      * @method：submitCreate
      * @desc：提交表单
      * @params: formName 表单名称
      * @create date： 2020/6/19
      * @update date： 2020/7/13
      * @author：李国烨
     */
    submitCreate(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 调用接口
          createSoftwareCategoryInfo(this.dataForm).then(res => {
            this.$message({
              message: '添加成功!',
              type: 'success'
            })
            this.$router.go(-1)
          }).catch(err => {
            this.$message({
              message: '添加失败!' + err,
              type: 'error'
            })
          })
        } else {
          this.$message({
            message: '添加失败!请注意您输入的内容',
            type: 'error'
          })
          console.log('error submit!!')
          return false
        }
      })
    },
    /**
      * @method：handleReturn
      * @desc：返回上一页
      * @params:
      * @create date： 2020/6/19
      * @update date： 2020/7/13
      * @author：李国烨
     */
    handleReturn() {
      this.$router.go(-1)
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
