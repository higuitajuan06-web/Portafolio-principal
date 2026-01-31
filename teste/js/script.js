// 1. Verificación inicial de sesión
if (localStorage.getItem("userLoggedIn")) {
    window.location.href = "landing.html";
}

const API_URL = "http://localhost:3000/users";

const registerForm = document.getElementById("formform");
const emailInput = document.getElementById("regEmail");
const pass1Input = document.getElementById("regPass");
const pass2Input = document.getElementById("regPass2");
const errorBox = document.getElementById("formError");

//  Mostrar / ocultar contraseña
document.querySelectorAll(".toggle-pass").forEach(btn => {
  btn.addEventListener("click", () => {
    const input = document.getElementById(btn.dataset.target);
    input.type = input.type === "password" ? "text" : "password";
    btn.textContent = input.type === "password" ? "👁" : "🙈";
  });
});

//  Registro real
registerForm.addEventListener("click", async (e) => {
  errorBox.style.color = "#f87171";
  errorBox.textContent = "";

  const email = emailInput.value.trim();
  const pass1 = pass1Input.value;
  const pass2 = pass2Input.value;

  // 1) Validaciones básicas
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    errorBox.textContent = "Please enter a valid email address.";
    return;
  }
  if (pass1 !== pass2) {
    errorBox.textContent = "Passwords do not match.";
    return;
  }
  if (pass1.length < 8) {
    errorBox.textContent = "Password must be at least 8 characters long.";
    return;
  }

  try {
    // 2) Verificar si email ya existe
    const res = await fetch(`${API_URL}?email=${email}`);
    const users = await res.json();

    if (users.length > 0) {
      errorBox.textContent = "This email is already registered.";
      return;
    }

    // 3) CREAR EL OBJETO PRIMERO (Corrección del error anterior)
    const newUser = {
      email,
      password: pass1,
      createdAt: new Date().toISOString()
    };

    // 4) ENVIAR AL SERVIDOR
    const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser)
    });
    
    if (response.ok) {
        // --- ÉXITO CON SWEETALERT ---
        Swal.fire({
            title: "¡Registro Exitoso!",
            text: "Tu cuenta ha sido creada correctamente",
            icon: "success",
            confirmButtonColor: "#4ade80"
        }).then(() => {
            // Solo redirige cuando el usuario da click en el botón del alert
            window.location.href = "inicio.html"; 
        });

        errorBox.style.color = "#4ade80";
        errorBox.textContent = "✔ Registration successful!";
        registerForm.reset();
    }

  } catch (err) {
    Swal.fire({
        title: "Error",
        text: "No se pudo conectar con el servidor JSON",
        icon: "error"
    });
    errorBox.textContent = "Server error. Try again later.";
    console.error(err);
  }
});