<template> 
  <el-row type="flex" justify="center">
  <el-col >1</el-col>
  <calc-fraction v-for="(el,key) in elements" :key="key" 
  :type="el.type" 
  :operator="el.operator" 
  :numerator="el.numerator" 
  :denominator="el.denominator" 
  @change="data=>update(data,key)"
  ></calc-fraction>
  <el-col >
     <el-button @click= "add">добавить</el-button></el-col>
   
</el-row>
</template>
<script>
import calcFraction from "./calc-fraction";
import * as fractional from "fractional";
const { Fraction } = fractional;
export default {
  name: "calculator",
  components: {
    calcFraction
  },
  data() {
    return {
      elements: [
        {
          type: "input",
          operator: false,
          numerator: 1,
          denominator: 1
        },
        {
          type: "input",
          operator: "+",
          numerator: 2,
          denominator: 2
        },
        {
          type: "result",
          operator: "=",
          numerator: 1,
          denominator: 2
        }
      ]
    };
  },
  methods: {
    update(data, key) {
      let element = this.elements[key];

      this.$set(element, data.prop, data.value);
      this.reCalc();
    },
    reCalc() {
      let result = this.elements.reduce((result, el) => {
        console.log(el);
        let { numerator, denominator } = el;
        if (result == false) {
          return new Fraction(numerator, denominator);
        }
        let method = this.operatorToMethod(el.operator);
        if (!method) {
          return result;
        }
        return result[method](new Fraction(numerator, denominator));
      }, false);
      let resultElement = this.elements.find(el => el.type == "result");
      // Object.assign(resultElement, result);
      this.$set(resultElement, Object.assign(resultElement, result));
      console.log(result, resultElement);
    },
    add() {
      let index = this.elements.findIndex(el => el.type == "result");
      let element = {
        type: "input",
        operator: "+",
        numerator: 2,
        denominator: 2
      };
      this.elements.splice(index - 1, 0, element);
    },
    operatorToMethod(operator) {
      switch (operator) {
        case "*":
          return "multiply";

        case "/":
          return "divide";

        case "+":
          return "add";

        case "-":
          return "subtract";
      }
    }
  }
};
</script>
