const contenedorProductos = document.querySelector(".contenedor-productos");
const contenedorCarrito = document.querySelector(".contenedor-carrito");
const precioTotal = document.querySelector(".precio-total");
const totalProductos = document.querySelector(".total-productos");
const btnComprar = document.getElementById("comprar");
const btnAnadirCarrito = document.querySelector(".boton-añadir-carrito");


btnAnadirCarrito.onclick = muestratoastify



function muestratoastify() {
    btnAnadirCarrito.forEach(function () {
        Toastify({
            text: "Agregado al carrito",
            className: "info",
            duration: 1000,
            style: {
                background: "linear-gradient(to right, #3d5ce4 ,white )",
            }
        }).showToast();
    })
};








btnComprar.onclick = muestraAlert;

function muestraAlert() {


    swal.fire({
        title: 'MUCHAS GRACIAS POR SU COMPRA',
        text: 'Visitenos en redes para seguir todas nuestras promociones! 🙌',
        imageUrl: 'https://unsplash.it/400/200',
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: 'Custom image',
    })
}

let compras = [];
let contadorProductos = 0;
let totalCarrito = 0;




//funciones 

contenedorProductos.addEventListener("click", function agregarProducto(e) {
    e.preventDefault();
    if (e.target.classList.contains("boton-añadir-carrito")) {
        Toastify({
            text: "Agregado al carrito",
            className: "info",
            duration: 1000,
            style: {
                background: "linear-gradient(to right,#3d5ce4,white )",
            }
        }).showToast();
        const productoSeleccionado = e.target.parentElement;
        recuperarContenido(productoSeleccionado);

    }

})

contenedorCarrito.addEventListener("click", function eliminarProducto(e) {
    if (e.target.classList.contains("eliminar-producto")) {
        const IdEliminar = e.target.getAttribute("data-id");

        compras.forEach(value => {
            if (value.id == IdEliminar) {
                let eliminarPrecio = parseInt(value.precio) * parseInt(value.cantidad);
                totalCarrito = totalCarrito - eliminarPrecio;
            }
        });

        compras = compras.filter(producto => producto.id !== IdEliminar)
        contadorProductos--;
    }

    if (compras.length === 0) {
        precioTotal.innerHTML = 0;
        totalProductos.innerHTML = 0;
    }

    comprasHtml();
})



function recuperarContenido(producto) {
    const informacionProducto = {
        imagen: producto.querySelector("div img").src,
        titulo: producto.querySelector(".titulo-producto").textContent,
        precio: producto.querySelector(".precio-producto").textContent,
        id: producto.querySelector("a").getAttribute("data-id"),
        cantidad: 1

    };


    totalCarrito = totalCarrito + parseInt(informacionProducto.precio);

    const validarId = compras.some(producto => producto.id === informacionProducto.id);
    if (validarId) {
        const nuevoCarrito = compras.map(producto => {
            if (producto.id === informacionProducto.id) {
                producto.cantidad++;
                return producto;
            } else {
                return producto;
            }
        })
        compras = [...nuevoCarrito];
    } else {
        compras = [...compras, informacionProducto]
        contadorProductos++;
    }
    comprasHtml();
}


function comprasHtml() {
    limpiarCarrito();
    compras.forEach(producto => {
        const { imagen, titulo, precio, id, cantidad } = producto;
        const productoCarrito = document.createElement("div");
        productoCarrito.classList.add("producto-carrito");
        productoCarrito.innerHTML = `
        <div class="contenido-producto">
                <img src="${imagen}"  alt="imagen del producto">
                <h5 style="font-size: 15px;">${titulo}</h5>
                <h5 class="precio-carrito">${precio}</h5>
                <h6>Cantidad: ${cantidad}</h6>
                <span data-id="${id}"  class="eliminar-producto"><i class="fa-solid fa-trash eliminar-producto" data-id="${id}">X</i></span>
                
             </div>
        `;
        let info = document.querySelector(".contenido-producto")
        localStorage.setItem("info", JSON.stringify({ info: titulo, precio: precio }));
        contenedorCarrito.appendChild(productoCarrito)
        precioTotal.innerHTML = totalCarrito;
        totalProductos.innerHTML = contadorProductos;




    });
}


function limpiarCarrito() {
    contenedorCarrito.innerHTML = "";
}






