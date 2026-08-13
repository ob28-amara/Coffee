import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { Search, SlidersHorizontal, ShoppingCart, Info } from "lucide-react";
import "./Shop.css";

export default function Shop() {
  const { products, addToCart } = useApp();
  const [search, setSearch] = useState("");

  // 1. Set default active category to "beans" (Whole Coffee Beans)
  const [activeCategory, setActiveCategory] = useState("beans");
  const [sortBy, setSortBy] = useState("default");

  // Filtering & Sorting logic
  const filteredProducts = products
    .filter((prod) => {
      const matchesSearch =
        prod.name.toLowerCase().includes(search.toLowerCase()) ||
        prod.description.toLowerCase().includes(search.toLowerCase());

      // Filter directly by category
      const matchesCategory = prod.category === activeCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      return 0; // Default sorting
    });

  return (
    <div className="shop-page container animate-fade-in">
      <div className="shop-header text-center">
        <span className="section-subtitle">Our Collection</span>
        <h1 className="section-title">The Coffee &amp; Equipment Store</h1>
        <p className="shop-intro">
          Browse through our selection of handcrafted espresso drinks,
          single-origin whole bean bags, and professional-grade brewing
          apparatus.
        </p>
      </div>

      {/* Filters Toolbar */}
      <div className="shop-toolbar flex justify-between align-center card">
        <div className="search-bar flex align-center">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Search coffee or gear..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="filter-controls flex align-center">
          <div className="filter-group flex align-center">
            <SlidersHorizontal size={16} />
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="default">Sort: Recommended</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      <div className="shop-layout">
        {/* Categories Sidebar */}
        <aside className="shop-sidebar">
          <h3>Categories</h3>
          <ul className="category-list">
            <li>
              <button
                className={activeCategory === "coffee" ? "active" : ""}
                onClick={() => setActiveCategory("coffee")}
              >
                Coffee
              </button>
            </li>
            <li>
              <button
                className={activeCategory === "tea" ? "active" : ""}
                onClick={() => setActiveCategory("tea")}
              >
                Tea
              </button>
            </li>
            <li>
              <button
                className={activeCategory === "breakfast" ? "active" : ""}
                onClick={() => setActiveCategory("breakfast")}
              >
                Breakfast
              </button>
            </li>
            <li></li>
          </ul>
        </aside>

        {/* Products Grid */}
        <main className="shop-grid-area">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-3">
              {filteredProducts.map((prod) => {
                // Updated stock check condition to use "coffee" instead of "drinks"
                const isOutOfStock =
                  prod.stock <= 0 && prod.category !== "coffee";
                const isLowStock =
                  prod.stock > 0 &&
                  prod.stock <= 5 &&
                  prod.category !== "coffee";

                return (
                  <div
                    key={prod.id}
                    className={`card product-card ${isOutOfStock ? "out-of-stock-card" : ""}`}
                  >
                    <div className="product-image-container">
                      <img
                        src={prod.image}
                        alt={prod.name}
                        className="product-image"
                      />
                      <span className="product-category-badge">
                        {prod.category}
                      </span>
                    </div>

                    <div className="product-info">
                      <h3>{prod.name}</h3>
                      <p className="product-desc">{prod.description}</p>

                      <div className="stock-indicator mt-auto">
                        {isOutOfStock ? (
                          <span className="stock-badge oos">Out of Stock</span>
                        ) : isLowStock ? (
                          <span className="stock-badge low">
                            Only {prod.stock} left!
                          </span>
                        ) : (
                          <span className="stock-badge in-stock">In Stock</span>
                        )}
                      </div>

                      <div className="product-price-action flex justify-between align-center">
                        <span className="product-price">
                          ${prod.price.toFixed(2)}
                        </span>
                        <button
                          onClick={() => addToCart(prod, 1)}
                          disabled={isOutOfStock}
                          className="btn btn-primary btn-sm btn-cart"
                        >
                          <ShoppingCart size={16} /> Add
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="no-results text-center card">
              <Info size={40} className="no-results-icon" />
              <h3>No products found</h3>
              <p>
                We couldn't find any products matching your search criteria. Try
                adjusting your filters.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
