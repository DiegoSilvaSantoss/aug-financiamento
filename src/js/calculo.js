import { carrinho } from './carrinho.js';
import { entradaNumero } from './util.js';
import { calcularGarantiaTotal } from './garantias.js';

export function calcularTotal(entradaStr, parcelas, taxa, arredondar) {
  let entrada = entradaNumero(entradaStr);

  let totalProdutos = 0;
  carrinho.forEach(p => {
    totalProdutos += p.preco * p.quantidade;
  });

  const totalGarantia = calcularGarantiaTotal(carrinho);
  const total = totalProdutos + totalGarantia;

  if (entrada > total) entrada = total;

  const financiado = total - entrada;
  const n = Number(parcelas);
  const i = Number(taxa) / 100;

  const coef =
    i === 0
      ? 1 / n
      : (i * Math.pow(1 + i, n)) / (Math.pow(1 + i, n) - 1);

  let valorParcela = financiado * coef;
  if (arredondar) valorParcela = Math.round(valorParcela * 100) / 100;

  return { total, financiado, entrada, valorParcela, parcelas: n };
}
