import { hideString, makeXwd } from "./utils";


function nextCell( loc, steps ) {

	steps = steps || 1;
	switch ( Math.abs( loc.dir ) ) {
		case  1:                   loc.col += steps; break; //Horizontal
		case  2: loc.row += steps;                   break; //Vertical
		case  3: loc.row += steps; loc.col += steps; break; //Diagonal Left to Right
		case  4: loc.row += steps; loc.col -= steps; break; //Diagonal Right to Left

		default :
			throw "INVALID direction " + loc.dir;
	}
	return loc;
}

function xwdSearch( xwd, search, i, j, options ) {
	const totRows = xwd.length;
	const totCols = xwd[ 0 ].length;

	if ( i >= totRows || j >= totCols || i < 0 || j < 0 ) { return; }

	options = options || {};
	options.visits = options.visits || makeXwd( totRows, totCols, [ 0 ] );
	options.expectations = options.expectations || [];

	options.visits[ i ][ j ]++;
	let expect = options.expectations;

	const ch = xwd[ i ][ j ];

	{
		// Process all Expectations for current cell
		// This is a linear search. Can be optimized but its usually a small list
		for ( let k = 0; k < expect.length; k++ ) {
			let e = expect[ k ];
			if ( e.row === i && e.col === j ) { //Match current node

				if ( ch === search[ e.sIdx ] ) {
					//console.log( "matched expectation ", e );

					if ( e.sIdx === search.length - 1 || e.sIdx === 0 ) {
						// FOUND search string. Entire Search string matched

						const cur = { row: i, col: j };
						const other = nextCell( e, 0 - ( search.length - 1 ) );
						delete other.dir; delete other.sIdx;

						return { start: e.dir > 0 ? other : cur, end: e.dir > 0 ? cur : other };
					}

					//Update Expectation for next char match in string
					//Based on direction set expected cell
					nextCell( e, 1 );
					e.sIdx += e.dir > 0 ? 1 : -1;
				} else {

					// current cell doesnt matched expectation
					// Mark for removal of Remove failed Expectation
					e.remove = true;
				}
			}
		}
	}

	{
		//Check if this cell matches 1st/last character of search
		//if it does, then create expectations for neighboring cells encountered in future
		if ( search.length === 1 &&  ch === search[ 0 ] ) {
			//Simple case
			return { start: { row: i, col: j }, end: { row: i, col: j } };
		}

		if ( search.length > 1 && ch === search[ 0 ] ) {
			//FORWARD CASE. matched 1st char of search string
			if ( totCols - j >= search.length ) {
				expect.push( nextCell( { row: i, col: j, dir: 1, sIdx: 1 }, 1 ) ); // 1 Right
			}
			if ( totRows - i >= search.length ) {
				expect.push( nextCell( { row: i, col: j, dir: 2, sIdx: 1 }, 1 ) ); // 1 Down
			}
			if ( totCols - j >= search.length && totRows - i >= search.length ) {
				expect.push( nextCell( { row: i, col: j, dir: 3, sIdx: 1 }, 1 ) ); // 1 Diag Down Right
			}
			if ( j >= ( search.length - 1 ) && totRows - i >= search.length ) {
				expect.push( nextCell( { row: i, col: j, dir: 4, sIdx: 1 }, 1 ) ); // 1 Diag Down left
			}
		}

		if ( search.length > 1 && ch === search[ search.length - 1 ] ) {
			//REVERSE CASE. matched last char of search string
			if ( totCols - j >= search.length ) {
				expect.push( nextCell( { row: i, col: j, dir: -1, sIdx: search.length - 2 }, 1 ) ); // Right
			}
			if ( totRows - i >= search.length ) {
				expect.push( nextCell( { row: i, col: j, dir: -2, sIdx: search.length - 2 }, 1 ) ); // Down
			}
			if ( totCols - j >= search.length && totRows - i >= search.length ) {
				expect.push( nextCell( { row: i, col: j, dir: -3, sIdx: search.length - 2 }, 1 ) ); // Diag Down Right
			}
			if ( j >= ( search.length - 1 ) && totRows - i >= search.length ) {
				expect.push( nextCell( { row: i, col: j, dir: -4, sIdx: search.length - 2 }, 1 ) ); // Diag Down left
			}
		}

	}

	//Visit next node to right or 1st node on next row
	options.expectations = expect.filter( e => e.remove === undefined );
	let nextCol = ( j + 1 ) % totCols;
	let nextRow = nextCol > 0 ? i : i + 1;
	return xwdSearch( xwd, search, nextRow, nextCol, options );
}


const alpha = "qwertyuiopasdfghjklzxcvbnm";
let xwd = makeXwd( 10, 10, alpha.split( "" ) );
let search = "othello".split( "" );
console.log( "Search String=" + search );

hideString( xwd, search );
console.log( xwd );

let options = {};
let found = xwdSearch( xwd, search, 0, 0, options );
console.log( "FOUND =", found );
console.log( options );
