    class Nil{
        constructor(valor,nivel,left,right){
            this.valor = 'nil'
            this.nivel = 0
            this.left=this
            this.right = this
        }
    }
    class BinaryNode {
        constructor(valor,nivel,left=new Nil(),right=new Nil()){
            this.valor = valor,
            this.nivel = nivel
            this.left = left
            this.right = right
        }
    }
    class ArvoreAA{
        constructor(root){
            this.root = new Nil()
        }
        buscarValor(valor){
            let current = this.root
            while(current.valor !== 'nil'){
            if(valor<current.valor){
                current = current.left
            }
            else if(valor>current.valor){current = current.right}
            else if(valor === current.valor){
                console.log('Achei o nó ')
                return current
            }
            
            else{
                console.log("Não foi possível encontrar o valor")
                return current
            }
        }
    }  
        skew(no){ //no vermelho na esquerda
            if(no.left.nivel === no.nivel){
                let current = no.left
                no.left = current.right
                current.right = no
                console.log('skewzada')
                return current
            }
            else{return no}
        }
        split(no){ // cadeia de vermelhos
            if(no.right.right.nivel === no.nivel){
                let current = no.right
                no.right = current.left
                current.left = no
                current.nivel += 1
                console.log('splitzada')
                return current
            }
            else{return no}
        }
        insertAlg(valor,no=this.root){
            if(no.valor==='nil'){no = new BinaryNode(valor,1)}
            else if(valor<no.valor){no.left = this.insertAlg(valor,no.left)}
            else if(valor>no.valor){no.right = this.insertAlg(valor,no.right)}
            else{throw "Chave já existe"}
            return this.split(this.skew(no))
        }

        inserirValor(valor){this.root = this.insertAlg(valor)}
        ajeitarNivel(no){
            console.log(no)
            let ideal = 1 + Math.min(no.left.nivel,no.right.nivel) //verifica se esta muito alto
            if(no.nivel>ideal){
                no.nivel = ideal  // verifica se filho é vermelho
                if(no.right.nivel>ideal){no.right.nivel = ideal}
            }
            return no
        }
        reajuste(no){
            no = this.ajeitarNivel(no)
            no = this.skew(no)
            no.right = this.skew(no.right)
            no.right.right = this.skew(no.right.right)
            no = this.split(no)
            no.right = this.split(no.right)
            return no
        }
        leftmost(no){
            let current = no.right
            while(current.left.valor !== 'nil'){
            current = current.left
            }
            return current
        }
        rightmost(no){
            let current = no.left
            while(current.right.valor !== 'nil'){
            current = current.right
            }
            return current
        }
        deletarNo(valor,no=this.root){
            if(no.valor !== 'nil'){
                if(valor<no.valor){no.left = this.deletarNo(valor,no.left)}
                else if(valor>no.valor){no.right = this.deletarNo(valor,no.right)}
                else{
                    if(no.right.valor === 'nil' && no.left.valor === 'nil'){ //sem filhos
                        no = new Nil()
                        return no
                    }
                    else if(no.right.valor === 'nil'){
                        no = this.rightmost(no)
                        no.left = this.deletarNo(no.valor,no.left)
                    }
                    else{
                        no = this.leftmost(no)
                        no.right = this.deletarNo(no.valor,no.right)
                    }
                }
                
                return this.reajuste(no)
            }
            else{return no}
        }
        delete(valor){
            this.root = this.deletarNo(valor)
        }

        // EXTENDENDO
        ksmall(k=1){
            if(k>=1){
                k = k-1
                let current = this.root
                while(current.left.valor !== 'nil'){
                    current = current.left
                } //encontra o menor
                for(let iteracoes = 0; iteracoes<k; iteracoes++){
                    if(this.leftmost(current).valor !== 'nil'){
                        current = this.leftmost(current)
                    }
                    //sucessor em ordem k vezes
                    else{ "k é maior que o número de nós, retornarei o nó mais a direita"}
                }
                return current
            }
        }
        keyInInterval(x,y){
            let keys = []
            const getValor = key => key.valor
            const getSoma = (acumulador,atual) => acumulador + atual
            if(x>y){[x,y]=[y,x]}
            let primeiro = this.buscarValor(x)
            if(primeiro.valor === 'nil'){primeiro = this.rightmost(primeiro)}
            while(primeiro.valor <= y){
                if(primeiro.valor>=x){keys.push(primeiro)}
                if(this.leftmost(primeiro).valor !== 'nil'){primeiro = this.leftmost(primeiro)}
                else{return `Chaves no intervalo: ${keys.map(getValor)}, Soma das chaves: ${keys.map(getValor).reduce(getSoma)}, número de elementos: ${keys.length}`}
            }
            return `Chaves no intervalo: ${keys.map(getValor)}, Soma das chaves: ${keys.map(getValor).reduce(getSoma)}, número de elementos: ${keys.length}`
        }
        reparticao(key){
            // detectar nós menores e maiores que a chave
            let menores = []
            let maiores = []
            const separador = this.buscarValor(key)
            let antecessores = this.rightmost(separador)
            let sucessores = this.leftmost(separador)
            while(antecessores.valor !== 'nil'){
                menores.push(antecessores)
                antecessores = this.rightmost(antecessores)
            }
            while(sucessores.valor !== 'nil'){
                maiores.push(sucessores)
                sucessores = this.leftmost(sucessores)
            }
            const t1 = new ArvoreAA()
            for(let i=0;i < menores.length;i++){
                t1.inserirValor(menores[i].valor)
            }
            if(separador.valor !== 'nil'){t1.inserirValor(separador.valor)}
            const t2 = new ArvoreAA()
            for(let i=0;i < maiores.length;i++){
                t2.inserirValor(maiores[i].valor)
            }
            //construimos arvores t1 e t2
            return [t1.root,t2.root]
        } 
  
    }
    
    const merge = (t1,t2) => {
        //Achar o maior nó de t1
        newRoot = t1.root
        while(newRoot.right.valor !== 'nil'){
            newRoot = newRoot.right
        }
        t1.deletarNo(newRoot.valor)
        const newTree = new ArvoreAA()
        newTree.inserirValor(newRoot.valor) //nova raiz é o nó que encontramos
        if(t1.root.nivel>t2.root.nivel){
            while(t1.root.nivel>t2.root.nivel){
                t2.inserirValor((50 + Math.random()*100)% 100) //inserindo valores dummy para igualar niveis
            }
        }
        else if(t2.root.nivel>t1.root.nivel){
            while(t1.root.nivel<t2.root.nivel){
                t1.inserirValor(( Math.random()*100)% 10)
            }
        }
        newTree.root.right = t2.root
        newTree.root.left = t1.root
        newTree.root.nivel = 1 + Math.min(newTree.root.left.nivel,newTree.root.right.nivel) //recebe nivel ideal
        //nó preto com ambos os filhos nós pretos
        return newTree.root
    }
  
    a = new ArvoreAA()
    a.inserirValor(5)
    a.inserirValor(7)
    a.inserirValor(8)
    a.inserirValor(3)
    b = new ArvoreAA()
    b.inserirValor(13)
    b.inserirValor(18)
    console.log(merge(a,b))
    

