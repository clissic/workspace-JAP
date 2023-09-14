/* 

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

// FUNCIÓN QUE HACE FETCH A LA API PARA OBTENER UN PRODUCTO
async function getProduct() {
  var selectedProductId = localStorage.getItem("productId");
  const producto = await fetchData(
    `https://japceibal.github.io/emercado-api/products/${selectedProductId}.json`
  );
  return producto;
}

// FUNCIÓN QUE HACE FETCH A LA API PARA OBTENER LOS COMENTARIOS DE UN PRODUCTO
async function getComments() {
  var selectedProductId = localStorage.getItem("productId");
  const comentarios = await fetchData(
      `https://japceibal.github.io/emercado-api/products_comments/${selectedProductId}.json`
  )
  return comentarios
}

document.addEventListener("DOMContentLoaded", async () => {
  producto = await getProduct()
  comentarios = await getComments()
  console.log(producto)
  console.log(comentarios)
}) 

*/