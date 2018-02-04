<template>
  <el-menu :router="true"  class="el-menu-demo" mode="horizontal" >
  <el-menu-item route="/calculator" index="1">Processing Center</el-menu-item>
 <el-menu-item  route="/comment" index="1">Processing Center</el-menu-item>

</el-menu>
</template>
<script>
export default {
  name: "start"
};
</script>
