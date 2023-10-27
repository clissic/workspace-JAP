const url = "https://japceibal.github.io/emercado-api/user_cart/25801.json";
var total = 0;
var ArraytotalActualizado = [];
const tbodyContenedor = document.getElementById("contenedor");
const dolar = 40;

async function fetchData(url) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw Error(`Hubo un problema con la solicitud.`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al realizar la solicitud:", error);
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  // FUNCION QUE CONVIERTE EL PRODUCTO QUE VIENE POR FETCH EN UN OBJETO CON LA ESTRUCTURA DE NUESTRO CARRITO (addToCart(id) en products.js:76)
  async function colocarItemEnLS() {
    const cartSim = JSON.parse(localStorage.getItem("cartSim")) || [];
    const data = await fetchData(url);
    const carToFetchId = data.articles[0].id;
    const carToPush = await fetchData(
      `https://japceibal.github.io/emercado-api/products/${carToFetchId}.json`
    );
    const existingItem = cartSim.find((item) => item.id === carToPush.id);
    if (!existingItem) {
      const localStorageApiItem = {
        id: carToPush.id,
        cantidad: 1,
        producto: carToPush,
      };
      cartSim.push(localStorageApiItem);
      localStorage.setItem("cartSim", JSON.stringify(cartSim));
    }
  }

  // FUNCION QUE CALCULA EL SUBTOTAL Y LO IMPRIME EN HTML
  async function calcularSubtotal() {
    const cartSim = JSON.parse(localStorage.getItem("cartSim")) || [];
    for (let dato of cartSim) {
      const countConteiner = document.getElementById(
        `count-${dato.producto.id}`
      );

      const subtotalConteiner = document.getElementById(
        `subTotal-${dato.producto.id}`
      );

      countConteiner.addEventListener("input", () => {
        const valorSubTotal = countConteiner.value * dato.producto.cost;
        let valorProducto = 0;
        if (countConteiner.value <= 1) {
          dato.cantidad = 1;
          countConteiner.value = 1;
          valorProducto = dato.producto.cost;
          console.log("Entro aca");
          actualizarTotal();
        } else {
          dato.cantidad = countConteiner.value;
          valorProducto = countConteiner.value * dato.producto.cost;
          actualizarTotal();
        }
        subtotalConteiner.innerHTML =
          dato.producto.currency + " " + valorProducto;
        localStorage.setItem("cartSim", JSON.stringify(cartSim));
      });
    }
  }

  // FUNCION QUE IMPRIME LOS PRODUCTOS EN EL CARRITO
  async function mostrarProductosEnCarrito() {
    const cartSim = JSON.parse(localStorage.getItem("cartSim")) || [];
    for (const productoEnCarrito of cartSim) {
      const producto = productoEnCarrito.producto;
      const productoImagen = producto.image || producto.images[0];
      const prodSubTotal = productoEnCarrito.cantidad * producto.cost;
      const id = `subTotal-${producto.id}`;
      ArraytotalActualizado.push(id);
      const contenedorBody = `
        <tr>
          <td class="tittles">
            <input class="redirect" id="${producto.id}" type="image" title="imagenProducto" alt="imagenProducto" style="height: 50px;" src="${productoImagen}" />
          </td>
          <td class="tittles">${producto.name}</td>
          <td class="tittles">${producto.currency} ${producto.cost}</td>
          <td class="tittles"><input id="count-${producto.id}" type="number" min="1" value="${productoEnCarrito.cantidad}" name="prodEnCarrito"/></td>
          <td class="tittles" id="${id}">${producto.currency} ${prodSubTotal}</td>
          <td class="tittles">
          <button class="btn btn-danger eliminar" data-id="${producto.id}"><i class="fas fa-trash"></i></button>
        </td>
        </tr>`;
      tbodyContenedor.innerHTML += contenedorBody;
    }
    document
      .getElementById("modalTerminos")
      .addEventListener("hide.bs.modal", function (event) {
        // Obtiene los campos de entrada
        const cardNumber = document.getElementById("cardNumber");
        const secCode = document.getElementById("secCode");
        const expDate = document.getElementById("expDate");
        const countNumber = document.getElementById("countNumber");

        // Verifica si los campos requeridos están completos y son válidos
        const creditCardRadio = document.getElementById("creditCard");
        const debitCardRadio = document.getElementById("debitCard");

        if (creditCardRadio.checked) {
          if (!cardNumber.checkValidity() || !secCode.checkValidity() || !expDate.checkValidity()) {
            event.preventDefault();
          }
        } else if (debitCardRadio.checked) {
          if (countNumber.value.trim() === "") {
            event.preventDefault();
          }
        } else {
          // Si no se selecciona ningún método de pago, evita cerrar el modal y muestra un mensaje de error
          event.preventDefault();
          const feedbackChecked = document.getElementById("feedBackChecked");
          feedbackChecked.classList.add("text-danger");
          feedbackChecked.innerHTML = "Debe seleccionar un método de pago";
        }
      });

    // Función para eliminar un producto del carrito por su ID
    function eliminarProductoDelCarrito(id) {
      const cartSim = JSON.parse(localStorage.getItem("cartSim")) || [];
      const nuevoCarrito = cartSim.filter(
        (productoEnCarrito) => productoEnCarrito.id != id
      );
      localStorage.setItem("cartSim", JSON.stringify(nuevoCarrito));
    }

    // Asociar manejador de eventos a los botones de "Eliminar"
    const botonesEliminar = document.querySelectorAll(".eliminar");
    botonesEliminar.forEach((boton) => {
      boton.addEventListener("click", async (event) => {
        const id = event.currentTarget.getAttribute("data-id");
        eliminarProductoDelCarrito(id);
        const fila = event.currentTarget.closest("tr");
        if (fila) {
          fila.remove();
        }
        calcularSubtotal();
        actualizarTotal();
      });
    });

    // Convertir la imagen del producto en un botón para ir a la información del producto:
    const productInfoButtons = document.getElementsByClassName("redirect");
    for (const productButton of productInfoButtons) {
      productButton.addEventListener("click", (event) => {
        const productoId = event.target.id;
        localStorage.setItem("productId", productoId);
        location.href = "./product-info.html";
      });
    }
    calcularSubtotal();
    actualizarTotal();
  }

  colocarItemEnLS();
  mostrarProductosEnCarrito();

  // Obtén referencias a los elementos que deseas mostrar u ocultar
  const creditFields = document.querySelector(".credit-fields");
  const debitFields = document.querySelector(".debit-fields");

  // Establece el estilo por defecto en "display: none" para ambos contenedores
  creditFields.style.display = "none";
  debitFields.style.display = "none";

  // Obtén referencias a los botones de radio
  const creditRadio = document.querySelector('input[value="credit"]');
  const debitRadio = document.querySelector('input[value="debit"]');

  // Agrega un evento change a los botones de radio
  creditRadio.addEventListener("change", function () {
    creditFields.style.display = "block";
    debitFields.style.display = "none";
  });

  debitRadio.addEventListener("change", function () {
    creditFields.style.display = "none";
    debitFields.style.display = "block";
  });
});

