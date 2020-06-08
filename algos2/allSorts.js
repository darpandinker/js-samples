import bubbleSort from "./bubbleSort";
import insertionSort from "./insertionSort";
import mergeSort from "./mergeSort";
import heapSort from "./heapSort";
import quickSort from "./quickSort";
import proxmapSort from "./proxmapSort";
import * as UTILS from "./utils";


const allSorts = {
	bubble: bubbleSort,
	insertion: insertionSort,
	merge: mergeSort,
	heap: heapSort,
	quick: quickSort,
	proxMap: proxmapSort
};

function testSort( name, arr, origArr ) {
	const sort = allSorts[ name ];
	if ( !sort ) throw "Invalid sort algo name: " + name;

	console.time( name );
	const start = process.hrtime();
	const stats = sort( arr );
	stats.elapsedTime = process.hrtime(start)
	console.timeEnd( name );

	console.log( name + " Array:", arr.slice( 0, 5 ) + " ... " + arr.slice( -5 ) );
	console.log( name + " Sorted:" + UTILS.checkSorted( arr, origArr ) );
	//console.log( name + " Stats:", stats );
	return stats;
}

let origArr = UTILS.makeArray();

//testSort( "bubble", [ ...origArr ] );
let Comps = [];
Object.getOwnPropertyNames( allSorts ).forEach( (algo) => {
	const stats = testSort( algo, [ ...origArr ] );
	Comps.push( { name: algo, stats: stats } );
} );

const start = process.hrtime();
origArr.sort( UTILS.compare );
const elapsedTime = process.hrtime(start);

Comps.push( { name: "JS Internal", stats: { elapsedTime: elapsedTime } } );
console.log( "\n\n\n" );
var printf = require('printf');

console.log( printf( "%15s %15s  %15s %15s", "Algo   ", "Time     ", "#Comps   ", "#Writes   " ) );
Comps.forEach( c => {

	console.log( printf( "%15s %5d.%09d %15d %15d",
		c.name, c.stats.elapsedTime[ 0 ], c.stats.elapsedTime[ 1 ],
		c.stats.nComps || 0, c.stats.nWrites || 0 ) );
});
