// Your Firebase configuration and initialization
const firebaseConfig = {
    apiKey: "AIzaSyCBpIQePh6ikEDekXxNnQyUkU4QTkt3q_o",
    authDomain: "libros-97edd.firebaseapp.com",
    projectId: "libros-97edd",
    storageBucket: "libros-97edd.firebasestorage.app",
    messagingSenderId: "350506775240",
    appId: "1:350506775240:web:7b7f122412e5090cd96bfd",
    measurementId: "G-H1XZ058WLG"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// --- Carrito de Compras Functions ---

// Add product to cart - NOW INCLUDES imageUrl
const agregarProducto = async(nombre, precio, imageUrl) => {
    try {
        await db.collection("carrito").add({ nombre, precio, imageUrl }); // Store the image URL
        console.log(`${nombre} agregado al carrito.`);
        await cargarCarrito(); // Reload cart to update display
    } catch (error) {
        console.error("Error al agregar el producto al carrito:", error);
    }
};

// Load cart, display products, and calculate total
const cargarCarrito = async() => {
    // You'll need an HTML element with id="lista-carrito-items" to display the actual list of items.
    const listaCarritoItems = document.getElementById("lista-carrito-items");
    if (!listaCarritoItems) {
        console.error("No se encontró el elemento con ID 'lista-carrito-items' para mostrar los productos del carrito.");
        return; // Exit if the container isn't found
    }
    listaCarritoItems.innerHTML = ""; // Clear existing items

    const cartItemCountElement = document.getElementById("cart-item-count");
    const totalCompraElement = document.getElementById("totalCompra"); // Element for total price

    let total = 0;
    let itemCount = 0;

    try {
        const productos = await db.collection("carrito").get();
        productos.forEach(doc => {
            const item = doc.data();
            total += item.precio;
            itemCount++;

            // Create list item for each product in the cart
            const li = document.createElement("li");
            li.className = "flex items-center space-x-4 py-2 border-b border-gray-200 dark:border-gray-700"; // Tailwind classes for styling

            // Image
            const img = document.createElement("img");
            img.src = item.imageUrl;
            img.alt = item.nombre;
            img.className = "w-16 h-16 object-cover rounded-md shadow"; // Tailwind classes for image size and style
            li.appendChild(img);

            // Details (Name and Price)
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

            // Delete Button
            const btnEliminar = document.createElement("button");
            btnEliminar.textContent = "Eliminar";
            btnEliminar.className = "px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition"; // Tailwind classes for button styling
            btnEliminar.addEventListener("click", async() => {
                try {
                    await db.collection("carrito").doc(doc.id).delete();
                    console.log(`${item.nombre} eliminado del carrito.`);
                    await cargarCarrito(); // Reload cart after deletion
                } catch (error) {
                    console.error("No se pudo eliminar el producto del carrito:", error);
                }
            });
            li.appendChild(btnEliminar);

            listaCarritoItems.appendChild(li); // Add the complete item to the list
        });

        // Update the cart item count in the navigation bar
        if (cartItemCountElement) {
            cartItemCountElement.textContent = itemCount;
        }

        // Update the total price display
        if (totalCompraElement) {
            totalCompraElement.textContent = `Total a pagar: $${total.toFixed(2)}`;
        }

    } catch (error) {
        console.error("Error al cargar el carrito:", error);
    }
};

// --- Event Listeners ---

// Get the "Comprar" button by its ID
const btnComprar = document.getElementById("btn-comprar");

// Add event listener to the "Comprar" button
if (btnComprar) {
    btnComprar.addEventListener("click", () => {
        // Define the product details for "Cien años de soledad"
        const productName = "Cien años de soledad";
        const productPrice = 20.00;
        const productImage = "/imagenes/libro2.jpg"; // Path to your book image
        agregarProducto(productName, productPrice, productImage);
    });
} else {
    console.error("El botón 'Comprar' con ID 'btn-comprar' no se encontró en el DOM.");
}

// Load the cart when the page loads
window.onload = () => {
    cargarCarrito();
};