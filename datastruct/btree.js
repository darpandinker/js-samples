var root=null;

function Node(num) {
  this.val = num;
  this.left = null;
  this.right = null;
  this.count = 1;
}

function insertInto(parent, num) {
  if (parent.val < num) {
    if (parent.right)
      insertInto(parent.right, num);
    else 
      parent.right = new Node(num);
  } else if (parent.val > num) {
    if (parent.left)
      insertInto(parent.left, num);
    else 
      parent.left = new Node(num);
  } else
    parent.count++;
}

function printTree(parent) {
  if (!parent)
    return;

  if (parent.left)
    printTree(parent.left);

  console.log(parent.val+", ");

  if (parent.right)
    printTree(parent.right);
}

function insertNumbers(arr) {
  if (!arr || !Array.isArray(arr)) 
    return -1;

  
  var i;
  for(i=0; i<arr.length; i++) {
    if(!root)
      root = new Node(arr[i]);
    else
      insertInto(root, arr[i]);

    console.log("After inserting "+ arr[i] +", Root=", root);
  }

}

insertNumbers([19, 57, 59, 33, 139, 15, 10, 236, 82]);

printTree(root);


