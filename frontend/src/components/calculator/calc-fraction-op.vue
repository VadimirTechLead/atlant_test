<template>
  <div>
    <el-row :gutter="20">
<el-input placeholder="Please input" v-model="numeratorInput"></el-input>
</el-row>
    <el-row :gutter="20">
<el-input  placeholder="Please input" v-model="denominatorInput"></el-input>
</el-row>
  </div>
</template>
<script>
export default {
  name: "calc-fraction",
  props: {
    numerator: {
      type: Number,
      default: 0
    },
    denominator: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      numeratorInput: this.numerator,
      denominatorInput: this.denominator
    };
  }
};
</script>
