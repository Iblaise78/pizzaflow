import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { api } from '../services/api.js';
import { coupons, paymentMethods } from '../services/mockData.js';
import { useAuth } from '../context/AuthContext.jsx';
import { fallbackProductImage, productImage } from '../services/productMedia.js';

const defaultCustomer = {
  fullName: 'Demo Customer',
  email: 'customer@example.com',
  phone: '+250700000000',
  city: 'Kigali',
  address: '12 Main Street',
  notes: ''
};

export function CartPage() {
  const { cart, removeItem, clearCart } = useCart();
  const [customer, setCustomer] = useState(defaultCustomer);
  const [paymentMethod, setPaymentMethod] = useState(paymentMethods[1]);
  const [couponCode, setCouponCode] = useState('PIZZA10');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [deliveryFee] = useState(3.5);
  const [loading, setLoading] = useState(false);
  const [ageConfirmed, setAgeConfirmed] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  const subtotal = useMemo(() => cart.reduce((sum, item) => sum + Number(item.total || 0), 0), [cart]);
  const discount = useMemo(() => {
    if (!appliedCoupon) return 0;
    if (appliedCoupon.discountType === 'percent') return (subtotal * appliedCoupon.value) / 100;
    return appliedCoupon.value;
  }, [appliedCoupon, subtotal]);
  const total = Math.max(0, subtotal + deliveryFee - discount);
  const hasAlcohol = cart.some((item) => (item.drinks || []).some((drink) => drink.alcoholic));

  const applyCoupon = () => {
    const found = coupons.find((coupon) => coupon.code === couponCode.trim().toUpperCase());
    setAppliedCoupon(found || null);
  };

  const placeOrder = async (payment = {}) => {
    const order = await api.createOrder({
      customer,
      paymentMethod,
      couponCode: appliedCoupon?.code || null,
      deliveryFee,
      deliveryNotes: customer.notes,
      ageConfirmed,
      paymentId: payment.paymentId,
      razorpayOrderId: payment.razorpayOrderId,
      address: `${customer.address}, ${customer.city}`,
      items: cart[0],
      total,
      subtotal,
      discount
    });
    localStorage.setItem('pizzaflow-active-order', JSON.stringify({ ...order, status: order.orderStatus || order.status, eta: '28 min' }));
    clearCart();
    navigate('/track');
  };

  const loadRazorpayScript = () => new Promise((resolve, reject) => {
    if (window.Razorpay) return resolve();
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = resolve;
    script.onerror = () => reject(new Error('Razorpay checkout could not load.'));
    document.body.appendChild(script);
  });

  const checkout = async () => {
    if (!cart.length) return;
    if (!user) {
      navigate('/login', { state: { from: '/cart', checkout: true } });
      return;
    }
    if (hasAlcohol && !ageConfirmed) {
      window.alert('Please confirm that you are of legal drinking age before ordering alcoholic drinks.');
      return;
    }
    setLoading(true);
    try {
      if (paymentMethod === 'Cash on Delivery') {
        await placeOrder();
        return;
      }
      const paymentIntent = await api.createPaymentOrder({ amount: Math.round(total * 100), orderId: `PF-${Date.now()}` });
      if (paymentIntent.provider !== 'razorpay') {
        await api.verifyPayment({ paymentIntent, signature: 'demo-signature' });
        await placeOrder({ paymentId: paymentIntent.id, razorpayOrderId: paymentIntent.id });
        return;
      }
      await loadRazorpayScript();
      const razorpay = new window.Razorpay({
        key: paymentIntent.keyId,
        amount: paymentIntent.amount,
        currency: paymentIntent.currency,
        name: 'PizzaFlow',
        description: 'PizzaFlow order',
        order_id: paymentIntent.id,
        prefill: { name: customer.fullName, email: customer.email, contact: customer.phone },
        theme: { color: '#e63946' },
        handler: async (response) => {
          try {
            const verification = await api.verifyPayment(response);
            if (!verification.verified) throw new Error('Payment verification failed.');
            await placeOrder({ paymentId: response.razorpay_payment_id, razorpayOrderId: response.razorpay_order_id });
          } catch (error) {
            setLoading(false);
            window.alert(error.message);
          }
        },
        modal: { ondismiss: () => setLoading(false) }
      });
      razorpay.open();
    } catch (error) {
      setLoading(false);
      window.alert(error.message || 'We could not place your order.');
    }
  };

  const updateCustomer = (field, value) => {
    setCustomer((current) => ({ ...current, [field]: value }));
  };

  return (
    <div className="checkout-layout">
      <section className="checkout-panel">
        <div className="section-head compact">
          <div>
            <span className="eyebrow">Cart & checkout</span>
            <h1>Your order</h1>
          </div>
        </div>

        {!cart.length ? (
          <div className="empty-state">
            <p>Your cart is empty.</p>
            <button className="primary-button" onClick={() => navigate('/builder')}>Build a pizza</button>
          </div>
        ) : (
          <div className="cart-list">
            {cart.map((item) => (
              <article key={item.cartId} className="cart-item">
                <div className="cart-item-media">
                  <img
                    src={productImage(item)}
                    alt={`${item.title || 'Pizza'} preview`}
                    onError={(event) => {
                      event.currentTarget.onerror = null;
                      event.currentTarget.src = fallbackProductImage;
                    }}
                  />
                </div>
                <div className="cart-item-main">
                  <strong>{item.title}</strong>
                  <p>{item.size?.name} · {item.base.name} · {item.sauce.name} · {item.cheese?.name || 'Mozzarella'}</p>
                  <small>
                    {(item.toppings || []).map((entry) => entry.name).join(', ') || 'No toppings'}
                    {item.drinks?.length ? ` | Drinks: ${item.drinks.map((entry) => entry.name).join(', ')}` : ''}
                    {item.sides?.length ? ` | Sides: ${item.sides.map((entry) => entry.name).join(', ')}` : ''}
                    {item.desserts?.length ? ` | Desserts: ${item.desserts.map((entry) => entry.name).join(', ')}` : ''}
                  </small>
                </div>
                <div className="cart-actions">
                  <strong>${Number(item.total || 0).toFixed(2)}</strong>
                  <button className="ghost-button small" onClick={() => removeItem(item.cartId)}>Remove</button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <aside className="checkout-sidebar">
        <h2>Customer details</h2>
        <label className="field-label">
          Full name
          <input value={customer.fullName} onChange={(event) => updateCustomer('fullName', event.target.value)} />
        </label>
        <label className="field-label">
          Email
          <input type="email" value={customer.email} onChange={(event) => updateCustomer('email', event.target.value)} />
        </label>
        <label className="field-label">
          Phone
          <input value={customer.phone} onChange={(event) => updateCustomer('phone', event.target.value)} />
        </label>
        <label className="field-label">
          Delivery address
          <input value={customer.address} onChange={(event) => updateCustomer('address', event.target.value)} />
        </label>
        <label className="field-label">
          City
          <input value={customer.city} onChange={(event) => updateCustomer('city', event.target.value)} />
        </label>
        <label className="field-label">
          Delivery notes
          <textarea rows="3" value={customer.notes} onChange={(event) => updateCustomer('notes', event.target.value)} />
        </label>

        <label className="field-label">
          Coupon code
          <div className="inline-input">
            <input value={couponCode} onChange={(event) => setCouponCode(event.target.value)} />
            <button className="ghost-button small" onClick={applyCoupon}>Apply</button>
          </div>
        </label>

        <label className="field-label">
          Payment method
          <select value={paymentMethod} onChange={(event) => setPaymentMethod(event.target.value)}>
            {paymentMethods.map((method) => (
              <option key={method} value={method}>{method}</option>
            ))}
          </select>
        </label>

        {hasAlcohol ? (
          <label className="setting-row age-confirmation">
            <span>I confirm that I am of legal drinking age.</span>
            <input type="checkbox" checked={ageConfirmed} onChange={(event) => setAgeConfirmed(event.target.checked)} />
          </label>
        ) : null}

        <div className="price-line premium">
          <span>Subtotal</span>
          <strong>${subtotal.toFixed(2)}</strong>
        </div>
        <div className="price-line premium">
          <span>Delivery fee</span>
          <strong>${deliveryFee.toFixed(2)}</strong>
        </div>
        <div className="price-line premium">
          <span>Discount</span>
          <strong>- ${discount.toFixed(2)}</strong>
        </div>
        <div className="price-line premium">
          <span>Total</span>
          <strong>${total.toFixed(2)}</strong>
        </div>

        <button className="primary-button wide" disabled={loading || !cart.length} onClick={checkout}>
          {loading ? 'Processing...' : user ? `Pay with ${paymentMethod}` : 'Sign in to pay'}
        </button>
        <p className="muted">Cash on Delivery, Credit/Debit Card, Mobile Money, and PayPal are selectable in the UI for the assignment spec.</p>
      </aside>
    </div>
  );
}
