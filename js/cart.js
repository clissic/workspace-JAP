const url = "https://japceibal.github.io/emercado-api/user_cart/25801.json";


document.addEventListener("DOMContentLoaded", () => {
async function fetchData(url) {
    try {
    const response = await fetch(url);
    
    if (!response.ok) {
        throw new Error(`Hubo un problema con la solicitud.`);
    }

    const data = await response.json();
    return data 
    } catch (error) {
    console.error('Error al realizar la solicitud:', error);
    }
}

// funcion que carga el contenido 
async function chargeContent() {
const tbodyContenedor = document.getElementById("contenedor");


tbodyContenedor.innerHTML= "";
tbodyContenedor.innerHTML += await obtenerDatos();

};
// la que saca el array
async function productoRelacionado() {
    const resultado = await fetchData(url);
    return resultado
}
// la que obtiene los datos y los usa para crear un string con el html que vamos a inyectar 
async function obtenerDatos() {
    const datos =  await productoRelacionado();
    const contenedorTbody =
    `<tr>
    <td class="tittles">
    <input id="productInfo" type="image" title="imagenProducto" alt="imagenProducto" style="height: 50px;" src="${datos.articles[0].image}" />
    </td>
    <td class="tittles">${datos.articles[0].name}</td>
    <td class="tittles">${datos.articles[0].currency} ${datos.articles[0].unitCost}</td>
    <td class="tittles">${datos.articles[0].count}</td>
    <td class="tittles">${datos.articles[0].currency} ${datos.articles[0].count*datos.articles[0].unitCost}</td>
    </tr>`; 
    return contenedorTbody;
}

//funcion del boton de la imagen para ir al product-info
async function botonAInfo (){
await chargeContent();
 getElementById("productInfo").addEventListener("click", (e) => {
  var datos = productoRelacionado();
  localStorage.setItem("productId", datos.articles[0].id);
  if (datos.articles[0].id) {
    location.href = "./product-info.html";
  }
})};

chargeContent();
botonAInfo();
})