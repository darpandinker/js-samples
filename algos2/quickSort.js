import * as UTILS from "./utils";

"use strict";

function partition( data, start, end, compare, swap, stats ) {

	let pivot = data[ end - 1 ]; //Last Element as Pivot
	//pivot = data[ Math.floor( ( start + end ) / 2 ) ];

	let pIndex = start;
	for ( let i = start; i < end; i++ ) {
		if ( compare( data[ i ], pivot ) <= 0 ) {
			swap( data, i, pIndex++ );
			stats.nWrites += 2;
		}
	}
	stats.nComps += end - start;
	//console.log( stats );
	return pIndex - 1; //The new pivot index
}

export default function sort( data=[], start=0, end=data.length,
                              { compare= UTILS.compare, swap = UTILS.swap, stats =  { nComps: 0, nWrites: 0 } } = {} ) {
	if ( start >= end ) {
		return;
	}

	//stats = stats || { nComps: 0, nWrites: 0 };
	const pIndex = partition( data, start, end, compare, swap, stats );
	sort( data, start, pIndex, { compare:compare, swap:swap, stats:stats } );
	sort( data, pIndex + 1, end, { compare:compare, swap:swap, stats:stats});

	return stats;
}

function test() {
	let origArr = UTILS.makeArray();
	let arr = [...origArr];
	console.time( "QuickSort" );
	const stats = sort( arr );
	console.timeEnd( "QuickSort" );

	console.log( arr.slice( 0, 5 ) + " ... " + arr.slice( -5 ) );
	console.log( "Sorted:" + UTILS.checkSorted( arr, origArr ) );
	console.log( "Stats:", stats );
}

//test();