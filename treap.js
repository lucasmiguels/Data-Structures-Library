
class Node {
  constructor(value) {
    this.value = value;
    this.priority = Math.floor(Math.random()*10001)
    this.left = null;
    this.right = null;
  }
}

class Treap {
  constructor() {
    this.node = null;
  }

  insert(value) {
    this.node = this.node
      ? this.insertNode(this.node, value)
      : new Node(value);
  }

  insertNode(node, value) {
    if (!node) {
      return new Node(value);
    }

    if (node.value > value) {
      node.left = this.insertNode(node.left, value);
    } else {
      node.right = this.insertNode(node.right, value);
    }

    return this.adjust(node);
  }

  adjust(node) {
    console.log('Adjusting node', node);
    if (node.right && node.right.priority < node.priority) {
      return this.rotateLeft(node);
    }
    if (node.left && node.left.priority < node.priority) {
      return this.rotateRight(node);
    }

    return node;
  }

  rotateLeft(node) {
    const tmp = { ...node };
    const rightNode = tmp.right;
    const leftChild = tmp.right.left;

    tmp.right = leftChild;
    rightNode.left = tmp;

    console.log('Final rotation:', rightNode);
    return rightNode;
  }

  rotateRight(node) {
    const tmp = { ...node };
    const leftNode = tmp.left;
    const rightChild = tmp.left.right;

    tmp.left = rightChild;
    leftNode.right = tmp;

    console.log('Final rotation:', leftNode);
    return leftNode;
  }
  delete(value){
    const deleteNode = (node,value) => {
      if(!node){
        return null
      }
      if(value>node.value){node.right = deleteNode(node.right,value)}
      else if(value<node.value){node.left = deleteNode(node.left,value)}
      else{ //achamos o no
         if(!node.left && !node.right){
           return null
         }
         else if(node.right && node.left){
           if(node.left.priority>node.right.priority){
             node = this.rotateLeft(node)
             node.left = deleteNode(node.left,value)
           }
           else{
             node = this.rotateRight(node)
             node.right = deleteNode(node.right,value)
           }
         }
         else{
           const onlyChild = (node.left) ? node.left : node.right
           return onlyChild
         }   
      }
      return node
    }
    this.node = deleteNode(this.node,value)
    
  }
  search(value){
    this.node = this.searchNode(this.node,value)
  }
  searchNode(node,value){
    if(!node){return null}
    if(value===node.value){
      console.log('Found key')
      return node
    }
    if(value<node.value){
      node.left = this.searchNode(node.left,value)
    }
    else{node.right = this.searchNode(node.right,value)}
  }
}

const treap = new Treap();

treap.insert(3);
treap.insert(8);
treap.insert(7);
treap.insert(20);
console.log(treap)
treap.delete(20)
console.log(treap)
console.log(treap.search(7))