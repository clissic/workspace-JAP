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
      ciudad: userCiudadValue,  // Cambiar de userCiudad a ciudad
      pais: userPaisValue,
      telefono: userTelefonoValue,  // Cambiar userTelefono a telefono
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

// Obtén el elemento de entrada de archivo
const avatarInput = document.getElementById("avatarImg");

// Obtén el elemento de imagen para mostrar la imagen seleccionada
const profileImage = document.getElementById("profileImage");

// Agrega un evento change al elemento de entrada de archivo
avatarInput.addEventListener("change", function () {
  const file = avatarInput.files[0]; // Obtiene el primer archivo seleccionado

  if (file) {
    // Si se seleccionó un archivo
    const reader = new FileReader();

    reader.onload = function (e) {
      // Cuando se carga la imagen, establece la fuente de la imagen de perfil
      profileImage.src = e.target.result;

      // Guarda la imagen en el localStorage
      localStorage.setItem("avatarImage", e.target.result);
    };

    reader.readAsDataURL(file); // Lee el archivo como una URL de datos
  }
});


document.addEventListener("DOMContentLoaded", () => {


  // Verifica si hay información de usuario en el Local Storage
  if (localStorage.getItem("usuario")) {
    user = JSON.parse(localStorage.getItem("usuario"));

    // Establece los valores de país y ciudad desde el Local Storage
    userPais.value = user.pais;
    userCiudad.value = user.ciudad;
  }


  // Recupera la imagen del localStorage
  const avatarImage = localStorage.getItem("avatarImage");

  // Verifica si hay una imagen en el localStorage
  if (avatarImage) {
    // Establece la imagen de perfil
    profileImage.src = avatarImage;
  }
});



//* Cargar la lista de países desde el archivo "paises.json"
fetch('json/paises.json')
  .then(response => response.json())
  .then(data => {
    const userPais = document.getElementById('userPais');

    data.forEach(pais => {
      const option = document.createElement('option');
      option.value = pais.codigo;
      option.textContent = pais.nombre;
      userPais.appendChild(option);
    });
  })
  .catch(error => {
    console.error('Error al cargar la lista de países', error);
  });

// Cuando se selecciona un país, cargar la lista de ciudades correspondientes desde el archivo "ciudades.json"
document.getElementById('userPais').addEventListener('change', (event) => {
  const selectedCountry = event.target.value;
  const userCiudad = document.getElementById('userCiudad');

  // Cargar la lista de ciudades desde el archivo "ciudades.json" basado en el país seleccionado
  fetch('json/ciudades.json')
    .then(response => response.json())
    .then(data => {
      userCiudad.innerHTML = '<option value="">Selecciona tu ciudad</option>';
      const cities = data[selectedCountry] || [];

      cities.forEach(ciudad => {
        const option = document.createElement('option');
        option.value = ciudad;
        option.textContent = ciudad;
        userCiudad.appendChild(option);
      });
    })
    .catch(error => {
      console.error('Error al cargar la lista de ciudades', error);
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
