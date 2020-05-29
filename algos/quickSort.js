
import * as UTILS from "./utils";

"use strict";

function partition( data, start, end, compare, swap, stats ) {

	let pivot = data[ end - 1 ]; //Last Element as Pivot
	let pIndex = 0;
	for ( let i = 0; i < end; i++ ) {
		if ( data[ i ] <= pivot ) {
			swap( data, i, pIndex++ );
		}
	}
	stats.nComps += end;
	return pIndex - 1; //The new pivot index
}

function sort( data, start, end, compare, swap, stats ) {
	if ( start >= end ) {
		return;
	}
	start = start || 0;
	end = end || data.length;
	compare = compare || UTILS.compare();
	swap = swap || UTILS.swap();

	stats = stats || { nComps: 0, nWrites: 0 };
	const pIndex = partition( data, start, end, compare, swap, stats );
	sort( data, start, pIndex, compare, swap, stats );
	sort( data, pIndex + 1, end, compare, swap, stats );
}

let arr = UTILS.makeArray();
console.time( "QuickSort" );
const stats = sort( arr );
console.timeEnd( "QuickSort" );

console.log( "Sorted:" + UTILS.checkSorted( arr ) );
console.log( "#writes=" + stats.nWrites + " #compares=" + stats.nComps );
