import { hideString, makeXwd } from "./utils";


var INCREMENTS = new Array( [], [0, 1], [1, 0], [1, 1], [1, -1] );

function xwdSearch( xwd, search, i, j, options ) {
	const totRows = xwd.length;
	const totCols = xwd[ 0 ].length;

	if ( i >= totRows || j >= totCols || i < 0 || j < 0 ) { return; }

	if ( search.length > totCols || search.length > totRows ) {
		return;
	}

	options = options || {};
	options.visits = options.visits || makeXwd( totRows, totCols, [ 0 ] );
	options.visits[ i ][ j ]++;

	let matchString = function( dir ) {

		let [ xr, xc ] = INCREMENTS[ Math.abs( dir ) ];

		let r = i, c = j;
		if ( dir > 0 ) {
			for ( let s = 0; s < search.length; s++, r += xr, c += xc ) {
				if ( r < 0 || r >= totRows || c < 0 || c >= totCols ) { return; }
				if ( r !== i || c !== j ) { options.visits[ r ][ c ]++; }
				if ( search[ s ] !== xwd[ r ][ c ] ) { return; }
			}
		}
		if ( dir < 0 ) {
			for ( let s = search.length - 1; s >= 0; s--, r += xr, c += xc ) {
				if ( r < 0 || r >= totRows || c < 0 || c >= totCols ) { return; }
				let sch = search[s];
				let xch= xwd[r][c];
				if ( r !== i || c !== j ) { options.visits[ r ][ c ]++; }
				if ( search[ s ] !== xwd[ r ][ c ] ) { return; }
			}
		}

		return { row: r - xr, col: c - xc };
	};

	{
		//Check if this cell matches 1st/last character of search
		//if it does, match entire string in each direction
		const ch = xwd[ i ][ j ];

		if ( search.length === 1 &&  ch === search[ 0 ] ) {
			return { start: { row: i, col: j }, end: { row: i, col: j } };
		}

		if ( search.length > 1 && ch === search[ 0 ] ) {
			//FORWARD CASE. matched 1st char of search string
			let found = matchString( 1 ) || matchString( 2 ) || matchString( 3 ) || matchString( 4 );
			if ( found ) {
				return { start: { row:i, col:j }, end: found };
			}
		}

		if ( search.length > 1 && ch === search[ search.length - 1 ] ) {
			//REVERSE CASE. matched last char of search string
			let found = matchString( -1 ) || matchString( -2 ) || matchString( -3 ) || matchString( -4 );
			if ( found ) {
				return { start: found, end: { row: i, col: j } };
			}
		}
	}

	//Visit next node to right or 1st node on next row
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
