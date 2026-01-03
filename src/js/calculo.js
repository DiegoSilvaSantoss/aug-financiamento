import { carrinho } from './carrinho.js';
import { entradaNumero } from './util.js';

export function calcularTotal(entradaStr, tipoGarantia, parcelas, taxa, arredondar){
  const g = JSON.parse(localStorage.getItem("garantias")||"[]");
  let entrada = entradaNumero(entradaStr);

  let total = 0;
  carrinho.forEach(p=>{
    total += p.preco;
    const x = g.find(k => k.nce === p.nce);
    if(x){
      if(tipoGarantia === "1") total += x.g1 || 0;
      if(tipoGarantia === "2") total += x.g2 || 0;
    }
  });

  if(entrada > total) entrada = total;
  const financiado = total - entrada;

  const n = Number(parcelas);
  const i = Number(taxa)/100;

  const coef = i === 0 ? 1/n : (i * Math.pow(1+i,n)) / (Math.pow(1+i,n)-1);
  let valorParcela = financiado * coef;

  if(arredondar) valorParcela = Math.round(valorParcela * 100)/100;

  return { total, financiado, entrada, valorParcela, parcelas: n };
}

