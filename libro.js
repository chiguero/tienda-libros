// js/libro.js

import { Cart } from './cart.js';

document.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search);
  const isbn = params.get("isbn");

  if (!isbn) return;

  const res = await fetch("data/books.json");
  const libros = await res.json();

  const libro = libros.find(libro => libro.isbn === isbn);
  if (!libro) return;

  mostrarLibro(libro);
  configurarAgregarAlCarrito(libro);
  mostrarOpiniones(libro.isbn);

  // Mostrar libros relacionados

  const relacionados = libros.filter(l => l.categoria === libro.categoria && l.isbn !== libro.isbn);
  const contenedor = document.getElementById("relacionados");

  if (relacionados.length > 0) {
    const titulo = document.createElement("h4");
    titulo.textContent = "Libros relacionados";
    contenedor.appendChild(titulo);

    relacionados.forEach(libro => {
      const div = document.createElement("div");
      div.classList.add("card", "mb-2");
      div.innerHTML = `
        <div class="card-body">
          <h5 class="card-title">${libro.titulo}</h5>
          <p class="card-text">Autor: ${libro.autor}</p>
          <a href="libro.html?isbn=${libro.isbn}" class="btn btn-outline-primary btn-sm">Ver</a>
        </div>
      `;
      contenedor.appendChild(div);
      console.log("Relacionados:", relacionados);
    });
  }
  
});

function mostrarLibro(libro) {
  document.getElementById("imagen-libro").src = libro.imagen;
  document.getElementById("imagen-libro").alt = libro.titulo;
  document.getElementById("titulo-libro").textContent = libro.titulo;
  document.getElementById("autor-libro").textContent = libro.autor;
  document.getElementById("precio-libro").textContent = libro.precio;
  document.getElementById("categoria-libro").textContent = libro.categoria;
  document.getElementById("descripcion-libro").textContent = `Este es un excelente libro sobre ${libro.categoria}.`;
}

function configurarAgregarAlCarrito(libro) {
  const boton = document.getElementById("btn-agregar");
  const carrito = new Cart();

  boton.addEventListener("click", () => {
    carrito.actualizarProducto(libro.isbn, 1); // unidades = 1 por defecto
    alert("Libro agregado al carrito");
  });
}



import { mostrarOpiniones } from './opiniones.js';