async function loadComponents(filepath, containerId) {
    const container = document.getElementById(containerId);

    const url = new URL(filepath, document.baseURI);
    const response = await fetch(url);

    const html = await response.text();
    container.innerHTML = html;
}

async function loadNavbar() {
    const access = JSON.parse(localStorage.getItem("access")) || "";
    const container = document.getElementById("nav");
    let html = "";

    if (access.role === "admin") {
        html += `
            <ul>
                <li><a href="/frontend/html/admin/dashboard.html">Métricas</a></li>
                <li><a href="/frontend/html/admin/participants.html">Participantes</a></li>
                <li><a href="/frontend/html/admin/activities.html">Atividades</a></li>
                <li><a href="/frontend/html/admin/inscriptions.html">Inscrições</a></li>
                <li><a href="#" id="logout">Sair</a></li>
            </ul>
        `;
    } else if (access.role === "user") {
        html += `
            <ul>
                <li><a href="/frontend/html/home.html">Início</a></li>
                <li><a href="/frontend/html/home.html#footer">Sobre</a></li>
                <li><a href="#" id="logout">Sair</a></li>
            </ul>
        `;
    } else {
        html += `
            <ul>
                <li><a href="/frontend/html/auth/login.html">Entrar</a></li>
                <li><a href="/frontend/html/auth/register.html">Cadastrar</a></li>
            </ul>
        `;
    }

    container.innerHTML = html;

    const logout = document.getElementById("logout");
    if (logout) {
        logout.addEventListener("click", () => {
            localStorage.removeItem("logout");
            window.location.href = "/frontend/html/auth/login.html";
        });
    }
}

await loadNavbar();
await loadComponents("/frontend/html/components/header.html", "header");
await loadComponents("/frontend/html/components/footer.html", "footer");
