export let carrinho = [];

export function adicionarCarrinho(produto){
  carrinho.push(produto);
  render();
}

export function removerCarrinho(index){
  carrinho.splice(index,1);
  render();
}

export function limparCarrinho(){
  carrinho = [];
  render();
  document.getElementById('resultado').style.display='none';
}

export function render(){
  const lista = document.getElementById('lista');
  lista.innerHTML = '';
  carrinho.forEach((p,i)=>{
    const div = document.createElement('div');
    div.className = 'item';
    div.innerHTML = `
      <div><strong>${p.nce}</strong><small>${p.descricao}</small></div>
      <div><strong>${p.preco.toLocaleString('pt-BR',{style:'currency',currency:'BRL'})}</strong><br>
      <button class="remove">Remover</button></div>
    `;
    div.querySelector('.remove').addEventListener('click',()=>{
      removerCarrinho(i);
      import('./garantias.js').then(module=>{
        module.atualizarGarantias(carrinho);
      });
    });
    lista.appendChild(div);
  });
}

