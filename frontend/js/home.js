import { showDialog } from "./config/dialog.js";
import { api } from "/frontend/js/config/api.js";
import { formatDate, formatTime, validDate } from "/frontend/js/config/datetime.js";

async function createInscriptButton(activityId, participantId) {
    const result = await api.get(`/inscriptions/${activityId}/${participantId}`);

    if (!result.success) {
        return `<button type="button" class="inscript-button" data-activity="${activityId}">Se Inscrever</button>`;
    } else {
        return `<button type="button" class="inscript-button inscripted" data-activity="${activityId}" data-inscription="${result.content.id}">Cancelar Inscrição</button>`;
    }
}

async function loadActivities() {
    const access = JSON.parse(localStorage.getItem("access"));
    const container = document.getElementById("activity");
    const composition = await api.get("/activities");
    let html = "";

    for (const element of composition.content) {
        if (!validDate(element.date, element.time)) {
            html += `
            <article class="activity">
                <div class="img-container">
                    <img src="${element.image}" alt="${element.name}">
                </div>

                <div class="activity-info">
                    <h2>${element.name}</h2>
                    <p>${element.description}</p>
                    <address>${element.position}</address>
                    <time datetime="${element.date}-${element.time}"> ${formatDate(element.date)} às ${formatTime(element.time)}hrs </time>
                    ${await createInscriptButton(element.id, access.id)}
                </div>
            </article>
        `;
        }
    }
    container.innerHTML = html;

    document.querySelectorAll(".inscript-button").forEach((button) => {
        button.addEventListener("click", async (event) => {
            if (event.target.classList.contains("inscripted")) {
                await unsubscript(event);
            } else {
                await inscript(event);
            }
        });
    });
}

async function inscript(event) {
    const access = JSON.parse(localStorage.getItem("access"));
    const button = event.currentTarget;

    const body = {
        id_activity: Number(button.dataset.activity),
        id_participant: access.id,
    };

    const result = await api.post("/inscriptions", body);

    if (result.success) {
        button.dataset.inscription = result.id;
        await loadActivities();
    } else {
        await showDialog(result.message);
    }
}

async function unsubscript(event) {
    const button = event.currentTarget;
    const id = button.dataset.inscription;

    const result = await api.delete(`/inscriptions/${id}`);

    if (result.success) {
        delete button.dataset.inscription;
        await loadActivities();
    } else {
        await showDialog(result.message);
    }
}

await loadActivities();
