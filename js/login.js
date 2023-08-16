const botonLogin = document.getElementById("botonLogin");
botonLogin.addEventListener("click", ValidarUsuario);

const num = 2;
function ValidarUsuario(){
    const mail = document.getElementById("mail").value;
    const password = document.getElementById("password").value;
    if(mail && password){
        const usuario = {
            mail: mail,
            password: password
        }
        console.log(usuario);
        const usuarioJSON = JSON.stringify(usuario);
        localStorage.setItem("usuario", usuarioJSON);
        window.location.href = "index.html";
    }else{
        alert("¡Debes llenar todos los campos!");
    }
}