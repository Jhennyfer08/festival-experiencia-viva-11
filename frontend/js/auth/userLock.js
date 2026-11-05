function userLock() {
    const access = JSON.parse(localStorage.getItem("access"));

    if (access.role !== "user") {
        window.location.href = "/frontend/html/auth/login.html";
        return;
    }
}

userLock();