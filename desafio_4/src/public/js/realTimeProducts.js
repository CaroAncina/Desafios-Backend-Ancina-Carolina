const socket = io();
const divListaProductos = document.getElementById('listaProductos');
const form = document.getElementById('add-product-form');
const listaProductos = document.getElementById('listaProductos');
const btnEnviar = document.getElementById('btnEnviar');

btnEnviar.addEventListener('click', () => {
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const price = document.getElementById('price').value;
    const code = document.getElementById('code').value;
    const stock = document.getElementById('stock').value;
    const category = document.getElementById('category').value;
    const thumbnail = document.getElementById('thumbnail').value;

    const newProduct = {
        title,
        description,
        price,
        code,
        stock,
        category,
        thumbnail
    };

    socket.emit('nuevoProducto', newProduct);
});

socket.on('productos', productos => {
    const fragment = document.createDocumentFragment();

    productos.forEach(producto => {
        const p = document.createElement('p');
        const btnEliminar = document.createElement('button');

        btnEliminar.textContent = 'Eliminar';
        btnEliminar.addEventListener('click', () => {
            socket.emit('eliminarProducto', producto.id);
        });

        p.innerHTML = `<strong>Titulo: </strong>${producto.title}, <strong>Descripcion: </strong>${producto.description}, <strong>Precio: </strong>${producto.price}, <strong>Codigo: </strong>${producto.code}, <strong>Stock: </strong>${producto.stock}`;

        fragment.appendChild(p);
        fragment.appendChild(btnEliminar);
    });

    divListaProductos.innerHTML = '';
    divListaProductos.appendChild(fragment);
});

function mostrarRespuesta(mensajeRespuesta) {
    const respuesta = document.createElement('p');
    respuesta.innerHTML = `<strong>${mensajeRespuesta}</strong>`;
    divListaProductos.appendChild(respuesta);
}

socket.on('respuestaAdd', mensajeRespuesta => {
    mostrarRespuesta(mensajeRespuesta);
});

socket.on('respuestaDelete', mensajeRespuesta => {
    mostrarRespuesta(mensajeRespuesta);
});
