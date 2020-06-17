<template>
  <div style="padding:30px;">
    <el-alert :closable="false" title="dispatch" type="success">
      <router-view />
    </el-alert>
  </div>
</template>
