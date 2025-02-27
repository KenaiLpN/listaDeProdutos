// 'https://fakestoreapi.com/products'

const apiUrl = 'https://fakestoreapi.com/products'
let produtosGlobal = [];

// Função criada para puxar a lista de produtos e guardar na const "produtos"
async function consumirProdutos() {
    try{
        const resposta = await fetch(apiUrl) //puxa o .json de produtos da URL
        const produtos = await resposta.json() // armazena 
        produtosGlobal = produtos;
       
        atualizarTabela(produtosGlobal);
    }catch (erro) {
        console.error('Erro ao buscar produtos:', erro);
    }}

//função para criar as linhas e colunas de acordo com a lista de produtos
    function atualizarTabela(produtos){

        const tbody = document.getElementById('tabelaDeProdutos')
        tbody.innerHTML = '';


 
        //cria as linhas para cada produto 
        produtos.forEach(produto => {
            const linha = document.createElement('tr')
            linha.className = 'text-center even:bg-blue-50 h-10'

            const celulaId = document.createElement('td') //cria a coluna id
            celulaId.className = ''
            celulaId.textContent = produto.id
            linha.appendChild(celulaId)//insere a celulaId dentro da const Linha

            const nomeProd = document.createElement('td') //cria a coluna do nome do produto
            nomeProd.className = 'font-bold'
            nomeProd.textContent = produto.title
            linha.appendChild(nomeProd)//insere a celula nomeProd dentro da const Linha

            const preco = document.createElement('td')  //cria a coluna preço
            preco.className = ''
            preco.textContent = produto.price.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})
            linha.appendChild(preco)//insere a celula preco dentro da const linha
        

            const estoque = document.createElement('td') //cria a coluna estoque
            estoque.className = ''
            estoque.textContent = produto.rating.count
            linha.appendChild(estoque)//insere a celula estoque dentro da const Linha
            

            tbody.appendChild(linha)
            

        });
   
    }
    //função de filtro de produtos por nome
    function filtrarProdutos(){
        const filtro = document.getElementById("botaoPesquisa").value.toLowerCase();
        const produtosFiltrados = produtosGlobal.filter(produto =>
            produto.title.toLowerCase().includes(filtro)
        );
        atualizarTabela(produtosFiltrados);
    }
     //função de filtro de preço Min e Mãx
    function filtroPreco(){
        const precoMin = parseFloat(document.getElementById("precoMin").value);
        const precoMax = parseFloat(document.getElementById("precoMax").value);

        const produtosFiltrados = produtosGlobal.filter(produto =>
        (isNaN(precoMin) || produto.price >= precoMin) && (isNaN(precoMax) || produto.price <= precoMax)
        )
          atualizarTabela(produtosFiltrados);
    }
    
    

consumirProdutos();

