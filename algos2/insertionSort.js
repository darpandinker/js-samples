
"use strict";

import * as UTILS from "./utils";

function rotateRight( ar, start, end ) {
	let tmp = ar[ end ];
	for ( let i = end; i > start; i-- ) {
		ar[ i ] = ar[ i - 1 ];
	}
	ar[ start ] = tmp;
}

function sort( data, start, end, compare ) {
	start = start || 0;
	end = end || data.length;
	compare = compare || UTILS.compare;

	let stats = { nComps: 0, nMoves: 0 };
	for ( let i = start + 1; i < end; i++ ) {
		for ( let j = start; j < i; j++ ) {
			stats.nComps++;
			if ( compare( data[ i ], data[ j ] ) < 0 ) {
				rotateRight( data, j, i );
				stats.nMoves += i - j;
				break;
			}
		}
	}
	return stats;
}

let arr = UTILS.makeArray();
console.time( "InsertionSort" );
const stats = sort( arr );
console.timeEnd( "InsertionSort" );

console.log( arr.slice( 0, 5 ) + " ... " + arr.slice( -5 ) );
console.log( "Sorted:" + UTILS.checkSorted( arr ) );
console.log( "Stats:", stats );
