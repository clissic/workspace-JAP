const usuario = JSON.parse(localStorage.getItem("usuario"));
if(usuario){
    console.log("El usuario esta registrado como: " + usuario)
}else{
    window.location.href = "login.html"
}

