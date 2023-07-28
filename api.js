const productosContainer = document.querySelector('#contenedor-productos')
const carritoContenedor = document.querySelector('.contenedor-carrito')
const contadorCarrito = document.querySelector('.total-productos')
const precioTotal = document.querySelector('#precioTotal')
const btnVaciar = document.getElementById('vaciarCarrito')
const btnComprar = document.getElementById("comprar");
const carrito = JSON.parse(localStorage.getItem('carrito')) || []



let stock = []

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
    vaciarCarrito()
}

btnVaciar.addEventListener('click', () => {
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Carrito Borrado',
        showConfirmButton: false,
        timer: 2000
      })
      vaciarCarrito()
})

const showMensaje = () => {
    
    Toastify({
        text: `item agregado al carrito!`,
        duration: 2000,
        gravity: 'top',
        position: 'right',
        className: "toastify",
        onClick: () => {
            botonAbrir.click()
        },
        style: {
            background: "linear-gradient(right blue,white)",
          }
    }).showToast()

}

fetch('../stock.json')
    .then((resp) => resp.json())
    .then((data) => {
        console.log(data)
        stock = data
            
        stock.forEach((producto) => {
            const div = document.createElement('div')
            div.classList.add('producto')
        
            div.innerHTML = `
                            <img src=${producto?.img} alt="">
                            <h3>${producto?.nombre}</h3>
                            <p class="precioProducto">Precio: $${producto.precio}</p>
                            <button onclick="agregarAlCarrito(${producto.id})" class="boton-agregar">Agregar al Carrito</button>
                        `
        
            productosContainer.append(div)
        })
    })
    

  const agregarAlCarrito = (productId) => {
    const itemInCart = carrito.find((producto) => producto.id === productId)

    if (itemInCart) {
        itemInCart.cantidad += 1
        showMensaje(itemInCart.nombre)
    } else {
        const {id, nombre, precio} = stock.find( (producto) => producto.id === productId)
    
        const itemToCart = {
            id, 
            nombre, 
            precio, 
            cantidad: 1
        }
        carrito.push(itemToCart)
        showMensaje(nombre)
    }

    localStorage.setItem('carrito', JSON.stringify(carrito))

    console.log(carrito)
    Carrito()
    Cantidad()
    Total()
}

``
const vaciarCarrito = () => {
    carrito.length = 0
    localStorage.setItem('carrito', JSON.stringify(carrito))

    Carrito()
    Cantidad()
    Total()
}




const Carrito = () => {
    carritoContenedor.innerHTML = ''

    carrito.forEach((producto) => {
       
        const div = document.createElement('div')
        div.classList.add('productoEnCarrito')

        div.innerHTML = `
        
                    <p class="contenedor-carrito-nombre">${producto.nombre}</p>
                    <p class="contenedor-carrito-cantidad">Cantidad: ${producto.cantidad} </p>
                    <p class="contenedor-carrito-precio" >Precio unitario: $${producto.precio}</p>
                    
                    `

        carritoContenedor.append(div)
    })
}


const Cantidad = () => {
    contadorCarrito.innerText = carrito.reduce((acc, prod) => acc + prod.cantidad, 0)
}

const Total = () => {
    let total = 0
    carrito.forEach((producto) => {
        total += producto.precio * producto.cantidad
    })

    precioTotal.innerText = total
}



Carrito()
Cantidad()
Total()