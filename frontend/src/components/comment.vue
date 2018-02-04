<template>
<div>
<el-row v-for="item in items" :key="item.message"> 
  <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1">
    {{item.message}}
    <el-button type="primary">удалить</el-button>
  </el-col>
</el-row>
</div>
</template>

<script>
export default {
  name: "comment",
  data() {
    return {
      items: [
        { message: 1 },
        { message: 2 },
        { message: 3 },
        { message: 4 },
        { message: 5 },
        { message: 6 },
        { message: 7 },
        { message: 8 },
        { message: 9 },
        { message: 10 }
      ]
    };
  }
};
</script>


<style>
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>
