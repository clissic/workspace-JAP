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

async function main() {
  var selectedCategoryId = localStorage.getItem("catID"); // Obtener el identificador de categoría almacenado
  const productos = await fetchData(
    `https://japceibal.github.io/emercado-api/cats_products/${selectedCategoryId}.json` // Usar el identificador en la URL
  );
  return productos;
}

async function cargarProductosAlHTML() {
  const contenedor = document.getElementById("contenedor-items");
  const arrayProductos = await main();

  for (let producto of arrayProductos.products) {
    contenedor.innerHTML += `
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
  }
}

cargarProductosAlHTML();

async function search() {
  const searchInput = document.getElementById("searchInput");
  const contenedor = document.getElementById("contenedor-items");
  const arrayProductos = await main();

  searchInput.addEventListener("input", () => {
    const searchInputValue = searchInput.value.toLowerCase();
    contenedor.innerHTML = "";

    arrayProductos.products.forEach((prod) => {
      if (
        prod.name.toLowerCase().includes(searchInputValue) ||
        prod.description.toLowerCase().includes(searchInputValue)
      ) {
        contenedor.innerHTML += `
          <div class="item">
            <div class="contenedor-imagen">
              <img src="${prod.image}" alt="">
            </div>
            <div class="contenedor-texto">
              <p class="precio" id="precio${prod.id}"><span id="divisa">${prod.currency} </span>${prod.cost}</p>
              <p class="titulo" id="titulo${prod.id}">${prod.name}</p>
              <p class="descripcion">${prod.description}</p>
              <p class="vendidos">Vendidos: <span class="cant-vendidos">${prod.soldCount}</span></p>
            </div>
            <div class="contenedor-boton">
              <button class="botonComprar" id="boton${prod.id}">Comprar</button>
            </div>
          </div>
        `;
      }
    });
  });
}

search();

async function ordenar() {
  const botonAsc = document.getElementById("ascendente");
  const botonDesc = document.getElementById("descendente");
  const botonRelevancia = document.getElementById("relevancia");

  const contenedor = document.getElementById("contenedor-items");
  const arrayProductos = await main();

  botonAsc.addEventListener("click", () => {
    const arrayAsc = arrayProductos.products.sort((a, b) => a.cost - b.cost);
    arrayProductos[2] = arrayAsc;
    contenedor.innerHTML = "";
    for (let producto of arrayProductos.products) {
      contenedor.innerHTML += `
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
    }
  });

  botonDesc.addEventListener("click", () => {
    const arrayDesc = arrayProductos.products.sort((a, b) => b.cost - a.cost);
    arrayProductos[2] = arrayDesc;
    contenedor.innerHTML = "";
    console.log(arrayProductos);
    for (let producto of arrayProductos.products) {
      contenedor.innerHTML += `
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
    }
  });

  botonRelevancia.addEventListener("click", () => {
    const arrayRel = arrayProductos.products.sort(
      (a, b) => b.soldCount - a.soldCount
    );
    arrayProductos[2] = arrayRel;
    contenedor.innerHTML = "";
    console.log(arrayProductos);
    for (let producto of arrayProductos.products) {
      contenedor.innerHTML += `
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
    }
  });
}

ordenar();


async function filtrarProductosPorPrecio() {
  const precioMinimoUsuario = document.getElementById("filtro-min-precio").value;
  const precioMaximoUsuario = document.getElementById("filtro-max-precio").value;
  const arrayProductos = await main();

  if (
    isNaN(precioMinimoUsuario) ||
    isNaN(precioMaximoUsuario) ||
    precioMinimoUsuario >= precioMaximoUsuario
  ) {
    return [];
  }

  let productosFiltrados = []
  productosFiltrados = arrayProductos.products.filter((producto) => {
    return producto.cost >= precioMinimoUsuario && producto.cost <= precioMaximoUsuario;
  });
  return productosFiltrados;
}

const filtroRangoPrecios = document.getElementById("rango-precios")
filtroRangoPrecios.addEventListener("click", async () => {
  const contenedor = document.getElementById("contenedor-items");
  contenedor.innerHTML = ""
  const productosFiltrados = await filtrarProductosPorPrecio();
  for (let producto of productosFiltrados) {
    contenedor.innerHTML += `
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
  }
});