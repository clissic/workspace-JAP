let productosFiltrados = [];

// COMPENDIO DE FUNCIONES:
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
// FUNCIÓN QUE HACE FETCH A LA API SEGÚN LA CATEGORÍA
async function getCategory() {
  var selectedCategoryId = localStorage.getItem("catID");
  const productos = await fetchData(
    `https://japceibal.github.io/emercado-api/cats_products/${selectedCategoryId}.json`
  );
  return productos;
}
// FUNCIÓN PARA ORDENAR PRODUCTOS
function ordenarProductos(productos, tipoOrden) {
  switch (tipoOrden) {
    case "ascendente":
      return productos.sort((a, b) => a.cost - b.cost);
    case "descendente":
      return productos.sort((a, b) => b.cost - a.cost);
    case "relevancia":
      return productos.sort((a, b) => b.soldCount - a.soldCount);
    default:
      return productos;
  }
}
// FUNCIÓN QUE CARGA LOS PRODUCTOS EN EL HTML
async function cargarProductosEnHTML(productos) {
  contenedor.innerHTML = "";
  for (let producto of productos) {
    contenedor.innerHTML += cartaProducto(producto);
  }
}
// FUNCIÓN QUE DEFINE EL DISEÑO DE CARTAS EN HTML
function cartaProducto(producto) {
  const cartaProducto = `
    <div class="item" name="${producto.id}">
      <div class="contenedor-imagen">
        <img src="${producto.image}" alt="" name="${producto.id}">
      </div>
      <div class="contenedor-texto" name="${producto.id}">
        <p class="precio" id="precio${producto.id}" name="${producto.id}">
          <span id="divisa" name="${producto.id}">${producto.currency} </span>${producto.cost}
        </p>
        <p class="titulo" id="titulo${producto.id}" name="${producto.id}">${producto.name}</p>
        <p class="descripcion" name="${producto.id}">${producto.description}</p>
        <p class="vendidos" name="${producto.id}">Vendidos: <span class="cant-vendidos" name="${producto.id}">${producto.soldCount}</span></p>
      </div>
      <div class="contenedor-boton" name="${producto.id}">
        <button onclick="addToCart(${producto.id})" class="botonComprar" id="boton${producto.id}" name="${producto.id}">Comprar</button>
      </div>
    </div>
  `;
  return cartaProducto;
}
// FUNCION PARA FILTRAR PRODUCTOS POR RANGO DE PRECIOS
function filtrarProductos(min, max) {
  return productosFiltrados.filter((producto) => {
    const costo = parseFloat(producto.cost);
    return (isNaN(min) || costo >= min) && (isNaN(max) || costo <= max);
  });
}

// FUNCION QUE AGREGA AL CARRITO SIMULADO EN EL LOCAL STORAGE
function addToCart(id) {
  const productoSeleccionado = productosFiltrados.find(producto => producto.id === id);
  if (productoSeleccionado) {
    let cartSim = JSON.parse(localStorage.getItem("cartSim")) || [];
    const productoEnCarrito = cartSim.find(producto => producto.id === id);
    if (productoEnCarrito) {
      productoEnCarrito.cantidad ++;
    } else {
      cartSim.push({
        id: id,
        cantidad: 1,
        producto: productoSeleccionado
      });
    }
    localStorage.setItem("cartSim", JSON.stringify(cartSim));
  }
}

// OBTENGO DEL DOM:
// CONTENEDORES:
const categoriaTitulo = document.getElementById("categoria-titulo");
const contenedor = document.getElementById("contenedor-items"); // CUANDO SE HACE CLICK A contenedor-items REDIRIGE, Y TENDRIA QUE REDIRIGIR CUANDO SE HACE CLICK A LA CLASE item
// INPUTS:
const searchInput = document.getElementById("searchInput");
// BOTONES:
const botonAsc = document.getElementById("ascendente");
const botonDesc = document.getElementById("descendente");
const botonRelevancia = document.getElementById("relevancia");
const botonLimpiar = document.getElementById("limpiar-filtros");
const botonFiltrar = document.getElementById("rango-precios");

