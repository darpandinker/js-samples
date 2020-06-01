import { hideString, makeXwd } from "./utils";


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
			if ( e.r === i && e.c === j ) {

				if ( ch === search[ e.s ] ) {
					//console.log( "matched expectation ", e );
					if ( e.d > 0 && e.s === search.length - 1 ) {
						// Forward Search. Last char. Entire Search string matched,
						return {
							start: {
								row: e.d === 1 ? i : i - e.s,
								col: e.d === 2 ? j : ( e.d === 4 ? j + e.s : j - e.s ),
							},
							end: { row: i, col: j }
						};
					}

					if ( e.d < 0 && e.s === 0 ) {
						// Reverse Search. First char. Entire Search string matched,
						return {
							start: { row: i, col: j },
							end: {
								row: e.d === -1 ? i : i - search.length + 1,
								col: e.d === -2 ? j : ( e.d === -4 ? j + search.length - 1 : j - search.length + 1 ),
							}
						};
					}

					//Update Expectation for next char match in string
					//Based on direction set expected cell
					switch ( Math.abs( e.d ) ) {
						case 1:
							e.c++;
							break; //RIGHT
						case 2:
							e.r++;
							break; //DOWN
						case 3:
							e.r++;
							e.c++;
							break; //DOWN n RIGHT
						case 4:
							e.r++;
							e.c--;
							break; //DOWN n LEFT
						default :
							throw "INVALID Direction " + e.d;
					}
					e.s += e.d > 0 ? 1 : -1;
				} else {

					// Mark for removal of failed Expectation
					e.remove = true;
				}
			}
		}
	}

	{
		//Check if this cell matches 1st/last character of search
		//if it does, then create expectations for neighboring cells encountered in future
		if ( search.length === 1 &&  ch === search[ 0 ] ) {
			return { start: { row: i, col: j }, end: { row: i, col: j } };
		}

		if ( search.length > 1 &&   ch === search[ 0 ] ) {
			if ( totCols - j >= search.length ) {
				expect.push( { r: i, c: j + 1 , s: 1, d: 1 }  ); // Right
			}
			if ( totRows - i >= search.length ) {
				expect.push( { r: i + 1, c: j, s: 1, d: 2 } ); // Down
			}
			if ( totCols - j >= search.length && totRows - i >= search.length ) {
				expect.push( { r: i + 1, c: j + 1, s: 1, d: 3 } ); // Diag Down Right
			}
			if ( j > ( search.length  - 1 ) && totRows - i >= search.length ) {
				expect.push( { r: i + 1, c: j - 1, s: 1, d: 4 } ); // Diag Down left
			}
		}
		if ( search.length > 1 &&  ch === search[ search.length - 1 ] ) {
			//REVERSE CASE
			if ( totCols - j >= search.length ) {
				expect.push( { r: i, c: j + 1, s: search.length - 2, d: -1 } ); // Right
			}
			if ( totRows - i >= search.length ) {
				expect.push( { r: i + 1, c: j, s: search.length - 2, d: -2 } ); // Down
			}
			if ( totCols - j >= search.length && totRows - i >= search.length ) {
				expect.push( { r: i + 1, c: j + 1, s: search.length - 2, d: -3 } ); // Diag Down Right
			}
			if ( j > ( search.length  - 1 ) && totRows - i >= search.length ) {
				expect.push( { r: i + 1, c: j - 1, s: search.length - 2, d: -4 } ); // Diag Down left
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
