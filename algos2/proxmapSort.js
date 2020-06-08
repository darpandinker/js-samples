import * as UTILS from "./utils";

"use strict";

function bucket( val ){
	//console.log( `Bucket( ${elem} ) =`+ Math.ceil( Math.log2( elem ) ));
	if ( typeof val === "number" ) return Math.floor(val / 3 ); //return Math.ceil( Math.log2( elem ) );
	return 0; //default Bucket???
}

export default function sort( data = [], start = 0, end = data.length,
                              { mapFn=bucket, compare= UTILS.compare, max= 10000 } = {} ) {
	let stats = { nComps: 0, nWrites: 0 };

	let numBuckets = mapFn( max ) + 1;
	//Create frequency table aka size of each bucket
	let H = new Array( numBuckets ).fill( 0 ); // Initialized to 0
	for ( let i = 0; i < data.length; i++ ) {
		H[ mapFn( data[ i ] ) ]++;
	}

	//Find Bucket positions in array
	let P = new Array( numBuckets );
	P[ 0 ] =  H[ 0 ] ? 0 : -1;
	for ( let i = 1, pos = 0; i < numBuckets; i++ ) {
		pos += H[ i - 1 ] ? H[ i - 1 ] : 0;
		P[ i ] = H[ i ] ? pos : -1;
	}

	//Find bucket Location for each data element
	let L = new Array( data.length );
	for ( let i = 0; i < L.length; i++ ) {
		L[ i ] = P[ mapFn( data[ i ] ) ];
	}

/*	console.log( "H:",H);
	console.log( "P:",P);
	console.log( "L:",L);*/

	//Place elements in Buckets
	let A = new Array( data.length );
	H.fill( 0 ); //reuse it as bucket's current Size
	for ( let i = 0; i < data.length; i++ ) {
		const b = mapFn( data[ i ] );
		const pos = L[ i ], end = pos + H[ b ];
		A[ end ] = data[ i ]; //place data at the end of bucket
		H[ b ]++;
		for ( let j = pos; j < end; j++ ) {
			if ( A[ j ] !== undefined ) {
				stats.nComps++;
				if ( compare( A[ j ], data[ i ] ) > 0 ) {
					//make slot for data elems. move 1 elem down
					UTILS.rotateRight(A,j,end);
					stats.nWrites += end - j +1;
					break; //insert done
				}
			}
		}
	}
	//copy back sorted elements
	for ( let i = 0; i < data.length; i++ ) {
		data[ i ] = A[ i ];
	}
	stats.nWrites += data.length;

	return stats;
}

function test() {
	let origArr = UTILS.makeArray();
	let arr = [ ... origArr ];
	console.time( "ProxMapSort" );
	const stats = sort( arr,0,arr.length, {  mapFn:bucket } );
	console.timeEnd( "ProxMapSort" );

	console.log( arr.slice( 0, 5 ) + " ... " + arr.slice( -5 ) );
	console.log( "Sorted:" + UTILS.checkSorted( arr, origArr ) );
	console.log( "Stats:", stats );
}

//test();
