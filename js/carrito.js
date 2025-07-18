const firebaseConfig = {
    apiKey: "AIzaSyCBpIQePh6ikEDekXxNnQyUkU4QTkt3q_o",
    authDomain: "libros-97edd.firebaseapp.com",
    projectId: "libros-97edd",
    storageBucket: "libros-97edd.firebasestorage.app",
    messagingSenderId: "350506775240",
    appId: "1:350506775240:web:7b7f122412e5090cd96bfd",
    measurementId: "G-H1XZ058WLG"
};


firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const agregarProducto = async(nombre, precio, imageUrl) => {
    try {
        await db.collection("carrito").add({ nombre, precio, imageUrl }); 
        console.log(`${nombre} agregado al carrito.`);
        await cargarCarrito(); 
    } catch (error) {
        console.error("Error al agregar el producto al carrito:", error);
    }
};


const cargarCarrito = async() => {
    const listaCarritoItems = document.getElementById("lista-carrito-items");
    if (!listaCarritoItems) {
        console.error("No se encontró el elemento con ID 'lista-carrito-items' para mostrar los productos del carrito.");
        return; 
    }
    listaCarritoItems.innerHTML = ""; 

    const cartItemCountElement = document.getElementById("cart-item-count");
    const totalCompraElement = document.getElementById("totalCompra"); 

    let total = 0;
    let itemCount = 0;

    try {
        const productos = await db.collection("carrito").get();
        productos.forEach(doc => {
            const item = doc.data();
            total += item.precio;
            itemCount++;

            const li = document.createElement("li");
            li.className = "flex items-center space-x-4 py-2 border-b border-gray-200 dark:border-gray-700"; 
            const img = document.createElement("img");
            img.src = item.imageUrl;
            img.alt = item.nombre;
            img.className = "w-16 h-16 object-cover rounded-md shadow"; 
            li.appendChild(img);

            const divDetails = document.createElement("div");
            divDetails.className = "flex-grow";
            const pName = document.createElement("p");
            pName.className = "text-lg font-semibold text-gray-800 dark:text-white";
            pName.textContent = item.nombre;
            const pPrice = document.createElement("p");
            pPrice.className = "text-md text-gray-600 dark:text-gray-300";
            pPrice.textContent = `$${item.precio.toFixed(2)}`;
            divDetails.appendChild(pName);
            divDetails.appendChild(pPrice);
            li.appendChild(divDetails);

            const btnEliminar = document.createElement("button");
            btnEliminar.textContent = "Eliminar";
            btnEliminar.className = "px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition"; 
            btnEliminar.addEventListener("click", async() => {
                try {
                    await db.collection("carrito").doc(doc.id).delete();
                    console.log(`${item.nombre} eliminado del carrito.`);
                    await cargarCarrito(); 
                } catch (error) {
                    console.error("No se pudo eliminar el producto del carrito:", error);
                }
            });
            li.appendChild(btnEliminar);

            listaCarritoItems.appendChild(li); 
        });

        if (cartItemCountElement) {
            cartItemCountElement.textContent = itemCount;
        }

        if (totalCompraElement) {
            totalCompraElement.textContent = `Total a pagar: $${total.toFixed(2)}`;
        }

    } catch (error) {
        console.error("Error al cargar el carrito:", error);
    }
};

const btnComprar = document.getElementById("btn-comprar");

if (btnComprar) {
    btnComprar.addEventListener("click", () => {
        const productName = "Cien años de soledad";
        const productPrice = 20.00;
        const productImage = "/imagenes/libro2.jpg";
        agregarProducto(productName, productPrice, productImage);
    });
} else {
    console.error("El botón 'Comprar' con ID 'btn-comprar' no se encontró en el DOM.");
}
window.onload = () => {
    cargarCarrito();
};