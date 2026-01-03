import { carregarBase, limparBase } from './src/js/base.js';
import { adicionarCarrinho, limparCarrinho, carrinho } from './src/js/carrinho.js';
import { atualizarGarantias } from './src/js/garantias.js';
import { calcularTotal } from './src/js/calculo.js';
import uploadLateral from './src/js/uploadLateral.js';

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

// Base
document.getElementById('btnSalvar').addEventListener('click', ()=>{
  carregarBase(fileProdutos.files[0], fileGarantias.files[0], (len)=>{
    msg.innerText = `✔ Base carregada (${len} produtos)`;
  });
});

document.getElementById('btnLimparBase').addEventListener('click', ()=>{
  limparBase();
  msg.innerText='';
  limparCarrinho();
  atualizarGarantias(carrinho);
});

// Carrinho
document.getElementById('btnLimparItens').addEventListener('click', ()=>{
  limparCarrinho();
  atualizarGarantias(carrinho);
});

// Calcular
document.getElementById('btnCalcular').addEventListener('click', ()=>{
  if(!carrinho.length) return alert("Adicione produtos");

  const tipo = document.getElementById('garantia').value;
  const parcelasVal = document.getElementById('parcelas').value;
  const taxaVal = document.getElementById('taxa').value;
  const arred = arredondar.checked;

  const { total, financiado, entrada: entVal, valorParcela, parcelas } = calcularTotal(
    entrada.value, tipo, parcelasVal, taxaVal, arred
  );

  resultado.style.display = 'block';
  resultado.innerHTML = `
    <p><strong>Total produtos:</strong> ${total.toLocaleString('pt-BR',{style:'currency',currency:'BRL'})}</p>
    <p><strong>Entrada:</strong> ${entVal.toLocaleString('pt-BR',{style:'currency',currency:'BRL'})}</p>
    <p><strong>Valor financiado:</strong> ${financiado.toLocaleString('pt-BR',{style:'currency',currency:'BRL'})}</p>
    <p><strong>Parcelas:</strong> ${parcelas}x de ${valorParcela.toLocaleString('pt-BR',{style:'currency',currency:'BRL'})}</p>
  `;
});

// Busca
const sugestoesBody = document.getElementById('sugestoesBody');

busca.addEventListener('input', ()=>{
  const q = busca.value.toLowerCase().trim();
  sugestoesBody.innerHTML = '';

  if(!q){
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
        <td>${p.preco.toLocaleString('pt-BR',{style:'currency',currency:'BRL'})}</td>
      `;

      tr.addEventListener('click', ()=>{
        adicionarCarrinho(p);
        atualizarGarantias(carrinho);
        busca.value = '';
        sugestoes.style.display = 'none';
      });

      sugestoesBody.appendChild(tr);
    });

  sugestoes.style.display = 'block';
});

// Inicializa parcelas
for(let i=1;i<=12;i++) parcelas.innerHTML += `<option value="${i}">${i}x</option>`;

// Formata entrada
entrada.addEventListener('input', ()=>{
  let v = entrada.value.replace(/\D/g,'');
  entrada.value = (Number(v)/100).toLocaleString('pt-BR',{style:'currency',currency:'BRL'});
});

// UPLOAD LATERAL
uploadLateral();

