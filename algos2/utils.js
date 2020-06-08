
export function swap( ar, i, j ) {
	const tmp = ar[ i ];
	ar[ i ] = ar[ j ];
	ar[ j ] = tmp;
}

export function isGreater( a, b ) {
	return a - b;
}

export function compare( a, b ) {
	return a - b;
}

export function checkSorted( data, origArr=[],  compare = isGreater ) {

	if ( origArr.length <= 0 ) {
		const last = data.length - 1;
		for ( let i = 0; i < last; i++ ) {
			if ( isGreater( data[ i ], data[ i + 1 ] ) > 0 ) {
				throw "Data is NOT sorted @ index " + i;
			}
		}
	} else {
		if ( origArr.length === data.length ) {
			origArr.sort( compare );
			for ( let i = 0; i < data.length; i++ ) {
				if ( data[ i ] !== origArr[ i ] ) {
					console.log( origArr.slice( 0, 5 ) + " ... " + origArr.slice( -5 ) );
					throw "Data is NOT sorted @ index " + i;
				}
			}
		} else {
			throw `Data size does not match origArray ${data.length}. Expected = ${origArr.length}`;
		}
	}
	return true;
}

export function makeArray( small=false ) {
	return small ?
		[ 1, 83, 3, 97, 31, 4, 6, 1, 10 ] :
		Array( 30000).fill( 0 ).map( () => Math.floor( Math.random() * 10000 ) );
}

export function makeXwd( n, m, init ) {
	let xwd = new Array( n );
	for ( let i = 0; i < n; i++ ) {
		xwd[ i ] = new Array( m );
		if ( init ) {
			for ( let j = 0; j < m; j++ ) {
				xwd[ i ][ j ] = init[ ( Math.floor( Math.random() * init.length ) ) ];
			}
		}
	}
	//console.log( xwd );
	return xwd;
}

//B console.log(makeArray());
export function hideString( xwd, search ) {
	const totRows = xwd.length;
	const totCols = xwd[ 0 ].length;

	const maxRowOff = totRows - search.length; //To accommodate search string
	const maxColOff = totCols - search.length; //To accommodate search string

	const reverse = Math.floor( Math.random() * 2 );  // 0 => Normal , 1=> Reverse
	const dir = Math.floor( Math.random() * 4 ) + 1;

	switch ( dir ) {
		case 1: { //Horizontal Left
			const row = Math.floor( Math.random() * totRows );
			const col = Math.floor( Math.random() * maxColOff );
			for ( let i = 0; i < search.length; i++ ) {
				xwd[ row ][ col + i ] = search[ reverse ? search.length - 1 - i : i ];
			}
		}
			break;
		case 2 : { //Vertical Down
			const row = Math.floor( Math.random() * maxRowOff );
			const col = Math.floor( Math.random() * totCols );
			for ( let i = 0; i < search.length; i++ ) {
				xwd[ row + i ][ col ] = search[ reverse ? search.length - 1 - i : i ];
			}
		}
			break;
		case 3: { // Diagonal Down Right
			const row = Math.floor( Math.random() * maxRowOff );
			const col = Math.floor( Math.random() * maxColOff );
			for ( let i = 0; i < search.length; i++ ) {
				xwd[ row + i ][ col + i ] = search[ reverse ? search.length - 1 - i : i ];
			}
		}
			break;
		case 4: { // Diagonal  Down Left
			const row = Math.floor( Math.random() * maxRowOff );
			const col = Math.floor( Math.random() * maxColOff ) + search.length;
			for ( let i = 0; i < search.length; i++ ) {
				xwd[ row + i ][ col - i ] = search[ reverse ? search.length - 1 - i : i ];
			}
		}
			break;
		default:
			throw "Invalid Direction";
	}
}

export function rotateRight( ar, start, end ) { //end is inclusive
	let tmp = ar[ end ];
	for ( let i = end; i > start; i-- ) {
		ar[ i ] = ar[ i - 1 ];
	}
	ar[ start ] = tmp;
}