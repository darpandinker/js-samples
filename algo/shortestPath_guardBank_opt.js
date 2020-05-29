// shortest distance guard bank
// Find shortest distance from each position of a 2D matrix to a door (without crossing a wall)
// -1 is wall, -2 door and 0 are positions that need to be measured, each horizontal or vertical hop is counted as 1, no diagonal hops.


/*
var matrix = [
[-1, -1, -1, -1, -2, -1],
[-1,  0,  0,  0,  0, -1],
[-1,  0,  0,  0,  0, -1],
[-1,  0,  0,  0,  0, -2],
[-1, -1, -1, -1, -1, -1]
]; // 22 mods, 94 navs
*/
var matrix = [
[ 0,  0,  0,  0,  0,  0],
[ 0,  0,  0,  0,  0,  0],
[ 0,  0,  0,  0,  0,  0],
[ 0,  0,  0,  0,  0,  0],
[ 0,  0,  0,  0,  0, -2]
]; // 89 mods, 294 navs
/*
var matrix = [
[ 0,  0,  0],
[ 0,  0,  0],
[ 0,  0, -2],
];

var matrix = [
[ 0,  0,  0,  0],
[ 0,  0,  0,  0],
[ 0,  0,  0,  0],
[ 0,  0,  0, -2]
];*/

const LEFT=4, RIGHT=6, UP=8, DOWN=2;

var doors=[];
var rows=0, cols=0;
var NAVIGATIONS=0, MODIFICATIONS=0;

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

// CHANGES: return true iff marked with steps, otherwise stops traversal
// false if value is -1, -2 or current value is smaller than new steps
function visit(i, j, steps) {
  if (i<0 || j<0 || i>=rows || j>=cols)
    return false;

  NAVIGATIONS++;
  if (matrix[i][j] == 0 || matrix[i][j]>steps) {
    //console.log("("+ MODIFICATIONS +") setting {"+ i +","+ j +"} from "+ matrix[i][j] +" to "+ steps);
    MODIFICATIONS++;
    matrix[i][j] = steps;
    return true;
  }

  return false;
}

function visit_neighbors(i, j, steps) {
  var cango = {};

  // MARK NAVIGABLE NEIGHBORS FIRST
  // IMPROVES CERTAIN CASES BY MARKING LOWEST STEPS FIRST AROUND AN ELEMENT BEFORE VISITING ONE OF THEM
  cango.LEFT=visit(i-1, j, steps);
  cango.RIGHT=visit(i+1, j, steps); 
  cango.UP=visit(i, j-1, steps);
  cango.DOWN=visit(i, j+1, steps);
  
  // VISIT NEIGHBORS IF NAVIGATABLE (Can Go)    
  if (cango.LEFT)  
    visit_neighbors(i-1, j, 1+steps, LEFT);
  if (cango.RIGHT)
    visit_neighbors(i+1, j, 1+steps, RIGHT);
  if (cango.UP)
    visit_neighbors(i, j-1, 1+steps, UP);
  if (cango.DOWN)
    visit_neighbors(i, j+1, 1+steps, DOWN);
}

function solve() {
  init();

  var door;
  while(door = doors.pop()) {
    visit_neighbors(door.i, door.j, 1);
    console.log("MODIFICATIONS="+ MODIFICATIONS +", NAVIGATIONS="+ NAVIGATIONS);
    console.log("matrix=", matrix);
  }
}

solve();

