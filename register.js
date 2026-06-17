const mensajeError = document.getElementsByClassName("error")[0];

document.getElementById("register-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const user = e.target.user.value;
    const password = e.target.password.value;

    try {
        const res = await fetch("http://localhost:4000/api/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user, password })
        });

        if (!res.ok) {
            if (mensajeError) mensajeError.style.display = "block";
            return;
        }

        const resJson = await res.json();
        if (resJson.redirect) {
            window.location.href = resJson.redirect;
        }
    } catch (error) {
        if (mensajeError) mensajeError.style.display = "block";
    }
});