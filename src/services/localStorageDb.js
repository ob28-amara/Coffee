// Add this line temporarily to force reset the old data
localStorage.clear(); 

import iceLatteImg from "../assets/ice latte.jpg";
// ... other code ...

// LocalStorage-based Mock Database Provider for Coffee App

// 1. Import all local images from the src/assets/ directory
import iceLatteImg from "../assets/ice latte.jpg";
import iceAmericanoImg from "../assets/ice americano.jpg";
import iceMochaImg from "../assets/ice Mocha.jpg";
import iceCaramelImg from "../assets/ice caramel.jpg";
import matchaLatteImg from "../assets/matcha Latte.jpg";
import milkTeaImg from "../assets/Milk Tea.jpg";
import sakuraMatchaImg from "../assets/sakura matcha latte.jpg";
import chocAlmondImg from "../assets/Chocolate Almond Croissants.jpg";
import chocBerryImg from "../assets/Chocolate Berry Croissant Sandwich Center.jpg";
import chocCroissantImg from "../assets/Chocolate croissant.jpg";
import matchaAlmondImg from "../assets/Matcha Almond croissant.jpg";

const SEED_PRODUCTS = [
  {
    id: "prod-1",
    name: "Ice latte",
    category: "drinks",
    price: 1.5,
    description: "Have a good day",
    image: iceLatteImg,
    stock: 100,
    popular: true,
  },
  {
    id: "prod-2",
    name: "Ice americano",
    category: "drinks",
    price: 1.5,
    description: "Have a good day",
    image: iceAmericanoImg,
    stock: 100,
    popular: true,
  },
  {
    id: "prod-3",
    name: "Ice Mocha",
    category: "drinks",
    price: 1.5,
    description: "Have a good day",
    image: iceMochaImg,
    stock: 100,
    popular: false,
  },
  {
    id: "prod-4",
    name: "Ice Caramelt",
    category: "drinks",
    price: 1.5,
    description: "Have a good day",
    image: iceCaramelImg,
    stock: 100,
    popular: true,
  },
  {
    id: "prod-5",
    name: "Matcha Latte",
    category: "Tea",
    price: 1.5,
    description: "Have a good day",
    image: matchaLatteImg,
    stock: 100,
    popular: false,
  },
  {
    id: "prod-6",
    name: "Milk Tea",
    category: "Tea",
    price: 1.5,
    description: "Have a good day",
    image: milkTeaImg,
    stock: 100,
    popular: false,
  },
  {
    id: "prod-7",
    name: "sakura matcha Latte",
    category: "Tea",
    price: 1.5,
    description: "Have a good day",
    image: sakuraMatchaImg,
    stock: 100,
    popular: false,
  },
  {
    id: "prod-8",
    name: "Chocolate Almond Croissants",
    category: "Breakfast",
    price: 1.5,
    description: "Have a good day",
    image: chocAlmondImg,
    stock: 100,
    popular: false,
  },
  {
    id: "prod-9",
    name: "Chocolate Berry Croissant Sandwich Center",
    category: "Breakfast",
    price: 1.5,
    description: "Have a good day",
    image: chocBerryImg,
    stock: 100,
    popular: false,
  },
  {
    id: "prod-10",
    name: "Chocolate croissant",
    category: "Breakfast",
    price: 1.5,
    description: "Have a good day",
    image: chocCroissantImg,
    stock: 100,
    popular: false,
  },
  {
    id: "prod-11",
    name: "Matcha Almond croissant",
    category: "Breakfast",
    price: 1.5,
    description: "Have a good day",
    image: matchaAlmondImg,
    stock: 100,
    popular: false,
  },
];

const SEED_SERVICES = [
  {
    id: "srv-1",
    name: "Coffee Tasting Workshop",
    description:
      "Join our master roaster for a 90-minute journey tasting 5 unique single-origin coffees and learning to identify tasting notes.",
    price: 45.0,
    duration: "90 Mins",
    category: "workshops",
    image: iceCaramelImg,
  },
  {
    id: "srv-2",
    name: "Monthly Subscription Club",
    description:
      "Get 2 bags of freshly roasted, hand-selected coffees delivered to your door every month, complete with brewing guides.",
    price: 30.0,
    duration: "Monthly",
    category: "subscriptions",
    image: iceCaramelImg,
  },
  {
    id: "srv-3",
    name: "Espresso Masterclass",
    description:
      "Learn dial-in variables, milk texturing, and basic latte art on our commercial La Marzocco machine. Hands-on experience.",
    price: 75.0,
    duration: "2 Hours",
    category: "workshops",
    image: iceCaramelImg,
  },
];

