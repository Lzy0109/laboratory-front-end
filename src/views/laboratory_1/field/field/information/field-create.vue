<template>
  <div class="app-container">
    <!-- 功能按钮 -->
    <div class="detail-button">
      <el-button type="primary" @click="handleReturn" size="medium">返回</el-button>
      <el-button type="success" @click="submitCreate('dataForm')" size="medium">创建</el-button>
    </div>
    <!-- 添加信息表单 -->
    <div class="form-style">
      <el-form ref="dataForm" :model="dataForm" :rules="rules">
        <el-row>
          <el-col :span="8">
            <el-form-item label="实验室种类" label-width="100px" prop="infoValidation">
              <el-select v-model="dataForm.lab_category_id" clearable placeholder="实验室种类">
                <el-option v-for="item in labCategoryList" :key="item.id" :label="item.name" :value="item.number">
                  <span>{{ item.name }}</span>
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="实验室名称" label-width="100px" prop="infoValidation">
              <el-input v-model="dataForm.lab_name" style="width: auto" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="实验室编号" label-width="100px" prop="infoValidation">
              <el-input v-model="dataForm.lab_num" style="width: auto" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="8">
            <el-form-item label="负责人" label-width="100px" prop="infoValidation">
              <el-select v-model="dataForm.lab_owner" clearable placeholder="负责人">
                <el-option v-for="item in labOwnerList" :key="item.id" :label="item.name" :value="item.number">
                  <span>{{ item.name }}</span>
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="可用设备数" label-width="100px" prop="infoValidation">
              <el-input v-model="dataForm.lab_equ_use" style="width: auto" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="最大机位数" label-width="100px" prop="infoValidation">
              <el-input v-model="dataForm.lab_equ_max" style="width: auto" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <!-- 场地 -->
          <el-col :span="8">
            <el-form-item label="场地" label-width="100px" prop="infoValidation">
              <el-select v-model="dataForm.lab_field_number" placeholder="场地" clearable @change="showFieldData(dataForm.lab_field_number)">
                <el-option v-for="item in fieldList" :key="item.id" :label="item.name" :value="item.number">
                  <span>{{ item.name }}</span>
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="楼栋" label-width="100px" prop="infoValidation">
              <el-input v-model="dataForm.lab_building" readonly style="width: auto" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="房号" label-width="100px" prop="infoValidation">
              <el-input v-model="dataForm.lab_room" readonly style="width: auto" />
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 场地内容 -->
        <el-row>
          <el-col :span="8">
            <el-form-item label="场地长度" label-width="100px" prop="infoValidation">
              <el-input v-model="dataForm.lab_long" readonly style="width: auto" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="场地宽度" label-width="100px" prop="infoValidation">
              <el-input v-model="dataForm.lab_width" readonly style="width: auto" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="场地高度" label-width="100px" prop="infoValidation">
              <el-input v-model="dataForm.lab_height" readonly style="width: auto" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="场地类型" label-width="100px" prop="infoValidation">
              <el-input v-model="dataForm.lab_field_type" readonly style="width: auto" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="室内/室外" label-width="100px" prop="infoValidation">
              <el-input v-model="dataForm.lab_isIndoor" readonly style="width: auto" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="实验室描述" label-width="100px" prop="infoValidation" style="width: 91.8%">
              <el-input
                v-model="dataForm.lab_description"
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4}"
                placeholder="请输入内容"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>

  </div>
</template>

<script>
  const fake_fieldList = [
    {
      id: 1,
      name: '场地1',
      number: 'CD01',
      building_id: '1',
      room_id: '1',
      long: '10',
      width: '10',
      height: '10',
      isIndoor: '室外',
      type: '类型1'
    },
    {
      id: 2,
      name: '场地2',
      number: 'CD02',
      building_id: '2',
      room_id: '2',
      long: '20',
      width: '20',
      height: '20',
      isIndoor: '室外',
      type: '类型2'
    },
    {
      id: 3,
      name: '场地3',
      number: 'CD03',
      building_id: '3',
      room_id: '3',
      long: '30',
      width: '30',
      height: '30',
      isIndoor: '室外',
      type: '类型3'
    }
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
  // 存储要改变的key
  const keyList = []

  export default {
    name: 'field-create',
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
          lab_isIndoor: '',
          lab_height: '',
          lab_width: '',
          lab_long: '',
          lab_field_type: '',
          lab_building: '',
          lab_room: '',
          lab_field_number: '',
          lab_category_id: '',
          lab_num: '',
          lab_name: '',
          lab_owner_id: '',
          lab_description: '',
          lab_equ_use: '',
          lab_equ_max: ''
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
      showFieldData(number) {
        console.log('number=' + number)
        if (!number) {
          for (const key in keyList) {
            if (!keyList.hasOwnProperty(key)) continue
            this.dataForm[keyList[key]] = ''
          }
        }
        const temp = fake_fieldList.filter(m => m.number === number).map(m => ({
          lab_field_number: m.number,
          lab_isIndoor: m.isIndoor,
          lab_height: m.height,
          lab_width: m.width,
          lab_long: m.long,
          lab_field_type: m.type,
          lab_building: m.building_id,
          lab_room: m.room_id
        })).pop()
        for (const key in temp) {
          this.dataForm[key] = temp[key]
          keyList.push(key)
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
</style>
