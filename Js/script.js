/* =========================================================
   CONFIGURACIÓN INICIAL
   ========================================================= */
const video = document.querySelector(".bg-video");
video.playbackRate = 0.2;
let esDia = true;

/* =========================================================
   TOAST DE NOTIFICACIÓN (reemplaza alert)
   ========================================================= */
function mostrarToast(mensaje, tipo = "info") {
  // Eliminar toast previo si existe
  const previo = document.getElementById("toast-custom");
  if (previo) previo.remove();

  const iconos = {
    info:    { icon: "fa-circle-info",           color: "#4facfe" },
    success: { icon: "fa-circle-check",          color: "#2ecc71" },
    warning: { icon: "fa-triangle-exclamation",  color: "#f39c12" },
    error:   { icon: "fa-circle-xmark",          color: "#e74c3c" },
  };

  const { icon, color } = iconos[tipo] || iconos.info;

  const toast = document.createElement("div");
  toast.id = "toast-custom";
  toast.setAttribute("role", "alert");
  toast.setAttribute("aria-live", "polite");
  toast.innerHTML = `
    <i class="fa-solid ${icon}" style="color:${color}; font-size:2rem;" aria-hidden="true"></i>
    <span>${mensaje}</span>
    <button class="toast-close" aria-label="Cerrar notificación">&times;</button>
  `;

  // Estilos inline para que funcionen sin depender del CSS externo
  Object.assign(toast.style, {
    position:       "fixed",
    bottom:         "3rem",
    right:          "3rem",
    display:        "flex",
    alignItems:     "center",
    gap:            "1.2rem",
    background:     "rgba(15, 15, 30, 0.85)",
    backdropFilter: "blur(12px)",
    border:         `1px solid ${color}`,
    borderRadius:   "1.5rem",
    padding:        "1.4rem 2rem",
    color:          "white",
    fontSize:       "1.6rem",
    fontFamily:     "Bentham, serif",
    boxShadow:      `0 0 2rem rgba(0,0,0,0.4), 0 0 1rem ${color}44`,
    zIndex:         "9999",
    maxWidth:       "36rem",
    opacity:        "0",
    transform:      "translateY(2rem)",
    transition:     "opacity 0.35s ease, transform 0.35s ease",
  });

  // Botón cerrar
  const btn = toast.querySelector(".toast-close");
  Object.assign(btn.style, {
    marginLeft:  "auto",
    background:  "none",
    border:      "none",
    color:       "rgba(255,255,255,0.6)",
    fontSize:    "2rem",
    cursor:      "pointer",
    lineHeight:  "1",
    padding:     "0 0.2rem",
    transition:  "color 0.2s",
  });
  btn.addEventListener("mouseenter", () => btn.style.color = "white");
  btn.addEventListener("mouseleave", () => btn.style.color = "rgba(255,255,255,0.6)");
  btn.addEventListener("click", () => cerrarToast(toast));

  document.body.appendChild(toast);

  // Animar entrada
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      toast.style.opacity = "1";
      toast.style.transform = "translateY(0)";
    });
  });

  // Auto-cerrar después de 3.5 s
  setTimeout(() => cerrarToast(toast), 3500);
}

function cerrarToast(toast) {
  if (!toast || !toast.isConnected) return;
  toast.style.opacity = "0";
  toast.style.transform = "translateY(2rem)";
  setTimeout(() => toast.remove(), 350);
}

/* =========================================================
   MODO DÍA / NOCHE
   ========================================================= */
