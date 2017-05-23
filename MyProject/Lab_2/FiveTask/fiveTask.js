/**
 * Created by zena on 23.05.17.
 */
var calculator = {
  read: function () {
    this.firstOperand = +prompt("Введите первое слагаемое", "");
    this.secondOperand = +prompt("Введите второе слагаемое", "");
  },

  sum: function () {
    result = this.firstOperand + this.secondOperand;
  },

  mul: function () {
    result = this.firstOperand * this.secondOperand;
  },
    
  div: function () {
    result = this.firstOperand / this.secondOperand;
  },
    
  sub: function () {
    result = this.firstOperand - this.secondOperand;
  },
    
  getResult: function () {
    return alert(result);
  }
};

calculator.read();
calculator.mul();
calculator.getResult();