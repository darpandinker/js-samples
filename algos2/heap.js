import * as UTILS from "./utils";

export class Heap {

	constructor( arr, compare, swap, stats ) {
		this.heap = arr;
		this.size = this.heap.length;
		this.swap = swap || UTILS.swap;
		this.compare = compare || UTILS.compare;
		this.stats = stats || { nWrites:0, nComps:0 };
		this.buildHeap();
	}

	getMax() {
		return this.heap[ 0 ];
	}

	parent( i ) {
		return ( i - 1 ) >>> 1;
	}

	leftChild( i ) {
		return i * 2 + 1;
	}

	rightChild( i ) {
		return i * 2 + 2;
	}

	insert( node ) {
		this.heap[ this.size ] = node;
		this.size++;

		let cur = this.size - 1;
		while ( cur > 0 ) {
			let par = this.parent( cur );
			if ( this.compare( this.heap[ cur ], this.heap[ par ] ) > 0 ) {
				// cur.value is > par.value
				this.swap( this.heap, cur, par );
				this.stats.nWrites += 2;
			}
			this.stats.nComps += 2;
			cur = par;
		}
	}

	buildHeap() {
		for ( let i = ( this.size >>> 1 ); i >= 0; i-- ) {
			this.heapify( i );
			//this.print();
		}
	}

	str( i ) {
		return "[" + i + "]=" + ( i < this.size  ? this.heap[ i ] : 'null' );
	}

	heapify( nth ) {
		if ( nth >= 0 && nth < this.size ) {
			let lc = this.leftChild( nth );
			let rc = this.rightChild( nth );
			let maxIdx = ( lc < this.size && this.compare( this.heap[ lc ], this.heap[ nth ] ) > 0 ) ? lc : nth;
			maxIdx = ( rc < this.size && this.compare( this.heap[ rc ], this.heap[ maxIdx ] ) > 0 ) ? rc : maxIdx;

			//console.log( "heapify " + this.str( nth ) + " lc:" + this.str( lc ) + " rc:" + this.str( rc ) + "  maxIdx=" + maxIdx );
			if ( maxIdx > nth ) {
				this.swap( this.heap, nth, maxIdx );
				this.stats.nWrites += 2;
				this.heapify( maxIdx );
			}
			this.stats.nComps += 2;
		}
	}

	sort(){
		for ( let i = this.size; i > 0; i-- ) {
			this.size--;
			this.swap( this.heap, this.size, 0 ); //Swap 1st and last element
			this.heapify( 0 );
			//this.print();
		}
	}

	print() {
		console.log( "Size=" + this.size + "  HEAP=" + this.heap );
	}

	validate( i ) {
		if ( i < 0 || i >= this.size ) {
			return false;
		}

		let lc = this.leftChild( i );
		let rc = this.rightChild( i );

		if ( this.compare( this.heap[ lc ], this.heap[ i ] ) > 0 ) {
			throw "Invalid Heat at  [" + i + "]=" + this.heap[ i ] + " and [" + lc + "]" + this.heap[ lc ];
		}
		if ( this.compare( this.heap[ rc ], this.heap[ i ] ) > 0 ) {
			throw "Invalid Heat at  [" + i + "]=" + this.heap[ i ] + " and [" + rc + "]" + this.heap[ rc ];
		}
		this.validate( lc );
		this.validate( rc );
		return true;
	}
}

/*
let arr = UTILS.makeArray();
var heap = new Heap( arr );

//arr.forEach( x => heap.insert( x ) );

console.log( "Valid Heap=" + heap.validate( 0 ) );
heap.sort();
*/
