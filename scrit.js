// Pest Control Services Data
const services = [
  {
    id: 1,
    name: "Fumigación de Termitas",
    description: "Control completo de termitas y plagas de madera",
    image: "https://images.unsplash.com/photo-1584262173688-82c6cb5e2a27?w=400&h=400&fit=crop",
    features: ["Inspección profunda", "Tratamiento profesional", "Garantía 6 meses"],
    price: 150,
  },
  {
    id: 2,
    name: "Control de Roedores",
    description: "Eliminación de ratones y ratas con métodos seguros",
    image: "https://images.unsplash.com/photo-1585509944149-53fc0a4a6d7e?w=400&h=400&fit=crop",
    features: ["Trampas profesionales", "Sellado de grietas", "Seguimiento mensual"],
    price: 120,
  },
  {
    id: 3,
    name: "Eliminación de Chinches",
    description: "Tratamiento especializado para chinches de cama",
    image: "https://images.unsplash.com/photo-1626314408456-5edc1ad76f0f?w=400&h=400&fit=crop",
    features: ["Análisis del área", "Tratamiento químico", "Revisión post-tratamiento"],
    price: 180,
  },
  {
    id: 4,
    name: "Control de Mosquitos",
    description: "Protección contra mosquitos y dengue",
    image: "https://images.unsplash.com/photo-1598081502899-a5d35b2a4a7f?w=400&h=400&fit=crop",
    features: ["Fumigación perimetral", "Eliminación de criaderos", "Protección familiar"],
    price: 100,
  },
  {
    id: 5,
    name: "Control de Cucarachas",
    description: "Eliminación completa de cucarachas e insectos",
    image: "https://images.unsplash.com/photo-1618944412213-1e00e1b50e00?w=400&h=400&fit=crop",
    features: ["Tratamiento integral", "Productos seguros", "Visitas de seguimiento"],
    price: 130,
  },
  {
    id: 6,
    name: "Inspección y Diagnóstico",
    description: "Inspección profesional de plagas",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=400&fit=crop",
    features: ["Análisis exhaustivo", "Reporte detallado", "Plan de acción"],
    price: 80,
  },
];

// Cart Management
let cart = [];

function renderServices() {
  const servicesGrid = document.getElementById("servicesGrid");
  servicesGrid.innerHTML = services.map((service) => `
    <div class="service-card">
      <div class="service-image">
        <img src="${service.image}" alt="${service.name}" onerror="this.style.display='none'">
      </div>
      <div class="service-content">
        <h3 class="service-name">${service.name}</h3>
        <p class="service-description">${service.description}</p>
        <ul class="service-features">
          ${service.features.map((feature) => `<li>${feature}</li>`).join("")}
        </ul>
        <div class="service-footer">
          <div class="service-price-section">
            <span class="price-label">Precio</span>
            <span class="price-value">$${service.price}</span>
          </div>
          <button class="add-to-cart-btn" onclick="addToCart(${service.id})">Agregar</button>
        </div>
      </div>
    </div>
  `).join("");
}

function addToCart(serviceId) {
  const service = services.find((s) => s.id === serviceId);
  const existingItem = cart.find((item) => item.id === serviceId);

  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({
      ...service,
      quantity: 1,
    });
  }

  updateCart();
  showNotification(`${service.name} agregado al carrito`);
}

function showNotification(message) {
  const notification = document.getElementById("notification");
  notification.textContent = message;
  notification.classList.add("show");

  setTimeout(() => {
    notification.classList.remove("show");
  }, 3000);
}

function updateCart() {
  updateCartCount();
  updateCartDisplay();
}

function updateCartCount() {
  const total = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.getElementById("cartCount").textContent = total;
}

function removeFromCart(serviceId) {
  cart = cart.filter((item) => item.id !== serviceId);
  updateCart();
}

function updateQuantity(serviceId, quantity) {
  const item = cart.find((item) => item.id === serviceId);
  if (item) {
    if (quantity <= 0) {
      removeFromCart(serviceId);
    } else {
      item.quantity = quantity;
      updateCart();
    }
  }
}

function updateCartDisplay() {
  const cartBody = document.getElementById("cartBody");
  const cartFooter = document.getElementById("cartFooter");

  if (cart.length === 0) {
    cartBody.innerHTML = '<p class="cart-empty">Tu carrito está vacío</p>';
    cartFooter.style.display = "none";
    return;
  }

  // Render cart items
  cartBody.innerHTML = cart.map((item) => `
    <div class="cart-item">
      <div class="cart-item-icon">
        <img src="${item.image}" alt="${item.name}" onerror="this.style.display='none'">
      </div>
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">$${item.price}</div>
        <div class="quantity-controls">
          <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity - 1})">−</button>
          <span class="quantity-display">${item.quantity}</span>
          <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
        </div>
      </div>
      <button class="remove-btn" onclick="removeFromCart(${item.id})">✕</button>
    </div>
  `).join("");

  // Calculate totals
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = 0;
  const total = subtotal + tax;

  // Render footer
  document.getElementById("subtotal").textContent = `$${subtotal.toFixed(2)}`;
  document.getElementById("totalPrice").textContent = `$${total.toFixed(2)}`;
  cartFooter.style.display = "block";
}

function toggleCart() {
  const cartModal = document.getElementById("cartModal");
  const cartOverlay = document.getElementById("cartOverlay");

  cartModal.classList.toggle("active");
  cartOverlay.classList.toggle("active");
}

function payWhatsApp() {
  if (cart.length === 0) {
    alert("El carrito está vacío");
    return;
  }

  const itemsList = cart
    .map((item) => `${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`)
    .join("%0A");

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const message = `Hola! Me gustaría contratar los siguientes servicios:%0A%0A${itemsList}%0A%0ATotal: $${total.toFixed(2)}`;

  const whatsappNumber = "1234567890";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

  window.open(whatsappUrl, "_blank");
}

function payQR() {
  if (cart.length === 0) {
    alert("El carrito está vacío");
    return;
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  alert(
    `Código QR para pago\n\nMonto Total: $${total.toFixed(2)}\n\nPor favor escanea el código QR con tu app de pago para completar la transacción.`
  );
}

// Initialize the app
document.addEventListener("DOMContentLoaded", () => {
  renderServices();
});