// COMPENDIO DE LISTENERS:
// LISTENER DE INICIALIZACIÓN DE LA PÁGINA
document.addEventListener("DOMContentLoaded", async () => {
  const arrayProductos = await getCategory();
  // Cargar la lista completa de productos
  productosFiltrados = arrayProductos.products; 
  categoriaTitulo.innerHTML = `CATEGORÍA ${arrayProductos.catName}`;
  // Cargar los productos en el HTML
  cargarProductosEnHTML(productosFiltrados);
  // Crear array en el local storage para simular
  if (!localStorage.getItem("cartSim")) {
    const cartSim = [];
    localStorage.setItem("cartSim", JSON.stringify(cartSim));
  }
});
// LISTENER QUE ESCUCHA LOS CLICKS EN LOS PRODUCTOS Y GUARDA EL ID EN EL LOCALSTORAGE
contenedor.addEventListener("click", (e) => {
  var productId = e.target.getAttribute("name");
  localStorage.setItem("productId", productId);
  if (productId) {
    location.href = "./product-info.html";
  }
});
// LISTENER DE LA BARRA DE BÚSQUEDA
searchInput.addEventListener("input", async () => {
  const searchInputValue = searchInput.value.toLowerCase();
  contenedor.innerHTML = "";
  const arrayProductos = await getCategory();
  const productosFiltrados = arrayProductos.products.filter((producto) => {
    return (
      producto.name.toLowerCase().includes(searchInputValue) ||
      producto.description.toLowerCase().includes(searchInputValue)
    );
  });
  cargarProductosEnHTML(productosFiltrados);
});
// LISTENER QUE ORDENA POR ASCENDENTE
botonAsc.addEventListener("click", () => {
  const arrayAscendente = ordenarProductos(productosFiltrados, "ascendente");
  cargarProductosEnHTML(arrayAscendente);
});
// LISTENER QUE ORDENA POR DESCENDENTE
botonDesc.addEventListener("click", () => {
  const arrayDescendente = ordenarProductos(productosFiltrados, "descendente");
  cargarProductosEnHTML(arrayDescendente);
});
// LISTENER QUE ORDENA POR RELEVANCIA
botonRelevancia.addEventListener("click", () => {
  const arrayRelevancia = ordenarProductos(productosFiltrados, "relevancia");
  cargarProductosEnHTML(arrayRelevancia);
});
// LISTENER QUE FILTRA POR RANGO DE PRECIO
botonFiltrar.addEventListener("click", async () => {
  const min = parseFloat(document.getElementById("filtro-min-precio").value);
  const max = parseFloat(document.getElementById("filtro-max-precio").value);
  if (isNaN(max) && isNaN(min)) {
    // Si ambos valores son NaN (Not a Number), no se aplican filtros y se muestran todos los productos.
    cargarProductosEnHTML(productosFiltrados);
  } else {
    // Actualizar directamente la variable global productosFiltrados
    productosFiltrados = filtrarProductos(min, max);
    cargarProductosEnHTML(productosFiltrados);
  }
});
// LISTENER QUE LIMPIA LOS FILTROS
botonLimpiar.addEventListener("click", async () => {
  document.getElementById("filtro-max-precio").value = "";
  document.getElementById("filtro-min-precio").value = "";
  const arrayProductos = await getCategory();
  productosFiltrados = arrayProductos.products;
  cargarProductosEnHTML(productosFiltrados);
});

// FUNCION QUE AGREGA AL CARRITO SIMULADO EN EL LOCAL STORAGE
function addToCart(id) {
  // Obtener el producto seleccionado
  const productoSeleccionado = productosFiltrados.find(producto => producto.id === id);
  if (productoSeleccionado) {
    // Obtener el carrito simulado del Local Storage
    let cartSim = JSON.parse(localStorage.getItem("cartSim")) || [];
    // Verificar si el producto ya está en el carrito
    const productoEnCarrito = cartSim.find(producto => producto.id === id);
    if (productoEnCarrito) {
      // Si el producto ya está en el carrito, aumentar la cantidad en 1
      productoEnCarrito.cantidad += 1;
    } else {
      // Si el producto no está en el carrito, agregarlo con cantidad 1
      cartSim.push({
        id: id,
        cantidad: 1,
        producto: productoSeleccionado
      });
    }
    // Guardar el carrito simulado actualizado en el Local Storage
    localStorage.setItem("cartSim", JSON.stringify(cartSim));
  }
}
// LISTENER DE INICIALIZACIÓN DE LA PÁGINA
