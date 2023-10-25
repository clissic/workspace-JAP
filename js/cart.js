const url = "https://japceibal.github.io/emercado-api/user_cart/25801.json";

const tbodyContenedor = document.getElementById("contenedor");

document.addEventListener("DOMContentLoaded", async () => {
async function fetchData(url) {
    try {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Hubo un problema con la solicitud.`);
    }

    const data = await response.json();
    return data;
    } catch (error) {
    console.error("Error al realizar la solicitud:", error);
    }
}

async function chargeContent() {
    const productoRel = await obtenerDatos(); // Obtener el producto relacionado
    tbodyContenedor.innerHTML = productoRel; // Mostrar el producto relacionado
}

async function productoRelacionado() {
    const resultado = await fetchData(url);
    return resultado;
}

async function obtenerDatos() {
    const datos = await productoRelacionado();
    const contenedorTbody = `
    <tr>
        <td class="tittles">
            <input id="productInfo" type="image" title="imagenProducto" alt="imagenProducto" style="height: 50px;" src="${
                datos.articles[0].image
            }" />
    </td>
        <td class="tittles">${datos.articles[0].name}</td>
        <td class="tittles">${datos.articles[0].currency} ${
    datos.articles[0].unitCost
    }</td>
        <td class="tittles">${datos.articles[0].count}</td>
        <td class="tittles">${datos.articles[0].currency} ${
      datos.articles[0].count * datos.articles[0].unitCost
    }</td>
    </tr>`;
    return contenedorTbody;
}

async function botonAInfo() {
    await chargeContent();
    document
    .getElementById("productInfo")
    .addEventListener("click", async () => {
        var datos = await productoRelacionado();
        localStorage.setItem("productId", datos.articles[0].id);
        if (datos.articles[0].id) {
        location.href = "./product-info.html";
        }
    });
}

async function mostrarProductosEnCarrito() {
    const cartSim = JSON.parse(localStorage.getItem("cartSim")) || [];

    for (const productoEnCarrito of cartSim) {
    const producto = productoEnCarrito.producto;
    const contenedorBody = `
        <tr>
        <td class="tittles">
            <input id="productInfo${producto.id}" type="image" title="imagenProducto" alt="imagenProducto" style="height: 50px;" src="${producto.image}" />
        </td>
        <td class="tittles">${producto.name}</td>
        <td class="tittles">${producto.currency} ${producto.cost}</td>
        <td class="tittles">${productoEnCarrito.cantidad}</td>
          <td class="tittles">${producto.currency} ${productoEnCarrito.cantidad * producto.cost}</td>
        </tr>`;
    tbodyContenedor.innerHTML += contenedorBody;

      // Agregar un listener al botón de la imagen para ir a la página "product-info.html"
    const productInfoButton = document.getElementById(`productInfo${producto.id}`);
    productInfoButton.addEventListener("click", () => {
        localStorage.setItem("productId", producto.id);
        location.href = "./product-info.html";
    });
    }
}

chargeContent();
botonAInfo();
mostrarProductosEnCarrito();
});


// Obtén referencias a los elementos que deseas mostrar u ocultar
var creditFields = document.querySelector('.credit-fields');
var debitFields = document.querySelector('.debit-fields');

// Establece el estilo por defecto en "display: none" para ambos contenedores
creditFields.style.display = 'none';
debitFields.style.display = 'none';

// Obtén referencias a los botones de radio
var creditRadio = document.querySelector('input[value="credit"]');
var debitRadio = document.querySelector('input[value="debit"]');

// Agrega un evento change a los botones de radio
creditRadio.addEventListener('change', function () {
    creditFields.style.display = 'block';
    debitFields.style.display = 'none';
});

debitRadio.addEventListener('change', function () {
    creditFields.style.display = 'none';
    debitFields.style.display = 'block';
});
