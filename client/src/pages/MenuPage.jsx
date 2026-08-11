import React, { useEffect, useState } from 'react';
import { api } from '../services/api.js';
import { featuredPizzas } from '../services/mockData.js';
import { PizzaIllustration } from '../components/pizza/PizzaIllustration.jsx';
import { Link } from 'react-router-dom';
import { productImage, productImages } from '../services/productMedia.js';
import { useCart } from '../context/CartContext.jsx';

export function MenuPage() {
  const [products, setProducts] = useState(featuredPizzas);
  const [banners, setBanners] = useState([]);
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');
  const { addItem } = useCart();
  const [addedProduct, setAddedProduct] = useState('');

  useEffect(() => {
    api.products().then((items) => setProducts(Array.isArray(items) && items.length ? items : featuredPizzas)).catch(() => setProducts(featuredPizzas));
    api.banners().then(setBanners).catch(() => setBanners([]));
  }, []);

  const categories = ['All', ...new Set(products.map((product) => product.category).filter(Boolean))];
  const query = search.trim().toLowerCase();
  const visibleProducts = products.filter((product) => {
    const matchesCategory = category === 'All' || product.category === category;
    const searchable = [product.name, product.category, product.description, ...(product.ingredients || [])].join(' ').toLowerCase();
    return matchesCategory && (!query || searchable.includes(query));
  });

  const addProductToCart = (product) => {
    addItem({
      title: product.name,
      productId: product.id || product._id,
      productImage: productImages(product)[0],
      category: { name: product.category || 'Pizza' },
      size: { name: product.size || 'Medium' },
      base: { name: product.crust || 'Classic crust' },
      sauce: { name: 'House sauce' },
      cheese: { name: 'Mozzarella' },
      toppings: (product.ingredients || []).map((name, index) => ({ id: `${product.id || product.name}-${index}`, name, price: 0 })),
      vegetables: [],
      quantity: 1,
      total: Number(product.price || 0)
    });
    setAddedProduct(product.id || product.name);
    window.setTimeout(() => setAddedProduct(''), 1800);
  };

  return (
    <div className="page-stack">
      <section className="promo-strip">
        <div className="promo-carousel">
          {banners.map((banner) => (
            <article key={banner.id} className="promo-card">
              <img src={productImage({ imageUrl: banner.imageUrl })} onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = productImage({}); }} alt={banner.title} loading="lazy" />
              <div className="promo-card-copy">
                <span className="eyebrow">Promotion</span>
                <h1>{banner.title}</h1>
                <p>{banner.subtitle}</p>
                <small className="admin-attribution">Published by {banner.createdBy || 'PizzaFlow admin'}</small>
                {banner.ctaHref ? <Link className="primary-button small" to={banner.ctaHref}>{banner.ctaLabel || 'Explore'}</Link> : null}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-head">
        <div>
          <span className="eyebrow">Menu</span>
          <h2>Browse pizzas with images and details</h2>
        </div>
        <Link to="/builder" className="ghost-button">Build custom</Link>
      </section>

      <div className="menu-search-row">
        <label className="menu-search">
          <span>Search the menu</span>
          <div className="search-input-wrap">
            <span className="search-icon" aria-hidden="true">⌕</span>
            <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search pizza, drink, chicken, cheese..." type="search" aria-label="Search the menu" />
            {search ? <button type="button" className="clear-search" onClick={() => setSearch('')} aria-label="Clear menu search">×</button> : null}
          </div>
        </label>
      </div>

      <div className="menu-filters" aria-label="Filter menu categories">
        {categories.map((item) => <button key={item} className={`filter-chip ${category === item ? 'active' : ''}`} type="button" onClick={() => setCategory(item)}>{item}</button>)}
      </div>

      <section className="featured-grid">
        {visibleProducts.length === 0 ? (
          <article className="menu-card">
            <div className="menu-card-copy">
              <span className="eyebrow">No results</span>
              <h3>We could not find “{search || category}”.</h3>
              <p>Try another search word or choose the All category.</p>
            </div>
          </article>
        ) : visibleProducts.map((product, productIndex) => (
          <article key={product.id || product.name} className="menu-card menu-card-reveal" style={{ '--card-index': productIndex }}>
            <div className="menu-card-art media-art">
              <span className="gallery-label">Admin-added image</span>
              <img className="product-image" src={productImage(product)} onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = '/media/zuzi99-pizza-3010062.jpg'; }} alt={product.name} loading="lazy" />
            </div>
            <div className="menu-card-copy">
              <div className="menu-meta">
                <span className="status-pill">{product.category}</span>
                <strong>${product.price}</strong>
              </div>
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <small className="admin-attribution">Added by {product.createdBy || 'PizzaFlow admin'}</small>
              <small className="muted">
                {product.size} · {product.crust}
              </small>
              <div className="menu-meta">
                <span className="muted">{(product.ingredients || []).join(', ')}</span>
                <div className="menu-card-actions">
                  <button type="button" className="secondary-button small" onClick={() => addProductToCart(product)}>{addedProduct === (product.id || product.name) ? 'Added ✓' : 'Add to cart'}</button>
                  <Link to="/builder" className="ghost-button small">Customize</Link>
                </div>
              </div>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
