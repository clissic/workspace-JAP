const botonLogin = document.getElementById("botonLogin");
botonLogin.addEventListener("click", ValidarUsuario);

function ValidarUsuario(){
    const mail = document.getElementById("mail").value;
    const password = document.getElementById("password").value;
    if(mail && password){
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
        window.location.href = "index.html";
    } else {
        alert("¡Debes llenar todos los campos!");
    }
}

/* const botonLogin = document.getElementById("botonLogin");

botonLogin.addEventListener("click", () => {
    const mail = document.getElementById("mail").value;
    const password = document.getElementById("password").value;

    if (mail && password) {
        // Crear objeto con las credenciales del usuario
        const loginUsuario = {
            mail: mail,
            password: password
        };

        // Realizar una solicitud HTTP POST al servidor
        fetch('http://localhost:3000/login/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginUsuario),
        })
        .then(response => response.json())
        .then(data => {
            // Manejar la respuesta del servidor
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
                // Guardar el token en el almacenamiento local
                localStorage.setItem('access-token', data.token);
                // Redirigir a la página de inicio (o realizar otras acciones después de la autenticación)
                window.location.href = 'index.html';
            } else {
                // Mostrar un mensaje de error si la autenticación falla
                alert('Credenciales incorrectas');
            }
        })
        .catch(error => {
            console.error('Error al realizar la solicitud:', error);
        });
    } else {
        alert('¡Debes llenar todos los campos!');
    }
}); */