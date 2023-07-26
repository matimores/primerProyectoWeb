const form = document.getElementById("form");
form.addEventListener('submit', handleSubmit)
function handleSubmit(e) {
    e.preventDefault();

}
const btnEnviar = document.getElementById("enviar");

btnEnviar.onclick = alertEnviado

function alertEnviado() {
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'CORREO ENVIADO',
        showConfirmButton: false,
        timer: 2500
    })
    
}



