export async function mostrarOpiniones(isbn) {
  const contenedor = document.getElementById("opiniones");
  if (!contenedor) return;

  contenedor.innerHTML = '<p class="text-muted">Cargando opiniones...</p>';

  try {
    const res = await fetch("data/reviews.json");
    const opinionesServidor = await res.json();
    const opinionesServidorFiltradas = opinionesServidor.filter(op => op.isbn === isbn);

    const clave = `opiniones_${isbn}`;
    const opinionesLocales = JSON.parse(localStorage.getItem(clave)) || [];

    const todas = [...opinionesServidorFiltradas, ...opinionesLocales];

    contenedor.innerHTML = "";

    if (todas.length === 0) {
      contenedor.innerHTML = '<p class="text-muted">Este libro aún no tiene opiniones.</p>';
      return;
    }

    const lista = document.createElement("ul");
    lista.className = "list-group";

    todas.forEach(op => {
      const item = document.createElement("li");
      item.className = "list-group-item";
      item.innerHTML = `<strong>${op.puntuacion} ★</strong> - ${op.comentario}`;
      lista.appendChild(item);
    });

    contenedor.appendChild(lista);
  } catch (error) {
    contenedor.innerHTML = '<p class="text-danger">Error al cargar opiniones.</p>';
  }
}