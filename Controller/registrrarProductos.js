import{Addregister} from "../Controllers/firebase.js"

const guardar=document.getElementById('btnregister')

async function registrar(){
    const cod = document.getElementById('edtcodigo').value
    const name=document.getElementById('edtname').value
    const desc = document.getElementById('edtdesc').value
    const cant = document.getElementById('edtcantidad').value

    const verificar = Addregister(cod,name,desc,cant)
    const validar = await verificar

    .then((validar) => {    
        // Signed up 
        alert('El producto se registro exitosamente..')
        const user = validar.user;
        window.location.href="../Templates/regproductos.html"
        // ...
      })
      .catch((error) => {
        alert('no sucessfull')
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
}

window.addEventListener('DOMContentLoaded', async()=>{
    guardar.addEventListener('click', registrar)
})
