<template>
  <div class="app-container">
    <!-- 功能按钮 -->
    <div class="detail-button">
      <el-button type="primary" @click="handleReturn" size="medium">返回</el-button>
      <el-button type="primary" :disabled="isAble" @click="beforeEdit" size="medium">编辑信息</el-button>
      <el-button type="danger" @click="beforeHandleDelete" size="medium">删除</el-button>
      <el-button type="success" @click="handleDownload" size="medium">导出信息</el-button>
      <el-button type="primary" @click="handleEquipmentDetail" size="medium">查看器材</el-button>
      <el-button type="primary" @click="handleFacilityDetail" size="medium">查看设施</el-button>
    </div>
    <!-- 详细信息展示 -->
    <div class="form-style">
      <h2>实验室详细信息</h2>
      <el-form ref="dataForm" :model="dataForm" :rules="rules">
        <el-row type="flex" class="row-bg" justify="space-around">
          <el-col :span="8">
            <el-form-item label="实验室编号" label-width="100px" prop="number">
              <el-input v-model="dataForm.lab_num" style="width: auto" :readonly="isRead"/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="实验室名称" label-width="100px" prop="name">
              <el-input v-model="dataForm.lab_name" style="width: auto" :readonly="isRead" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="实验室分类" label-width="100px" prop="number">
              <el-select style="width: 160px;" placeholder="实验室分类" filterable clearable @change="handleFilter">
                <!--获取数据库信息动态生成option-->
                <!--
                <el-option v-for="item in CategoryList" :key=item.id :label="item.name" :value="item.id" >
                  <span style="float: left">编号:{{ item.id }}</span>
                  <span style="float: right; color: #8492a6; font-size: 12px">名称:{{ item.name }}</span>
                </el-option>
                -->
                <el-option key="1" label="类别1" value="1" />
                <el-option key="0" label="类别2" value="0" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
          <el-col :span="8">
            <el-form-item label="负责人" label-width="100px" prop="name">
              <el-select style="width: 160px;" placeholder="负责人" filterable clearable @change="handleFilter">
                <!--获取数据库信息动态生成option-->
                <!--
                <el-option v-for="item in CategoryList" :key=item.id :label="item.name" :value="item.id" >
                  <span style="float: left">编号:{{ item.id }}</span>
                  <span style="float: right; color: #8492a6; font-size: 12px">名称:{{ item.name }}</span>
                </el-option>
                -->
                <el-option key="1" label="类别1" value="1" />
                <el-option key="0" label="类别2" value="0" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="楼层" label-width="100px" prop="number">
              <el-input v-model="dataForm.lab_building" style="width: auto" :readonly="isRead" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="房间编号" label-width="100px" prop="name">
              <el-input v-model="dataForm.lab_room" style="width: auto" :readonly="isRead" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
          <el-col :span="8">
            <el-form-item label="联系电话" label-width="100px" prop="number">
              <el-input v-model="dataForm.lab_telephone" style="width: auto" :readonly="isRead" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="描述" label-width="100px" prop="name">
              <el-input v-model="dataForm.lab_description" style="width: auto" :readonly="isRead" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="最大机位数" label-width="100px" prop="name">
              <el-input v-model="dataForm.equipment_max" style="width: auto" :readonly="isRead" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
          <el-col :span="8">
            <el-form-item label="可用设备数" label-width="100px" prop="number">
              <el-input v-model="dataForm.equipment_num" style="width: auto" :readonly="isRead" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="可容纳人数" label-width="100px" prop="number">
              <el-input v-model="dataForm.lab_capacity" style="width: auto" :readonly="isRead" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="场地类型" label-width="100px" prop="name">
              <el-input v-model="dataForm.lab_style" style="width: auto" :readonly="isRead" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
          <el-col :span="8">
            <el-form-item label="场地长度" label-width="100px" prop="number">
              <el-input v-model="dataForm.lab_long" style="width: auto" :readonly="isRead" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="场地宽度" label-width="100px" prop="name">
              <el-input v-model="dataForm.lab_width" style="width: auto" :readonly="isRead" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="场地高度" label-width="100px" prop="number">
              <el-input v-model="dataForm.lab_height" style="width: auto" :readonly="isRead" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
          <el-col>
            <el-form-item label="室内/室外" label-width="100px" prop="name">
              <el-input v-model="dataForm.lab_indoor" style="width: auto" :readonly="isRead" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <el-collapse-transition>
        <div v-show="showSaveBtn" style="text-align: center">
          <el-button type="success" @click="submitEdit('dataForm')" size="medium">保存</el-button>
          <el-button type="primary" @click="beforeCancelEdit" size="medium">取消</el-button>
        </div>
      </el-collapse-transition>
    </div>
  </div>
</template>

<script>
  // 假数据
  const fakeData = {
    id: 1,
    lab_num: 10041,
    lab_name: '实验室',
    lab_category: '分类',
    labOtherInfo: '分类',
    lab_facility_id: 1,
    lab_owner: '负责人',
    lab_building: '楼',
    lab_telephone: '13412341234',
    lab_indoor: '室内',
    lab_height: '高度',
    lab_width: '宽度',
    lab_long: '长度',
    lab_style: '类型',
    lab_capacity: '容积',
    equipment_max: '最大设备数',
    equipment_num: '当前可用设备数',
    lab_equipment_id: 1,
    lab_description: '室内',
    lab_room: 503
  }

  export default {
    name: 'field-detail',
    data() {
      return {
        dataForm: null,
        tempData: null,
        rules: {
          lab_num: [
            { type: 'number', message: '请输入数字', trigger: 'blur' }
          ],
          infoValidation: [
            { type: 'string', message: '请输入', trigger: 'blur' }
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
        this.dataForm = fakeData;
        let id = this.$route.query.id;
        console.log(id);
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
        console.log(this.tempData.lab_name)
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
            this.$message({
              message: '修改成功',
              type: 'success'
            })
            // 根据返回信息重新复制dataForm
            console.log('success submit!!')
          } else {
            console.log('error submit!!')
            return false
          }
        })
        // 修改后操作
        this.afterEdit()
      },
      /* 取消编辑操作 */
      cancelEdit() {
        this.dataForm = { ...this.tempData }
        console.log(this.tempData.lab_name)
        this.afterEdit()
      },
      /* 取消 确认弹窗 */
      beforeCancelEdit() {
        this.$confirm('修改信息还没保存, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.cancelEdit()
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
      },
      /* 跳转到设施详情 */
      handleFacilityDetail(id) {
        console.log('facility id =' + id);
        this.$router.push({
          name: 'Field_Fac_List',
          query: {
            id: id
          }
        })
      },
      /* 跳转到器材详情 */
      handleEquipmentDetail(id) {
        console.log('equipment id =' + id);
        this.$router.push({
          name: 'Field_Equip_List',
          query: {
            id: id
          }
        })
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
