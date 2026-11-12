// Crea una tarjeta que se da la vuelta: cara frontal (título, imagen, tecnologías)
// y cara trasera (descripción y botones).
function crearTarjeta(p) {
  const tarjeta = document.createElement("article");
  tarjeta.className = "tarjeta";
  tarjeta.tabIndex = 0;

  const interior = document.createElement("div");
  interior.className = "interior";

  // ----- Cara frontal -----
  const frontal = document.createElement("div");
  frontal.className = "cara frontal";

  if (p.imagen) {
    const img = document.createElement("img");
    img.src = p.imagen;
    img.alt = `Captura de ${p.titulo}`;
    img.loading = "lazy";
    frontal.appendChild(img);
  }

  const bloque = document.createElement("div");
  bloque.className = "bloque";

  const h2 = document.createElement("h2");
  h2.textContent = p.titulo;

  const tags = document.createElement("ul");
  tags.className = "tags";
  (p.tecnologias || []).forEach((t) => {
    const li = document.createElement("li");
    li.textContent = t;
    tags.appendChild(li);
  });

  bloque.append(h2, tags);
  frontal.appendChild(bloque);

  // ----- Cara trasera -----
  const trasera = document.createElement("div");
  trasera.className = "cara trasera";

  const desc = document.createElement("p");
  desc.textContent = p.descripcion;

  const botones = document.createElement("div");
  botones.className = "botones";
  botones.append(
    crearBoton("Ver demo", p.demo, "primario"),
    crearBoton("Ver código", p.codigo, "secundario")
  );

  trasera.append(desc, botones);

  interior.append(frontal, trasera);
  tarjeta.appendChild(interior);

  // En pantallas táctiles no existe "hover": un toque da la vuelta a la tarjeta.
  tarjeta.addEventListener("click", (e) => {
    if (!window.matchMedia("(hover: none)").matches) return;
    if (e.target.closest("a")) return; // no interferir con los botones
    tarjeta.classList.toggle("volteada");
  });

  return tarjeta;
}

// Si hay URL es un enlace; si no, un botón desactivado.
function crearBoton(texto, url, variante) {
  if (!url) {
    const b = document.createElement("span");
    b.className = `boton ${variante} desactivado`;
    b.textContent = texto;
    b.setAttribute("aria-disabled", "true");
    b.title = "No disponible todavía";
    return b;
  }
  const a = document.createElement("a");
  a.className = `boton ${variante}`;
  a.href = url;
  a.target = "_blank";
  a.rel = "noopener noreferrer";
  a.textContent = texto;
  return a;
}

document.getElementById("nombre").textContent = PERFIL.nombre;
document.getElementById("titulo").textContent = PERFIL.titulo;
document.getElementById("descripcion").textContent = PERFIL.descripcion;
document.title = `${PERFIL.nombre} · Proyectos`;

const contenedor = document.getElementById("proyectos");
PROYECTOS.forEach((p) => contenedor.appendChild(crearTarjeta(p)));