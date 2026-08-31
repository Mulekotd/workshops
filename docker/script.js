const slides = [...document.querySelectorAll(".slide")];

const labels = [
  "Início",
  "O que é Docker?",
  "Instalação",
  "Containers",
  "Images",
  "Volumes",
  "Networking",
  "Docker exec",
  "Docker Compose",
  "Up & Down",
  "Recap"
];

const menu = document.querySelector("#menu"),
  counter = document.querySelector("#counter"),
  bar = document.querySelector(".progress i"),
  prev = document.querySelector("#prev"),
  next = document.querySelector("#next");

let current = 0;

labels.forEach((label, i) => {
  const b = document.createElement("button");
  b.innerHTML = `<span>${String(i + 1).padStart(2, "0")}</span>${label}`;
  b.onclick = () => {
    show(i);
    menu.classList.remove("open");
  };
  menu.appendChild(b);
});

const menuItems = [...menu.querySelectorAll("button")];

function show(i) {
  current = Math.max(0, Math.min(slides.length - 1, i));
  slides.forEach((s, n) => s.classList.toggle("active", n === current));
  menuItems.forEach((b, n) => b.classList.toggle("active", n === current));
  counter.textContent = `${String(current + 1).padStart(2, "0")} / ${slides.length}`;
  bar.style.width = `${((current + 1) / slides.length) * 100}%`;
  prev.disabled = current === 0;
  next.disabled = current === slides.length - 1;
}

prev.onclick = () => show(current - 1);
next.onclick = () => show(current + 1);

document.querySelector("#menuButton").onclick = () =>
  menu.classList.toggle("open");

document
  .querySelectorAll("[data-go]")
  .forEach((b) => (b.onclick = () => show(Number(b.dataset.go))));

document.addEventListener("keydown", (e) => {
  if (["ArrowRight", "PageDown", " "].includes(e.key)) {
    e.preventDefault();
    show(current + 1);
  }

  if (["ArrowLeft", "PageUp"].includes(e.key)) {
    e.preventDefault();
    show(current - 1);
  }

  if (e.key === "Home") show(0);
  if (e.key === "End") show(slides.length - 1);
});

document.querySelectorAll(".copy").forEach(
  (button) =>
    (button.onclick = () => {
      const text = button.parentElement.innerText
        .replace("Copiar", "")
        .replace("Copiado!", "")
        .trim();
      navigator.clipboard?.writeText(text);
      button.textContent = "Copiado!";
      setTimeout(() => (button.textContent = "Copiar"), 1200);
    })
);

show(0);
