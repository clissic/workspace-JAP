// FUNCIÓN PARA MOSTRAR LOS COMENTARIOS EN EL HTML
function mostrarComentarios(comentarios) {
  const comentariosContainer = document.getElementById("comentarios-producto");
  comentariosContainer.innerHTML = "";

  comentarios.forEach((comentario) => {
    const comentarioElement = document.createElement("div");
    comentarioElement.classList.add("list-group-item");
    comentarioElement.innerHTML = `
        <h5 class="mb-1 userYfecha">${comentario.user} - ${comentario.dateTime}</h5>
        <p class="mb-1" estrellas>Puntuación: <span class="estrellas">${stars(comentario.score)}</span></p>
        <p class="mb-1">${comentario.description}</p>
      `;
    comentariosContainer.appendChild(comentarioElement);
  });
}

// FUNCIÓN PARA OBTENER EL FORMATO DE ESTRELLAS PARA LA PUNTUACIÓN
function stars(cantidadStars) {
  const filledStars = '★'.repeat(cantidadStars);
  const emptyStars = '☆'.repeat(5 - cantidadStars);
  return `<span class="checked">${filledStars}</span>${emptyStars}`;
}

// FUNCIÓN FETCH PARA OBTENER DATOS DE UNA API
async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Error al obtener los datos");
    }
  } catch (error) {
    console.error("Error al cargar el archivo JSON:", error);
  }
}

// FUNCIÓN QUE HACE FETCH A LA API PARA OBTENER UN PRODUCTO
async function getProduct() {
  var selectedProductId = localStorage.getItem("productId");
  const producto = await fetchData(
    `https://japceibal.github.io/emercado-api/products/${selectedProductId}.json`
  );
  return producto;
}

// FUNCIÓN QUE HACE FETCH A LA API PARA OBTENER LOS COMENTARIOS DE UN PRODUCTO
async function getComments() {
  var selectedProductId = localStorage.getItem("productId");
  const comentarios = await fetchData(
    `https://japceibal.github.io/emercado-api/products_comments/${selectedProductId}.json`
  );
  return comentarios;
}

document.addEventListener("DOMContentLoaded", async () => {
  producto = await getProduct();
  comentarios = await getComments();
  console.log(producto);
  console.log(comentarios);
});

//  OBTIENE LA INFORMACIÓN DE DICHO PRODUCTO Y LA PRESENTA
document.addEventListener("DOMContentLoaded", async () => {
  try {
    // OBTENER EL PRODUCTO Y LOS COMENTARIOS
    const producto = await getProduct();
    const comentarios = await getComments();

    // ACTUALIZAR LOS ELEMENTOS HTML EN PRODUCT-INFO.HTML CON LOS DATOS DEL PRODUCTO
    document.getElementById("nombre-producto").textContent = producto.name;
    document.getElementById(
      "precio-producto"
    ).textContent = `${producto.cost} ${producto.currency}`;
    document.getElementById("descripcion-producto").textContent =
      producto.description;
    document.getElementById("categoria-producto").textContent =
      producto.category;
    document.getElementById("vendidos-producto").textContent =
      producto.soldCount;

    // ACTUALIZAR LAS IMÁGENES DEL PRODUCTO
    const contenedorImagenes = document.getElementById(
      "contenedor-imagenes-producto"
    );
    producto.images.forEach((imagen) => {
      const imgElement = document.createElement("img");
      imgElement.src = imagen;
      contenedorImagenes.appendChild(imgElement);
    });

    const botonComentario = document.getElementById("botonComentario");
    botonComentario.addEventListener("click", (e) => {
      e.preventDefault();
      const valueComentario = document.getElementById("comentario").value;
      const valuePuntuacion = document.getElementById("puntuacion").value;
      const usuario = JSON.parse(localStorage.getItem("usuario")).mail;
      const comentarioElement = document.createElement("div");
      const fecha = new Date();
      const comentariosContainer = document.getElementById("comentarios-producto");
      comentarioElement.classList.add("list-group-item");
      comentarioElement.innerHTML = `
        <h5 class="mb-1 userYfecha">${usuario} - ${fecha
        .toISOString()
        .replace("T", " ")
        .slice(0, 19)}</h5>
        <p class="mb-1">Puntuación: <span class="estrellas">${stars(valuePuntuacion)}</span></p>
      `;

      const comentarioTextoElement = document.createElement("p");
      comentarioTextoElement.classList.add("mb-1");
      comentarioTextoElement.innerText = valueComentario;
      comentarioElement.appendChild(comentarioTextoElement);
    
      comentariosContainer.appendChild(comentarioElement);
    });
  } catch (error) {
    console.error("Error al obtener o procesar los datos:", error);
  }

  mostrarComentarios(comentarios);
});
