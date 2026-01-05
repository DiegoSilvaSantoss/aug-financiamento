import { carregarBase, limparBase } from './src/js/base.js';
import { adicionarCarrinho, limparCarrinho, carrinho } from './src/js/carrinho.js';
import { calcularTotal } from './src/js/calculo.js';
import uploadLateral from './src/js/uploadLateral.js';
import financeiraLateral from './src/js/financeiraLateral.js';

const fileProdutos = document.getElementById('fileProdutos');
const fileGarantias = document.getElementById('fileGarantias');
const msg = document.getElementById('msg');
const busca = document.getElementById('busca');
const sugestoes = document.getElementById('sugestoes');
const parcelas = document.getElementById('parcelas');
const taxa = document.getElementById('taxa');
const entrada = document.getElementById('entrada');
const arredondar = document.getElementById('arredondar');
const resultado = document.getElementById('resultado');

// ================= BASE =================

document.getElementById('btnSalvar').addEventListener('click', () => {
  carregarBase(fileProdutos.files[0], fileGarantias.files[0], len => {
    msg.innerText = `✔ Base carregada (${len} produtos)`;
  });
});

document.getElementById('btnLimparBase').addEventListener('click', () => {
  limparBase();
  msg.innerText = '';
  limparCarrinho();
});

// ================= CARRINHO =================

document.getElementById('btnLimparItens').addEventListener('click', () => {
  limparCarrinho();
});

// ================= CALCULAR =================

document.getElementById('btnCalcular').addEventListener('click', () => {
  if (!carrinho.length) {
    alert('Adicione produtos');
    return;
  }

  const resultadoCalculo = calcularTotal(
    entrada.value,
    parcelas.value,
    taxa.value,
    arredondar.checked
  );

  const {
    total,
    financiado,
    entrada: entVal,
    valorParcela,
    parcelas: qtdParcelas,
    totalComJuros,
    jurosAplicado
  } = resultadoCalculo;

  resultado.style.display = 'block';
  resultado.innerHTML = `
    <p><strong>Total:</strong> <span>${total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}<span></p>
    <p><strong>Entrada:</strong> <span>${entVal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span></p>
    <p><strong>Valor financiado:</strong> <span>${financiado.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span></p>
    <p><strong>Parcelas:</strong> <span>${qtdParcelas}x de ${valorParcela.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span></p>
    <p><strong>Total com juros:</strong> <span>${totalComJuros.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span></p>
    <p><strong>Juros aplicado:</strong> <span>${jurosAplicado.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span></p>
  `;
});


// ================= BUSCA =================

const sugestoesBody = document.getElementById('sugestoesBody');

busca.addEventListener('input', () => {
  const q = busca.value.toLowerCase().trim();
  sugestoesBody.innerHTML = '';

  if (!q) {
    sugestoes.style.display = 'none';
    return;
  }

  const produtos = JSON.parse(localStorage.getItem('produtos') || '[]');

  produtos
    .filter(p =>
      p.nce.includes(q) ||
      p.descricao.toLowerCase().includes(q)
    )
    .slice(0, 25)
    .forEach(p => {
      const tr = document.createElement('tr');

      tr.innerHTML = `
        <td>${p.nce}</td>
        <td>${p.descricao}</td>
        <td>${p.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
      `;

      tr.onclick = () => {
        adicionarCarrinho(p);
        busca.value = '';
        sugestoes.style.display = 'none';
      };

      sugestoesBody.appendChild(tr);
    });

  sugestoes.style.display = 'block';
});

// ================= PARCELAS =================

for (let i = 1; i <= 12; i++) {
  parcelas.innerHTML += `<option value="${i}">${i}x</option>`;
}

// ================= ENTRADA =================

entrada.addEventListener('input', () => {
  let v = entrada.value.replace(/\D/g, '');
  entrada.value = (Number(v) / 100).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });
});

// ================= LATERAIS =================

uploadLateral();
financeiraLateral();
