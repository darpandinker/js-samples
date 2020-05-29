

"use strict";

import * as UTILS from "./utils";
// Hana

function sort( data, start, end, compare, swap ) {
	start = start || 0;
	end = end || data.length;
	compare = compare || UTILS.compare;
	swap = swap || UTILS.swap;

	let stats = { nComps: 0, nSwaps: 0 };
	for ( let i = start; i < end; i++ ) {
		let swapped = false;
		for ( let j = i + 1; j < end; j++ ) {
			if ( compare( data[ i ], data[ j ] ) > 0 ) {
				swap( data, i, j );
				swapped = true;
				stats.nWrites+=2;
			}
		}
		stats.nComps += end - i - 1;

		// P if ( !swapped ) { break; }
	}
	return stats;
}

let arr = UTILS.makeArray();
console.time( "BubbleSort" );
const stats = sort( arr );
console.timeEnd( "BubbleSort" );

console.log( "Sorted:" + UTILS.checkSorted( arr ) );
console.log( "#swaps=" + stats.nWrites + " #compares=" + stats.nComps );