const SEED_USERS = [
  {
    id: "user-1",
    email: "admin@coffee.com",
    password: "admin123", // in mock DB, keep plain text for simplicity of demonstration
    name: "Elara Roaster",
    role: "admin",
  },
];

const SEED_ORDERS = [
  {
    id: "ord-9821",
    customerId: "user-3",
    customerName: "Amelia Stone",
    items: [
      { id: "prod-1", name: "Ice latte", price: 1.5, quantity: 2 },
      { id: "prod-3", name: "Ice Mocha", price: 1.5, quantity: 1 },
    ],
    total: 2.25,
    status: "completed",
    date: "2026-07-30T14:30:00.000Z",
    address: "123 Crema Lane, Espresso Valley",
  },
  {
    id: "ord-9822",
    customerId: "user-3",
    customerName: "Amelia Stone",
    items: [{ id: "prod-2", name: "Ice americano", price: 1.5, quantity: 1 }],
    total: 1.5,
    status: "preparing",
    date: "2026-07-31T09:15:00.000Z",
    address: "123 Crema Lane, Espresso Valley",
  },
];

// Helper to initialize local storage
function initStorage() {
  if (!localStorage.getItem("coffee_products")) {
    localStorage.setItem("coffee_products", JSON.stringify(SEED_PRODUCTS));
  }
  if (!localStorage.getItem("coffee_services")) {
    localStorage.setItem("coffee_services", JSON.stringify(SEED_SERVICES));
  }
  if (!localStorage.getItem("coffee_users")) {
    localStorage.setItem("coffee_users", JSON.stringify(SEED_USERS));
  }
  if (!localStorage.getItem("coffee_orders")) {
    localStorage.setItem("coffee_orders", JSON.stringify(SEED_ORDERS));
  }
}

initStorage();

