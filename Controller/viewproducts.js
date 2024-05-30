import { productosv, deleteuser, loginauth, auth } from "../Controller/firebase.js"; // Importa las funciones necesarias

const ver = document.getElementById('vdata');

async function cargar() {
    ver.innerHTML = '';
    const docref = productosv();
    const querySnapshot = await docref;
    querySnapshot.forEach((doc) => {
        const data = doc.data();
        const userId = doc.id;
        ver.innerHTML += `
            <tr id="row-${userId}">
                <th scope="row">${data.codigo}</th>
                <td>${data.nombre}</td>
                <td>${data.apellido}</td>
                <td>${data.cedula}</td>
                <td>${data.direccion}</td>
                <td>${data.email}</td>
                <td><button class="btn btn-danger" onclick="handleDelete('${userId}', '${data.email}')">Eliminar</button></td>
            </tr>
        `;
    });
}

async function handleDelete(userId, email) {
    const password = prompt(`Ingrese la contraseña para eliminar el usuario ${email}:`);
    if (password) {
        try {
            // Primero autentica al usuario
            await loginauth(email, password);
            // Luego elimina al usuario
            const success = await deleteuser(auth.currentUser);
            if (success) {
                document.getElementById(`row-${userId}`).remove();
                alert('Usuario eliminado exitosamente.');
            } else {
                alert('Error al eliminar el usuario.');
            }
        } catch (error) {
            console.error(error);
            alert('Error al autenticar o eliminar el usuario.');
        }
    }
}

window.addEventListener('DOMContentLoaded', async () => {
    cargar();
});