const standard = document.getElementById("standard"); // 5%
const express = document.getElementById("express"); // 7%
const premium = document.getElementById("premium"); // 15%

function actualizarTotal() {
  const cartSim = JSON.parse(localStorage.getItem("cartSim")) || [];
  const subTotal = document.getElementById("subTotal");
  const envio = document.getElementById("envio");
  const precioFinal = document.getElementById("precioFinal");

  let suma = 0;
  for (let producto of cartSim) {
    if (producto.producto.currency === "UYU") {
      suma += producto.cantidad * (producto.producto.cost / dolar);
    } else {
      suma += producto.cantidad * producto.producto.cost;
    }
  }
  console.log(suma);

  let costoEnvio = 0;
  if (standard.checked) {
    costoEnvio = suma * 0.05;
  } else if (express.checked) {
    costoEnvio = suma * 0.07;
  } else if (premium.checked) {
    costoEnvio = suma * 0.15;
  }
  console.log(costoEnvio);

  let sumaTotal = costoEnvio + suma;
  subTotal.innerText = suma;
  envio.innerText = costoEnvio;
  precioFinal.innerText = sumaTotal;
}

function escucharCostoEnvio() {
  actualizarTotal();
}

standard.addEventListener("change", escucharCostoEnvio);
express.addEventListener("change", escucharCostoEnvio);
premium.addEventListener("change", escucharCostoEnvio);

const buttonPago = document.getElementById("Boton");
buttonPago.addEventListener("click", () => {
  const creditCard = document.getElementById("creditCard");
  const debitCard = document.getElementById("debitCard");
  const feedBack = document.getElementById("feedBack");
  const feedbackChecked = document.getElementById("feedBackChecked");
  if (!creditCard.checked && !debitCard.checked) {
    feedBack.innerHTML = "Debe seleccionar un método de pago";
  } else {
    if (creditCard.checked) {
      feedbackChecked.classList.add("text-success");
      feedbackChecked.classList.remove("text-danger");
      feedbackChecked.innerHTML = "creditCard";
      feedBack.innerHTML = "";
    } else {
      feedbackChecked.classList.add("text-success");
      feedbackChecked.classList.remove("text-danger");
      feedbackChecked.innerHTML = "debitCard";
      feedBack.innerHTML = "";
    }
  }
});

const btnFinalzarCompra = document.getElementById("finalizarCompra");

btnFinalzarCompra.addEventListener("click", (e) => {
  const creditCard = document.getElementById("creditCard");
  const debitCard = document.getElementById("debitCard");
  const feedbackChecked = document.getElementById("feedBackChecked");
  const form = document.getElementById("loc");
  if (creditCard.checked || debitCard.checked) {
    form.submit();
  } else {
    feedbackChecked.classList.add("text-danger");
    feedbackChecked.innerHTML = "Debe seleccionar un método de pago";
  }
});

document.getElementById("modalTerminos").addEventListener("hide.bs.modal", function (event) {
  const creditCardRadio = document.getElementById("creditCard");
  const debitCardRadio = document.getElementById("debitCard");
  if (creditCardRadio.checked) {
    const cardNumber = document.getElementById("cardNumber");
    const secCode = document.getElementById("secCode");
    const expDate = document.getElementById("expDate");
    if (!cardNumber.checkValidity() || !secCode.checkValidity() || !expDate.checkValidity()) {
      event.preventDefault();
    }
  } else if (debitCardRadio.checked) {
    const countNumber = document.getElementById("countNumber");
    if (countNumber.value.trim() === "") {
      event.preventDefault();
    }
  }
  // Si no se selecciona ningún método de pago, evita cerrar el modal y muestra un mensaje de error
  if (!creditCardRadio.checked && !debitCardRadio.checked) {
    event.preventDefault();
    const feedbackChecked = document.getElementById("feedBackChecked");
    feedbackChecked.classList.add("text-danger");
    feedbackChecked.innerHTML = "Debe seleccionar un método de pago";
  }
});