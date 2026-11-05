import { api } from "/frontend/js/config/api.js";

async function register(event) {
    event.preventDefault();

    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
        alert("As senhas precisam ser iguais.");
        return;
    }

    const body = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        password: password,
    };

    const result = await api.post("/participants", body);

    const error = document.getElementById("formError");
    if (!result.success) {
        error.textContent = result.message;
    } else {
        error.textContent = "";
        alert(result.message);
        event.target.reset();

        window.location.href = "/frontend/html/auth/login.html";
    }
}

document.getElementById("form").addEventListener("submit", register);
