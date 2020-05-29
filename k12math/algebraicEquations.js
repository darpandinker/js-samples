// +5a +7b -1c  = 71
// -7a +7b +8c  = 98
// -5a +2b -6c  = -39

function getRandom() {
  return Math.floor( (Math.random()*10) +1 );
}

function getSignChar(val) {
  return val===0? '+':'-';
}

function getSign(val) {
  return val===0? 1:-1;
}

function solve(arr1, arr2, arr3) {
  var val1 = arr1[0] * arr1[1] * getSign(arr1[2]);
  var val2 = arr2[0] * arr2[1] * getSign(arr2[2]);
  var val3 = (!arr3)? 0 : arr3[0] * arr3[1] * getSign(arr3[2]);
  return val1 + val2 + val3;
}


function create_equation(a, b, c) {
  var p_a=getRandom();    // parameter
  var s_a=getRandom()%2;  // sign
  
  var p_b=getRandom();    // parameter
  var s_b=getRandom()%2;  // sign

  var p_c=getRandom();    // parameter
  var s_c=getRandom()%2;  // sign

  var str = "\nEquation to solve: \n"+ getSignChar(s_a) + p_a + 'a ' + getSignChar(s_b) + p_b + 'b ';
  (c === undefined) ? '' : str+=(getSignChar(s_c) + p_c + 'c ');
  str += ' = '; 
  str += (c === undefined) ? solve([a, p_a, s_a], [b, p_b, s_b], undefined) : solve([a, p_a, s_a], [b, p_b, s_b], [c, p_c, s_c])

  console.log(str);
  
}

function three_variable_equations() {
  var a=getRandom();
  var b=getRandom();
  var c=getRandom();

  create_equation(a, b, c);
  create_equation(a, b, c);
  create_equation(a, b, c);

  console.log("\nAnswer key: "+ 'a='+ a + ', b='+ b + ', c='+ c + '\n');
}

function two_variable_equations() {
  var a=getRandom();
  var b=getRandom();
  var c=undefined;

  create_equation(a, b, c);
  create_equation(a, b, c);

  var str = "\nAnswer key: "+ 'a='+ a + ', b='+ b + '\n';
  console.log(str);
}

three_variable_equations();
two_variable_equations();

// UNIVARIATE ALGEBRAIC EQUATION with RATIONAL NUMBERS: x + 10 = 12, x^2 + x = 12
// MULTIVARIATE ALGEBRAIC EQUATION WITH RATIONAL NUMBERS: x + y^2 + 4 = 20

