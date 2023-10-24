const url = "https://japceibal.github.io/emercado-api/user_cart/25801.json";

const tbodyContenedor = document.getElementById("contenedor");

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
        subtotalConteiner.innerHTML =
          dato.producto.currency + " " + valorSubTotal;
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
      const contenedorBody = `
        <tr>
          <td class="tittles">
            <input class="redirect" id="${producto.id}" type="image" title="imagenProducto" alt="imagenProducto" style="height: 50px;" src="${productoImagen}" />
          </td>
          <td class="tittles">${producto.name}</td>
          <td class="tittles">${producto.currency} ${producto.cost}</td>
          <td class="tittles"><input id="count-${producto.id}" type="number" min="1" value="${productoEnCarrito.cantidad}" /></td>
          <td class="tittles" id="subTotal-${producto.id}">${producto.currency} ${prodSubTotal}</td>
        </tr>`;
      tbodyContenedor.innerHTML += contenedorBody;
    }
  
    // Convertir la imagen del producto en un boton para ir a la informacion del producto:
    const productInfoButtons = document.getElementsByClassName("redirect");
    for (const productButton of productInfoButtons) {
      productButton.addEventListener("click", (event) => {
        const productoId = event.target.id;
        localStorage.setItem("productId", productoId);
        location.href = "./product-info.html";
      });
    }
    calcularSubtotal();
  }
  colocarItemEnLS();
  mostrarProductosEnCarrito();
});
