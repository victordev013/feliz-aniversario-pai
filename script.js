// script.js
let slideIndex = 1;
const slidesContainer = document.getElementById("slideshow");
const dotsContainer = document.getElementById("dots");
const totalFotos = 99;

// Gerar dinamicamente os slides
for (let i = 1; i <= totalFotos; i++) {
  const slide = document.createElement("div");
  slide.classList.add("slide");

  const img = document.createElement("img");
  img.src = `./img/foto${i}.jpg`;
  img.alt = `Foto ${i}`;

  slide.appendChild(img);
  slidesContainer.appendChild(slide);
}

// Criar áreas clicáveis para navegação
const leftArea = document.createElement("div");
leftArea.className = "click-area click-left";
leftArea.addEventListener("click", () => plusSlides(-1));

const rightArea = document.createElement("div");
rightArea.className = "click-area click-right";
rightArea.addEventListener("click", () => plusSlides(1));

slidesContainer.appendChild(leftArea);
slidesContainer.appendChild(rightArea);

// Inicializar dots
function initDots() {
  for (let i = 0; i < totalFotos; i++) {
    const dot = document.createElement("span");
    dot.classList.add("dot");
    dot.addEventListener("click", () => currentSlide(i + 1));
    dotsContainer.appendChild(dot);
  }
}

function showSlides(n) {
  const slides = document.getElementsByClassName("slide");
  const dots = document.getElementsByClassName("dot");

  if (n > slides.length) slideIndex = 1;
  if (n < 1) slideIndex = slides.length;

  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  for (let i = 0; i < dots.length; i++) {
    dots[i].classList.remove("active");
  }

  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].classList.add("active");
}

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

// Inicialização
initDots();
showSlides(slideIndex);

// Suporte a swipe no celular
let startX;
slidesContainer.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});

slidesContainer.addEventListener("touchend", (e) => {
  let endX = e.changedTouches[0].clientX;
  if (startX - endX > 50) plusSlides(1);
  if (endX - startX > 50) plusSlides(-1);
});
