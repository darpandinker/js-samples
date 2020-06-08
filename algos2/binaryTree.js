// import * as UTILS from "./utils";

class Node {

	constructor( val ) {
		this._value = val;
		this._left = this._right = null;
	}

	get value() { return this._value; }
	set value( x ) { this._value = x; }

	get left()  { return this._left; }
	set left( child ) { this._left = child; }

	get right() { return this._right; }
	set right( child ) { this._right = child; }

	*postorder() { //DFS
		if ( this.left !== null ) { yield* this.left.postorder(); }
		if ( this.right !== null ) { yield* this.right.postorder(); }
		yield this;
	}

	*inorder() {
		if ( this.left !== null ) { yield* this.left.inorder(); }
		yield this;
		if ( this.right !== null ) { yield* this.right.inorder(); }
	}

	*preorder() {
		yield this;
		if ( this.left !== null ) { yield* this.left.preorder(); }
		if ( this.right !== null ) { yield* this.right.preorder(); }
	}
}


class BinaryTree {

	constructor( value ) {
		if ( value ) {
			this.root = new Node( value );
		}
	}

	find( val ) {
		if ( val === undefined ) return null;

		const nodeCompare = val instanceof Node;
		const valCompare = !nodeCompare;
		for ( const n of this.DFS() ) {
			if ( ( nodeCompare && n === val ) || ( valCompare && n.value === val ) ) {
				return n;
			}
		}
		return null;
	}

	addLeft( parent, val ) {
		if ( !parent ) { return null; }

		let parNode = this.find( parent );
		if ( val instanceof Node && this.find( val ) !== null ) {
			throw "Cant add pre-existing node in tree.";
		}

		if ( parNode && parNode.left === null ) {
			const valNode = new Node( val );
			parNode.left = valNode;
			return valNode;
		}
	}
	
	addRight( parent, val ) {
		if( !parent ) { return null; }

		let parNode = this.find( parent );
		if ( val instanceof Node && this.find( val ) !== null ) {
			throw "Cant add pre-existing node in tree.";
		}

		if ( parNode && parNode.right === null ) {
			const valNode = new Node( val );
			parNode.right = valNode;
			return valNode;
		}
		return false;
	}
	
	*BFS( root=this.root ){
		let bfs = [ root ];
		for ( let last = 0, current = bfs[ last ]; current; ++last, current = bfs[ last ] ) {
			yield current.value;
			if ( current.left ) { bfs.push( current.left ); }
			if ( current.right ) { bfs.push( current.right ); }
		}
	}

	*DFS( root = this.root ) {
		yield* root.postorder();
	}

	*inorder( root = this.root ) {
		yield* root.inorder();
	}
	*preorder( root = this.root ) {
		yield* root.preorder();
	}
	*postorder( root = this.root ) {
		yield* root.postorder();
	}
}


function test(){
	let tree=new BinaryTree("ROOT" );
	tree.addLeft("ROOT", "fruits"); 	tree.addRight("ROOT", "veggies");

	tree.addLeft("fruits", "apple"); tree.addRight("fruits", "orange");
	tree.addLeft("veggies", "green"); tree.addRight("veggies", "red");
	tree.addLeft("green", "broccolli");
	tree.addRight("red", "carrot");
	tree.addLeft("apple","fuji");

	console.log( JSON.stringify( tree.root, null, 2 ) );

	console.log("==========\nROOT Breadth First\n==========")
	for ( const node of tree.BFS() ) {
		console.log( node );
	}

	console.log("==========\nROOT In Order Traversal \n==========")
	for ( const node of tree.inorder( ) ) {
		console.log( node.value );
	}

	console.log("==========\nROOT Pre Order Traversal \n==========")
	for ( const node of tree.preorder( ) ) {
		console.log( node.value );
	}

	console.log("==========\nROOT Post Order Traversal \n==========")
	for ( const node of tree.postorder( ) ) {
		console.log( node.value );
	}

	console.log("==========\nVeggies Depth First\n==========")
	const veg = tree.find( 'veggies');
	for ( const node of tree.DFS( veg ) ) {
		console.log( node.value );
	}

}

test();

