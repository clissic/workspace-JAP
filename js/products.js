async function fetchData(url) {
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        console.log(data)
        return data;
      } else {
        throw new Error("Error al obtener los datos");
      }
    } catch (error) {
      console.error("Error al cargar el archivo JSON:", error);
    }
  }
  
  async function main() {
    const autos = await fetchData(
      "https://japceibal.github.io/emercado-api/cats_products/101.json"
    );
    return autos;
  }
  
  async function cargarAutosAlHTML() {
    const contenedor = document.getElementById("contenedor-items");
    const arrayAutos = await main();
  
    for (let auto of arrayAutos.products) {
      contenedor.innerHTML += `
        <div class="item">
          <div class="contenedor-imagen">
            <img src="${auto.image}" alt="">
          </div>
          <div class="contenedor-texto">
            <p id="precio"><span id="divisa">${auto.currency} </span>${auto.cost}</p>
            <p id="titulo">${auto.name}</p>
            <p class="descripcion">${auto.description}</p>
            <p class="vendidos">Vendidos: <span class="cant-vendidos">${auto.soldCount}</span></p>
          </div>
          <div class="contenedor-boton">
            <button id="boton">Comprar</button>
          </div>
        </div>
      `;
    }
  }
  
  cargarAutosAlHTML();