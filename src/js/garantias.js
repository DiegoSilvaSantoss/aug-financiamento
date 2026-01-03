import { fmt } from './util.js';

export function atualizarGarantias(carrinho){
  const g = JSON.parse(localStorage.getItem("garantias")||"[]");
  const garantiaSelect = document.getElementById('garantia');
  let t1=0, t2=0;

  carrinho.forEach(p=>{
    const x = g.find(k=>k.nce===p.nce);
    if(x){ t1+=x.g1||0; t2+=x.g2||0; }
  });

  garantiaSelect.innerHTML = `
    <option value="0">Sem garantia</option>
    <option value="1">1 ano (+ ${fmt(t1)})</option>
    <option value="2">2 anos (+ ${fmt(t2)})</option>`;
}

