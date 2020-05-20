/* Permutation of abc = abc, acb, bca, cba, bac, cab
*/

let count=0;
///this is a comment

function perm(str, prefix) {
  let i=0;

  console.log("["+count+"] "+ str +", "+ prefix);
  if (str.length == 0) {
    console.log("RESULT="+prefix);
  } else {
    for (i=0; i<str.length; i++) {
      count++;
      var rem = str.substring(0, i) + str.substring(i+1);
      perm(rem, prefix + str.charAt(i));
    }
  }
}

perm("abc", "");
console.log("count="+ count);
