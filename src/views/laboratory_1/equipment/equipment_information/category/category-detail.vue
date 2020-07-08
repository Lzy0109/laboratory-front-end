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
      <h2>器材分类详细信息</h2>
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
  const fake_data =
    {
      id: 1,
      name: '器材分类名称',
      english_name: '-',
      description: '器材分类描述'
    }

  import { isChinese, isEnglish } from '@/utils/fieldValidate'
  export default {
    name: 'category-detail',
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
      /* 根据ID获取数据 */
      getOriginalData() {
        // 暂用假数据
        this.dataForm = fake_data
        const id = this.$route.query.id
        console.log(id)
        // 调用获取信息接口
      },
      /* 返回上一页 */
      handleReturn() {
        this.$router.go(-1)
      },
      /* 编辑前 */
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
      /* 编辑后 */
      afterEdit() {
        // 还原修改前所有状态
        this.tempData = null
        this.isRead = true
        this.showSaveBtn = false
        this.isAble = false
      },
      /* 提交编辑的内容 */
      submitEdit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // 调用编辑信息接口
            this.$message({
              message: '修改成功',
              type: 'success'
            })
            // 修改后操作
            this.afterEdit()
            // 根据返回信息重新复制dataForm
            console.log('success submit!!')
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
      /* 取消编辑操作 */
      cancelEdit(formName) {
        this.dataForm = { ...this.tempData }
        this.$refs[formName].clearValidate()
        this.afterEdit()
      },
      /* 取消 确认弹窗 */
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
      /* 删除 */
      handleDelete() {
        if (this.dataForm.id) {
          // 调用删除信息接口
          console.log(this.dataForm.id)
          return true
        } else {
          return false
        }
      },
      /* 删除 确认弹窗 */
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
      /* 导出 */
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
