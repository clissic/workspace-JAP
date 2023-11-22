const CATEGORIES_URL = "http://localhost:3000/emercado-api/cats/";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "http://localhost:3000/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "http://localhost:3000/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "http://localhost:3000/emercado-api/products_comments/";
const CART_INFO_URL = "http://localhost:3000/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";

let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

const usuarioLogin = JSON.parse(localStorage.getItem("usuario"));
const mailUsuario = document.getElementById("mailUsuario");

document.addEventListener("DOMContentLoaded", () => {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  if(usuario){
    mailUsuario.innerText = usuarioLogin.mail;
  } else {
    mailUsuario.innerText = "Nombre de Usuario";
  }
  });

// Evento para el enlace "Cerrar sesión"
const logoutLink = document.getElementById("logoutLink");

logoutLink.addEventListener("click", function (e) {
    localStorage.removeItem("usuario");
});

