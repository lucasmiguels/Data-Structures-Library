// Pilha
class Pilha{
    constructor(){
        this.itens = []
    }
    adicionarItem(item){
        let tamanho = this.itens.length
        this.itens[tamanho] = item
        console.log(`O item ${item} foi adicionado !`)
    }
    removerItem(){
        let tamanho = this.itens.length
        let ultimoElemento = this.itens[tamanho-1]
        if(tamanho === 0){
        console.log("A pilha está vazia")
    }
        else{
        this.itens.splice(tamanho-1,1)
        console.log(`O elemento ${ultimoElemento} foi removido`)
        }
}

    verPilha(){
        console.log(this.itens)
    }
}
let p1 = new Pilha
p1.adicionarItem(3)
p1.adicionarItem(2)
p1.verPilha()
p1.removerItem()

// Fila
class Fila {
    constructor(){
        this.itens = []
    }
    adicionarItem(item){  // enqueue
        let tamanho = this.itens.length
        this.itens[tamanho] = item
        console.log(`O item ${item} foi adicionado !`)
    }
    removerItem(){  // dequeue
        let elementoInicial = this.itens[0]
        this.itens.splice(0,1)
        console.log(`O item ${elementoInicial} foi removido`)
    }
    verFila(){
        console.log(this.itens)
    }
}
let f1 = new Fila
f1.adicionarItem(3)
f1.adicionarItem(2)
f1.verFila()
f1.removerItem()
f1.verFila()

class ABP{
    // init
    constructor(padrao=1,n=50,topoDaPilha = 0){
        this.principal = new Int32Array(n)
        this.secundario = new Int32Array(n)
        this.pilha = new Int32Array(n)
        this.padrao = padrao
        this.n = n 
        this.topoDaPilha = topoDaPilha
    }
    set(indice,x){
        if(!this.isDefined(indice)){
            this.secundario[indice] = this.topoDaPilha
            this.topoDaPilha++
            this.pilha[this.topoDaPilha] = indice
        }
        this.principal[indice] = x
    }
    get(indice){
        if(this.isDefined[indice]){return this.principal[indice]}
        else{return this.padrao}
    }
    isDefined(indice){
        return (this.secundario[indice] >= 0 && this.secundario[indice] <= this.topoDaPilha && this.pilha[this.secundario[indice]] === indice)
    }

}