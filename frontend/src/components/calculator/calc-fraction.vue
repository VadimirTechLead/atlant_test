<template>
  <div>  
    <el-col  v-if="operatorInput!==false" :span="3">
      <el-row :gutter="60">
      <el-input @input="input('operator')" pattern="^1"  v-if="type=='input'" placeholder="Please input" v-model="operatorInput"></el-input>
      <div v-else>=</div>
      </el-row>
    </el-col>
    <el-col :span="3">
      <el-row :gutter="20">
        <el-input-number v-if="type=='input'" :controls=false @input="input('numerator')"  placeholder="Please input" v-model="numeratorInput"></el-input-number>
        <div class="static" v-else v-text="numerator" ></div>
        </el-row>
        <el-row :gutter="20">
          <el-input-number  v-if="type=='input'" :controls=false  @input="input('denominator')"  placeholder="Please input" v-model="denominatorInput"></el-input-number>
        <div  class="static" v-else v-text="denominator"></div>
        </el-row>
   </el-col>
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
    },
    type: {
      type: String,
      default: "input"
    },
    operator: {
      type: [String, Boolean]
    }
  },
  data() {
    return {
      numeratorInput: this.numerator,
      denominatorInput: this.denominator,
      operatorInput: this.operator
    };
  },
  mounted() {},
  methods: {
    input(prop) {
      this.$emit("change", {
        operator: this.operatorInput,
        numerator: this.numeratorInput,
        denominator: this.denominatorInput,
        prop,
        value: this[prop + "Input"]
      });
    }
  }
};
</script>
