{
    // 1. Chequeo de seguridad
    const session = localStorage.getItem("userLoggedIn");
    
    if (!session) {
        // Si no hay sesión, lo mandamos de vuelta al Registro (tu página principal)
        window.location.href = "index.html"; 
    }
    
    // 2. Lógica para mostrar quién entró y cerrar sesión
    document.addEventListener("DOMContentLoaded", () => {
        const welcomeMsg = document.getElementById("welcomeMessage");
        if (welcomeMsg) welcomeMsg.textContent = `Bienvenido, ${session}`;
    
        const btnLogout = document.getElementById("btnLogout");
        btnLogout.addEventListener("click", () => {
            localStorage.removeItem("userLoggedIn"); // Borramos la sesión
            window.location.href = "index.html"; // Al registro otra vez
        });
    });
}


// ¿Hay alguien logueado?
const session = localStorage.getItem("userLoggedIn");

if (!session) {
    // Si NO hay nadie, mándalo de patitas a la calle (al login)
    window.location.href = "login.html";
} else {
    // Si SI hay alguien, salúdalo
    console.log("Acceso concedido a: " + session);
    // Ejemplo: document.getElementById("username").innerText = session;
}


console.log(Date.now());

const menuBtn = document.getElementById('mobile-menu');
const navLinks = document.getElementById('nav-list');

menuBtn.addEventListener('click', () => {
    // Al hacer clic, quita o pone la clase 'active'
    navLinks.classList.toggle('active');
    
    // Opcional: Pequeña animación al botón
    menuBtn.classList.toggle('is-active');
});