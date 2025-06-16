export class Cart {
  constructor() {
    this.key = "carrito";
    const data = localStorage.getItem(this.key);
    if (!data) {
      localStorage.setItem(this.key, JSON.stringify([]));
    }
  }

  actualizarProducto(isbn, unidades) {
    const carrito = JSON.parse(localStorage.getItem(this.key));
    const libro = carrito.find(item => item.isbn === isbn);
    if (libro) {
      libro.unidades = unidades;
    } else {
      carrito.push({ isbn, unidades });
    }
    localStorage.setItem(this.key, JSON.stringify(carrito));
  }

  calcularCarrito() {
    const carrito = JSON.parse(localStorage.getItem(this.key));
    return carrito;
  }

  eliminarProducto(isbn) {
    let carrito = JSON.parse(localStorage.getItem(this.key));
    carrito = carrito.filter(item => item.isbn !== isbn);
    localStorage.setItem(this.key, JSON.stringify(carrito));
  }

  limpiarCarrito() {
    localStorage.setItem(this.key, JSON.stringify([]));
  }
}