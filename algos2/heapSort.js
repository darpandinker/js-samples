import * as UTILS from "./utils";
import {Heap} from "./heap";

"use strict";

function sort( data, start, end, compare, swap ) {
	start = start || 0;
	end = end || data.length;
	compare = compare || UTILS.compare;
	swap = swap || UTILS.swap;

	let stats = { nComps: 0, nWrites: 0 };
	let h = new Heap( data, compare, swap, stats );

	for ( let i = h.size; i > 0; i-- ) {
		h.size--;
		swap( h.heap, h.size, 0 ); //Swap 1st and last element
		h.heapify( 0 );
		//h.print();
	}
	
	return stats;
}

let arr = UTILS.makeArray();
console.time( "HeapSort" );
const stats = sort( arr );
console.timeEnd( "HeapSort" );

console.log( arr.slice( 0, 5 ) + " ... " + arr.slice( -5 ) );
console.log( "Sorted:" + UTILS.checkSorted( arr ) );
console.log( stats );
