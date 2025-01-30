document.addEventListener("DOMContentLoaded", () =>{
  console.log("================🟥🟥🟥🟥🟥🟥🟥🟥   Script ejecutado en toda la app 💯 🟥🟥🟥🟥🟥🟥====================");
  // =============== 02.690.025 =====================
  if (typeof importScripts === "function")
    {
      importScripts("https://cdn.connectif.cloud/scripts/service-worker.js");
    }

    // ============= 02.692.796 ================
    const nuevoDiv = document.createElement("div");
    nuevoDiv.className = "roomvo-lite-container";
    nuevoDiv.style.display = "none";
    nuevoDiv.textContent = "";
    const contenedor = document.body; // Por ejemplo, en el <body> de la página
    contenedor.appendChild(nuevoDiv);
    console.log("==== 🎈🎈🎈🎈🎈 Contenido inyectado 🎈🎈🎈🎈🎈 ====");
    // ============ FIN =================
});

console.log("==== Store global ====");
