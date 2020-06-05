
// using class assuming ES6 is available
class Node {
  // INSTANCE VARIABLES
  val = 0; // Store unicode for a lower-case alphabet, 
  size = 0; // number of strings stored under each level
  
  constructor(val) {
    this.val=val;
    this.children = new Map();
  }

  /** return void */
  add(s, index=0) {
    let ccode=s.charCodeAt(index);
    let i=ccode - Node.CODE_FOR_a;
    let n=null;

    this.size++;
    if(null == (n=this.children.get(i)) )
      this.children.set(i, n=new Node(ccode));

    if (index+1<s.length)
      n.add(s, index+1);
  }

  /**
  * param c     a character of type string
  * return      Node that was retrieved
  */
  getNode(c) {
    let ccode=c.charCodeAt(0); 
    return this.children.get(ccode);
  }

  /**
  * Set the node in the children 
  * params c    a character of type string
  * param node  of type Node
  * return      void
  */
  setNode(c, node) {
    let ccode=c.charCodeAt(0);
    this.children.set(ccode, node);
  }

  /** return a number */
  findCount(s, index=0) {
    if (s.length==index)
      return this.size;
    
    let ccode=s.charCodeAt(index);
    let i=ccode - Node.CODE_FOR_a;
    let n=this.children.get(i);
    return (n)?n.findCount(s, index+1):0;
  }

  print(level=0) {
    console.log( "["+ level +", "+ this.size+"] "+ String.fromCharCode(this.val) );
    for (const e of this.children)
      e[1].print(1+level);
  }
}
// STATIC VARIABLES
Node.CODE_FOR_a=97;
Node.CODE_FOR_z=122;
Node.NUMBER_OF_CHARACTERS=26;

var root = new Node(42); // unicode for '*'

root.add("gayle");
root.add("gary");
root.add("gina");
root.add("alex");
root.add("andy");

console.log("findCount for \"ga\" returned "+ root.findCount("ga"));
root.print();
