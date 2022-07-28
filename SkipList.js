//const util = require('util');
class SkipNode{
    constructor(level,key){
        this.key = key
        this.next = new Array(level+1).fill(null)
    }
}
class SkipList{
    constructor(topoDaLista){
        this.topoDaLista = topoDaLista
        this.header = new SkipNode(this.topoDaLista,-1)
        this.level = 0
    }
    caraOuCoroa(){
        let newLevel = 0
        let moeda = Math.random()
        while(moeda > 0.5 && newLevel < this.topoDaLista){
            newLevel++
            moeda = Math.random()
        }
        return newLevel
    }
    insert(key){
        let current = this.header 
        let previous = new Array(this.topoDaLista+1).fill(null)
        for(let i = this.level; i>=0; i--){
            while(current.next[i] && current.next[i].key < key){
                current = current.next[i]
            }
            previous[i] = current
        }
        current = current.next[0]
        if(!current || current.key !== key){ //novo nó entre previous e current
            let newLevel = this.caraOuCoroa()
            if(newLevel > this.level){ // nó com aior nível
                for(let i = this.level+1; i< newLevel+1; i++){
                    previous[i] = this.header
                }
                this.level = newLevel
            }
            let newNode = new SkipNode(newLevel,key)
            //inserindo
            for(let i = 0; i<= newLevel; i++){
                newNode.next[i] = previous[i].next[i]
                previous[i].next[i] = newNode
            }
            return newNode
        }
        else{throw "Digite chave válida"}
    }
    
    search(key){
        let current = this.header
        for(let i = this.level; i>=0; i--){
            while(current.next[i] && current.next[i].key < key){
                current = current.next[i]
            }
        }
        current = current.next[0]
        if(current && current.key === key){
            console.log("Achamos !")
            return current
        }
        else{console.log("O nó não existe")}
    }

    delete(key){
        let current = this.header 
        let previous = new Array(this.topoDaLista+1).fill(null)
        for(let i = this.level; i>=0; i--){
            while(current.next[i] && current.next[i].key < key){
                current = current.next[i]
            }
            previous[i] = current
        }
        current = current.next[0]
        if(current && current.key === key){
            for(let i=0;i <= this.level; i++){
                if(previous[i].next[i] === current){
                    previous[i].next[i] = current.next[i]
                }
            }
            while(this.level > 0 && !this.header.next[this.level]){this.level--}
            console.log("Nó deletado com sucesso !")
        }
        else{console.log("A chave não existe")}
    }
}
let sk = new SkipList(4)
sk.insert(3)
sk.insert(5)
sk.insert(2)
sk.insert(9)
sk.insert(13)
sk.delete(5)
sk.delete(9)
/*console.log(
    util.inspect(sk, { showHidden: false, depth: null, colors: false })
    //skip list
  ); */

