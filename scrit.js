// Services and Products Data
const services = [
  {
    id: 1,
    name: "Dorinsectación",
    description:
      "Prevención integrada de plagas ",
    options: [
      "Cucarachas",
      "Hormigas",
      "Chinches",
      "Moscas",
      "Zancudos",
      "Mosquitos",
    ],
    image:
      "https://tse1.mm.bing.net/th/id/OIP.eLvyt9dunw9zhVE8oo2uCQAAAA?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3",
    type: "service",
  },
  {
    id: 2,
    name: "Roedorización",
    description:
      "Eliminación de roedores y plagas con métodos profesionales y seguros",
    options: ["Roedor doméstico", "Rata de tejado", "Rata de drenajes"],
    image:
      "https://cdn.shopify.com/s/files/1/0760/7087/9571/files/eliminacion-de-roedores-e-insectos-_2_1024x1024.webp?v=1694024338",
    type: "service",
  },
  {
    id: 3,
    name: "Sanitización",
    description:
      "Servicio de limpieza y desinfección profesional para espacios saludables",
    options: [
      "Lavado de tanques",
      "Eliminación de mohos",
      "Eliminación de virus y levaduras",
    ],
    image:
      "https://tse2.mm.bing.net/th/id/OIP.c1_3-5FVrR_Bjae1gbG94QHaFN?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3",
    type: "service",
  },
];

const products = [
   {
    id: 103,
    name: "Jaziz Smart",
    description:
      "Sistema de detección electrónica de roedores para monitoreo permanente",
    image:
      "https://tse4.mm.bing.net/th/id/OIP.nS3G9WMO6MeQ57h4NsALlAHaEl?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3",
    type: "product",
  },
  {
    id: 101,
    name: "Polaryn",
    description:
      "Trampa líquida que actúa sobre insectos de cuerpo duro como Hormigas, cucarachas y chinches",
    presentation: "500 ml",
    price: 35000,
    image:
      "https://tse3.mm.bing.net/th/id/OIP.QAVJY8EfR1TwirlhHQR4XQHaEK?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3",
    type: "product",
  },
  {
    id: 102,
    name: "Bioplus",
    description:
      "Bioreparador que elimina materia orgánica, reduce la presencia de mohos, grasa adherida a superficies y presencia de insectos voladores",
    presentation: "500 ml",
    price: 25000,
    image:
      "https://tse3.mm.bing.net/th/id/OIP.t-oYfM586lIBKnU4S6e9JAHaEP?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3",
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
const qrOverlay = document.getElementById("qrOverlay");

// Dark Mode Toggle
function initDarkMode() {
  const themeToggle = document.getElementById("themeToggle");
  const savedTheme = localStorage.getItem("theme") || "light";

  document.body.className = savedTheme + "-mode";
  updateThemeIcons();

  themeToggle.addEventListener("click", () => {
    const currentMode = document.body.className;
    const newMode = currentMode === "light-mode" ? "dark-mode" : "light-mode";
    document.body.className = newMode;
    localStorage.setItem("theme", newMode.replace("-mode", ""));
    updateThemeIcons();
  });
}

function updateThemeIcons() {
  const sunIcon = document.querySelector(".sun-icon");
  const moonIcon = document.querySelector(".moon-icon");
  const isDarkMode = document.body.className === "dark-mode";

  if (isDarkMode) {
    sunIcon.style.display = "none";
    moonIcon.style.display = "block";
  } else {
    sunIcon.style.display = "block";
    moonIcon.style.display = "none";
  }
}

// Initialize App
document.addEventListener("DOMContentLoaded", () => {
  initDarkMode();
  renderServices();
  renderProducts();
  setupEventListeners();
});

// Render Services
function renderServices() {
  servicesGrid.innerHTML = services
    .map(
      (service) => `
    <div class="card">
      <img src="${service.image}" alt="${service.name}" class="card-image">
      <div class="card-content">
        <h4 class="card-title">${service.name}</h4>
        <p class="card-description">${service.description}</p>
        <ul class="card-features">
          ${service.options.map((option) => `<li>${option}</li>`).join("")}
        </ul>
        <button onclick="addToCart(${service.id}, 'service')" class="add-btn">
          Agregar
        </button>
      </div>
    </div>
  `
    )
    .join("");
}

// Render Products
function renderProducts() {
  productsGrid.innerHTML = products
    .map(
      (product) => `
    <div class="card">
      <img src="${product.image}" alt="${product.name}" class="card-image">
      <div class="card-content">
        <h4 class="card-title">${product.name}</h4>
        ${
          product.presentation
            ? `<p class="card-presentation">${product.presentation}</p>`
            : ""
        }
        <p class="card-description">${product.description}</p>
        <div class="card-footer">
          <div class="price-section">
            ${
              product.price
                ? `
              <p class="price-label">Precio</p>
              <p class="price-value">$${product.price.toLocaleString("es-CO")}</p>
            `
                : `<p class="price-consult">Precio a consultar</p>`
            }
          </div>
          <button onclick="addToCart(${product.id}, 'product')" class="add-btn">
            Agregar
          </button>
        </div>
      </div>
    </div>
  `
    )
    .join("");
}

// Add to Cart
function addToCart(itemId, type) {
  const items = type === "service" ? services : products;
  const item = items.find((i) => i.id === itemId);

  const existingItem = cart.find((cartItem) => cartItem.id === itemId);

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
  cart = cart.filter((item) => item.id !== itemId);
  updateCart();
}

// Update Quantity
function updateQuantity(itemId, quantity) {
  if (quantity <= 0) {
    removeFromCart(itemId);
    return;
  }

  const item = cart.find((cartItem) => cartItem.id === itemId);
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
    cartBody.innerHTML = "<p class='empty-message'>Tu carrito está vacío</p>";
    cartFooter.style.display = "none";
    return;
  }

  // Render cart items
  cartBody.innerHTML = cart
    .map((item) => {
      const itemPrice = item.price ? item.price : null;
      const itemTotal = itemPrice ? itemPrice * item.quantity : null;

      return `
        <div class="cart-item">
          <div class="cart-item-info">
            <div class="cart-item-name">${item.name}</div>
            ${
              itemPrice
                ? `
              <div class="cart-item-price">
                $${itemPrice.toLocaleString("es-CO")}
                ${itemTotal && itemTotal !== itemPrice ? `= $${itemTotal.toLocaleString("es-CO")}` : ""}
              </div>
            `
                : ""
            }
            <div class="quantity-controls">
              <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity - 1})">−</button>
              <span class="quantity-display">${item.quantity}</span>
              <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
            </div>
          </div>
          <button class="remove-btn" onclick="removeFromCart(${item.id})">✕</button>
        </div>
      `;
    })
    .join("");

  // Calculate totals
  const totalPrice = cart.reduce((sum, item) => {
    const price = item.price || 0;
    return sum + price * item.quantity;
  }, 0);

  // Update footer
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
    .map((item) => {
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
  qrOverlay.addEventListener("click", toggleQRModal);
}
