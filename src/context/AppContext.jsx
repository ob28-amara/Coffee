import React, { createContext, useContext, useState, useEffect } from "react";
import { db } from "../services/db";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [services, setServices] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Initialize data
  useEffect(() => {
    async function init() {
      try {
        const curUser = db.getCurrentUser();
        setUser(curUser);
        
        // Load products & services
        const prods = await db.getProducts();
        setProducts(prods);
        
        const servs = await db.getServices();
        setServices(servs);

        // Load cart from localStorage
        const storedCart = localStorage.getItem("coffee_cart");
        if (storedCart) setCart(JSON.parse(storedCart));

        // Load orders
        const ords = await db.getOrders();
        setOrders(ords);
      } catch (err) {
        console.error("Initialization error:", err);
      } finally {
        setLoading(false);
      }
    }
    init();
  }, []);

  // Sync cart to localStorage
  useEffect(() => {
    localStorage.setItem("coffee_cart", JSON.stringify(cart));
  }, [cart]);

  // Auth actions
  const login = async (email, password) => {
    setLoading(true);
    try {
      const session = await db.login(email, password);
      setUser(session);
      await fetchOrders();
      return session;
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (email, password, name) => {
    setLoading(true);
    try {
      const session = await db.register(email, password, name);
      setUser(session);
      await fetchOrders();
      return session;
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await db.logout();
      setUser(null);
      setCart([]);
      setOrders([]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (data) => {
    if (!user) return;
    try {
      const updated = await db.updateProfile(user.id, data);
      setUser(db.getCurrentUser()); // reload session
      return updated;
    } catch (err) {
      throw err;
    }
  };

  // Products CRUD Wrapper
  const fetchProducts = async () => {
    const prods = await db.getProducts();
    setProducts(prods);
  };

  const saveProduct = async (product) => {
    const updatedProds = await db.saveProduct(product);
    setProducts(updatedProds);
  };

  const deleteProduct = async (productId) => {
    const updatedProds = await db.deleteProduct(productId);
    setProducts(updatedProds);
  };

  // Services CRUD Wrapper
  const fetchServices = async () => {
    const servs = await db.getServices();
    setServices(servs);
  };

  const saveService = async (service) => {
    const updatedServs = await db.saveService(service);
    setServices(updatedServs);
  };

  const deleteService = async (serviceId) => {
    const updatedServs = await db.deleteService(serviceId);
    setServices(updatedServs);
  };

  // Cart actions
  const addToCart = (product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const updateCartQty = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === productId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => setCart([]);

  // Orders actions
  const fetchOrders = async () => {
    const ords = await db.getOrders();
    setOrders(ords);
  };

  const checkout = async (address) => {
    if (!user) throw new Error("Please log in to complete your order");
    if (cart.length === 0) throw new Error("Your cart is empty");

    const orderData = {
      customerId: user.id,
      customerName: user.name,
      items: cart.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
      total: Number(getCartTotal().toFixed(2)),
      address,
    };

    try {
      const newOrder = await db.createOrder(orderData);
      setCart([]);
      await fetchOrders();
      await fetchProducts(); // Refresh stock counts
      return newOrder;
    } catch (err) {
      throw err;
    }
  };

  const updateOrderStatus = async (orderId, status) => {
    await db.updateOrderStatus(orderId, status);
    await fetchOrders();
  };

  const getCartTotal = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const getCartCount = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  };

  // Admin User operations
  const updateUserRole = async (userId, role) => {
    await db.updateUserRole(userId, role);
  };

  return (
    <AppContext.Provider
      value={{
        user,
        cart,
        products,
        services,
        orders,
        loading,
        login,
        register,
        logout,
        updateProfile,
        fetchProducts,
        saveProduct,
        deleteProduct,
        fetchServices,
        saveService,
        deleteService,
        addToCart,
        removeFromCart,
        updateCartQty,
        clearCart,
        checkout,
        fetchOrders,
        updateOrderStatus,
        getCartTotal,
        getCartCount,
        updateUserRole,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
