import { mostrarOpiniones } from './opiniones.js';

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-opinion");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const comentario = document.getElementById("comentario").value.trim();
    const puntuacion = parseInt(document.getElementById("puntuacion").value);

    const urlParams = new URLSearchParams(window.location.search);
    const isbn = urlParams.get("isbn");

    if (!isbn || !comentario || isNaN(puntuacion)) {
      alert("Completa todos los campos.");
      return;
    }

    // Enviar también a la API mock
    try {
      const response = await fetch(`https://mock.apidog.com/m1/955638-939419-default/books/${isbn}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ comentario, puntuacion })
      });

      if (!response.ok) {
        throw new Error("Error al enviar la opinión a la API");
      }

      alert("Opinión enviada con éxito.");

    } catch (error) {
      console.error("Error al enviar a la API:", error);
      alert("Opinión guardada localmente, pero no se pudo enviar a la API.");
    }

    // Limpiar formulario y cerrar modal
    form.reset();
    const modalElement = document.getElementById("opinionModal");
    const modalInstance = bootstrap.Modal.getInstance(modalElement);
    modalInstance.hide();

    // Volver a cargar opiniones
    if (typeof mostrarOpiniones === "function") {
      mostrarOpiniones(isbn);
    }
  });
});
