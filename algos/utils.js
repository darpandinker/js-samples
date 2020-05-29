
export function swap( ar, i, j ) {
	const tmp = ar[ i ];
	ar[ i ] = ar[ j ];
	ar[ j ] = tmp;
}

export function isGreater( a, b ) {
	return a > b;
}

export function compare( a, b ) {
	return a - b;
}

export function checkSorted( data, compare ) {
	compare = compare || isGreater;
	const last = data.length - 1;
	for ( let i = 0; i < last; i++ ) {
		if ( compare( data[ i ], data[ i + 1 ] ) ) {
			throw "Data is NOT sorted @ index " + i;
		}
	}
}

export function makeArray() {
	return [ 1, 83, 3, 97, 31, 4, 6, 1, 10 ];
/* I
	 return Array( 30000 ).fill( 0 ).map( () => Math.floor( Math.random() * 10000 ) );
*/
}
