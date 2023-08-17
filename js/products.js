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


document.getElementById("Carlos").addEventListener("click", async function () {
    try {
      const productosJson = await fetchData("https://japceibal.github.io/emercado-api/cats_products/101.json"); // Espera a que se resuelva la promesa
      console.log(" PRODUCTOS:");
      console.log(productosJson.products[0]);
    } catch (error) {
        console.error("Error:", error);
      }
    }); 