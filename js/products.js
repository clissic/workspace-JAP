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
async function main() {
  var selectedCategoryId = localStorage.getItem("catID"); // Obtener el identificador de categoría almacenado
  const productos = await fetchData(
    `https://japceibal.github.io/emercado-api/cats_products/${selectedCategoryId}.json` // Usar el identificador en la URL
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
      <img src="${producto.image}" alt="">
    </div>
    <div class="contenedor-texto">
      <p class="precio" id="precio${producto.id}"><span id="divisa">${producto.currency} </span>${producto.cost}</p>
      <p class="titulo" id="titulo${producto.id}">${producto.name}</p>
      <p class="descripcion">${producto.description}</p>
      <p class="vendidos">Vendidos: <span class="cant-vendidos">${producto.soldCount}</span></p>
    </div>
    <div class="contenedor-boton">
      <button class="botonComprar" id="boton${producto.id}">Comprar</button>
    </div>
  </div>
  `;
  return cartaProducto;
}

//FUNCIÓN QUE CARGA LOS PRODUCTOS EN EL HTML
const inicio = document.addEventListener("DOMContentLoaded", async () => {
  const arrayProductos = await main();
  contenedor.innerHTML = "";
  categoriaTitulo.innerHTML = `CATEGORÍA ${arrayProductos.catName}`;
  for (let producto of arrayProductos.products) {
    contenedor.innerHTML += cartaProducto(producto);
  }
});

// LISTENER DE LA BARRA DE BUSQUEDA
searchInput.addEventListener("input", async () => {
  const searchInputValue = searchInput.value.toLowerCase();
  contenedor.innerHTML = "";
  const arrayProductos = await main();
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
  const arrayProductos = await main();
  const arrayAsc = arrayProductos.products.sort((a, b) => a.cost - b.cost);
  arrayProductos[2] = arrayAsc;
  contenedor.innerHTML = "";
  for (let producto of arrayProductos.products) {
    contenedor.innerHTML += cartaProducto(producto);
  }
});

// LISTENER QUE ORDENA POR DESCENDENTE
botonDesc.addEventListener("click", async () => {
  const arrayProductos = await main();
  const arrayDesc = arrayProductos.products.sort((a, b) => b.cost - a.cost);
  arrayProductos[2] = arrayDesc;
  contenedor.innerHTML = "";
  for (let producto of arrayProductos.products) {
    contenedor.innerHTML += cartaProducto(producto);
  }
});

// LISTENER QUE ORDENA POR RELEVANCIA
botonRelevancia.addEventListener("click", async () => {
  const arrayProductos = await main();
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
  const arrayProductos = await main();
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
  const arrayProductos = await main();
  contenedor.innerHTML = "";
  for (producto of arrayProductos.products) {
    if (producto.cost >= min && producto.cost <= max) {
      contenedor.innerHTML += cartaProducto(producto);
    }
  }
});