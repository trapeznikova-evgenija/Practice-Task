/**
 * Created by zena on 23.05.17.
 */
function Calculator() {

  this.read = function () {
    this.firstOperand = +prompt("Введите первое слагаемое", "");
    this.secondOperand = +prompt("Введите второе слагаемое", "");
  };

  this.sum = function () {
    result = this.firstOperand + this.secondOperand;
  };

  this.mul = function () {
    result = this.firstOperand * this.secondOperand;
  };

  this.div = function () {
    if (this.secondOperand != 0) {
      result = this.firstOperand / this.secondOperand;
    } else {
      alert("Математически неправильная операция!");
    }
  };

  this.sub = function () {
    result = this.firstOperand - this.secondOperand;
  };

  this.getResult = function () {
    return alert(result);
  };

}

var calculator = new Calculator();
calculator.read();
calculator.div();
calculator.getResult();