var total = 0;
var arrayTotalActualizado = [];
const dolar = 40;
const tbodyContenedor = document.getElementById("contenedor");

document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("access-token");

  fetch(`${CART_INFO_URL}25801`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "access-token": token,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      localStorage.setItem("cartSim", JSON.stringify(data));
    })
    .catch((error) => {
      console.error("Error al realizar la solicitud:", error);
    });

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
        let valorProducto = 0;

        if (countConteiner.value <= 1) {
          dato.cantidad = 1;
          countConteiner.value = 1;
          valorProducto = dato.producto.cost;
        } else {
          dato.cantidad = countConteiner.value;
          valorProducto = countConteiner.value * dato.producto.cost;
        }
        setTimeout(() => {
          fetch(
            `http://localhost:3000/cart/updateCartItemQuantity/25801/${dato.producto.id}/${countConteiner.value}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                "access-token": token,
              },
            }
          )
            .then((response) => response.json())
            .then((data) => {
              localStorage.setItem("cartSim", JSON.stringify(data));
            })
            .catch((error) => {
              console.error("Error al realizar la solicitud:", error);
            });
        }, 3000);

        subtotalConteiner.innerHTML =
          dato.producto.currency + " " + valorProducto;
        localStorage.setItem("cartSim", JSON.stringify(cartSim));
        actualizarTotal();
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
      arrayTotalActualizado.push(id);
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
          if (
            !cardNumber.checkValidity() ||
            !secCode.checkValidity() ||
            !expDate.checkValidity()
          ) {
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

    // Asociar manejador de eventos a los botones de "Eliminar"
    const botonesEliminar = document.querySelectorAll(".eliminar");
    botonesEliminar.forEach((boton) => {
      boton.addEventListener("click", async (event) => {
        const id = event.currentTarget.getAttribute("data-id");

        fetch(`http://localhost:3000/cart/removeFromCart/25801/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "access-token": token,
          },
        })
          .then((response) => response.json())
          .then((data) => {
            localStorage.setItem("cartSim", JSON.stringify(data));
          })
          .catch((error) => {
            console.error("Error al realizar la solicitud:", error);
          });
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

  let costoEnvio = 0;
  if (standard.checked) {
    costoEnvio = suma * 0.05;
  } else if (express.checked) {
    costoEnvio = suma * 0.07;
  } else if (premium.checked) {
    costoEnvio = suma * 0.15;
  }

  let sumaTotal = costoEnvio + suma;
  subTotal.innerText = suma;
  envio.innerText = costoEnvio;
  precioFinal.innerText = sumaTotal;
}

standard.addEventListener("change", actualizarTotal);
express.addEventListener("change", actualizarTotal);
premium.addEventListener("change", actualizarTotal);

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

document
  .getElementById("modalTerminos")
  .addEventListener("hide.bs.modal", function (event) {
    const creditCardRadio = document.getElementById("creditCard");
    const debitCardRadio = document.getElementById("debitCard");
    if (creditCardRadio.checked) {
      const cardNumber = document.getElementById("cardNumber");
      const secCode = document.getElementById("secCode");
      const expDate = document.getElementById("expDate");
      if (
        !cardNumber.checkValidity() ||
        !secCode.checkValidity() ||
        !expDate.checkValidity()
      ) {
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