function cambiarFondo() {
  const source    = document.querySelector("#videoSource");
  const body      = document.querySelector("body");
  const navLinks  = document.querySelectorAll(".nav-link");
  const footer    = document.querySelector("footer");
  const footLinks = document.querySelectorAll("footer a");
  const cards     = document.querySelectorAll(".card");
  const botonDN   = document.querySelector("#DiaNoche");
  const btns      = document.querySelectorAll(".btn-card");
  const nombre    = document.querySelector(".gradient-text");
  const movil     = document.querySelector("#movil");
  const navBar    = document.querySelector("nav");

  video.style.opacity = "0";

  setTimeout(() => {
    if (esDia) {
      // ── Modo NOCHE ──
      source.src = "pictures/noche.mp4";

      body.classList.add("textNight");
      navBar.classList.add("navbar-dark");
      movil.style.color = "white";

      botonDN.innerHTML = "<i class='fa-solid fa-sun' aria-hidden='true'></i>";

      footer.style.background = "linear-gradient(to bottom, #0f172a, #312e81, #1e40af, #2a9d8f)";
      footer.style.color = "white";

      nombre.style.background = "linear-gradient(to bottom, #1a1f4d, #3b2f73, #4a6fa5, #6fa8a8)";
      nombre.style.webkitBackgroundClip = "text";
      nombre.style.webkitTextFillColor  = "transparent";

      navLinks.forEach(link => (link.style.color = "white"));

      footLinks.forEach(link => (link.style.color = "rgba(255, 255, 150, 0.7)"));

      btns.forEach(btn => {
        btn.style.color      = "white";
        btn.style.background = "linear-gradient(to bottom, #1a1f4d, #3b2f73, #4a6fa5, #6fa8a8)";
      });

      cards.forEach(c => c.classList.add("textNight"));

    } else {
      // ── Modo DÍA ──
      source.src = "pictures/Dia.mp4";

      body.classList.remove("textNight");
      navBar.classList.remove("navbar-dark");
      movil.style.removeProperty("color");

      botonDN.innerHTML = "<i class='fa-solid fa-moon' aria-hidden='true'></i>";

      footer.style.removeProperty("background");
      footer.style.removeProperty("color");

      nombre.style.removeProperty("background");
      nombre.style.removeProperty("-webkit-background-clip");
      nombre.style.removeProperty("-webkit-text-fill-color");

      navLinks.forEach(link => link.style.removeProperty("color"));

      footLinks.forEach(link => link.style.removeProperty("color"));

      btns.forEach(btn => {
        btn.style.removeProperty("color");
        btn.style.removeProperty("background");
      });

      cards.forEach(c => c.classList.remove("textNight"));
    }

    video.load();
    video.play();
    video.playbackRate = 0.2;
    video.style.opacity = "1";
    esDia = !esDia;

    mostrarToast(
      esDia ? "Modo día activado ☀️" : "Modo noche activado 🌙",
      "success"
    );

  }, 300);
}

/* =========================================================
   BUSCADOR DE SECCIONES
   ========================================================= */
const SECCIONES = [
  { palabras: ["inicio", "home", "bienvenido"],          indice: 0 },
  { palabras: ["acerca", "about", "quien", "quién"],     indice: 1 },
  { palabras: ["experiencia", "formacion", "formación",
               "education", "bootcamp", "unam"],         indice: 2 },
  { palabras: ["proyecto", "project", "hackathon",
               "skate", "grind"],                        indice: 3 },
  { palabras: ["habilidad", "skill", "tecnologia",
               "tecnología", "hard", "soft"],            indice: 4 },
];

function buscar() {
  const input    = document.querySelector("#buscador");
  const texto    = input.value.toLowerCase().trim();
  const carousel = new bootstrap.Carousel(document.getElementById("carouselCards"));

  if (!texto) {
    mostrarToast("Escribe algo para buscar.", "warning");
    return;
  }

  const match = SECCIONES.find(({ palabras }) =>
    palabras.some(p => texto.includes(p))
  );

  if (match) {
    carousel.to(match.indice);
    input.value = "";
    mostrarToast("Sección encontrada ✓", "success");
  } else {
    mostrarToast(`No se encontró "${texto}". Prueba: inicio, acerca, experiencia, proyectos o habilidades.`, "warning");
  }
}

/* =========================================================
   EVENTO DEL FORMULARIO DE BÚSQUEDA
   ========================================================= */
const form = document.getElementById("formularioNav");
if (form) {
  form.addEventListener("submit", e => {
    e.preventDefault();
    buscar();
  });
}

/* =========================================================
   TECLA ENTER en el input de búsqueda
   ========================================================= */
const buscador = document.getElementById("buscador");
if (buscador) {
  buscador.addEventListener("keydown", e => {
    if (e.key === "Enter") {
      e.preventDefault();
      buscar();
    }
  });
}
