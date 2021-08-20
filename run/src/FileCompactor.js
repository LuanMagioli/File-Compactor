class Node{
    constructor(value, left = null, right = null){
        this.value = value;
        this.left = left;
        this.right = right; 
    }
}

function conversionTable(node, table = [], code = ''){    
    if(node !== null){
        if(node.character){
            table[node.character] = code
        }else{
            table = conversionTable(node.left, table, code+'0');
            table = conversionTable(node.right, table, code+'1');
        }
    }
    return table;
}

function zip(path){
    try{
        file = fs.readFileSync(path).toString();
    }catch(e){
        throw new Error(path + ": no such file or directory");
    }

    console.log(file)

    //Contagem de caracteres
    characters = [];

    for(let character of file){
        if(!characters[character]){
            characters[character] = 0;
        }
        characters[character]++;
    }
    console.log(characters)
    
    characters = Object.entries(characters);
    console.log(characters)
    
    //Transformação em árvore
    let tree = characters.map(c => ({ 
        character: c[0],
        value: c[1]
    }));
    
    while(tree.length > 1){
        tree = tree.sort((a, b) => b.value-a.value)
        console.log(tree)
    
        c1 = tree.pop();
        c2 = tree.pop();
        

        tree.push(new Node(c1.value+c2.value, c1, c2))
    }
    console.log(tree[0].right)
    tree = tree[0]
    
    //Tabela de conversão
    table = conversionTable(tree);

    converted = '';

    for(let c in table){
        converted += c;
        converted += table[c]
        converted += '\n'
    }
    

    for(let character of file)
        converted += table[character]
    
    fs.writeFileSync(path.split('.')[0]+'.fzip', path.split('.')[1] + '\n' + converted);
}

function unzip(path){
    try{
        file = fs.readFileSync(path).toString();
    }catch(e){
        throw new Error(path + ": no such file or directory");
    }
    console.log(file)
    let lines = file.split('\n');
    console.log(lines)
    let codes = lines.pop();
    console.log(codes)
    let table = []

    for(let i=1; i < lines.length; i++){
        let character = lines[i][0];
        console.log(character)
        let code = String(lines[i].substring(1));
        console.log(code)
        
        table[code+' '] = character;
    }
    console.log(table)
        
    out = ''
    aux = ''
    for(let i=0; i < codes.length; i++){
        aux += codes[i]
        console.log(aux)
        
        if(table[aux+' ']){
            console.log(aux)
            out += table[aux+' '];
            console.log(out)
            aux = ''
        }
    }

    console.log(codes)
    console.log(out)        

    fs.writeFileSync('Converted_' + path.split('.')[0]+'.'+lines[0], out);
}

zip('texto.txt');
unzip('texto.fzip');

module.exports = {zip, unzip};