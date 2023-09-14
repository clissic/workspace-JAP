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

// OBTENGO DEL DOM:
// CONTENEDORES:
const categoriaTitulo = document.getElementById("categoria-titulo");
const contenedor = document.getElementById("contenedor-items");
// INPUTS:
const searchInput = document.getElementById("searchInput");
// BOTONES:
const botonAsc = document.getElementById("ascendente");
const botonDesc = document.getElementById("descendente");
const botonRelevancia = document.getElementById("relevancia");
const botonLimpiar = document.getElementById("limpiar-filtros");

// DISEÑO DE CARTAS EN HTML:
function cartaProducto(producto) {
  const cartaProducto = `
  <div class="item">
    <div class="contenedor-imagen">
      <img src="${producto.image}" alt="" name="${producto.id}">
    </div>
    <div class="contenedor-texto" name="${producto.id}">
      <p class="precio" id="precio${producto.id}" name="${producto.id}"><span id="divisa" name="${producto.id}">${producto.currency} </span>${producto.cost}</p>
      <p class="titulo" id="titulo${producto.id}" name="${producto.id}">${producto.name}</p>
      <p class="descripcion" name="${producto.id}">${producto.description}</p>
      <p class="vendidos" name="${producto.id}">Vendidos: <span class="cant-vendidos" name="${producto.id}">${producto.soldCount}</span></p>
    </div>
    <div class="contenedor-boton" name="${producto.id}">
      <button class="botonComprar" id="boton${producto.id}" name="${producto.id}">Comprar</button>
    </div>
  </div>
  `;
  return cartaProducto;
}

//FUNCIÓN QUE CARGA LOS PRODUCTOS EN EL HTML
const inicio = document.addEventListener("DOMContentLoaded", async () => {
  const arrayProductos = await getCategory();
  contenedor.innerHTML = "";
  categoriaTitulo.innerHTML = `CATEGORÍA ${arrayProductos.catName}`;
  for (let producto of arrayProductos.products) {
    contenedor.innerHTML += cartaProducto(producto);
  }
});

//FUNCION QUE ESCUCHA LOS CLICS EN LOS PRODUCTOS Y GUARDA EL ID EN EL LOCALSTORAGE
contenedor.addEventListener("click", (e) => {
  var productId = e.target.getAttribute("name");
  localStorage.setItem("productId", productId);
  location.href = "./product-info.html";
});

// LISTENER DE LA BARRA DE BUSQUEDA
searchInput.addEventListener("input", async () => {
  const searchInputValue = searchInput.value.toLowerCase();
  contenedor.innerHTML = "";
  const arrayProductos = await getCategory();
  arrayProductos.products.forEach((producto) => {
    if (
      producto.name.toLowerCase().includes(searchInputValue) ||
      producto.description.toLowerCase().includes(searchInputValue)
    ) {
      contenedor.innerHTML += cartaProducto(producto);
    }
  });
});

// LISTENER QUE ORDENA POR ASCENDENTE
botonAsc.addEventListener("click", async () => {
  const arrayProductos = await getCategory();
  const arrayAsc = arrayProductos.products.sort((a, b) => a.cost - b.cost);
  arrayProductos[2] = arrayAsc;
  contenedor.innerHTML = "";
  for (let producto of arrayProductos.products) {
    contenedor.innerHTML += cartaProducto(producto);
  }
});

// LISTENER QUE ORDENA POR DESCENDENTE
botonDesc.addEventListener("click", async () => {
  const arrayProductos = await getCategory();
  const arrayDesc = arrayProductos.products.sort((a, b) => b.cost - a.cost);
  arrayProductos[2] = arrayDesc;
  contenedor.innerHTML = "";
  for (let producto of arrayProductos.products) {
    contenedor.innerHTML += cartaProducto(producto);
  }
});

// LISTENER QUE ORDENA POR RELEVANCIA
botonRelevancia.addEventListener("click", async () => {
  const arrayProductos = await getCategory();
  const arrayRel = arrayProductos.products.sort(
    (a, b) => b.soldCount - a.soldCount
  );
  arrayProductos[2] = arrayRel;
  contenedor.innerHTML = "";
  for (let producto of arrayProductos.products) {
    contenedor.innerHTML += cartaProducto(producto);
  }
});

// LISTENER QUE LIMPIA LOS FILTROS
botonLimpiar.addEventListener("click", async () => {
  document.getElementById("filtro-max-precio").value = "";
  document.getElementById("filtro-min-precio").value = "";
  const arrayProductos = await getCategory();
  contenedor.innerHTML = "";
  for (let producto of arrayProductos.products) {
    contenedor.innerHTML += cartaProducto(producto);
  }
});

// LISTENER QUE FILTRA POR RANGO DE PRECIOS
const botonFiltrar = document.getElementById("rango-precios");
botonFiltrar.addEventListener("click", async () => {
  const max = document.getElementById("filtro-max-precio").value;
  const min = document.getElementById("filtro-min-precio").value;
  const contenedor = document.getElementById("contenedor-items");
  const arrayProductos = await getCategory();
  contenedor.innerHTML = "";
  for (producto of arrayProductos.products) {
    if (producto.cost >= min && producto.cost <= max) {
      contenedor.innerHTML += cartaProducto(producto);
    }
  }
});
