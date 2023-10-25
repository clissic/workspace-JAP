addEventListener("DOMContentLoaded", () => {
    const body = document.body  
    const botonDarkMode = document.getElementById("darkBotton");
    const elemClaseLight = document.querySelectorAll(".bg-light")

    function toggleDarkModeClasses() {
        elemClaseLight.forEach(elemento => {
          elemento.classList.toggle("bg-dark");
        });
      }

      botonDarkMode.addEventListener("click", () => {
        toggleDarkModeClasses();
        body.classList.toggle("darkMode");
        
        if (document.body.classList.contains("darkMode")) {
          localStorage.setItem("darkMode", "true");
        } else {
          localStorage.setItem("darkMode", "false");
        }
        
        console.log("Se ha cambiado al modo oscuro.");
      });
      
      if (localStorage.getItem("darkMode") === "true") {
        toggleDarkModeClasses();
        body.classList.add("darkMode");
      }
});