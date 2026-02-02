// ... validación de contraseña correcta ...
localStorage.setItem("userLoggedIn", userFound.email);
window.location.href = "landing.html"; // ¡Lo mandas a la Landing!


const API_URL = "http://localhost:3000/users";
const loginForm = document.getElementById("loginForm");
const emailInput = document.getElementById("logEmail");
const passInput = document.getElementById("logPass");
const errorBox = document.getElementById("formError");

loginForm.addEventListener("submit", async (e) => {
    e.preventDefault(); // Evita que la página se recargue
    const email = emailInput.value.trim();
    const pass = passInput.value;

    try {
        // 1. Buscamos al usuario por su email en el servidor
        // Usamos ?email= para que JSON Server filtre automáticamente
        const response = await fetch(`${API_URL}?email=${email}`);
        const users = await response.json();

        // 2. ¿El usuario existe? (Si el array tiene algo, es que sí)
        if (users.length === 0) {
            errorBox.textContent = "Este correo no está registrado.";
            return;
        }

        const userFound = users[0]; // El primer (y único) usuario encontrado

        // 3. ¿La contraseña coincide?
        if (userFound.password === pass) {
            
            // ¡ÉXITO! Guardamos el nombre o email en la memoria del navegador
            localStorage.setItem("userLoggedIn", userFound.email);

            Swal.fire({
                title: "¡Bienvenido!",
                text: "Inicio de sesión correcto",
                icon: "success"
            }).then(() => {
                // Redirigir a la página principal
                window.location.href = "Landinpagin.html"; 
            });

        } else {
            errorBox.textContent = "Contraseña incorrecta.";
        }

    } catch (error) {
        console.error("Error en el login:", error);
        errorBox.textContent = "Error al conectar con el servidor.";
    }
});