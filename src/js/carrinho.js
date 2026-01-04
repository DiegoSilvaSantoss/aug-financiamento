// carrinho.js
import { fmt } from './util.js';

export let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

export function salvarCarrinho() {
  localStorage.setItem('carrinho', JSON.stringify(carrinho));
}

export function adicionarCarrinho(produto) {
  const produtoExistente = carrinho.find(p => p.nce === produto.nce);

  if (produtoExistente) {
    produtoExistente.quantidade += 1;
  } else {
    carrinho.push({
      ...produto,
      quantidade: 1,
      garantia: 0 // 0 = sem | 1 = 1 ano | 2 = 2 anos
    });
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
  carrinho.length = 0;
  salvarCarrinho();
  render();
}

// ---------------- RENDER ----------------

export function render() {
  const lista = document.getElementById('lista');
  const resultado = document.getElementById('resultado');

  if (!lista || !resultado) return;

  resultado.style.display = carrinho.length > 0 ? 'block' : 'none';
  lista.innerHTML = '';

  const garantias = JSON.parse(localStorage.getItem('garantias') || '[]');

  carrinho.forEach((p, index) => {
    const div = document.createElement('div');
    div.classList.add('item');

    const g = garantias.find(k => k.nce === p.nce);

    const valorG1 = g ? (g.g1 || 0) * p.quantidade : 0;
    const valorG2 = g ? (g.g2 || 0) * p.quantidade : 0;

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

        <div class="garantia-item">
          <label>Garantia:</label>
          <select class="select-garantia">
            <option value="0">Sem garantia</option>
            <option value="1">GE 1 (${fmt(valorG1)})</option>
            <option value="2">GE 2 (${fmt(valorG2)})</option>
          </select>
        </div>
      </div>

      <div>
        <strong class="valor-total">
          ${(p.preco * p.quantidade).toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          })}
        </strong>
      </div>
    `;

    // quantidade +
    div.querySelector('.btn-plus').addEventListener('click', () => {
      p.quantidade += 1;
      salvarCarrinho();
      render();
    });

    // quantidade -
    div.querySelector('.btn-minus').addEventListener('click', () => {
      if (p.quantidade > 1) {
        p.quantidade -= 1;
      } else {
        carrinho.splice(index, 1);
      }
      salvarCarrinho();
      render();
    });

    // garantia por item
    const selectGarantia = div.querySelector('.select-garantia');
    selectGarantia.value = p.garantia;

    selectGarantia.addEventListener('change', e => {
      p.garantia = Number(e.target.value);
      salvarCarrinho();
      render();
    });

    lista.appendChild(div);
  });
}

// render inicial
render();

