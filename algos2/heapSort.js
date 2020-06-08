import * as UTILS from "./utils";
import { Heap } from "./heap";

"use strict";

export default function sort( data=[], start=0, end=data.length, { compare= UTILS.compare, swap = UTILS.swap } = {} ) {

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

function test() {
	let origArr = UTILS.makeArray();
	let arr = [...origArr];
	console.time( "HeapSort" );
	const stats = sort( arr );
	console.timeEnd( "HeapSort" );

	console.log( arr.slice( 0, 5 ) + " ... " + arr.slice( -5 ) );
	console.log( "Sorted:" + UTILS.checkSorted( arr, origArr ) );
	console.log( "Stats:", stats );
}