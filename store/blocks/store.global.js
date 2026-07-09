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



// ============ SEO · Datos estructurados (JSON-LD) ============
// Emite Organization (subtipo OnlineStore) en el home y LocalBusiness
// en /nuestras-tiendas. Google procesa JSON-LD inyectado por JS en el
// DOM renderizado (doc: developers.google.com/search/docs/appearance/
// structured-data/generate-structured-data-with-javascript).
// NO duplicar aquí Product / BreadcrumbList / ItemList / WebSite:
// los emite vtex.structured-data (incluida en vtex.store@2.x).
// Documentación y pasos de validación: docs/SEO-DATOS-ESTRUCTURADOS.md
document.addEventListener("DOMContentLoaded", () => {
  try {
    const inyectarJsonLd = (id, data) => {
      if (document.getElementById(id)) return; // idempotente
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.id = id;
      script.text = JSON.stringify(data);
      (document.head || document.body).appendChild(script);
    };

    const path = window.location.pathname;

    // ---- Organization / OnlineStore (solo home: Google recomienda
    // declararla en una única página representativa) ----
    if (path === "/") {
      inyectarJsonLd("jsonld-organization", {
        "@context": "https://schema.org",
        "@type": "OnlineStore",
        "name": "Cerámica Italia",
        "legalName": "Cerámica Italia S.A.",
        "url": "https://www.ceramicaitalia.com/",
        "logo": "https://ceramicaitalia.vtexassets.com/arquivos/ceramicaItaliaIcon.png",
        "description":
          "Encuentra en nuestra tienda online los mejores diseños Italianos para tu remodelación: Pisos, Paredes, Baños, Sanitarios, lavamanos y mucho más.",
        "foundingDate": "1985",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Avenida 3 Calle 23AN, Zona Industrial",
          "addressLocality": "Cúcuta",
          "addressRegion": "Norte de Santander",
          "addressCountry": "CO"
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "018000 111 568",
          "contactType": "customer service",
          "areaServed": "CO",
          "availableLanguage": "es"
        },
        "sameAs": [
          "https://www.facebook.com/CeramicaItaliaSA",
          "https://www.instagram.com/ceramicaitalia/",
          "https://www.linkedin.com/company/ceramica-italia-sa/",
          "https://www.youtube.com/@CeramicaItaliaSA",
          "https://twitter.com/ceramicaitalia"
        ]
      });
    }

    // ---- LocalBusiness por sede (solo /nuestras-tiendas) ----
    // COMPLETAR: añadir una entrada por tienda con los MISMOS datos
    // visibles en la página (dirección/teléfono deben coincidir con lo
    // que el usuario ve — regla de Google). Plantilla por sede:
    // {
    //   "@type": "HomeGoodsStore",
    //   "name": "Cerámica Italia · <Sede>",
    //   "url": "https://www.ceramicaitalia.com/nuestras-tiendas",
    //   "image": "https://ceramicaitalia.vtexassets.com/arquivos/ceramicaItaliaIcon.png",
    //   "telephone": "+57 3XX XXXXXXX",
    //   "address": {
    //     "@type": "PostalAddress",
    //     "streetAddress": "<dirección>",
    //     "addressLocality": "<ciudad>",
    //     "addressRegion": "<departamento>",
    //     "addressCountry": "CO"
    //   }
    // }
    if (path.indexOf("/nuestras-tiendas") === 0) {
      inyectarJsonLd("jsonld-tiendas", {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "HomeGoodsStore",
            "name": "Cerámica Italia · Sede principal Cúcuta",
            "url": "https://www.ceramicaitalia.com/nuestras-tiendas",
            "image": "https://ceramicaitalia.vtexassets.com/arquivos/ceramicaItaliaIcon.png",
            "telephone": "018000 111 568",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Avenida 3 Calle 23AN, Zona Industrial",
              "addressLocality": "Cúcuta",
              "addressRegion": "Norte de Santander",
              "addressCountry": "CO"
            }
          }
        ]
      });
    }
  } catch (e) {
    console.warn("SEO JSON-LD: no se pudo inyectar", e);
  }
});


console.log("==== Store global ====");
