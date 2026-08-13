import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import {
  User,
  ClipboardList,
  Package,
  Layers,
  Settings,
  Users,
  TrendingUp,
  DollarSign,
  Calendar,
  Edit3,
  Trash2,
  Plus,
  CheckCircle,
  Loader2,
  AlertCircle,
} from "lucide-react";
import "./Dashboard.css";

export default function Dashboard() {
  const {
    user,
    orders,
    products,
    services,
    loading,
    logout,
    updateProfile,
    saveProduct,
    deleteProduct,
    saveService,
    deleteService,
    updateOrderStatus,
    updateUserRole,
    fetchOrders,
  } = useApp();
  const navigate = useNavigate();

  // Redirect if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  // Tab controls
  const [activeTab, setActiveTab] = useState("");

  // Set default tab based on user role
  useEffect(() => {
    if (user) {
      if (user.role === "admin") setActiveTab("admin-metrics");
      else if (user.role === "staff") setActiveTab("staff-orders");
      else setActiveTab("customer-orders");
    }
  }, [user]);

  // Profile Form States
  const [profileName, setProfileName] = useState(user?.name || "");
  const [profileEmail, setProfileEmail] = useState(user?.email || "");
  const [profileSuccess, setProfileSuccess] = useState("");

  // Product CRUD Form States
  const [editingProduct, setEditingProduct] = useState(null);
  const [prodFormName, setProdFormName] = useState("");
  const [prodFormDesc, setProdFormDesc] = useState("");
  const [prodFormPrice, setProdFormPrice] = useState(0);
  const [prodFormStock, setProdFormStock] = useState(0);
  const [prodFormCategory, setProdFormCategory] = useState("coffee"); // Updated default
  const [prodFormImage, setProdFormImage] = useState("");

  // Service CRUD Form States
  const [editingService, setEditingService] = useState(null);
  const [srvFormName, setSrvFormName] = useState("");
  const [srvFormDesc, setSrvFormDesc] = useState("");
  const [srvFormPrice, setSrvFormPrice] = useState(0);
  const [srvFormDuration, setSrvFormDuration] = useState("");
  const [srvFormCategory, setSrvFormCategory] = useState("workshops");
  const [srvFormImage, setSrvFormImage] = useState("");

  // Admin User List State
  const [adminUsers, setAdminUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState(false);

  // Fetch admin user list
  useEffect(() => {
    if (activeTab === "admin-users") {
      const loadUsers = async () => {
        setUsersLoading(true);
        try {
          // Import dynamic list
          const { db } = await import("../services/db");
          const ulist = await db.getUsers();
          setAdminUsers(ulist);
        } catch (err) {
          console.error(err);
        } finally {
          setUsersLoading(false);
        }
      };
      loadUsers();
    }
  }, [activeTab]);

  if (loading || !user) {
    return (
      <div className="dashboard-loading container flex justify-center align-center">
        <Loader2 size={36} className="animate-spin" />
        <span>Loading session...</span>
      </div>
    );
  }

  // Profile Submit
  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setProfileSuccess("");
    try {
      await updateProfile({ name: profileName, email: profileEmail });
      setProfileSuccess("Profile updated successfully!");
    } catch (err) {
      setProfileSuccess(err.message || "Failed to update profile.");
    }
  };

  // Product CRUD Submit
  const handleProductSubmit = async (e) => {
    e.preventDefault();
    const productData = {
      name: prodFormName,
      description: prodFormDesc,
      price: Number(prodFormPrice),
      stock: Number(prodFormStock),
      category: prodFormCategory,
      image:
        prodFormImage ||
        "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=600",
    };
    if (editingProduct?.id) productData.id = editingProduct.id;

    try {
      await saveProduct(productData);
      setEditingProduct(null);
      // Reset form
      setProdFormName("");
      setProdFormDesc("");
      setProdFormPrice(0);
      setProdFormStock(0);
      setProdFormCategory("coffee");
      setProdFormImage("");
    } catch (err) {
      alert("Failed to save product: " + err.message);
    }
  };

  // Service CRUD Submit
  const handleServiceSubmit = async (e) => {
    e.preventDefault();
    const serviceData = {
      name: srvFormName,
      description: srvFormDesc,
      price: Number(srvFormPrice),
      duration: srvFormDuration,
      category: srvFormCategory,
      image:
        srvFormImage ||
        "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&q=80&w=600",
    };
    if (editingService?.id) serviceData.id = editingService.id;

    try {
      await saveService(serviceData);
      setEditingService(null);
      setSrvFormName("");
      setSrvFormDesc("");
      setSrvFormPrice(0);
      setSrvFormDuration("");
      setSrvFormImage("");
    } catch (err) {
      alert("Failed to save service: " + err.message);
    }
  };

  const handleRoleChange = async (userId, role) => {
    try {
      await updateUserRole(userId, role);
      // Reload user lists
      const { db } = await import("../services/db");
      const ulist = await db.getUsers();
      setAdminUsers(ulist);
    } catch (err) {
      alert("Failed to update role: " + err.message);
    }
  };

  // --- STATS CALCULATIONS (ADMIN) ---
  const totalRevenue = orders.reduce(
    (sum, o) => (o.status === "completed" ? sum + o.total : sum),
    0,
  );
  const totalOrders = orders.length;
  const avgOrderVal =
    totalOrders > 0
      ? totalRevenue / orders.filter((o) => o.status === "completed").length ||
        0
      : 0;
  const lowStockProducts = products.filter(
    (p) => p.stock <= 5 && p.category !== "coffee",
  );

  return (
    <div className="dashboard-page container animate-fade-in">
      {/* Dashboard Top Header */}
      <div className="dashboard-header flex justify-between align-center card">
        <div className="header-info flex align-center">
          <div className="avatar-placeholder flex align-center justify-center">
            <User size={30} />
          </div>
          <div>
            <h1>Hello, {user.name}</h1>
            <span className="badge badge-completed">{user.role} account</span>
          </div>
        </div>
        <button onClick={logout} className="btn btn-secondary btn-sm">
          Log Out
        </button>
      </div>

      <div className="dashboard-layout">
        {/* Navigation Sidebar */}
        <aside className="dashboard-sidebar">
          <h3>Portal Panels</h3>
          <ul className="sidebar-tabs">
            {/* Customer Navigation */}
            {user.role === "customer" && (
              <li>
                <button
                  className={activeTab === "customer-orders" ? "active" : ""}
                  onClick={() => setActiveTab("customer-orders")}
                >
                  <ClipboardList size={16} /> My Orders
                </button>
              </li>
            )}

            {/* Staff Navigation */}
            {user.role === "staff" && (
              <>
                <li>
                  <button
                    className={activeTab === "staff-orders" ? "active" : ""}
                    onClick={() => setActiveTab("staff-orders")}
                  >
                    <ClipboardList size={16} /> Live Barista Queue
                  </button>
                </li>
                <li>
                  <button
                    className={activeTab === "staff-inventory" ? "active" : ""}
                    onClick={() => setActiveTab("staff-inventory")}
                  >
                    <Package size={16} /> Inventory Tracker
                  </button>
                </li>
              </>
            )}

            {/* Admin Navigation */}
            {user.role === "admin" && (
              <>
                <li>
                  <button
                    className={activeTab === "admin-metrics" ? "active" : ""}
                    onClick={() => setActiveTab("admin-metrics")}
                  >
                    <TrendingUp size={16} /> Sales Analytics
                  </button>
                </li>
                <li>
                  <button
                    className={activeTab === "admin-products" ? "active" : ""}
                    onClick={() => setActiveTab("admin-products")}
                  >
                    <Package size={16} /> Manage Products
                  </button>
                </li>
                <li>
                  <button
                    className={activeTab === "admin-services" ? "active" : ""}
                    onClick={() => setActiveTab("admin-services")}
                  >
                    <Layers size={16} /> Manage Services
                  </button>
                </li>
                <li>
                  <button
                    className={activeTab === "admin-users" ? "active" : ""}
                    onClick={() => setActiveTab("admin-users")}
                  >
                    <Users size={16} /> Manage Users
                  </button>
                </li>
              </>
            )}

            {/* Common Settings Tab */}
            <li>
              <button
                className={activeTab === "profile-settings" ? "active" : ""}
                onClick={() => setActiveTab("profile-settings")}
              >
                <Settings size={16} /> Profile Settings
              </button>
            </li>
          </ul>
        </aside>

        {/* Content Side */}
        <main className="dashboard-content-area">
          {/* CUSTOMER TAB: ORDERS */}
          {activeTab === "customer-orders" && (
            <div className="tab-panel animate-slide-up">
              <h2>My Order History</h2>
              <div className="orders-list mt-4">
                {orders.filter((o) => o.customerId === user.id).length > 0 ? (
                  orders
                    .filter((o) => o.customerId === user.id)
                    .map((order) => (
                      <div key={order.id} className="card order-card">
                        <div className="order-summary-row flex justify-between align-center">
                          <div>
                            <h3>Order #{order.id}</h3>
                            <span className="order-date">
                              {new Date(order.date).toLocaleDateString()}
                            </span>
                          </div>
                          <span className={`badge badge-${order.status}`}>
                            {order.status}
                          </span>
                        </div>

                        <div className="order-items-list mt-2">
                          {order.items.map((item) => (
                            <div
                              key={item.id}
                              className="order-item-row flex justify-between"
                            >
                              <span>
                                {item.name} <strong>x{item.quantity}</strong>
                              </span>
                              <span>
                                ${(item.price * item.quantity).toFixed(2)}
                              </span>
                            </div>
                          ))}
                        </div>

                        <div className="order-total-row flex justify-between mt-2 pt-2">
                          <span>Delivery Address: {order.address}</span>
                          <span className="total-price">
                            Total Paid: ${order.total.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    ))
                ) : (
                  <p className="text-center card">
                    You haven't placed any orders yet. Visit the Shop!
                  </p>
                )}
              </div>
            </div>
          )}

          {/* STAFF TAB: BARISTA LIVE QUEUE */}
          {activeTab === "staff-orders" && (
            <div className="tab-panel animate-slide-up">
              <h2>Barista Order Queue</h2>
              <p className="subtitle">Update order statuses as you prep them</p>

              <div className="orders-list mt-4">
                {orders.filter(
                  (o) => o.status !== "completed" && o.status !== "cancelled",
                ).length > 0 ? (
                  orders
                    .filter(
                      (o) =>
                        o.status !== "completed" && o.status !== "cancelled",
                    )
                    .map((order) => (
                      <div key={order.id} className="card order-card">
                        <div className="order-summary-row flex justify-between align-center">
                          <div>
                            <h3>
                              Order #{order.id} &bull; {order.customerName}
                            </h3>
                            <span className="order-date">
                              {new Date(order.date).toLocaleTimeString()}
                            </span>
                          </div>
                          <span className={`badge badge-${order.status}`}>
                            {order.status}
                          </span>
                        </div>

                        <div className="order-items-list mt-2">
                          {order.items.map((item) => (
                            <div key={item.id} className="order-item-row">
                              <span>
                                &bull; {item.name}{" "}
                                <strong>x{item.quantity}</strong>
                              </span>
                            </div>
                          ))}
                        </div>

                        <div className="barista-actions flex mt-4 pt-2">
                          {order.status === "pending" && (
                            <button
                              onClick={() =>
                                updateOrderStatus(order.id, "preparing")
                              }
                              className="btn btn-secondary btn-sm mr-2"
                            >
                              Accept &amp; Prep
                            </button>
                          )}
                          {order.status === "preparing" && (
                            <button
                              onClick={() =>
                                updateOrderStatus(order.id, "completed")
                              }
                              className="btn btn-primary btn-sm mr-2"
                            >
                              Mark Completed / Ready
                            </button>
                          )}
                          <button
                            onClick={() =>
                              updateOrderStatus(order.id, "cancelled")
                            }
                            className="btn btn-danger btn-sm"
                          >
                            Cancel Order
                          </button>
                        </div>
                      </div>
                    ))
                ) : (
                  <p className="text-center card">
                    All caught up! No active orders in queue.
                  </p>
                )}
              </div>
            </div>
          )}

          {/* STAFF TAB: INVENTORY ALERT TRACKER */}
          {activeTab === "staff-inventory" && (
            <div className="tab-panel animate-slide-up">
              <h2>Inventory Stock Levels</h2>
              <p className="subtitle">Verify and track raw stocks</p>

              <div className="inventory-grid mt-4 grid grid-3">
                {products
                  .filter((p) => p.category !== "coffee")
                  .map((prod) => {
                    const isLow = prod.stock <= 5;
                    return (
                      <div
                        key={prod.id}
                        className={`card ${isLow ? "border-danger" : ""}`}
                      >
                        <h3>{prod.name}</h3>
                        <p className="category">{prod.category}</p>
                        <div className="inventory-stock-block mt-4 flex justify-between align-center">
                          <span>Stock Remaining:</span>
                          <span
                            className={`stock-count ${isLow ? "text-danger" : "text-success"}`}
                          >
                            {prod.stock}
                          </span>
                        </div>
                        {isLow && (
                          <div className="low-stock-alert flex align-center mt-2">
                            <AlertCircle size={14} />{" "}
                            <span>Restock immediately!</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
              </div>
            </div>
          )}

          {/* ADMIN TAB: SALES METRICS */}
          {activeTab === "admin-metrics" && (
            <div className="tab-panel animate-slide-up">
              <h2>Sales Analytics</h2>

              <div className="metrics-summary-grid grid grid-3 mt-4">
                <div className="card metric-card">
                  <div className="flex justify-between">
                    <span>Total Revenue</span>
                    <DollarSign size={20} className="metric-icon" />
                  </div>
                  <h3>${totalRevenue.toFixed(2)}</h3>
                  <p className="desc">Total completed purchases</p>
                </div>

                <div className="card metric-card">
                  <div className="flex justify-between">
                    <span>Order Volume</span>
                    <ClipboardList size={20} className="metric-icon" />
                  </div>
                  <h3>{totalOrders}</h3>
                  <p className="desc">Total incoming orders</p>
                </div>

                <div className="card metric-card">
                  <div className="flex justify-between">
                    <span>Average Ticket Size</span>
                    <TrendingUp size={20} className="metric-icon" />
                  </div>
                  <h3>${avgOrderVal.toFixed(2)}</h3>
                  <p className="desc">Average basket spend</p>
                </div>
              </div>

              {/* Inventory alerts */}
              {lowStockProducts.length > 0 && (
                <div className="card border-danger mt-4 flex align-center">
                  <AlertCircle size={24} className="text-danger mr-2" />
                  <div>
                    <h3 className="text-danger">Critical Stock Warning!</h3>
                    <p>
                      There are {lowStockProducts.length} product(s) with less
                      than 5 items remaining. Please restock.
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ADMIN TAB: MANAGE PRODUCTS (CRUD) */}
          {activeTab === "admin-products" && (
            <div className="tab-panel animate-slide-up">
              <div className="flex justify-between align-center">
                <h2>Manage Products</h2>
                {!editingProduct && (
                  <button
                    onClick={() => {
                      setEditingProduct({});
                      setProdFormName("");
                      setProdFormDesc("");
                      setProdFormPrice(0);
                      setProdFormStock(0);
                      setProdFormCategory("coffee");
                      setProdFormImage("");
                    }}
                    className="btn btn-primary btn-sm flex align-center"
                  >
                    <Plus size={16} /> Add Product
                  </button>
                )}
              </div>

              {editingProduct ? (
                <div className="card mt-4">
                  <h3>
                    {editingProduct.id ? "Edit Product" : "Add New Product"}
                  </h3>
                  <form
                    onSubmit={handleProductSubmit}
                    className="crud-form mt-4"
                  >
                    <div className="form-group">
                      <label>Product Name</label>
                      <input
                        type="text"
                        required
                        className="form-input"
                        placeholder="e.g. Lavender Latte"
                        value={prodFormName}
                        onChange={(e) => setProdFormName(e.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <label>Description</label>
                      <textarea
                        required
                        className="form-input form-textarea"
                        placeholder="Describe roast notes or ingredients..."
                        value={prodFormDesc}
                        onChange={(e) => setProdFormDesc(e.target.value)}
                      ></textarea>
                    </div>

                    <div className="form-row flex">
                      <div className="form-group flex-1 mr-2">
                        <label>Price ($)</label>
                        <input
                          type="number"
                          step="0.01"
                          required
                          className="form-input"
                          value={prodFormPrice}
                          onChange={(e) => setProdFormPrice(e.target.value)}
                        />
                      </div>
                      <div className="form-group flex-1 mr-2">
                        <label>Initial Stock</label>
                        <input
                          type="number"
                          required
                          className="form-input"
                          value={prodFormStock}
                          onChange={(e) => setProdFormStock(e.target.value)}
                        />
                      </div>
                      <div className="form-group flex-1">
                        <label>Category</label>
                        {/* UPDATED DROPDOWN */}
                        <select
                          className="form-input"
                          value={prodFormCategory}
                          onChange={(e) => setProdFormCategory(e.target.value)}
                        >
                          <option value="coffee">coffee</option>
                          <option value="tea">tea</option>
                          <option value="breakfast">breakfast</option>
                        </select>
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Image URL</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="Leave blank for default placeholder"
                        value={prodFormImage}
                        onChange={(e) => setProdFormImage(e.target.value)}
                      />
                    </div>

                    <div className="flex mt-4">
                      <button type="submit" className="btn btn-primary mr-2">
                        Save Product
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditingProduct(null)}
                        className="btn btn-secondary"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                <div className="crud-list mt-4">
                  {products.map((prod) => (
                    <div
                      key={prod.id}
                      className="card crud-item flex justify-between align-center"
                    >
                      <div className="flex align-center">
                        <img
                          src={prod.image}
                          alt={prod.name}
                          className="crud-item-thumb"
                        />
                        <div>
                          <h4>{prod.name}</h4>
                          <span className="price">
                            ${prod.price.toFixed(2)} &bull; {prod.category}
                          </span>
                          {prod.category !== "coffee" && (
                            <span className="stock">
                              {" "}
                              &bull; Stock: {prod.stock}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="actions flex">
                        <button
                          onClick={() => {
                            setEditingProduct(prod);
                            setProdFormName(prod.name);
                            setProdFormDesc(prod.description);
                            setProdFormPrice(prod.price);
                            setProdFormStock(prod.stock);
                            setProdFormCategory(prod.category);
                            setProdFormImage(prod.image);
                          }}
                          className="btn btn-secondary btn-sm mr-2"
                        >
                          <Edit3 size={14} />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm("Are you sure?"))
                              deleteProduct(prod.id);
                          }}
                          className="btn btn-danger btn-sm"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ADMIN TAB: MANAGE SERVICES */}
          {activeTab === "admin-services" && (
            <div className="tab-panel animate-slide-up">
              <div className="flex justify-between align-center">
                <h2>Manage Services</h2>
                {!editingService && (
                  <button
                    onClick={() => {
                      setEditingService({});
                      setSrvFormName("");
                      setSrvFormDesc("");
                      setSrvFormPrice(0);
                      setSrvFormDuration("");
                      setSrvFormCategory("workshops");
                      setSrvFormImage("");
                    }}
                    className="btn btn-primary btn-sm flex align-center"
                  >
                    <Plus size={16} /> Add Service
                  </button>
                )}
              </div>

              {editingService ? (
                <div className="card mt-4">
                  <h3>
                    {editingService.id ? "Edit Service" : "Add New Service"}
                  </h3>
                  <form
                    onSubmit={handleServiceSubmit}
                    className="crud-form mt-4"
                  >
                    <div className="form-group">
                      <label>Service Name</label>
                      <input
                        type="text"
                        required
                        className="form-input"
                        placeholder="e.g. Advanced Latte Art"
                        value={srvFormName}
                        onChange={(e) => setSrvFormName(e.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <label>Description</label>
                      <textarea
                        required
                        className="form-input form-textarea"
                        placeholder="Describe the workshop schedule or subscription packages..."
                        value={srvFormDesc}
                        onChange={(e) => setSrvFormDesc(e.target.value)}
                      ></textarea>
                    </div>

                    <div className="form-row flex">
                      <div className="form-group flex-1 mr-2">
                        <label>Price ($)</label>
                        <input
                          type="number"
                          step="0.01"
                          required
                          className="form-input"
                          value={srvFormPrice}
                          onChange={(e) => setSrvFormPrice(e.target.value)}
                        />
                      </div>
                      <div className="form-group flex-1 mr-2">
                        <label>Duration / Frequency</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. 2 Hours or Monthly"
                          className="form-input"
                          value={srvFormDuration}
                          onChange={(e) => setSrvFormDuration(e.target.value)}
                        />
                      </div>
                      <div className="form-group flex-1">
                        <label>Category</label>
                        <select
                          className="form-input"
                          value={srvFormCategory}
                          onChange={(e) => setSrvFormCategory(e.target.value)}
                        >
                          <option value="workshops">workshops</option>
                          <option value="subscriptions">subscriptions</option>
                        </select>
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Image URL</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="Leave blank for default placeholder"
                        value={srvFormImage}
                        onChange={(e) => setSrvFormImage(e.target.value)}
                      />
                    </div>

                    <div className="flex mt-4">
                      <button type="submit" className="btn btn-primary mr-2">
                        Save Service
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditingService(null)}
                        className="btn btn-secondary"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                <div className="crud-list mt-4">
                  {services.map((srv) => (
                    <div
                      key={srv.id}
                      className="card crud-item flex justify-between align-center"
                    >
                      <div className="flex align-center">
                        <img
                          src={srv.image}
                          alt={srv.name}
                          className="crud-item-thumb"
                        />
                        <div>
                          <h4>{srv.name}</h4>
                          <span className="price">
                            ${srv.price.toFixed(2)} &bull; {srv.category} &bull;{" "}
                            {srv.duration}
                          </span>
                        </div>
                      </div>
                      <div className="actions flex">
                        <button
                          onClick={() => {
                            setEditingService(srv);
                            setSrvFormName(srv.name);
                            setSrvFormDesc(srv.description);
                            setSrvFormPrice(srv.price);
                            setSrvFormDuration(srv.duration);
                            setSrvFormCategory(srv.category);
                            setSrvFormImage(srv.image);
                          }}
                          className="btn btn-secondary btn-sm mr-2"
                        >
                          <Edit3 size={14} />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm("Are you sure?")) deleteService(srv.id);
                          }}
                          className="btn btn-danger btn-sm"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ADMIN TAB: USER ROLES */}
          {activeTab === "admin-users" && (
            <div className="tab-panel animate-slide-up">
              <h2>System Users Role Management</h2>
              {usersLoading ? (
                <p className="text-center card">Loading system registry...</p>
              ) : (
                <div className="crud-list mt-4">
                  {adminUsers.map((u) => (
                    <div
                      key={u.id}
                      className="card crud-item flex justify-between align-center"
                    >
                      <div>
                        <h4>{u.name}</h4>
                        <p className="subtitle">{u.email}</p>
                      </div>
                      <div className="flex align-center">
                        <label
                          className="mr-2"
                          style={{
                            fontSize: "0.85rem",
                            color: "var(--color-text-muted)",
                          }}
                        >
                          Role:
                        </label>
                        <select
                          className="form-input"
                          style={{ width: "130px", padding: "0.4rem" }}
                          value={u.role}
                          onChange={(e) =>
                            handleRoleChange(u.id, e.target.value)
                          }
                        >
                          <option value="user">user</option>
                          <option value="admin">admin</option>
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* COMMON TAB: PROFILE SETTINGS */}
          {activeTab === "profile-settings" && (
            <div className="tab-panel animate-slide-up">
              <h2>Profile Settings</h2>

              <div className="card mt-4">
                {profileSuccess && (
                  <div className="auth-alert success flex align-center">
                    <CheckCircle size={16} /> <span>{profileSuccess}</span>
                  </div>
                )}

                <form onSubmit={handleProfileSubmit} className="profile-form">
                  <div className="form-group">
                    <label htmlFor="p-name">Profile Display Name</label>
                    <input
                      type="text"
                      id="p-name"
                      required
                      className="form-input"
                      value={profileName}
                      onChange={(e) => setProfileName(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="p-email">Profile Account Email</label>
                    <input
                      type="email"
                      id="p-email"
                      required
                      className="form-input"
                      value={profileEmail}
                      onChange={(e) => setProfileEmail(e.target.value)}
                    />
                  </div>

                  <button type="submit" className="btn btn-primary mt-4">
                    Save Changes
                  </button>
                </form>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
