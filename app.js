// Crea una tarjeta a partir de un objeto de PROYECTOS.
function crearTarjeta(p) {
  const tarjeta = document.createElement("article");
  tarjeta.className = "tarjeta";

  if (p.imagen) {
    const img = document.createElement("img");
    img.src = p.imagen;
    img.alt = `Captura de ${p.titulo}`;
    img.loading = "lazy";
    tarjeta.appendChild(img);
  }

  const cuerpo = document.createElement("div");
  cuerpo.className = "cuerpo";

  const h2 = document.createElement("h2");
  h2.textContent = p.titulo;

  const desc = document.createElement("p");
  desc.textContent = p.descripcion;

  const tags = document.createElement("ul");
  tags.className = "tags";
  (p.tecnologias || []).forEach((t) => {
    const li = document.createElement("li");
    li.textContent = t;
    tags.appendChild(li);
  });

  const botones = document.createElement("div");
  botones.className = "botones";
  botones.append(
    crearBoton("Ver demo", p.demo, "primario"),
    crearBoton("Ver código", p.codigo, "secundario")
  );

  cuerpo.append(h2, desc, tags, botones);
  tarjeta.appendChild(cuerpo);
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
