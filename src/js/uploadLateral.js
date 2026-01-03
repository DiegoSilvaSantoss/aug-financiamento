export default function uploadLateral() {

    const btnLateral = document.getElementById('btn-lateral');
    const uploadLateral = document.querySelector('.upload-lateral');
    const fundoAtivo = document.querySelector('.fundo');

    btnLateral.addEventListener('click', () => {

        uploadLateral.classList.toggle('active-lateral');
        fundoAtivo.classList.toggle('active-fundo');

    })


    fundoAtivo.addEventListener('click', () => {

        uploadLateral.classList.remove('active-lateral');
        fundoAtivo.classList.remove('active-fundo');

    })
}