let user = JSON.parse(localStorage.getItem("usuario"));
console.log(user);

// INPUTS:
const primerNombre = document.getElementById("primerNombre");
const segundoNombre = document.getElementById("segundoNombre");
const primerApellido = document.getElementById("primerApellido");
const segundoApellido = document.getElementById("segundoApellido");
const userMail = document.getElementById("userEmail");
const avatarImg = document.getElementById("avatarImg");
const userTelefono = document.getElementById("userTelefono");
const userPais = document.getElementById("userPais");
const userCiudad = document.getElementById("userCiudad");
const botonGuardar = document.getElementById("botonGuardar");

document.addEventListener("DOMContentLoaded", async () => {
  // PUNTO 3 DEL ENTREGABLE:
  primerNombre.value = user.primerNombre
    ? user.primerNombre
    : primerNombre.value;
  segundoNombre.value = user.segundoNombre
    ? user.segundoNombre
    : segundoNombre.value;
  primerApellido.value = user.primerApellido
    ? user.primerApellido
    : primerApellido.value;
  segundoApellido.value = user.segundoApellido.value
    ? user.segundoApellido
    : segundoApellido.value;
  userMail.value = user.mail ? user.mail : userMail.value;
  userTelefono.value = user.telefono ? user.telefono : userTelefono.value;
  userPais.value = user.pais ? user.pais : userPais.value;
  userCiudad.value = user.ciudad ? user.ciudad : userCiudad.value;

  botonGuardar.addEventListener("click", async () => {
    const primerNombreValue = primerNombre.value;
    const segundoNombreValue = segundoNombre.value;
    const primerApellidoValue = primerApellido.value;
    const segundoApellidoValue = segundoApellido.value;
    const userMailValue = userMail.value;
    const avatarImgValue = avatarImg.value;
    const userTelefonoValue = userTelefono.value;
    const userPaisValue = userPais.value;
    const userCiudadValue = userCiudad.value;

    let user = {
      avatarImg: avatarImgValue,
      mail: userMailValue,
      primerApellido: primerApellidoValue,
      primerNombre: primerNombreValue,
      segundoApellido: segundoApellidoValue,
      segundoNombre: segundoNombreValue,
      userCiudad: userCiudadValue,
      userPais: userPaisValue,
      userTelefono: userTelefonoValue,
    };

    localStorage.setItem("usuario", JSON.stringify(user))

    const mensaje = document.getElementById("mensaje");
    mensaje.classList.add("text-success", "text-center", "fw-bold", "mb-5");
    mensaje.innerText = "INFORMACIÓN ACTUALIZADA"

    setTimeout(() => {
        mensaje.classList.remove("text-success", "text-center", "fw-bold", "mb-5")
        mensaje.innerText = ""
    }, 5000)
  });
});


// Funcion que guarda en el localstorage los datos del usuario (punto 2, entrega 7)

const form = document.getElementById("datosUsuario");

form.addEventListener("submit", (e) => {
  const name= document.getElementById("primerNombre").value;
  const lastName = document.getElementById("primerApellido").value;
  const email = document.getElementById("userEmail").value;

  localStorage.setItem("nombre", name);
  localStorage.setItem("apellido", lastName);
  localStorage.setItem("email", email);

})