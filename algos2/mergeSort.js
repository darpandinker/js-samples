import * as UTILS from "./utils";

"use strict";

function merge( data, start, mid, end, compare, swap, stats ) {
	let lhs = start, rhs = mid;

	for ( let i = start; i < end  &&  lhs < mid; i++ ) {
		if ( rhs < end ) {
			stats.nComps++;
			stats.temp[ i ] = compare( data[ lhs ], data[ rhs ] ) > 0 ? data[ rhs++ ] : data[ lhs++ ];
		} else {
			stats.temp[ i ] = data[ lhs++ ];
		}
	}

	for ( let i = start; i < rhs; i++ ) {
		data[ i ] = stats.temp[ i ];
	}
	stats.nWrites += 2 * ( rhs - start );
}

export default function sort( data=[], start=0, end=data.length, { compare= UTILS.compare, swap = UTILS.swap } = {} ) {

	let stats = stats || { nComps: 0, nWrites: 0, temp: Array( data.length ) };

	//C console.log( "sort( " + start + ", " + end + ")" );

	let len = end - start;
	if ( len > 1 ) {
		const mid = ( end + start ) >>> 1;

		sort( data, start, mid, { compare: compare, swap: swap } );
		sort( data, mid, end, { compare: compare, swap: swap } );
		merge( data, start, mid, end, compare, swap, stats );
	}

	return stats;
}

function test() {
	let origArr = UTILS.makeArray();
	let arr = [...origArr];
	console.time( "MergeSort" );
	const stats = sort( arr );
	console.timeEnd( "MergeSort" );

	console.log( arr.slice( 0, 5 ) + " ... " + arr.slice( -5 ) );
	console.log( "Sorted:" + UTILS.checkSorted( arr, origArr ) );
	console.log( "Stats:", stats );
}