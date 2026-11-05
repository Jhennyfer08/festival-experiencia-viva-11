import { api } from "/frontend/js/config/api.js";
import { showDialog } from "/frontend/js/config/dialog.js";

async function createOptions(containerId, route) {
    const container = document.getElementById(containerId);
    const composition = await api.get(route);
    let html = "";

    composition.content.forEach((element) => {
        html += `<option value="${element.id}">${element.name}</option>`;
    });

    container.innerHTML += html;
}

async function loadAll() {
    const container = document.getElementById("tbody");
    const composition = await api.get("/participants");
    let html = "";

    composition.content.forEach((element) => {
        html += `
            <tr>
                <td data-label="Atividade: ">${element.activity}</td>
                <td data-label="Participante: ">${element.participant}</td>
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
        id_activity: document.getElementById("id_activity").value,
        id_participant: document.getElementById("id_participant").value,
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

function editOptions(selectId, optionValue) {
    const option = document.querySelector(`#${selectId} option[value="${optionValue}"]`);
    option.selected = "true";
}

async function edit(id) {
    const composition = await api.get(`/participants/${id}`);

    editOptions("id_activity", composition.content.id_activity);
    editOptions("id_participant", composition.content.id_participant);

    const button = document.getElementById("submitButton");
    button.textContent = "Alterar";
    button.dataset.id = id;
}

async function remove(id) {
    const result = await api.delete(`/participants/${id}`);

    if (!result.success) {
        await showDialog(result.message);
    }

    await loadAll();
}

document.getElementById("form").addEventListener("submit", save);
document.getElementById("tbody").addEventListener("click", async (event) => {
    if (event.target.classList.contains("edit-button")) {
        await edit(event.target.dataset.id);
    }
    if (event.target.classList.contains("delete-button")) {
        await remove(event.target.dataset.id);
    }
});

await createOptions("id_activity", "/activities");
await createOptions("id_participant", "/participants");
await loadAll();
