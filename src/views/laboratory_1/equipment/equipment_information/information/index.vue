<template>
  <div class="app-container">
    <h2>实验室器材</h2>
    <el-table
      v-loading="listLoading"
      :data="tableData"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      @row-dblclick="handleDetail"
    >
      <el-table-column
        label="序号"
        type="index"
        width="50px"
        align="center"
      />
      <el-table-column
        label="编号"
        prop="equ_number"
      />
      <el-table-column
        label="名称"
        prop="equ_name"
      />
      <el-table-column
        label="种类"
        prop="equ_category"
      />
      <el-table-column
        label="数量"
        prop="equ_quantity"
      />
      <el-table-column
        label="负责人"
        prop="equ_owner"
      />
      <el-table-column
        label="存放地点"
        prop="equ_storage"
      />
    </el-table>
  </div>
</template>

<script>
  // 假数据
  const fakeData = {
    id: 1,
    equ_number:"器材编号",
    equ_name:"器材名称",
    equ_category:"器材种类",
    equ_quantity:"数量",
    equ_storage:"存放地点",
    equ_owner:"负责人",
    equ_userDirection:"使用方向",
    equ_unit:"单位",
    equ_unitPrice:"单价",
    equ_purchaseDate:"购置日期",
    equ_specifications:"规格",
    equ_code:"国码",
    equ_produceDate:"出产日期",
    equ_fundsSource:"经费来源",
    equ_purchaseWay:"购买方式",
    equ_keepPeriod:"保修期",
    equ_documentCode:"单据号",
    equ_supplier:"供货商",
    supplier_phone:"供货商电话",
    equ_accessories:"器材入库附件",
    equ_software:"器材配置安装软件",
  }
  //假数据列表
  const fakeDataList = [ {...fakeData},{...fakeData} ]
  export default {
    name: "LabEquipmentList",
    data(){
      return{
        listLoading:true,
        tableData:null,
      }
    },
    methods:{
      getList(){
        //fake data
        this.tableData = fakeDataList;
        this.listLoading = false;
        //根据传过来的实验室id获取对应的器材
        console.log("实验室id获取对应的器材. lab id" +this.$route.query.id);
      },
      handleDetail(row, column, event) {
        console.log('handleDetail id=' + row.id)
        this.$router.push({
          path: 'equdetail',
          query: {
            id: row.id
          }
        })
      },
    },
    created() {
      this.getList();
    }
  }
</script>

<style scoped>

</style>
