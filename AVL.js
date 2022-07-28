class BinaryNode{
    constructor(valor,left=null,right=null,altura=0){
        this.valor=valor
        this.left=left
        this.right=right
        this.altura=altura
    }
}

class AVL{
    constructor(){
        this.root = null
    }
    balanceamento(no){
        if(no){
        return ((no.right? no.right.altura : 0)-(no.left? no.left.altura : 0))
        }
    }
    rotacaoEsquerda(no){
        let filho = no.right
        no.right = filho.left
        filho.left = no
        this.novaAltura(no)
        this.novaAltura(filho)
        return filho
    }
    rotacaoDireita(no){
        let filho = no.left
        no.left = filho.right
        filho.right = no
        this.novaAltura(no)
        this.novaAltura(filho)
        return filho
    }
    rotacaoLeftRight(no){
        no.left = this.rotacaoEsquerda(no.left)
        return this.rotacaoDireita(no)
    }
    rotacaoRightLeft(no){
        no.right = this.rotacaoDireita(no.right)
        return this.rotacaoEsquerda(no)
    }
    novaAltura(no){
        if(no){
        no.altura = 1 + Math.max(no.right? no.right.altura : 0,no.left? no.left.altura : 0)
        }
    }
    adicionarItem(valor,no=this.root){
        if(!no){no = new BinaryNode(valor)}
        else if(valor > no.valor){no.right = this.adicionarItem(valor,no.right)}
        else if(valor < no.valor){no.left = this.adicionarItem(valor,no.left)}
        else{throw "Digite chave válida"}
        no = this.rebalanceando(no)
        return no
    }
    inserir(valor){this.root = this.adicionarItem(valor)}
    deletarNo(valor,no=this.root){
        if(!no){return no}
        else if(valor > no.valor){no.right = this.deletarNo(valor,no.right)}
        else if(valor < no.valor){no.left = this.deletarNo(valor,no.left)}
        else{
            //Achamos o nó
            if(!no.left && !no.right){
                no = null
                return no
            }
            else if(no.left && no.right){
                let sucessor = no.right
                while(sucessor.left){sucessor = sucessor.left}
                no.valor = sucessor.valor
                no.right = this.deletarNo(sucessor.valor,no.right)
            }
            else{ // um único filho
                if(!no.left){
                    let current = no.right
                    no = current
                }
                else{
                    let current = no.left
                    no = current
                }
                return no
            }
        }
        no = this.rebalanceando(no)
        return no
    }
    deletar(valor){this.root = this.deletarNo(valor)}
        
    buscarItem(valor){
        let noTemporario = this.root
        while(noTemporario){
            if(valor === noTemporario.valor){
                console.log( `Achei o nó ${noTemporario.valor}`)
            }
            else if(valor<noTemporario.valor){
                noTemporario = noTemporario.left
            }
            else{
                noTemporario = noTemporario.right
            }
        }
        console.log( "Não foi possível encontrar o valor")
    }
    rebalanceando(no){
        if(!no){return no}
        if(this.balanceamento(no)<-1){
            if(no.left.left ? no.left.left.altura : 0 >= no.left.right? no.left.right.altura : 0){
                no = this.rotacaoDireita(no)
            }
            else{no = this.rotacaoLeftRight(no)}
        }
        else if(this.balanceamento(no)> 1){
            if(no.right.right? no.right.right.altura : 0 >= no.right.left ? no.right.left.altura: 0){no = this.rotacaoEsquerda(no)}
            else{no = this.rotacaoRightLeft(no)}
        }
        this.novaAltura(no)
        return no
    }

}   


let avl = new AVL()
avl.inserir(2)
avl.inserir(5)
avl.inserir(9)
avl.inserir(1)
//avl.deletar(5)
console.log(avl)