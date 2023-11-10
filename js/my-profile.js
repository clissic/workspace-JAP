let user = JSON.parse(localStorage.getItem("usuario"));
console.log(user);

// INPUTS:
const primerNombre = document.getElementById("primerNombre");
const segundoNombre = document.getElementById("segundoNombre");
const primerApellido = document.getElementById("primerApellido");
const segundoApellido = document.getElementById("segundoApellido");
const userMail = document.getElementById("userMail");
const avatarImg = document.getElementById("avatarImg");
const userTelefono = document.getElementById("userTelefono");
const userPais = document.getElementById("userPais");
const userCiudad = document.getElementById("userCiudad");
const botonGuardar = document.getElementById("botonGuardar");
const userEmail = document.getElementById("userEmail");
const userNombre = document.getElementById("userNombre");

document.addEventListener("DOMContentLoaded", async () => {
  // PUNTO 3 DEL ENTREGABLE:
  if (user) {
    primerNombre.value = user.primerNombre
      ? user.primerNombre
      : primerNombre.value;
    segundoNombre.value = user.segundoNombre
      ? user.segundoNombre
      : segundoNombre.value;
    primerApellido.value = user.primerApellido
      ? user.primerApellido
      : primerApellido.value;
    segundoApellido.value = user.segundoApellido
      ? user.segundoApellido
      : segundoApellido.value;
    userMail.value = user.mail ? user.mail : userMail.value;
    userTelefono.value = user.telefono ? user.telefono : userTelefono.value;
    userPais.value = user.pais ? user.pais : userPais.value;
    userCiudad.value = user.ciudad ? user.ciudad : userCiudad.value;
    userNombre.innerText = user.primerNombre + " " + user.primerApellido;
    userEmail.innerText = user.mail;
  }

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
      ciudad: userCiudadValue, 
      pais: userPaisValue,
      telefono: userTelefonoValue,  
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


const avatarInput = document.getElementById("avatarImg");


const profileImage = document.getElementById("profileImage");


avatarInput.addEventListener("change", ()=> {
  const file = avatarInput.files[0]; 

  if (file) {
    
    const reader = new FileReader();

    reader.onload =  (e)=> {
      
      profileImage.src = e.target.result;

      
      localStorage.setItem("avatarImage", e.target.result);
    };

    reader.readAsDataURL(file); 
  }
});

document.addEventListener("DOMContentLoaded", () => {

  
  const avatarImage = localStorage.getItem("avatarImage");
  if (avatarImage) {
    profileImage.src = avatarImage;
  }
});