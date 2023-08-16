const botonLogin = document.getElementById("botonLogin");
botonLogin.addEventListener("click", ValidarUsuario);

const mail = document.getElementById("mail").value;
const password = document.getElementById("password").value;

const num = 2;
function ValidarUsuario(){
    //const usuariosJSON = JSON.parse(localStorage.getItem("usuario"));
    if(num == 2){
        const usuario = {
            mail: mail,
            password: password
        }
        console.log(usuario);
        const usuarioJSON = JSON.stringify(usuario);
        localStorage.setItem("usuario", usuarioJSON);
        window.location.href = "index.html";
    }else{
        alert("El usuario o la contraseña son incorrectos.");
    }
}