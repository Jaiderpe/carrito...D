// Services and Products Data
const services = [
    {
        id: 1,
        name: "Dorinsectación",
        description: "Prevención integrada de plagas",
        options: ["Cucarachas", "Hormigas", "Chinches", "Moscas", "Zancudos", "Mosquitos"],
        image: "https://tse1.mm.bing.net/th/id/OIP.eLvyt9dunw9zhVE8oo2uCQAAAA?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3",
        type: "service",
    },
    {
        id: 2,
        name: "Roedorización",
        description: "Eliminación de roedores y plagas con métodos profesionales y seguros",
        options: ["Roedor doméstico", "Rata de tejado", "Rata de drenajes"],
        image: "https://cdn.shopify.com/s/files/1/0760/7087/9571/files/eliminacion-de-roedores-e-insectos-_2_1024x1024.webp?v=1694024338",
        type: "service",
    },
    {
        id: 3,
        name: "Sanitización",
        description: "Servicio de limpieza y desinfección profesional para espacios saludables",
        options: ["Lavado de tanques", "Eliminación de mohos", "Eliminación de virus y levaduras"],
        image: "https://tse2.mm.bing.net/th/id/OIP.c1_3-5FVrR_Bjae1gbG94QHaFN?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3",
        type: "service",
    },
];

const products = [
    {
        id: 103,
        name: "Jaziz Smart",
        description: "Sistema de detección electrónica de roedores para monitoreo permanente",
        image: "https://tse4.mm.bing.net/th/id/OIP.nS3G9WMO6MeQ57h4NsALlAHaEl?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3",
        type: "product",
    },
    {
        id: 101,
        name: "Polaryn",
        description: "Trampa líquida que actúa sobre insectos de cuerpo duro como Hormigas, cucarachas y chinches",
        presentation: "500 ml",
        price: 35000,
        image: "https://tse3.mm.bing.net/th/id/OIP.QAVJY8EfR1TwirlhHQR4XQHaEK?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3",
        type: "product",
    },
    {
        id: 102,
        name: "Bioplus",
        description: "Bioreparador que elimina materia orgánica, reduce la presencia de mohos, grasa adherida a superficies y presencia de insectos voladores",
        presentation: "500 ml",
        price: 25000,
        image: "https://tse3.mm.bing.net/th/id/OIP.t-oYfM586lIBKnU4S6e9JAHaEP?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3",
        type: "product",
    },
];

// Cart Management
let cart = [];

// DOM Elements
const servicesGrid = document.getElementById("servicesGrid");
const productsGrid = document.getElementById("productsGrid");
const cartBtn = document.getElementById("cartBtn");
const closeCartBtn = document.getElementById("closeCartBtn");
const cartModal = document.getElementById("cartModal");
const cartOverlay = document.getElementById("cartOverlay");
const cartBody = document.getElementById("cartBody");
const cartFooter = document.getElementById("cartFooter");
const cartCount = document.getElementById("cartCount");
const notification = document.getElementById("notification");
const whatsappBtn = document.getElementById("whatsappBtn");
const qrBtn = document.getElementById("qrBtn");
const qrModal = document.getElementById("qrModal");
const closeQrBtn = document.getElementById("closeQrBtn");
const closeQrBtnFooter = document.getElementById("closeQrBtnFooter");
const qrOverlay = document.getElementById("qrOverlay");
const themeToggle = document.getElementById("themeToggle");

// Dark Mode Toggle
function initDarkMode() {
    const savedTheme = localStorage.getItem("theme") || "light";
    applyTheme(savedTheme === "dark");
    updateThemeIcon(savedTheme === "dark");
}

function applyTheme(isDark) {
    if (isDark) {
        document.body.classList.add("dark-mode");
        localStorage.setItem("theme", "dark");
    } else {
        document.body.classList.remove("dark-mode");
        localStorage.setItem("theme", "light");
    }
    updateThemeIcon(isDark);
}

function updateThemeIcon(isDark) {
    themeToggle.textContent = isDark ? "☀️" : "🌙";
}

themeToggle.addEventListener("click", () => {
    const isDarkMode = document.body.classList.contains("dark-mode");
    applyTheme(!isDarkMode);
});

// Render Services
function renderServices() {
    servicesGrid.innerHTML = services.map(service => `
        <div class="card">
            <div class="card-image">
                <img src="${service.image}" alt="${service.name}">
            </div>
            <div class="card-content">
                <h3 class="card-title">${service.name}</h3>
                <p class="card-description">${service.description}</p>
                <ul class="card-features">
                    ${service.options.map(option => `<li>${option}</li>`).join("")}
                </ul>
                <div class="card-footer">
                    <button class="add-btn" onclick="addToCart(${service.id}, 'service')">
                        + Agregar
                    </button>
                </div>
            </div>
        </div>
    `).join("");
}

// Render Products
function renderProducts() {
    productsGrid.innerHTML = products.map(product => `
        <div class="card">
            <div class="card-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="card-content">
                <h3 class="card-title">${product.name}</h3>
                ${product.presentation ? `<p class="card-presentation">${product.presentation}</p>` : ""}
                <p class="card-description">${product.description}</p>
                <div class="card-footer">
                    <div class="price-section">
                        <p class="price-label">Precio</p>
                        ${product.price 
                            ? `<p class="price-value">$${product.price.toLocaleString("es-CO")}</p>` 
                            : `<p class="price-consult"> A consultar</p>`
                        }
                    </div>
                    <button class="add-btn" onclick="addToCart(${product.id}, 'product')">
                        + Agregar
                    </button>
                </div>
            </div>
        </div>
    `).join("");
}

