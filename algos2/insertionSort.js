
"use strict";

import * as UTILS from "./utils";

export default function sort( data=[], start=0, end=data.length,  { compare= UTILS.compare } = {}  ) {

	let stats = { nComps: 0, nWrites: 0 };
	for ( let i = start + 1; i < end; i++ ) {
		for ( let j = start; j < i; j++ ) {
			stats.nComps++;
			if ( compare( data[ i ], data[ j ] ) < 0 ) {
				UTILS.rotateRight( data, j, i );
				stats.nWrites += i - j;
				break;
			}
		}
	}
	return stats;
}

function test() {
	let origArr = UTILS.makeArray();
	let arr = [...origArr];
	console.time( "InsertionSort" );
	const stats = sort( arr );
	console.timeEnd( "InsertionSort" );

	console.log( arr.slice( 0, 5 ) + " ... " + arr.slice( -5 ) );
	console.log( "Sorted:" + UTILS.checkSorted( arr, origArr ) );
	console.log( "Stats:", stats );
}
