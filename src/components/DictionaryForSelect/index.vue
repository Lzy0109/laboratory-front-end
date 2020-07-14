<!--
    @Author 李国烨
    @Date 2020/7/10 11:22
    @Description: 自定义组件：用于显示radio选项以及筛选radio功能组件
    @Version 1.0
-->
<template>
  <div>
    <el-dialog
      :visible.sync="currentDialogVisible"
      width="90%"
      :close-on-click-modal="false"
      :show-close="false"
    >
      <!-- 标题 + 搜索框 -->
      <div slot="title">
        <span class="my-dialog-title">{{ title }}</span>
        <el-input v-model="queryKeyword" placeholder="根据输入进行筛选" style="width: 230px;" clearable />
        <el-button type="primary" size="medium" @click="handleQuery">筛选</el-button>
      </div>
      <h2 v-show="currentList.length === 0" style="text-align: center">
        暂无数据
      </h2>
      <div style="margin:0 49px 0 49px;display: block">
        <el-radio-group v-model="currentItem">
          <el-radio v-for="item in currentList" :key="item.id" :label="item.id" border size="medium" style="margin: 10px 20px; width: 150px">{{ item.name }}</el-radio>
        </el-radio-group>
      </div>
      <div style="text-align: center; margin-top: 20px">
        <!-- 取消操作 -->
        <el-button type="primary" size="medium" @click="handleCancel">返 回</el-button>
        <!-- 选钟操作 根据选择的id更新到name -->
        <el-button type="primary" size="medium" @click="handleSelect">选 中</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'index',
    props: {
      // 打开dialog的值
      currentDialogVisible: Boolean,
      // 传入的list
      currentList: {
        Array
      },
      // 已选择值
      currentSelectedItem: {
        type: Number,
        default: null
      },
      // dialog标题
      title: String,
      // 当前信息
      listName: String,
      idKey: String,
      methodKey: String,
      dialogVisibleKey: String
    },
    data: function() {
      return {
        queryKeyword: null,
        currentItem: this.currentSelectedItem,
        newCurrentList: this.currentList
      }
    },
    created() {
      console.log('create currentItem=' + this.currentItem)
      console.log('create currentSelectedItem=' + this.currentSelectedItem)
      console.log('create currentList=' + this.currentList)
    },
    methods: {
      /** 发送取消事件 **/
      handleCancel() {
        this.$emit('handleCancel')
      },
      /** 发送筛选事件 **/
      handleQuery() {
        console.log('this.queryKeyword = ' + this.queryKeyword)
        let data = {
          queryKeyword: this.queryKeyword,
          listName: this.listName
        }
          this.$emit('handleQuery', data)
      },
      /** 发送选择事件 **/
      handleSelect() {
        if (this.currentList.length === 0 || this.currentItem === null){
          this.$message({
            message: '尚未选择',
            type: 'error'
          })
          console.log('尚未选择')
        } else {
          console.log('this.currentSelectedItem = ' + this.currentItem)
          let data = {
            select_id_key: this.idKey,
            select_id_value: this.currentItem,
            methodKey: this.methodKey,
            dataList: this.currentList,
            dialogVisibleKey: this.dialogVisibleKey
          }
          console.log('data=' , data)
          this.$emit('handleSelect',data)
        }
      }
    }
  }
</script>

<style scoped>

</style>
