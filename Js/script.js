const video = document.querySelector(".bg-video");
video.playbackRate = 0.2;
let esDia = true;

function cambiarFondo() {
  const source = document.querySelector("#videoSource");
  const body= document.querySelector('body');
  const nav= document.querySelectorAll('.nav-link');
  const fot= document.querySelector('footer');
  const fotlink=document.querySelectorAll('footer a');
  const card=document.querySelectorAll('.card');
  const botonDN=document.querySelector('#DiaNoche');
  const btn =document.querySelectorAll(".btn-card");
  const nom =document.querySelector(".gradient-text");
  const movil=document.querySelector("#movil");
  const burger=document.querySelector('nav');

  video.style.opacity = 0;

  setTimeout(() => {
    if (esDia) {
      source.src = "pictures/noche.mp4";
      body.classList.add("textNight");
      fot.style.background=  "linear-gradient(to bottom, #0f172a, #312e81, #1e40af, #2a9d8f)";
      fot.style.color= "white";
      botonDN.innerHTML="<i class='fa-solid fa-sun'></i>";
      nom.style.background= "linear-gradient(to bottom, #1a1f4d, #3b2f73, #4a6fa5, #6fa8a8)";
      nom.style.webkitBackgroundClip = "text";
      nom.style.webkitTextFillColor = "transparent";
      movil.style.color="white";
      burger.classList.add("navbar-dark");

      nav.forEach(link=>{
        link.style.color = "white";
      });
      fotlink.forEach(link=>{
        link.style.color = "rgba(255, 255, 150, 0.7)";
      });
      btn.forEach(link=>{
        link.style.color = "white";
        link.style.background= "linear-gradient(to bottom, #1a1f4d, #3b2f73, #4a6fa5, #6fa8a8)";
      });
      
      card.forEach(c=>{
        c.classList.add("textNight");
      });
    } else {
      botonDN.innerHTML='<i class="fa-solid fa-moon">';
      body.classList.toggle("textNight");
      fot.style.removeProperty("background");
      fot.style.removeProperty("color");
      nom.style.removeProperty("background");
      movil.style.removeProperty("color");
      burger.classList.toggle("navbar-dark");

      nav.forEach(link=>{
        link.style.removeProperty("color");
      })
      fotlink.forEach(link=>{
        link.style.removeProperty("color");
      })
      btn.forEach(link=>{
        link.style.removeProperty("color");
        link.style.removeProperty("background");
      })
      card.forEach(c=>{
        c.classList.toggle("textNight");
      });
      source.src = "pictures/Dia.mp4";
    }
    video.load();
    video.play();
    video.playbackRate = 0.2;
    video.style.opacity = 1;
    esDia = !esDia;
  }, 300);
}

function buscar(){
  const input= document.querySelector("#buscador");
  const texto=input.value.toLowerCase();
  const carousel = new bootstrap.Carousel(document.getElementById("carouselCards"));

  if (texto.includes("inicio")) {
      carousel.to(0);
  }else if (texto.includes("acerca de")) {
      carousel.to(1);
  }  else if (texto.includes("proyecto")) {
      carousel.to(3);
  } else if (texto.includes("experiencia")) {
      carousel.to(2);
  } else if (texto.includes("habilidades")) {
      carousel.to(4);
  } else if (texto.includes("contacto")) {
      carousel.to(0);
  } else {
        alert("No encontrado");
  }
}
const form = document.getElementById("formularioNav");

form.addEventListener("submit", (e) => {
    e.preventDefault(); // clave 🔥
    buscar();
});