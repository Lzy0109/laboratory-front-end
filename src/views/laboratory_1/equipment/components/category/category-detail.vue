<!--
    @Author 李国烨
    @Date 2020/6/22 10:30
    @Description: 零部件分类信息详情页面
    @Version 1.0
-->
<template>
  <div class="app-container">
    <!-- 功能按钮 -->
    <div class="detail-button">
      <el-button type="primary" size="medium" @click="handleReturn">返回</el-button>
      <el-button type="primary" :disabled="isAble" size="medium" @click="beforeEdit">编辑信息</el-button>
      <el-button type="danger" size="medium" @click="beforeHandleDelete">删除</el-button>
      <el-button type="success" size="medium" @click="handleDownload">导出信息</el-button>
    </div>
    <!-- 详细信息展示 -->
    <div class="form-style">
      <h2>零部件分类详细信息</h2>
      <el-form ref="dataForm" :model="dataForm" :rules="rules" hide-required-asterisk>
        <el-row type="flex" class="row-bg" justify="space-around">
          <el-col>
            <el-form-item label="分类名称" label-width="100px" prop="name">
              <span v-show="isRead">{{ dataForm.name }}</span>
              <el-input v-show="!isRead" v-model="dataForm.name" style="width: auto" :readonly="isRead" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
          <el-col>
            <el-form-item label="英文名称" label-width="100px" prop="english_name">
              <span v-show="isRead">{{ dataForm.english_name }}</span>
              <el-input v-show="!isRead" v-model="dataForm.english_name" style="width: auto" :readonly="isRead" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
          <el-col>
            <el-form-item label="分类描述" label-width="100px" prop="description">
              <span v-show="isRead">{{ dataForm.description }}</span>
              <el-input v-show="!isRead" v-model="dataForm.description" type="textarea" :autosize="{ minRows:2,maxRows:5 }" style="width: 600px" :readonly="isRead" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-collapse-transition>
        <div v-show="showSaveBtn" style="text-align: center">
          <el-button type="success" size="medium" @click="submitEdit('dataForm')">保存</el-button>
          <el-button type="primary" size="medium" @click="beforeCancelEdit('dataForm')">取消</el-button>
        </div>
      </el-collapse-transition>
    </div>
  </div>
</template>

<script>
  import { isChinese, isEnglish } from '@/utils/fieldValidate'
  import {
    deleteComponentsCategoryById,
    fetchComponentsCategoryInfoById,
    modifyComponentsCategoryInfo
  } from '@/api/laboratory_1/equ-components-category'
  export default {
    name: 'CategoryDetail',
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
        isRead: true,
        isAble: false,
        showSaveBtn: false
      }
    },
    created() {
      this.getOriginalData()
    },
    methods: {
      /** 根据ID获取数据 **/
      getOriginalData() {
        const id = this.$route.query.id
        console.log(id)
        // 调用获取信息接口
        fetchComponentsCategoryInfoById(id).then(res => {
          this.dataForm = res.data.item;
        }).catch(err => {
          alert('获取信息失败')
        })
      },
      /** 返回上一页 **/
      handleReturn() {
        this.$router.go(-1)
      },
      /*** 编辑前 **/
      beforeEdit() {
        this.showSaveBtn = !this.showSaveBtn
        this.tempData = { ...this.dataForm }; // 保存修改前数据
        this.isRead = false; // 使input为非readonly
        this.showSaveBtn = true; // 显示保存信息按钮
        this.isAble = true; // 设为不可用,防止暂存数据出错
      },
      /*** 编辑后 还原修改前所有状态**/
      afterEdit() {
        this.tempData = null
        this.isRead = true
        this.showSaveBtn = false
        this.isAble = false
      },
      /*** 提交编辑的内容 **/
      submitEdit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            modifyComponentsCategoryInfo(this.dataForm).then(res => {
              this.$message({
                message: '修改成功',
                type: 'success'
              })
              this.afterEdit()
            }).catch(err => {
              this.$message({
                message: '修改失败',
                type: 'error'
              })
            })
          } else {
            this.$message({
              message: '修改失败！请注意输入内容',
              type: 'error'
            })
            console.log('error submit!!')
            return false
          }
        })
      },
      /*** 取消编辑操作 **/
      cancelEdit(formName) {
        this.dataForm = { ...this.tempData }
        this.$refs[formName].clearValidate()
        this.afterEdit()
      },
      /*** 取消 确认弹窗 **/
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
      /*** 删除 **/
      async handleDelete() {
        await deleteComponentsCategoryById(this.dataForm.id).then(res => {
          return true
        }).catch(err => {
          return false
        })
      },
      /** 删除 确认弹窗 **/
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
      /** 导出 **/
      handleDownload() {
        console.log('导出')
      }
    }
  }
</script>

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
