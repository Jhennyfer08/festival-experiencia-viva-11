export async function showDialog(message) {
    let html = "";

    html = `
        <dialog class="dialog" id="dialog">
            <span>&#10177;</span>
            <p>&#11030; ${message} &#11031;</p>
        </dialog>
    `;

    document.body.insertAdjacentHTML("beforeend", html);
    const dialog = document.getElementById("dialog");

    return new Promise((resolve) => {
        dialog.addEventListener("click", () => {
            dialog.close();
            dialog.remove();
            resolve();
        });

        dialog.showModal();
    });
}