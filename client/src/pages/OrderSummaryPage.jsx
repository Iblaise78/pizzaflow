import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';

export function OrderSummaryPage() {
  const { cart } = useCart();
  const subtotal = useMemo(() => cart.reduce((sum, item) => sum + Number(item.total || 0), 0), [cart]);
  const deliveryFee = cart.length ? 3.5 : 0;
  const total = subtotal + deliveryFee;

  return (
    <section className="summary-page">
      <div className="summary-page-head">
        <div><span className="eyebrow">Step 2 · Review</span><h1>Your pizza, exactly as planned.</h1><p className="hero-text">Check every ingredient before continuing to delivery details and secure payment.</p></div>
        <Link to="/builder" className="ghost-button">Edit pizza</Link>
      </div>
      {!cart.length ? <div className="empty-state"><h2>Your cart is empty</h2><p className="muted">Build something delicious and it will appear here.</p><Link to="/builder" className="primary-button">Start building</Link></div> : (
        <div className="summary-page-grid">
          <div className="summary-items">
            {cart.map((item) => <article className="summary-item" key={item.cartId}>
              <div className="summary-item-image" aria-hidden="true"><span>🍕</span></div>
              <div><span className="eyebrow">{item.quantity || 1} × custom pizza</span><h2>{item.title}</h2><p>{item.size?.name} · {item.base?.name} · {item.sauce?.name} · {item.cheese?.name}</p><small>{[...(item.vegetables || []), ...(item.toppings || [])].map((entry) => entry.name).join(', ') || 'No extra toppings'}</small></div>
              <strong>${Number(item.total || 0).toFixed(2)}</strong>
            </article>)}
          </div>
          <aside className="summary-total"><span className="eyebrow">Order total</span><div className="price-line"><span>Subtotal</span><strong>${subtotal.toFixed(2)}</strong></div><div className="price-line"><span>Delivery</span><strong>${deliveryFee.toFixed(2)}</strong></div><div className="price-line premium"><span>Total</span><strong>${total.toFixed(2)}</strong></div><Link to="/cart" className="primary-button wide">Continue to checkout</Link></aside>
        </div>
      )}
    </section>
  );
}
