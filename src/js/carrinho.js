// carrinho.js
export let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

export function salvarCarrinho() {
  localStorage.setItem('carrinho', JSON.stringify(carrinho));
}

export function adicionarCarrinho(produto) {
  const produtoExistente = carrinho.find(p => p.nce === produto.nce);

  if (produtoExistente) {
    produtoExistente.quantidade += 1;
  } else {
    carrinho.push({ ...produto, quantidade: 1 });
  }

  salvarCarrinho();
  render();
}

export function removerCarrinho(index) {
  carrinho.splice(index, 1);
  salvarCarrinho();
  render();
}

export function limparCarrinho() {
  carrinho.length = 0; // mantém a referência exportada
  salvarCarrinho();
  render();
}

// Função que atualiza a lista de itens no DOM
export function render() {
  const lista = document.getElementById('lista');
  const resultado = document.getElementById('resultado');

  if (!lista || !resultado) return;

  // Mostra ou esconde a div resultado conforme o carrinho
  if (carrinho.length > 0) {
    resultado.style.display = 'block';
  } else {
    resultado.style.display = 'none';
  }

  lista.innerHTML = '';

  carrinho.forEach((p, index) => {
    const div = document.createElement('div');
    div.classList.add('item');

    div.innerHTML = `
      <div>
        <strong>${p.nce}</strong>
        <small>${p.descricao}</small>

        <div class="quantidade">
          Quantidade:
          <button class="btn-minus">−</button>
          <span>${p.quantidade}</span>
          <button class="btn-plus">+</button>
        </div>
      </div>

      <div>
        <strong>
          ${(p.preco * p.quantidade).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
        </strong><br>
      </div>
    `;

    // ➕ aumentar quantidade
    div.querySelector('.btn-plus').addEventListener('click', () => {
      p.quantidade += 1;
      salvarCarrinho();
      render();
    });

    // ➖ diminuir quantidade
    div.querySelector('.btn-minus').addEventListener('click', () => {
      if (p.quantidade > 1) {
        p.quantidade -= 1;
      } else {
        carrinho.splice(index, 1);
      }
      salvarCarrinho();
      render();
    });

    lista.appendChild(div);
  });

  // Atualiza garantias (apenas uma vez)
  import('./garantias.js').then(module => {
    module.atualizarGarantias(carrinho);
  });
}

// Chama render uma vez ao carregar o módulo
render();
