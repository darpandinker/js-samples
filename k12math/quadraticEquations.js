// 3 x^2 + 4x - 3 = 12



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
  var val1 = arr1[0] * arr1[0] * arr1[1] * getSign(arr1[2]);
  var val2 = arr2[0] * arr2[1] * getSign(arr2[2]);
  var val3 = (!arr3)? 0 : arr3[1] * getSign(arr3[2]);
  return val1 + val2 + val3;
}

// EXAMPLE: 3 x^2 + 4x - 3 = 12
function create_equation(x) {
  var p_a=getRandom();    // parameter
  var s_a=getRandom()%2;  // sign
  
  var p_b=getRandom();    // parameter
  var s_b=getRandom()%2;  // sign

  var p_c=getRandom();    // parameter
  var s_c=getRandom()%2;  // sign

  var str = "\nEquation to solve: \n"+ getSignChar(s_a) + p_a + 'x^2 ' + getSignChar(s_b) + p_b + 'x ';
  (p_c === undefined) ? '' : str+=(getSignChar(s_c) + p_c);
  str += ' = '; 
  str += (p_c === undefined) ? solve([x, p_a, s_a], [x, p_b, s_b], undefined) : solve([x, p_a, s_a], [x, p_b, s_b], [x, p_c, s_c])

  console.log(str);
  
}



function quadratic_equations() {
  var x=getRandom();

  create_equation(x);
  create_equation(x);

  var str = "\nAnswer key: "+ 'x='+ x + '\n';
  console.log(str);
}

quadratic_equations();

// UNIVARIATE ALGEBRAIC EQUATION with RATIONAL NUMBERS: x + 10 = 12, x^2 + x = 12
// MULTIVARIATE ALGEBRAIC EQUATION WITH RATIONAL NUMBERS: x + y^2 + 4 = 20

