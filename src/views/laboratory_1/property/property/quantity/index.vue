<template>
  <div style="padding:30px;">
    <el-alert :closable="false" title="quantity" type="success">
      <router-view />
    </el-alert>
  </div>
</template>
