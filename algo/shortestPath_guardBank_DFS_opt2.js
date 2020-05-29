// shortest distance guard bank
// Find shortest distance from each position of a 2D matrix to a door (without crossing a wall)
// -1 is wall, -2 door and 0 are positions that need to be measured, each horizontal or vertical hop is counted as 1, no diagonal hops.

/*
var matrix = [
[ 0,  0, -1, -2],
[-2,  0,  0,  0]
];
*/
var matrix = [
[-1, -1, -1, -1, -2, -1],
[-1,  0,  0,  0,  0, -1],
[-1,  0,  0,  0,  0, -1],
[-1,  0,  0,  0,  0,  0],
[-1, -1, -2, -1, -1, -1]
]; // 16 mods, 47 navs
/*
var matrix = [
[  0,  0,  0,  0,  0,  0],
[  0,  0,  0,  0,  0,  0],
[  0,  0,  0,  0,  0,  0],
[  0,  0,  0,  0,  0,  0],
[  0,  0,  0,  0,  0, -2]
]; // 29 mods, 49 navs
var matrix = [
[ -2,  0,  0,  0,  0,  0],
[  0,  0,  0,  0,  0,  0],
[  0,  0,  0,  0,  0,  0],
[  0,  0,  0,  0,  0,  0],
[  0,  0,  0,  0,  0, -2]
]; // 42 mods, 78 navs
var matrix = [
[ -2,  0,  0,  0,  0, -2],
[  0,  0,  0,  0,  0,  0],
[  0,  0,  0,  0,  0,  0],
[  0,  0,  0,  0,  0,  0],
[  0,  0,  0,  0,  0, -2]
]; // 48 mods, 94 navs
var matrix = [
[ -2,  0,  0,  0,  0, -2],
[  0,  0,  0,  0,  0,  0],
[  0,  0,  0,  0,  0,  0],
[  0,  0,  0,  0,  0,  0],
[ -2,  0,  0,  0,  0, -2]
]; // 52 mods, 106 navs
/*
var matrix = [
[ 0,  0,  0],
[ 0,  0,  0],
[ 0, -2,  0],
]; // 8 mods, 12 navs


var matrix = [
[-2,  0,  0,  0, -2],
[ 0,  0,  0,  0,  0],
[ 0,  0,  0,  0,  0],
[ 0,  0,  0,  0,  0],
[-2,  0,  0,  0, -2]
]; // 38 mods, 80 navs

var matrix = [
[ 0,  0,  0,  0,  0],
[ 0,  0,  0,  0,  0],
[ 0,  0,  0,  0,  0],
[ 0,  0,  0,  0,  0],
[ 0,  0,  0,  0, -2]
]; // 24 mods, 40 navs
*/


function direction(d) {
  return {
    left:d.left,
    right:d.right,
    top:d.top,
    bottom:d.bottom
  };
}

var doors=[];
var rows=0, cols=0;

var MODIFICATIONS=0, NAVIGATIONS=0;

function init() {
  var i, j;

  // set matrix dimensions
  rows = matrix.length;
  cols = matrix[0].length;

  // find doors
  for (i=0; i<rows; i++)
    for (j=0; j<cols; j++)
      if (-2 == matrix[i][j])
        doors.push({i, j});
}

function addNeighbor(neighbors, i, j, dir) {
  const isSameIndex = (element) => (element.i==i && element.j==j);
  var id = neighbors.findIndex(isSameIndex);

  if (-1 == id) // node (i,j) not found in current neighbors
    neighbors.push( {i, j, dir} );
  else
    console.log("UNEXPECTED CONDITION #1");
}

// OPTIMIZATION: add direction if a neighbor already exists
// reduces some navigations
function addDirection(neighbors, i, j, dir) {
  const isSameIndex = (element) => (element.i==i && element.j==j);
  var id = neighbors.findIndex(isSameIndex);

  if (-1 != id) { // node (i,j) found in current neighbors
    // merge directions
    if (dir.left) neighbors[id].dir.left=true;
    if (dir.right) neighbors[id].dir.right=true;
    if (dir.top) neighbors[id].dir.top=true;
    if (dir.bottom) neighbors[id].dir.bottom=true;
  }
}

function visit(i, j, steps, neighbors, dir) {
  if (i<0 || j<0 || i>=rows || j>=cols)
    return;

  NAVIGATIONS++;
  if (matrix[i][j] == 0 || matrix[i][j]>steps) {
    //console.log("("+ MODIFICATIONS +") setting {"+ i +","+ j +"} from "+ matrix[i][j] +" to "+ steps);
    matrix[i][j] = steps;
    MODIFICATIONS++;
    addNeighbor(neighbors, i, j, new direction(dir));
  } else if (matrix[i][j]==steps) {
    addDirection(neighbors, i, j, new direction(dir))
  }
}

function visit_neighbors(nodes, steps) {
  var neighbors=[];
  var node;
  //console.log("visit_neighbors", nodes, ", steps="+ steps);

  while(node=nodes.pop()) {
    var i=node.i, j=node.j, dir=node.dir;
    //console.log("visit_neighbors("+ i +", "+ j +", "+ steps +",", dir);
    //console.log("@ {"+ i +","+ j +"}");
  
    if (!dir.right)
      visit(i, j-1, steps, neighbors, {left: true});        
    if (!dir.bottom)
      visit(i-1, j, steps, neighbors, {top: true});
    if (!dir.left)
      visit(i, j+1, steps, neighbors, {right: true});
    if (!dir.top)
      visit(i+1, j, steps, neighbors, {bottom: true});

    //console.log("neighbors=", neighbors);
  }
  //console.log("MODIFICATIONS="+ MODIFICATIONS +", NAVIGATIONS="+ NAVIGATIONS +", matrix=", matrix, "neighbors=", neighbors);

  if (neighbors.length>0)
    visit_neighbors(neighbors, steps+1);
}

function solve() {
  init();

  var door;
  while(door = doors.pop()) {
    visit_neighbors([{i:door.i, j:door.j, dir: new direction({})}], 1);
    console.log("MODIFICATIONS="+ MODIFICATIONS +", NAVIGATIONS="+ NAVIGATIONS);
    console.log("matrix=", matrix);
  }
}

solve();
