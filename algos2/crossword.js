function makeXwd( n, m, init ) {
	let xwd = new Array( n );
	for ( let i = 0; i < n; i++ ) {
		xwd[ i ] = new Array( m );
		if ( init ) {
			for ( let j = 0; j < m; j++ ) {
				xwd[ i ][ j ] = init[ ( Math.floor( Math.random() * init.length ) ) ];
			}
		}
	}
	console.log( xwd );
	return xwd;
}

function hideString( xwd, search ) {
	const totRows = xwd.length;
	const totCols = xwd[ 0 ].length;

	const maxRowOff = totRows - search.length; //To accommodate search string
	const maxColOff = totCols - search.length; //To accommodate search string

	const dir = Math.floor( Math.random() * 3 );
	switch ( dir ) {
		case 0: { //Horizontal Left
			const row = Math.floor( Math.random() * totRows );
			const col = Math.floor( Math.random() * maxColOff );
			for ( let i = 0; i < search.length; i++ ) {
				xwd[ row ][ col + i ] = search[ i ];
			}
		}
			break;
		case 1 : { //Vertical Down
			const row = Math.floor( Math.random() * maxRowOff );
			const col = Math.floor( Math.random() * totCols );
			for ( let i = 0; i < search.length; i++ ) { xwd[ row + i ][ col ] = search[ i ]; }
		}
			break;
		case 2: { // Diagonal Left Down
			const row = Math.floor( Math.random() * maxRowOff );
			const col = Math.floor( Math.random() * maxColOff );
			for ( let i = 0; i < search.length; i++ ) {
				xwd[ row + i ][ col + i ] = search[ i ];
			}
		}
			break;

		default:
			throw "Invalid Direction";
	}
}

let VISITS = undefined;


function xwdSearch( xwd, search, i, j, options ) {
	const totRows = xwd.length;
	const totCols = xwd[ 0 ].length;

	if ( i >= totRows || j >= totCols || i < 0 || j < 0 ) { return; }

	options = options || {};
	options.visits = options.visits || makeXwd( totRows, totCols, [0] );
	options.expectations = options.expectations || [];

	options.visits[ i ][ j ]++;
	let expect = options.expectations;

	const ch = xwd[ i ][ j ];

console.log( "VISITING [" + i + "," + j + "]=" + ch );
	for ( let k = 0; k < expect.length; k++ ) {
		let e = expect[ k ];
		if ( e.r === i && e.c === j ) {
			if ( ch === search[ e.s ] ) {
				console.log( "matched expectation at search index ", e );
				if ( e.s === search.length - 1 ){
					let fr = (e.d & 0x01) ? i - e.s: i;
					let fc = (e.d & 0x10) ? j - e.s: j;
					console.log( "FOUND SEARCH at " + fr + ", " + fc );
					return true;
				}
				switch ( e.d ) {
					case 1: e.c++; e.s++; break;
					case 2: e.r++; e.s++; break;
					case 3: e.r++; e.c++; e.s++; break;
				}
			}
		}
	}
	{

		// ASSUME all expectations will fail
		let f = -1;
		while ( (f = search.indexOf( ch, f + 1 )) >= 0 ) {
			if ( f < search.length - 1 ) {
				if ( totCols - j >= search.length - f ) {
					expect.push( { r: i, c: j + 1, s: f + 1, d: 1 } );
				}
				if ( totRows - i >= search.length - f ) {
					expect.push( { r: i + 1, c: j, s: f + 1, d: 2 } );
				}
				if ( totCols - j >= search.length - f && totRows - i >= search.length - f ) {
					expect.push( { r: i + 1, c: j + 1, s: f + 1, d: 3 } );
				}
			}
/*	SEARCH LEFT
		if ( f > 0 && i > 0 ) {
				if ( j >= f ) {
					expect.push( { r: i, c: j - 1, s: f - 1 } );
				}
				if ( i >= f ) {
					expect.push( { r: i - 1, c: j, s: f - 1 } );
				}
				if ( j > f && j > f ) {
					expect.push( { r: i - 1, c: j - 1, s: f - 1 } );
				}
			}
*/
		}
	}
	let found = false;
	if ( totCols - j === 1 ) {
		found = found || xwdSearch( xwd, search, i+1, 0, options ); //Visit node next row
	} else {
		found = found || xwdSearch( xwd, search, i, j + 1, options ); //Visit node on right
	}

//	found = found || xwdSearch( xwd, search, i + 1, j, options ); //Visit node below
//	found = found || xwdSearch( xwd, search, i + 1, j + 1, options ); //Visit node diagnally

	return found;
}



const alpha = "qwertyuiopasdfghjklzxcvbnm";
let xwd = makeXwd( 3, 3, alpha.split( "" ) );
let search = "GO".split( "" );
console.log( "Search String=" + search );

hideString( xwd, search );
console.log( xwd );

let options={};
let found = xwdSearch( xwd, search, 0, 0, options );
console.log( "FOUND=" + found );
console.log( options );