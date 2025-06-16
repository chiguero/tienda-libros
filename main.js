async function cargarLibros(categoria = "", orden = "asc") {
  const res = await fetch("data/books.json");
  const libros = await res.json();

  const contenedor = document.getElementById("contenedor-libros");
  contenedor.innerHTML = "";

  // Filtro por categoría
  let filtrados = categoria
    ? libros.filter(libro => libro.categoria === categoria)
    : libros;

  // Ordenar por precio
  filtrados = ordenarLibros(filtrados, orden);

  // Mostrar libros
  filtrados.forEach(libro => {
    const div = document.createElement("div");
    div.classList.add("col");

    div.innerHTML = `
      <div class="card h-100">
        <img src="${libro.imagen}" class="card-img-top" alt="${libro.titulo}">
        <div class="card-body">
          <h5 class="card-title">${libro.titulo}</h5>
          <p class="card-text">Autor: ${libro.autor}</p>
          <p class="card-text">Precio: $${libro.precio}</p>
          <a href="libro.html?isbn=${libro.isbn}" class="btn btn-primary">Ver más</a>
        </div>
      </div>
    `;
    contenedor.appendChild(div);
  });
}

// Ordenar libros por precio
function ordenarLibros(lista, orden) {
  return [...lista].sort((a, b) =>
    orden === "asc" ? a.precio - b.precio : b.precio - a.precio
  );
}

document.addEventListener("DOMContentLoaded", () => {
  const filtroCategoria = document.getElementById("filtro-categoria");
  const filtroPrecio = document.getElementById("filtro-precio");

  let categoriaSeleccionada = "";
  let ordenSeleccionado = "asc";

 
  cargarLibros(categoriaSeleccionada, ordenSeleccionado);

 
  if (filtroCategoria) {
    filtroCategoria.addEventListener("change", () => {
      categoriaSeleccionada = filtroCategoria.value;
      cargarLibros(categoriaSeleccionada, ordenSeleccionado);
    });
  }

  // Filtro por precio
  if (filtroPrecio) {
    filtroPrecio.addEventListener("change", () => {
      ordenSeleccionado = filtroPrecio.value;
      cargarLibros(categoriaSeleccionada, ordenSeleccionado);
    });
  }
});
