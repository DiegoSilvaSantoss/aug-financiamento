// NOTIFICAÇÃO POPUP PERSONALIZADO 
window.addEventListener('load', function() {
  Swal.fire({
    title: '< > Informações do Desenvolvedor',
    html: `<div style="text-align: left;">

    ⚠️| Estou realizando melhorias diárias e promovendo algumas mudanças repentinas.<br><br>

    📱| Estou desenvolvendo o app. Em breve!
      
    </div>`,
    /*imageUrl: './img/projeto5.PNG',
    imageWidth: 500,
    imageHeight: 250,
    imageAlt: 'Imagem do Portfolio',*/
    confirmButtonText: 'Ok',
    background: 'rgb(33, 33, 33)',
    color: '#fff',
    confirmButtonColor: 'rgb(0, 103, 0)'
  });
});