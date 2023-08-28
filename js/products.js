async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      return data;
    } else {
      throw new Error("Error al obtener los datos");
    }
  } catch (error) {
    console.error("Error al cargar el archivo JSON:", error);
  }
}

async function main() {
  const productos = await fetchData(
    `https://japceibal.github.io/emercado-api/cats_products/101.json`
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
    const searchInputValue = searchInput.value.toLowerCase()
    contenedor.innerHTML = ""

    arrayProductos.products.forEach(prod => {
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
      ` 
      }
    });
  });
}

search()