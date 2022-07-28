class BinaryNode{
    constructor(valor,left=null,right=null){
        this.valor=valor
        this.left=left
        this.right=right
    }
}

class BST{
        constructor(){
            this.root = null
        }
        adicionarItem(valor){
            if(!this.root){
                this.root = new BinaryNode(valor)
                console.log("O primeiro item foi adicionado")
                return this.root
            }
            function buscarNo(no){
                if(valor === no.valor){
                    throw "Digite uma chave válida"
                }
                else if(valor<no.valor){
                    if(!no.left){
                        no.left = new BinaryNode(valor)
                        console.log("Valor adicionado")
                        return no.left
                    }
                    else{buscarNo(no.left)}
                }
                else{
                    if(!no.right){
                        no.right = new BinaryNode(valor)
                        console.log("Valor adicionado")
                        return no.right
                    }
                    else{buscarNo(no.right)}
                }        
        }
        buscarNo(this.root)
    }
    buscarItem(valor){
        let noTemporario = this.root
        while(noTemporario){
            if(valor === noTemporario.valor){
                console.log(`Achei o nó ${noTemporario.valor}`)
                return noTemporario
            }
            else if(valor<noTemporario.valor){
                noTemporario = noTemporario.left
            }
            else{
                noTemporario = noTemporario.right
            }
        }
        return "Não foi possível encontrar o valor"
    }
    deletarItem(valor){
        let noTemporario = this.root
        while(noTemporario){
            if(valor < noTemporario.valor){
                noTemporario = noTemporario.left
            }
            else if(valor > noTemporario.valor){
                noTemporario = noTemporario.right
            }
            else{ // checar se é folha
                if(!noTemporario.right && !noTemporario.left){
                    return null
                }
                else if(!noTemporario.right){return noTemporario.left} // checar se tem 1 filho só
                else if(!noTemporario.left){return noTemporario.right}
                else{ // possui 2 filhos
                    function leftmost(no){
                        while(no.left){
                        no = no.left
                        }
                        return no
                    }
                    noTemporario = leftmost(noTemporario.right)
                    noTemporario.right = this.deletarItem(noTemporario.valor)
                    return noTemporario
                }
            }
        }
        return "Digite valor válido"
    }
    
}
t1 = new BST()
console.log(t1.adicionarItem(12))
console.log(t1.adicionarItem(13))
console.log(t1.buscarItem(15))
console.log(t1.adicionarItem(8))
console.log(t1.adicionarItem(9))
console.log(t1.buscarItem(8))
//console.log(t1.deletarItem(9))
console.log(t1)
