// shortest distance guard bank
// Find shortest distance from each position of a 2D matrix to a door (without crossing a wall)
// -1 is wall, -2 door and 0 are positions that need to be measured, each horizontal or vertical hop is counted as 1, no diagonal hops.
//

/*
var matrix = [
[-1, -1, -1, -1, -2, -1],
[-1,  0,  0,  0,  0, -1],
[-1,  0,  0,  0,  0, -1],
[-1,  0, -1, -1,  0, -2],
[-1, -1, -1, -1, -1, -1]
]; // 22 iterations
*/

var matrix = [
[ 0,  0,  0,  0,  0,  0],
[ 0,  0,  0,  0,  0,  0],
[ 0,  0,  0,  0,  0,  0],
[ 0,  0,  0,  0,  0,  0],
[ 0,  0,  0,  0,  0, -2]
]; // 179 iterations

var doors=[];
var rows=0, cols=0;
var COUNT=0, INSIDE_COUNT=0;

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

function visit(i, j, steps) {
  if (i<0 || j<0 || i>=rows || j>=cols)
    return;

  COUNT++;
  if (matrix[i][j] == 0 || matrix[i][j]>steps) {
    INSIDE_COUNT++;
    matrix[i][j] = steps;
    visit_neighbors(i, j, 1+steps);
  }
}

function visit_neighbors(i, j, steps) {
  //console.log("visit_neighbors: ["+steps+"] :"  +i+","+j);
  visit(i-1, j, steps); //go left
  visit(i+1, j, steps); //go right
  visit(i, j-1, steps); //go up
  visit(i, j+1, steps); //go down
}

// BRUTE-FORCE ALGO: Move in all directions (vertical and horizonal) marking steps from each door
function solve() {
  init();

  var door;
  while(door = doors.pop()) {
    visit_neighbors(door.i, door.j, 1);
    console.log("INSIDE_COUNT="+ INSIDE_COUNT +", COUNT="+ COUNT);
    console.log("matrix=", matrix);
  }
}

solve();
