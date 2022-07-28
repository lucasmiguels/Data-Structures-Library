
class hashTable{
    constructor(escolheFunc=0,escolheCollision=0,minLoad=0.25,maxLoad=0.75){
        this.table = new Array(101).fill(['empty', null])
        this.pairs = 0
        this.funcs = [this.divisionHash.bind(this), this.multiplicativeHash.bind(this), this.linearHash.bind(this),this.polynomialHash.bind(this),this.universalHash.bind(this)]
        this.insertions = [this.insertChaining.bind(this),this.insertLinear.bind(this),this.insertDouble.bind(this)]
        this.searches = [this.searchChaining.bind(this),this.searchLinear.bind(this),this.searchDouble.bind(this)]
        this.deletions = [this.deleteChaining.bind(this),this.deleteLinear.bind(this),this.deleteDouble.bind(this)]
        this.escolheFunc = escolheFunc
        this.escolheCollision = escolheCollision
        this.minLoad = minLoad
        this.maxLoad = maxLoad
        this.loadMed = (this.minLoad+this.maxLoad) / 2
        this.loadFactor = 0
    }
    divisionHash(key,tabela=this.table){
        let parameter = 0
        for(let i=0;i<key.length;i++){
            parameter = parameter + key.charCodeAt(i) //unicode
        }
        parameter = parameter % tabela.length // x mod m
        return parameter 
    }
    multiplicativeHash(key,tabela=this.table){
        let parameter = 0
        const primoGrande = 503
        for(let i=0;i<key.length;i++){
            parameter += key.charCodeAt(i)
        }
        parameter = (primoGrande * parameter) % tabela.length // (ax) mod m
        return parameter
    }
    linearHash(key,tabela=this.table){
        let parameter = 0
        const primoGrande = 503
        const b = 47
        for(let i=0;i<key.length;i++){parameter += key.charCodeAt(i)}
        parameter = (primoGrande * parameter + b) % tabela.length //(ax+b) mod m
        return parameter
    }
    polynomialHash(key,tabela=this.table){
        let parameter = 0
        const priminho = 41
        for(let i=0;i<key.length;i++){
            parameter += (key.charCodeAt(i)) * (priminho ** i) //(ci * p**i)
        }
        parameter = parameter % tabela.length
        return parameter 
    }
    universalHash(key,tabela=this.table){
        let parameter = 0
        const primoGrande = 503
        const a = ((Math.random()*1000)+1) % (primoGrande-1) //entre 1 e 502
        const b = (Math.random()*1000) % (primoGrande -1) //entre 0 e 502
        for(let i=0;i<key.length;i++){
            parameter += key.charCodeAt(i)
        }
        parameter = ((a * parameter + b ) % primoGrande) % tabela.length
        return parameter
    }
    updateFactor(){
        this.loadFactor = (this.pairs) / (this.table.length)
        
        return this.loadFactor
    }
    rehashing(numeroMetodo){
        if(this.loadFactor > this.maxLoad || this.loadFactor < this.minLoad){
            let newTable = new Array(Math.ceil(this.pairs/this.loadMed)).fill(['empty', null])
            for(let i=0; i<this.table.length;i++){
               if(this.table[i][0] !== 'empty' && this.table[i][0] !== 'deleted'){
                   this.insertions[numeroMetodo](this.table[i][0],this.table[i][1],newTable) //nova hash para nova tabela
               }
            }
            this.table = newTable
            return this.table
        }

    }
    rehashChaining(){
        if(this.loadFactor > this.maxLoad || this.loadFactor < this.minLoad){
            let newTable = new Array(Math.ceil(this.pairs/this.loadMed)).fill(['empty', null])
            for(let i=0; i<this.table.length;i++){
               if(this.table[i][0] !== 'empty' && this.table[i][0] !== 'deleted'){
                   for(let j = 0; j<this.table[i].length; j++){
                   this.insertChaining(this.table[i][j][0],this.table[i][j][1],newTable)
                }
               }
            }
            this.table = newTable
            return this.table
        }
    }
    insertChaining(key,data,tabela=this.table){
        let position = this.funcs[this.escolheFunc](key,tabela)
        if(tabela[position][0]==='empty'){tabela[position] = []}
        if (tabela[position][0]!=='empty'){
            for(let i=0;i<tabela[position].length;i++){
                if(tabela[position][i][0]===key){throw "Chave já inserida"}
            }
            tabela[position].push([key,data])
        }
        if(tabela === this.table){
            this.pairs++
            this.updateFactor()
            this.rehashChaining()
        }
        return tabela[position]
    }
    deleteChaining(key){
        let position = this.funcs[this.escolheFunc](key)
        if(this.table[position][0] !== 'empty'){
            for(let i=0;i<this.table[position].length;i++){
                if(this.table[position][i][0] === key){
                    const removed = this.table[position][i]
                    if(this.table[position].length !== 1){
                        this.table[position].splice(i,1)
                    }
                    else{
                        this.table[position] = ['empty',null]
                    }
        
                    this.pairs--
                    this.updateFactor()
                    this.rehashChaining()
                    return removed
                }
            }
        }
        return false
    }
    searchChaining(key){
        let position = this.funcs[this.escolheFunc](key)
        if(this.table[position][0] !== 'empty'){
            for(let i=0;i<this.table[position].length;i++){
                if(this.table[position][i][0] === key){
                    console.log(this.table[position][i][1])
                    return this.table[position][i][1]
                }
            }
        }
        return false
    }
    insertLinear(key,data,tabela=this.table){
        let position = this.funcs[this.escolheFunc](key,tabela)
        while(tabela[position][0]!=='empty' && tabela[position][0] !== 'deleted' && tabela[position][0]!==key){
            position++
            position = position % tabela.length //permite retornar do ultimo ao primeiro indice
        }
        if(tabela[position][0] === 'empty' || tabela[position][0] === 'deleted'){
        tabela[position] = [key,data]
        if(tabela === this.table){
            this.pairs++
            this.updateFactor()
            this.rehashing(1)
        }
        return tabela[position]
        }
        else{ throw 'Chave já inserida'} 
    }
    searchLinear(key){
        let position = this.funcs[this.escolheFunc](key)
        let contador = 0
        while(this.table[position][0] !== 'empty'){
            if(this.table[position][0]===key){
                console.log(this.table[position][1])
                return this.table[position][1]
            }
            contador++
            if(contador>this.table.length){return false} //percorreu toda a tabela
            position++
            position %= this.table.length
        }
        return false
    }
    deleteLinear(key){
        let position = this.funcs[this.escolheFunc](key)
        while(this.table[position][0] !== 'empty'){
            if(this.table[position][0] === key){
                const removed = this.table[position]
                this.table[position] = ['deleted', null]
                this.pairs--
                this.updateFactor()
                this.rehashing(1)
                return removed[1]
            }
            position++
            position %= this.table.length
        }
        return false
    }
    doubleFunc(key){
        let primoRelativo = 199
        let parameter = 0
        for(let i=0;i<key.length;i++){
            parameter = parameter + key.charCodeAt(i) //unicode
        }
        parameter = parameter % primoRelativo // primo em geral maior que m
        return parameter
    }
    insertDouble(key,data,tabela=this.table){
        let position = this.funcs[this.escolheFunc](key,tabela)
        while(tabela[position][0]!=='empty' && tabela[position][0] !== 'deleted' && tabela[position][0]!==key){
            position += this.doubleFunc(key) //incremento double hash
            position %= tabela.length
        }
        if(tabela[position][0] === 'empty' || tabela[position][0] === 'deleted'){
            tabela[position] = [key,data]
            if(tabela === this.table){
                this.pairs++
                this.updateFactor()
                this.rehashing(2)
            }
            return tabela[position]
        }
        else{ throw 'Chave já inserida'}
    }
    searchDouble(key){
        let position = this.funcs[this.escolheFunc](key)
        let contador = 0
        while(this.table[position][0] !== 'empty'){
            if(this.table[position][0]===key){
                console.log(this.table[position][1])
                return this.table[position][1]
            }
            contador++
            if(contador>this.table.length){return false} //percorreu toda a tabela
            position += this.doubleFunc(key)
            position %= this.table.length
        }
        return false
    }
    deleteDouble(key){
        let position = this.funcs[this.escolheFunc](key)
        while(this.table[position][0] !== 'empty'){
            if(this.table[position][0] === key){
                const removed = this.table[position]
                this.table[position] = ['deleted', null]
                this.pairs--
                this.updateFactor()
                this.rehashing(2)
                return removed[1]
            }
            position += this.doubleFunc(key)
            position %= this.table.length
        }
        return false
    }

    // USUÁRIO

    insert(key,data){
        this.insertions[this.escolheCollision](key,data)
    }
    search(key){
        this.searches[this.escolheCollision](key)
    }
    delete(key){
        this.deletions[this.escolheCollision](key)
    }
}




ht = new hashTable(0,1)
ht.insert('hello',30)
ht.insert('bye',5)
ht.insert('goodbye',3)
ht.insert('spain',9)
ht.insert('canada',7)
ht.insert('brasil',21)
ht.searchLinear('hello')
console.log(ht.table)

dh = new hashTable(0,2)
dh.insert('hello',30)
dh.insert('byebye',9)
dh.delete('byebye')

console.log(dh.table)

sc = new hashTable()
sc.insert('hello',30)
sc.insert('bye',5)
sc.insert('byebye',13)
sc.insert('spain',15)
sc.delete('spain')
sc.search('bye')
console.log(sc.table)





