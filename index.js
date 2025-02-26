// 'https://fakestoreapi.com/products'

const apiUrl = 'https://fakestoreapi.com/products'
let produtosGlobal = [];

async function consumirProdutos() {
    try{
        const resposta = await fetch(apiUrl)
        const produtos = await resposta.json()
        produtosGlobal = produtos;
       
        atualizarTabela(produtosGlobal);
    }catch (erro) {
        console.error('Erro ao buscar produtos:', erro);
    }}


    function atualizarTabela(produtos){

        const tbody = document.getElementById('tabelaDeProdutos')
        tbody.innerHTML = '';


 

        produtos.forEach(produto => {
            const linha = document.createElement('tr')
            linha.className = 'text-center even:bg-blue-50 h-10'

            const celulaId = document.createElement('td')
            celulaId.className = ''
            celulaId.textContent = produto.id
            linha.appendChild(celulaId)

            const nomeProd = document.createElement('td')
            nomeProd.className = 'font-bold'
            nomeProd.textContent = produto.title
            linha.appendChild(nomeProd)

            const preco = document.createElement('td')    
            preco.className = ''
            preco.textContent = produto.price.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})
            linha.appendChild(preco)
        

            const estoque = document.createElement('td')
            estoque.className = ''
            estoque.textContent = produto.rating.count
            linha.appendChild(estoque)
            

            tbody.appendChild(linha)
            

        });
   
    }

    function filtrarProdutos(){
        const filtro = document.getElementById("botaoPesquisa").value.toLowerCase();
        const produtosFiltrados = produtosGlobal.filter(produto =>
            produto.title.toLowerCase().includes(filtro)
        );
        atualizarTabela(produtosFiltrados);
    }
     
    function filtroPreco(){
        const precoMin = parseFloat(document.getElementById("precoMin").value);
        const precoMax = parseFloat(document.getElementById("precoMax").value);

        const produtosFiltrados = produtosGlobal.filter(produto =>
        (isNaN(precoMin) || produto.price >= precoMin) && (isNaN(precoMax) || produto.price <= precoMax)
        )
          atualizarTabela(produtosFiltrados);
    }


consumirProdutos();

