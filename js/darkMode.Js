addEventListener("DOMContentLoaded", () => {
    const body = document.body  
    const botonDarkMode = document.getElementById("darkBotton");
    
    
    botonDarkMode.addEventListener("click", () => {
    body.classList.toggle("darkMode");
    if (document.body.classList.contains("darkMode")) {
        localStorage.setItem("darkMode", "true")
    } else {localStorage.setItem("darkMode", "false")}
    console.log("Se ha cambiado al modo oscuro.");
    });

    if (localStorage.getItem("darkMode") === "true")
    {
    body.classList.add("darkMode");
}
});