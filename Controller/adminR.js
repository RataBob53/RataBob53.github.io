import { loginvalidation} from "./firebase";

document.addEventListener('DOMContentLoaded', () => {
    const loginBtn = document.getElementById("loginbtn");

    loginBtn.addEventListener('click', async (event) => {
        event.preventDefault();

        const email = document.getElementById("edtuser").value;
        const password = document.getElementById("edtpassword").value;

        // Validar que los campos no estén vacíos
        if (!email || !password) {
            alert('Por favor, complete todos los campos.');
            return;
        }

        try {
            const validation = await loginvalidation(email, password);

            // Verificar si el correo electrónico es el correo electrónico administrativo
            if (email === "juan23@gmail.com") { // Reemplaza "correo@admin.com" con tu correo electrónico administrativo
                // Usuario es un administrador
                alert('Inicio de sesión como administrador exitoso.');
                // Redirige al panel de administrador o realiza otras acciones administrativas
                window.location.href = "../Templates/Admin.html";
            }
        } catch (error) {
            alert(error.message);
            console.log('Error de autenticación:', error);
        }
    });
});