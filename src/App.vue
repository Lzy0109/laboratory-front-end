<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  .el-table th.gutter{
    display: table-cell !important;
  }
  .el-table__row {
    cursor: pointer;
  }
</style>
