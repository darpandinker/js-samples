var root=null;
var count=0;

function Node(num) {
  this.val = num;
  this.left = null;
  this.right = null;
}

// always returns true
function swap(node1, node2) {
  var temp = node1.val;
  node1.val = node2.val;
  node2.val = temp;
  return true;
}

function getInsertLevel() {
  return Math.floor(Math.log(count+1) / Math.log(2));
}

function balance(node, updated) {
  if (!node)
    return updated;

  if (node.left && node.left.val > node.val)
    updated = swap(node, node.left);

  if (node.right && node.right.val > node.val)
    updated = swap(node, node.right);

  updated = balance(node.left, updated);
  updated = balance(node.right, updated);

  return updated;
}

// Breadth first insert
function insertInto(insertLevel, node, nodeLevel, num) {
  //console.log("insertInto(", insertLevel,", ",node, ", ", nodeLevel, ", ", num, ")");
  if (nodeLevel==insertLevel-1) {
    if (!node.left) {
      node.left = new Node(num);
      return true;
    } else if (!node.right) {
      node.right = new Node(num);
      return true;
    }
  } else if (nodeLevel < insertLevel-1) {
    if (insertInto(insertLevel, node.left, 1+nodeLevel, num))
      return true;
    return insertInto(insertLevel, node.right, 1+nodeLevel, num);
  }
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
    if(!root) {
      root = new Node(arr[i]);
      count++;
    } else {
      if (insertInto(getInsertLevel(), root, 0, arr[i])) {
        count++;
        while (balance(root));
      }
    }

    console.log("After inserting "+ arr[i] +", Root=", root);
  }

}

//insertNumbers([19, 57, 59, 33, 139, 15, 10, 236, 82]);
insertNumbers([1, 2, 3, 4, 5, 6, 7]);
printTree(root);


