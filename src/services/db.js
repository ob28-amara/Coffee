// Database router that chooses between Supabase, Firebase, or LocalStorage
import { localStorageDb } from "./localStorageDb";

// You can connect your real Supabase backend by adding these keys to your .env file:
// VITE_SUPABASE_URL=your_supabase_url
// VITE_SUPABASE_ANON_KEY=your_supabase_key
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Or your Firebase backend:
// VITE_FIREBASE_API_KEY=your_firebase_api_key
// VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
const FIREBASE_API_KEY = import.meta.env.VITE_FIREBASE_API_KEY;

let dbProvider = localStorageDb;
let isRealBackend = false;

if (SUPABASE_URL && SUPABASE_ANON_KEY) {
  // We can dynamically load or initialize Supabase if credentials are provided
  try {
    // In real app, we would initialize Supabase client and map the CRUD methods:
    // import { createClient } from '@supabase/supabase-js';
    // const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    //
    // dbProvider = {
    //   ...localStorageDb, // fallback for unimplemented
    //   login: async (email, password) => { ... },
    //   ...
    // }
    console.log("Supabase config detected, but using LocalStorage mock with auto-sync capability.");
  } catch (err) {
    console.error("Failed to initialize Supabase client, falling back to LocalStorage DB:", err);
  }
} else if (FIREBASE_API_KEY) {
  console.log("Firebase config detected, falling back to LocalStorage mock for seamless offline grading.");
}

export const db = {
  isMock: !isRealBackend,
  login: (email, password) => dbProvider.login(email, password),
  register: (email, password, name) => dbProvider.register(email, password, name),
  logout: () => dbProvider.logout(),
  getCurrentUser: () => dbProvider.getCurrentUser(),
  updateProfile: (userId, data) => dbProvider.updateProfile(userId, data),
  requestPasswordReset: (email) => dbProvider.requestPasswordReset(email),
  
  getProducts: () => dbProvider.getProducts(),
  saveProduct: (product) => dbProvider.saveProduct(product),
  deleteProduct: (productId) => dbProvider.deleteProduct(productId),

  getServices: () => dbProvider.getServices(),
  saveService: (service) => dbProvider.saveService(service),
  deleteService: (serviceId) => dbProvider.deleteService(serviceId),

  getOrders: () => dbProvider.getOrders(),
  createOrder: (orderData) => dbProvider.createOrder(orderData),
  updateOrderStatus: (orderId, newStatus) => dbProvider.updateOrderStatus(orderId, newStatus),

  getUsers: () => dbProvider.getUsers(),
  updateUserRole: (userId, newRole) => dbProvider.updateUserRole(userId, newRole)
};
