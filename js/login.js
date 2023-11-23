const botonLogin = document.getElementById("botonLogin");

botonLogin.addEventListener("click", () => {
    const mail = document.getElementById("mail").value;
    const password = document.getElementById("password").value;

    if (mail && password) {
        const loginUsuario = {
            mail: mail,
            password: password
        };
        fetch("http://localhost:3000/login/signin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(loginUsuario),
        })
        .then(response => response.json())
        .then(data => {
            if (data.token) {
                const usuario = {
                    mail: mail,
                    primerNombre: "",
                    segundoNombre: "",
                    primerApellido: "",
                    segundoApellido: "",
                    avatarImg: "",
                    userTelefono: "",
                    userPais: "",
                    userCiudad: "",
                }
                const usuarioJSON = JSON.stringify(usuario);
                localStorage.setItem("usuario", usuarioJSON);
                localStorage.setItem("access-token", data.token);
                window.location.href = "index.html";
            } else {
                alert("Credenciales incorrectas!");
            }
        })
        .catch(error => {
            console.error("Error al realizar la solicitud:", error);
        });
    } else {
        alert("¡Debes llenar todos los campos!");
    }
});