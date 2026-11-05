export async function showDialog(message) {
    const html = `
        <dialog id="dialog" class="dialog">
            <span class="icon">&#10177;</span>
            <h3>&#11030; ${message} &#11031;</h3>
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
