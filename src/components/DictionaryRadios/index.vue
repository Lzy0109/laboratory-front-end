<template>
  <el-dialog :visible.sync="showBtn" width="95%" :show-close="false">
    <!-- 标题 + 搜索框 -->
    <div slot="title">
      <span class="my-dialog-title">{{title}}</span>
      <el-input v-model="fuzzySearchValue" style="width: 230px;" clearable></el-input>
      <el-button type="primary" size="medium" @click="fuzzySearch">搜索</el-button>
    </div>
    <h2 v-show="dictionaryList.length === 0" style="text-align: center">
      暂无数据
    </h2>
    <!-- 字典类数据选项 -->
    <div style="display: block">
      <el-radio-group v-model="dictionarySelectedItem" @change="handleSelect">
        <el-radio border size="medium" style="margin: 10px 20px; width: 8%"
                  :label="item.id" :key="item.id" v-for="item in dictionaryList">
          {{item.name}}
        </el-radio>
      </el-radio-group>
    </div>
    <div style="text-align: center; margin-top: 20px">
      <el-button type="primary" size="medium" @click="handleCancel">返回</el-button>
      <el-button type="primary" size="medium" @click="handleConfirm">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  export default {
    name: 'DictionaryRadios',
    data() {
      return {
        /* 模糊搜索关键字 */
        fuzzySearchValue: null,
        /* 选中的radio */
        dictionarySelectedItem: 0
      }
    },
    props: {
      /* 字典数据列表 */
      dictionaryList: Array,
      /* 对话框标题 */
      title: String,
      /* 是否显示对话框 */
      showBtn: Boolean,
    },
    methods: {
      /* 监听选择 */
      handleSelect() {
        // console.log("监听选择item的id=" + this.dictionarySelectedItem)
        this.$emit("handleSelect",this.dictionarySelectedItem)
      },
      /* 点击取消 */
      handleCancel() {
        // console.log("点击取消")
        this.$emit("handleCancel")
      },
      /* 点击确定 */
      handleConfirm() {
        // console.log("点击确定按钮")
        this.$emit("handleConfirm",this.dictionarySelectedItem)
      },
      /* 模糊搜索 */
      fuzzySearch() {
        // console.log("模糊搜索value=" + this.fuzzySearchValue)
        this.$emit("fuzzySearch",this.fuzzySearchValue)
      }
    }
  }
</script>

<style scoped>

</style>
