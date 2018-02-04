<template> 
  <el-row type="flex" justify="center">
  <el-col >1</el-col>
  <calc-fraction v-for="(el,key) in elements" :key="el.id" 
  :type="el.type" 
  :operator="el.operator" 
  :numerator="el.numerator" 
  :denominator="el.denominator" 
  @change="data=>update(data,key)"
  ></calc-fraction>
  <el-col class="button">
     <el-button @click= "add">добавить</el-button></el-col>
     <el-button v-if="erOper" @click= "reCalc" type="danger">ошибка оператора</el-button>
</el-row>
</template>
<script>
import calcFraction from "./calc-fraction";
import * as fractional from "fractional";
const { Fraction: FractionRoot } = fractional;
class Fraction extends FractionRoot {
  constructor({ denominator, numerator }) {
    super(numerator, denominator);
  }
}
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
          denominator: 1,
          id: 0
        },
        {
          type: "input",
          operator: "+",
          numerator: 2,
          denominator: 2,
          id: 1
        },
        {
          type: "result",
          operator: "=",
          numerator: 1,
          denominator: 2,
          id: 2
        }
      ],
      erOper: false
    };
  },
  methods: {
    update(data, key) {
      let element = this.elements[key];
      this.$set(element, data.prop, data.value);
      this.reCalc();
    },
    reCalc() {
      this.erOper = false;
      let elements = [...this.elements];
      elements.push(123123);
      let inputs = this.elements.filter(element => element.type == "input");
      let result;
      try {
        result = this.calc(inputs);
      } catch (err) {
        this.erOper = true;
        result = {
          errror: err
        };
      }
      let resultElement = this.elements.find(
        element => element.type == "result"
      );
      this.$set(resultElement, Object.assign(resultElement, result));
    },
    calc(inputs) {
      let BeforeCalc = inputs.reduce((result, element) => {
        if (element.operator == "*" || element.operator == "/") {
          let prevElement = result.pop();
          let { operator: prevOperator, type } = prevElement;
          let method = this.operatorToMethod(element.operator);
          if (method == false) {
            throw "error operator";
          }
          let fraction = new Fraction(prevElement)[method](
            new Fraction(element)
          );
          fraction.operator = prevOperator;
          fraction.type = type;
          result.push(fraction);
          return result;
        }
        result.push(element);
        return result;
      }, []);
      return BeforeCalc.reduce((result, element) => {
        if (result == false) {
          return new Fraction(element);
        }
        let method = this.operatorToMethod(element.operator);
        if (method == false) {
          throw "error operator";
        }
        return result[method](new Fraction(element));
      }, false);
    },
    add() {
      let index = this.elements.findIndex(el => el.type == "result");
      let element = {
        type: "input",
        operator: "+",
        numerator: 2,
        denominator: 2,
        id: this.elements.length
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
        default:
          return false;
      }
    }
  }
};
</script>
