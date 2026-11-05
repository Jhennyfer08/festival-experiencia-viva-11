import { api } from "/frontend/js/config/api.js";

async function loadAll() {
    const container = document.getElementById("tbody");
    const composition = await api.get("/activities");
    let html = "";

    composition.content.forEach((element) => {
        html += `
            <tr>
                <td>${element.name}</td>
                <td>${element.description}</td>
                <td>${element.position}</td>
                <td>${element.capacity}</td>
                <td>${element.date}</td>
                <td>${element.time}</td>
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
        description: document.getElementById("description").value,
        image: document.getElementById("image").value,
        position: document.getElementById("position").value,
        capacity: document.getElementById("capacity").value,
        date: document.getElementById("date").value,
        time: document.getElementById("time").value,
    };

    const button = document.getElementById("submitButton");
    let result = "";

    if (button.textContent === "Alterar") {
        body.id = button.dataset.id;
        result = await api.put("/activities", body);
        button.textContent = "Cadastrar";
    } else {
        result = await api.post("/activities", body);
    }

    const error = document.getElementById("formError");
    if (!result.success) {
        error.textContent = result.message;
    } else {
        error.textContent = "";
        alert(result.message);
        event.target.reset();
    }

    await loadAll();
}

async function edit(id) {
    const composition = await api.get(`/activities/${id}`);

    document.getElementById("name").value = composition.content.name;
    document.getElementById("description").value = composition.content.description;
    document.getElementById("image").value = composition.content.image;
    document.getElementById("position").value = composition.content.position;
    document.getElementById("capacity").value = composition.content.capacity;
    document.getElementById("date").value = composition.content.date;
    document.getElementById("time").value = composition.content.time;

    const button = document.getElementById("submitButton");
    button.textContent = "Alterar";
    button.dataset.id = id;
}

async function remove(id) {
    const result = await api.delete(`/activities/${id}`);

    if (!result.success) {
        alert(result.message)
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
