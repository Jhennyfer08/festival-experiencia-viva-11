import { api } from "/frontend/js/config/api.js";

async function loadMetrics() {
    const container = document.getElementById("metrics");

    const activities = await api.get("/activities");
    const participants = await api.get("/participants");
    const inscriptions = await api.get("/inscriptions");
    let html = "";

    let totalCapacity = 0;
    let totalQuantity = 0;

    activities.content.forEach((activity) => {
        totalCapacity += activity.capacity;
        totalQuantity += activity.quantity;
    });

    html = `
        <article class="metric">
            <div class="icon">
                <p>&#10064;</p>
            </div>

            <div class="metric-info">
                <h2>Atividades</h2>
                <span>${activities.content.length}</span>
            </div>

            <p>em andamento</p>
        </article>

        <article class="metric">
            <div class="icon">
                <p>&#9786;</p>
            </div>

            <div class="metric-info">
                <h2>Participants</h2>
                <span>${participants.content.length}</span>
            </div>

            <p>cadastros únicos</p>
        </article>

        <article class="metric">
            <div class="icon">
                <p>&#9998;</p>
            </div>

            <div class="metric-info">
                <h2>Inscrições</h2>
                <span>${inscriptions.content.length}</span>
            </div>

            <p>vagas preenchidas</p>
        </article>

        <article class="metric">
            <div class="icon">
                <p>&#9685;</p>
            </div>

            <div class="metric-info">
                <h2>Vagas</h2>
                <span>${((totalQuantity / totalCapacity) * 100).toFixed(1)}%</span>
            </div>

            <p>${totalQuantity} de ${totalCapacity} vagas</p>
        </article>
    `;

    container.innerHTML = html;
}

async function loadParticipants(participants) {
    let html = "";
    
    if (participants) {
        participants.forEach(participant => {
            html += `<li>${participant}</li>`;
        });
    }
    
    return html;
}

async function loadActivities() {
    const container = document.getElementById("dashboard");
    const composition = await api.get("/activities/inscripted");
    let html = "";
    
    for (const element of composition.content) {
        html += `
            <article class="activity">
                <div class="img-container">
                    <img src="${element.image}" alt="${element.name}">
                </div>

                <div class="activity-info">
                    <h2>${element.name}</h2>
                    <p>${element.description}</p>
                    <address>${element.position}</address>
                    <time datetime="${element.date}-${element.time}"> ${element.date} às ${element.time}hrs </time>
                    <div class="participants">
                        <h2>Participantes - ${element.quantity} de ${element.capacity}</h2>
                        <ul>${await loadParticipants(element.inscripted)}</ul>
                    </div>
                </div>
            </article>
        `;
    }

    container.innerHTML = html;
}

await loadMetrics();
await loadActivities();
