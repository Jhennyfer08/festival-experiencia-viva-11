function adminLock() {
    const access = JSON.parse(localStorage.getItem("access"));

    if (access.role !== "admin") {
        window.location.href = "/frontend/html/auth/login.html";
        return;
    }
}

adminLock();