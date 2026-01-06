export default function financeiraLateral() {

    const btnFinanciamento = document.querySelector('.btn-financiamento');
    const calcLateral = document.querySelector('.box-configuracao');
    const fundoAtivo = document.querySelector('.fundo-2');
    const btnFinance = document.querySelector('.box-btn');
    const btnPrev = document.querySelector('.box-btn-prev');
    const topo2 = document.querySelector('.topo-financ');

    btnFinanciamento.addEventListener('click', () => {

        calcLateral.classList.add('active-config-lateral');
        btnFinance.classList.add('active-btn-finance');
        btnPrev.classList.add('active-prev');
        fundoAtivo.classList.add('active-fundo-2');
        topo2.classList.add('active-financ');

    });


    btnPrev.addEventListener('click', () => {

        calcLateral.classList.remove('active-config-lateral');
        fundoAtivo.classList.remove('active-fundo-2');
        btnFinance.classList.remove('active-btn-finance');
        btnPrev.classList.remove('active-prev');
        topo2.classList.remove('active-financ');

    })

}