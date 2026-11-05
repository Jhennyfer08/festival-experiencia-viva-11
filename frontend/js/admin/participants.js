import { api } from "/frontend/js/config/api.js";
import { showDialog } from "/frontend/js/config/dialog.js";

async function loadAll() {
    const container = document.getElementById("tbody");
    const composition = await api.get("/participants");
    let html = "";

    composition.content.forEach((element) => {
        html += `
            <tr>
                <td data-label="Nome: ">${element.name}</td>
                <td data-label="Email: ">${element.email}</td>
                <td>
                    <button type="button" class="edit-button" data-id="${element.id}">Editar</button>
                </td>
                <td>
                    <button type="button" class="delete-button" data-id="${element.id}">Excluir</button>
                </td>
            </tr>
        `;
    });

    container.innerHTML = html;
}

async function save(event) {
    event.preventDefault();

    const body = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
    };

    const button = document.getElementById("submitButton");
    let result = "";

    if (button.textContent === "Alterar") {
        body.id = button.dataset.id;
        result = await api.put("/participants", body);
        button.textContent = "Cadastrar";
    } else {
        result = await api.post("/participants", body);
    }

    const error = document.getElementById("formError");
    if (!result.success) {
        error.textContent = result.message;
    } else {
        error.textContent = "";
        await showDialog(result.message);
        event.target.reset();
    }

    await loadAll();
}

async function edit(id) {
    const composition = await api.get(`/participants/${id}`);

    document.getElementById("name").value = composition.content.name;
    document.getElementById("email").value = composition.content.email;
    document.getElementById("password").value = composition.content.password;

    const button = document.getElementById("submitButton");
    button.textContent = "Alterar";
    button.dataset.id = id;
}

async function remove(id) {
    const result = await api.delete(`/participants/${id}`);

    if (!result.success) {
        await showDialog(result.message)
    }

    await loadAll();
}

document.getElementById("form").addEventListener("submit", save);
document.getElementById("tbody").addEventListener("click", async (event) => {
    if (event.target.classList.contains("edit-button")) {
        await edit(event.target.dataset.id)
    }
    if (event.target.classList.contains("delete-button")) {
        await remove(event.target.dataset.id)
    }
});

await loadAll();
