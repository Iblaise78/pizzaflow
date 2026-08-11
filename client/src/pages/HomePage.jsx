import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api.js';
import { featuredPizzas } from '../services/mockData.js';
import { fallbackProductImage, productImage } from '../services/productMedia.js';

export function HomePage() {
  const [products, setProducts] = useState(featuredPizzas);
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    api.products().then((items) => setProducts(Array.isArray(items) && items.length ? items : featuredPizzas)).catch(() => setProducts(featuredPizzas));
    api.banners().then(setBanners).catch(() => setBanners([]));
  }, []);

  const heroBanner = banners[0];
  const heroImage = heroBanner?.imageUrl ? productImage({ imageUrl: heroBanner.imageUrl }) : fallbackProductImage;

  return (
    <div className="page-stack">
      <section className="hero hero-premium">
        <div className="hero-copy">
          <span className="eyebrow">♨ 480°C · 90 seconds</span>
          <h1>FIRE, FLOUR<br /><em>AND YOUR RULES.</em></h1>
          <p className="hero-text">
            Four house pies pulled straight from the black oven — or open the builder and choose your base, sauce, cheese and vegetables, one deliberate step at a time.
          </p>
          <div className="hero-actions">
            <Link to="/builder" className="primary-button">Build your pizza <span>→</span></Link>
            <Link to="/track" className="secondary-button">Track an order</Link>
          </div>
          <div className="hero-stats">
            <div><strong>22 MIN</strong><span>AVERAGE DOOR TIME</span></div>
            <div><strong>48 HRS</strong><span>DOUGH FERMENT</span></div>
            <div><strong>1 OVEN</strong><span>OAK AND BEECH ONLY</span></div>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-video-frame">
            <img className="hero-admin-image" src={heroImage} onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = fallbackProductImage; }} alt={heroBanner?.title || 'Forno Nero pizza'} />
            <div className="video-badge"><span className="live-dot" /> {heroBanner ? `Added by ${heroBanner.createdBy || 'PizzaFlow admin'}` : 'Fresh from the oven'}</div>
          </div>
          <div className="hero-card-mini">
            <strong>{heroBanner?.title || 'Tonight’s special'}</strong>
            <p>{heroBanner?.subtitle || 'Smoky BBQ, cheddar, red onion, roasted peppers'}</p>
          </div>
        </div>
      </section>

      {banners.length > 1 ? (
        <section className="promo-strip">
          <div className="promo-carousel">
            {banners.map((banner) => (
              <article key={banner.id} className="promo-card">
                <img src={productImage({ imageUrl: banner.imageUrl })} onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = fallbackProductImage; }} alt={banner.title} loading="lazy" />
                <div className="promo-card-copy">
                  <span className="eyebrow">Promotion</span>
                  <h2>{banner.title}</h2>
                  <p>{banner.subtitle}</p>
                  <small className="admin-attribution">Published by {banner.createdBy || 'PizzaFlow admin'}</small>
                </div>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      <section className="section-head">
        <div>
          <span className="eyebrow">Featured menu</span>
          <h2>Hand-picked pizzas with premium ingredients</h2>
        </div>
        <Link to="/menu" className="ghost-button">Open menu</Link>
      </section>

      <section className="featured-grid">
        {products.map((pizza) => (
          <article key={pizza.id || pizza.name} className="menu-card">
            <div className="menu-card-art media-art">
              <img className="product-image" src={productImage(pizza)} onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = '/media/zuzi99-pizza-3010062.jpg'; }} alt={pizza.name} loading="lazy" />
            </div>
            <div className="menu-card-copy">
              <h3>{pizza.name}</h3>
              <p>{pizza.description || pizza.note}</p>
              <small className="admin-attribution">Added by {pizza.createdBy || 'PizzaFlow admin'}</small>
              <div className="menu-meta">
                <strong>${pizza.price}</strong>
                <Link to="/builder" className="ghost-button small">Customize</Link>
              </div>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
