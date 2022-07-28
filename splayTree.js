class BinaryNode {
    constructor(value) {
      this.value = value;
      this.left = null;
      this.right = null;
    }
  }
  class SplayTree {
    constructor() {
      this.node = null;
    }
    search(value){
        this.node = this.splay(this.node,value)
        return this.node
    }
  
    insert(value) {
      this.node = this.node
        ? this.insertNode(this.node, value)
        : new BinaryNode(value);
    }
  
    insertNode(node, value) {
      if (!node) {
        return new BinaryNode(value);
      }
      node = this.splay(node,value) //chave mais proxima na raiz
  
      if (value<node.value) {
        let newRoot = new BinaryNode(value)
        newRoot.right = node
        newRoot.left = node.left
        node.left = null
        return newRoot
      } else {
        let newRoot = new BinaryNode(value)
        newRoot.left = node
        newRoot.right = node.right
        node.right = null 
        return newRoot
      }
  
    }
    deleteNode(node,value){
        if(!node){return null}
        node = this.splay(node,value)
        if(node.value==value){
            if(!node.left){ //nó deletado não se ramifica
                node = node.right
                return node
            }
            else{
                let noBifurcado = node
                node = this.splay(node.left,value)
                node.right = noBifurcado.right
                return node
            }
        }
        else{return node}
    }
    delete(value){
        this.node = this.deleteNode(this.node,value)
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
      splay(node,value){
          if(!node || node.value==value){return node}
          if(value<node.value){ 
              if(!node.left){return node}
              if(value<node.left.value){ //zig zig
                  node.left.left = splay(node.left.left,value)
                  node = this.rotateRight(node)
              }
              else if(value>node.left.value){//zig zag
                  node.left.right = splay(node.left.right,value)
                  if(node.left.right){node.left = this.rotateLeft(node.left)}
              }
              if(!node.left){return node}
              else{this.rotateRight(node)}
          }
          if(value>node.value){
              if(!node.right){return node}
              if(value>node.right.value){ //zag zag
                  node.right.right = splay(node.right.right,value)
                  node = this.rotateLeft(node)
              }
              else if(value<node.right.value){ //zig zag
                  node.right.left = splay(node.right.left,value)
                  if(node.right.left){node.right = this.rotateRight(node.right)}
              }
              //segunda rotacao
              if(!node.right){return node}
              else{this.rotateRight(node)}
          }
          return node
      }
  }
  sp = new SplayTree
  sp.insert(3)
  sp.insert(5)
  sp.insert(7)
  console.log(sp)
  sp.search(5)
  console.log(sp)
  sp.delete(7)
  console.log(sp)

  