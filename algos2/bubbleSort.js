
"use strict";

import * as UTILS from "./utils";


export default function sort( data=[], start=0, end=data.length, { compare= UTILS.compare, swap = UTILS.swap } = {} ) {

	let stats = { nComps: 0, nWrites: 0 };
	for ( let i = start; i < end; i++ ) {
		let swapped = false;
		for ( let j = i + 1; j < end; j++ ) {
			if ( compare( data[ i ], data[ j ] ) > 0 ) {
				swap( data, i, j );
				swapped = true;
				stats.nWrites += 2;
			}
		}
		stats.nComps += end - i - 1;

		// P if ( !swapped ) { break; }
	}
	return stats;
}

function test() {
	let origArr = UTILS.makeArray();
	let arr = [...origArr];
	console.time( "BubbleSort" );
	const stats = sort( arr );
	console.timeEnd( "BubbleSort" );

	console.log( arr.slice( 0, 5 ) + " ... " + arr.slice( -5 ) );
	console.log( "Sorted:" + UTILS.checkSorted( arr, origArr ) );
	console.log( "Stats:", stats );
}