// Add to Cart
function addToCart(itemId, type) {
    const items = type === "service" ? services : products;
    const item = items.find(i => i.id === itemId);

    if (!item) return;

    const existingItem = cart.find(cartItem => cartItem.id === itemId);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            ...item,
            quantity: 1,
        });
    }

    updateCart();
    showNotification(`${item.name} agregado al carrito`);
}

// Remove from Cart
function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    updateCart();
}

// Update Quantity
function updateQuantity(itemId, quantity) {
    if (quantity <= 0) {
        removeFromCart(itemId);
        return;
    }

    const item = cart.find(cartItem => cartItem.id === itemId);
    if (item) {
        item.quantity = quantity;
        updateCart();
    }
}

// Update Cart
function updateCart() {
    updateCartCount();
    updateCartDisplay();
}

// Update Cart Count
function updateCartCount() {
    const total = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = total;
}

// Update Cart Display
function updateCartDisplay() {
    if (cart.length === 0) {
        cartBody.innerHTML = '<div class="empty-message">Tu carrito está vacío</div>';
        cartFooter.style.display = "none";
        return;
    }

    cartBody.innerHTML = cart.map(item => {
        const itemPrice = item.price ? item.price : null;
        const itemTotal = itemPrice ? itemPrice * item.quantity : null;

        return `
            <div class="cart-item">
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    ${itemPrice ? `
                        <div class="cart-item-price">
                            $${itemPrice.toLocaleString("es-CO")}
                            ${itemTotal && itemTotal !== itemPrice ? `= $${itemTotal.toLocaleString("es-CO")}` : ""}
                        </div>
                    ` : ""}
                    <div class="quantity-controls">
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity - 1})">−</button>
                        <span class="quantity-display">${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                    </div>
                </div>
                <button class="remove-btn" onclick="removeFromCart(${item.id})">✕</button>
            </div>
        `;
    }).join("");

    const totalPrice = cart.reduce((sum, item) => {
        const price = item.price || 0;
        return sum + price * item.quantity;
    }, 0);

    const subtotalEl = document.getElementById("subtotal");
    const totalPriceEl = document.getElementById("totalPrice");

    if (totalPrice > 0) {
        subtotalEl.textContent = `$${totalPrice.toLocaleString("es-CO")}`;
        totalPriceEl.textContent = `$${totalPrice.toLocaleString("es-CO")}`;
    } else {
        subtotalEl.textContent = "Consultar";
        totalPriceEl.textContent = "Consultar";
    }

    cartFooter.style.display = "block";
}

// Show Notification
function showNotification(message) {
    notification.textContent = message;
    notification.classList.add("show");

    setTimeout(() => {
        notification.classList.remove("show");
    }, 3000);
}

// Toggle Cart
function toggleCart() {
    const isActive = cartModal.classList.contains("active");

    if (isActive) {
        cartModal.classList.remove("active");
        cartOverlay.classList.remove("active");
    } else {
        cartModal.classList.add("active");
        cartOverlay.classList.add("active");
    }
}

// WhatsApp Payment
function payWhatsApp() {
    if (cart.length === 0) {
        alert("El carrito está vacío");
        return;
    }

    const itemsList = cart
        .map(item => {
            const quantity = `x${item.quantity}`;
            const price = item.price
                ? ` - $${(item.price * item.quantity).toLocaleString("es-CO")}`
                : "";
            return `${item.name} ${quantity}${price}`;
        })
        .join("%0A");

    const totalPrice = cart.reduce((sum, item) => {
        const price = item.price || 0;
        return sum + price * item.quantity;
    }, 0);

    const totalPriceStr =
        totalPrice > 0
            ? `%0A%0ATotal: $${totalPrice.toLocaleString("es-CO")}`
            : "";

    const message = `Hola! Me gustaría contratar los siguientes servicios/productos:%0A%0A${itemsList}${totalPriceStr}%0A%0AAgradezco tu atención.`;
    const whatsappNumber = "573193036362";
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

    window.open(whatsappUrl, "_blank");
}

// QR Payment
function payQR() {
    if (cart.length === 0) {
        alert("El carrito está vacío");
        return;
    }

    toggleQRModal();
}

// Toggle QR Modal
function toggleQRModal() {
    const isActive = qrModal.classList.contains("active");

    if (isActive) {
        qrModal.classList.remove("active");
        qrOverlay.classList.remove("active");
    } else {
        qrModal.classList.add("active");
        qrOverlay.classList.add("active");
    }
}

// Event Listeners
function setupEventListeners() {
    cartBtn.addEventListener("click", toggleCart);
    closeCartBtn.addEventListener("click", toggleCart);
    cartOverlay.addEventListener("click", toggleCart);
    whatsappBtn.addEventListener("click", payWhatsApp);
    qrBtn.addEventListener("click", payQR);
    closeQrBtn.addEventListener("click", toggleQRModal);
    closeQrBtnFooter.addEventListener("click", toggleQRModal);
    qrOverlay.addEventListener("click", toggleQRModal);
}

// Initialize App
document.addEventListener("DOMContentLoaded", () => {
    initDarkMode();
    renderServices();
    renderProducts();
    setupEventListeners();
});
