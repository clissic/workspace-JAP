function fetchData(url) {
    return fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Error al obtener los datos");
        }
      })
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.error("Error al cargar el archivo JSON:", error);
      });
  }

document.addEventListener("DOMContentLoaded", async function(){
  try {
    const contenedor = document.getElementById("contenedor-item");
    const productosJson = await fetchData("https://japceibal.github.io/emercado-api/cats_products/101.json");
    for (var i=0; i<productosJson.products.length; i++){
      //crear la tarjeta
      var divitem = document.createElement("div");
      //crear la imagen
      var divimagen = document.createElement("div");//crea el espacio
      var imagen = document.createElement("img");//crea la imagen
      imagen.setAttribute("src", productosJson.products[i][6]);//carga la imagen del json
      divimagen.appendChild(imagen); //agraga la imagen al div imagen
      divitem.appendChild(divimagen); //agrega el div imagen al div item
      //crear los textos
      var divtexto = document.createElement("div");//crea el espacio
      //precio
      var parrprecio = document.createElement("p");//crea el párrafo vacio
      var precio = document.createTextNode(productosJson.products[i][4] + productosJson.products[0][3]); //crea el contenido del parrafo
      parrprecio.appendChild(precio);//carga el texto en el parafo 
      divtexto.appendChild(parrprecio);//carga el parrafo en el texto
      //titulo
      var parrtitulo = document.createElement("p");//crea el párrafo vacio
      var titulo = document.createTextNode(productosJson.products[i][1]); //crea el contenido del parrafo
      parrtitulo.appendChild(titulo);//carga el texto en el parafo 
      divtexto.appendChild(parrtitulo);//carga el parrafo en el texto
      //descripción
      var parrdesc = document.createElement("p");//crea el párrafo vacio
      var desc = document.createTextNode(productosJson.products[i][2]); //crea el contenido del parrafo
      parrdesc.appendChild(desc);//carga el texto en el parafo 
      divtexto.appendChild(parrdesc);//carga el parrafo en el texto
      //vendidos
      var parrsold = document.createElement("p");//crea el párrafo vacio
      var sold = document.createTextNode("Vendidos: "+productosJson.products[i][5]); //crea el contenido del parrafo
      parrsold.appendChild(sold);//carga el texto en el parafo 
      divtexto.appendChild(parrsold);//carga el parrafo en el texto
      //carga los textos en el item 
      divitem.appendChild(divtexto);
      //agrega el item al contenedor 
      contenedor.appendChild(divitem);
    }
  } catch (error) {
    console.error("Error:", error);
  }
});
