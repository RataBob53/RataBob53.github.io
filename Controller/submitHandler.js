document.addEventListener('DOMContentLoaded', (event) => {
    const form = document.getElementById('formreg');
    form.addEventListener('submit', (e) => {
      e.preventDefault(); // Evitar el comportamiento por defecto del formulario
      window.location.href = 'registrarP.html'; // Redireccionar a registrarP.html
    });
  });