export const localStorageDb = {
  // --- AUTH OPERATIONS ---
  login: async (email, password) => {
    initStorage();
    const users = JSON.parse(localStorage.getItem("coffee_users"));
    const user = users.find(
      (u) =>
        u.email.toLowerCase() === email.toLowerCase() &&
        u.password === password,
    );
    if (!user) {
      throw new Error("Invalid email or password");
    }
    const session = { ...user };
    delete session.password;
    localStorage.setItem("coffee_current_user", JSON.stringify(session));
    return session;
  },

  register: async (email, password, name) => {
    initStorage();
    const users = JSON.parse(localStorage.getItem("coffee_users"));
    if (users.find((u) => u.email.toLowerCase() === email.toLowerCase())) {
      throw new Error("Email already registered");
    }
    const newUser = {
      id: "user-" + Date.now(),
      email: email.toLowerCase(),
      password,
      name,
      role: "customer", // default role
    };
    users.push(newUser);
    localStorage.setItem("coffee_users", JSON.stringify(users));

    // Auto-login
    const session = { ...newUser };
    delete session.password;
    localStorage.setItem("coffee_current_user", JSON.stringify(session));
    return session;
  },

  logout: async () => {
    localStorage.removeItem("coffee_current_user");
    return true;
  },

  getCurrentUser: () => {
    const userStr = localStorage.getItem("coffee_current_user");
    return userStr ? JSON.parse(userStr) : null;
  },

  updateProfile: async (userId, data) => {
    initStorage();
    const users = JSON.parse(localStorage.getItem("coffee_users"));
    const idx = users.findIndex((u) => u.id === userId);
    if (idx === -1) throw new Error("User not found");

    users[idx] = { ...users[idx], ...data };
    localStorage.setItem("coffee_users", JSON.stringify(users));

    // Sync current session if this is the active user
    const curUser = localStorageDb.getCurrentUser();
    if (curUser && curUser.id === userId) {
      const updatedSession = { ...users[idx] };
      delete updatedSession.password;
      localStorage.setItem(
        "coffee_current_user",
        JSON.stringify(updatedSession),
      );
    }
    return users[idx];
  },

  requestPasswordReset: async (email) => {
    initStorage();
    const users = JSON.parse(localStorage.getItem("coffee_users"));
    const user = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase(),
    );
    if (!user) {
      throw new Error("User email not found");
    }
    return true; // Simulate success
  },

  // --- PRODUCTS CRUD ---
  getProducts: async () => {
    initStorage();
    return JSON.parse(localStorage.getItem("coffee_products"));
  },

  saveProduct: async (product) => {
    initStorage();
    const products = JSON.parse(localStorage.getItem("coffee_products"));
    if (product.id) {
      // Edit
      const idx = products.findIndex((p) => p.id === product.id);
      if (idx === -1) throw new Error("Product not found");
      products[idx] = { ...products[idx], ...product };
    } else {
      // Create
      const newProduct = {
        ...product,
        id: "prod-" + Date.now(),
        popular: false,
      };
      products.push(newProduct);
    }
    localStorage.setItem("coffee_products", JSON.stringify(products));
    return products;
  },

  deleteProduct: async (productId) => {
    initStorage();
    let products = JSON.parse(localStorage.getItem("coffee_products"));
    products = products.filter((p) => p.id !== productId);
    localStorage.setItem("coffee_products", JSON.stringify(products));
    return products;
  },

  // --- SERVICES CRUD ---
  getServices: async () => {
    initStorage();
    return JSON.parse(localStorage.getItem("coffee_services"));
  },

  saveService: async (service) => {
    initStorage();
    const services = JSON.parse(localStorage.getItem("coffee_services"));
    if (service.id) {
      // Edit
      const idx = services.findIndex((s) => s.id === service.id);
      if (idx === -1) throw new Error("Service not found");
      services[idx] = { ...services[idx], ...service };
    } else {
      // Create
      const newService = {
        ...service,
        id: "srv-" + Date.now(),
      };
      services.push(newService);
    }
    localStorage.setItem("coffee_services", JSON.stringify(services));
    return services;
  },

  deleteService: async (serviceId) => {
    initStorage();
    let services = JSON.parse(localStorage.getItem("coffee_services"));
    services = services.filter((s) => s.id !== serviceId);
    localStorage.setItem("coffee_services", JSON.stringify(services));
    return services;
  },

  // --- ORDERS CRUD ---
  getOrders: async () => {
    initStorage();
    return JSON.parse(localStorage.getItem("coffee_orders"));
  },

  createOrder: async (orderData) => {
    initStorage();
    const orders = JSON.parse(localStorage.getItem("coffee_orders"));
    const newOrder = {
      ...orderData,
      id: "ord-" + Math.floor(1000 + Math.random() * 9000),
      date: new Date().toISOString(),
      status: "pending",
    };
    orders.push(newOrder);
    localStorage.setItem("coffee_orders", JSON.stringify(orders));

    // Decrement product stocks
    const products = JSON.parse(localStorage.getItem("coffee_products"));
    newOrder.items.forEach((item) => {
      const prod = products.find((p) => p.id === item.id);
      if (prod && prod.category !== "drinks") {
        // drinks have unlimited ingredients basically
        prod.stock = Math.max(0, prod.stock - item.quantity);
      }
    });
    localStorage.setItem("coffee_products", JSON.stringify(products));

    return newOrder;
  },

  updateOrderStatus: async (orderId, newStatus) => {
    initStorage();
    const orders = JSON.parse(localStorage.getItem("coffee_orders"));
    const idx = orders.findIndex((o) => o.id === orderId);
    if (idx === -1) throw new Error("Order not found");
    orders[idx].status = newStatus;
    localStorage.setItem("coffee_orders", JSON.stringify(orders));
    return orders[idx];
  },

  // --- USER MANAGEMENT (ADMIN ONLY) ---
  getUsers: async () => {
    initStorage();
    const users = JSON.parse(localStorage.getItem("coffee_users"));
    // Return users without passwords
    return users.map((u) => {
      const { password, ...rest } = u;
      return rest;
    });
  },

  updateUserRole: async (userId, newRole) => {
    initStorage();
    const users = JSON.parse(localStorage.getItem("coffee_users"));
    const idx = users.findIndex((u) => u.id === userId);
    if (idx === -1) throw new Error("User not found");
    users[idx].role = newRole;
    localStorage.setItem("coffee_users", JSON.stringify(users));

    // Sync current session if this is the active user
    const curUser = localStorageDb.getCurrentUser();
    if (curUser && curUser.id === userId) {
      const updatedSession = { ...users[idx] };
      delete updatedSession.password;
      localStorage.setItem(
        "coffee_current_user",
        JSON.stringify(updatedSession),
      );
    }
    return true;
  },
};
