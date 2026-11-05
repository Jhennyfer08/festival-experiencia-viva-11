import { api } from "/frontend/js/config/api.js";
import { showDialog } from "/frontend/js/config/dialog.js";

async function login(event) {
    event.preventDefault();

    const body = {
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
    };

    const result = await api.post("/participants/login", body);

    const error = document.getElementById("formError");
    if (!result.success) {
        error.textContent = result.message;
    } else {
        error.textContent = "";
        await showDialog(result.message);
        event.target.reset();

        localStorage.removeItem("access");
        localStorage.setItem("access");
        const access = JSON.parse(localStorage.getItem("access"));

        if (access.role === "admin") {
            window.location.href = "/frontend/html/admin/participant.html";
        } else {
            window.location.href = "/frontend/html/home.html";
        }
    }
}

document.getElementById("form").addEventListener("submit", login);
