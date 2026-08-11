import React, { useEffect, useMemo, useState } from 'react';
import { api } from '../services/api.js';
import { featuredPizzas } from '../services/mockData.js';
import { productImages } from '../services/productMedia.js';

const blankProduct = {
  name: '',
  description: '',
  category: 'Classic Pizza',
  ingredients: '',
  price: '',
  size: 'Medium',
  crust: 'Thin Crust',
  availability: true,
  imageUrl: ''
};

export function ProductManagementPage() {
  const [products, setProducts] = useState(featuredPizzas);
  const [form, setForm] = useState(blankProduct);
  const [editingId, setEditingId] = useState(null);
  const [imageInput, setImageInput] = useState('');
  const [image, setImage] = useState('');
  const [error, setError] = useState('');

  const refresh = async () => {
    try {
      setProducts(await api.products());
    } catch {
      setProducts(featuredPizzas);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  const payload = useMemo(
    () => ({
      ...form,
      price: Number(form.price || 0),
      ingredients: form.ingredients
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean),
      imageUrl: image,
      imageUrls: image ? [image] : []
    }),
    [form, image]
  );

  const submit = async (event) => {
    event.preventDefault();
    setError('');
    if (!image) {
      setError('Add a product image before saving.');
      return;
    }
    try {
      if (editingId) {
        await api.updateProduct(editingId, payload);
      } else {
        await api.createProduct(payload);
      }
      setForm(blankProduct);
      setImage('');
      setImageInput('');
      setEditingId(null);
      await refresh();
    } catch (requestError) {
      setError(requestError.message);
    }
  };

  const editProduct = (product) => {
    setEditingId(product.id);
    setForm({ ...product, ingredients: (product.ingredients || []).join(', '), imageUrl: productImages(product)[0] || '' });
    setImage(productImages(product)[0] || '');
    setImageInput('');
    setError('');
  };

  const removeProduct = async (id) => {
    if (!window.confirm('Delete this product from the menu?')) return;
    try {
      await api.deleteProduct(id);
      await refresh();
    } catch (requestError) {
      setError(requestError.message);
    }
  };

  const onFile = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setImage(String(reader.result));
    reader.readAsDataURL(file);
  };

  const addImageUrl = () => {
    const url = imageInput.trim();
    if (!url) return;
    setImage(url);
    setImageInput('');
  };

  const resetForm = () => {
    setEditingId(null);
    setForm(blankProduct);
    setImage('');
    setImageInput('');
    setError('');
  };

  return (
    <section className="admin-page">
      <div className="section-head compact">
        <div>
          <span className="eyebrow">Product management</span>
          <h1>Manage menu items and images</h1>
        </div>
      </div>

      <div className="product-admin-grid">
        <form className="editor-card" onSubmit={submit}>
          <h2>{editingId ? 'Edit product' : 'Create product'}</h2>
          <label className="field-label">Name<input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required /></label>
          <label className="field-label">Description<textarea rows="3" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required /></label>
          <label className="field-label">Category<input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} required /></label>
          <label className="field-label">Ingredients<input value={form.ingredients} onChange={(e) => setForm({ ...form, ingredients: e.target.value })} placeholder="Comma-separated ingredients" /></label>
          <label className="field-label">Price<input type="number" step="0.01" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required /></label>
          <label className="field-label">Size<input value={form.size} onChange={(e) => setForm({ ...form, size: e.target.value })} /></label>
          <label className="field-label">Crust<input value={form.crust} onChange={(e) => setForm({ ...form, crust: e.target.value })} /></label>
          <label className="field-label">Add image URL
            <span className="inline-field"><input value={imageInput} onChange={(e) => setImageInput(e.target.value)} placeholder="https://..." /><button className="ghost-button small" type="button" onClick={addImageUrl}>Add</button></span>
          </label>
          <label className="field-label">Or upload an image<input type="file" accept="image/*" onChange={(e) => onFile(e.target.files?.[0])} /></label>
          <label className="setting-row">
            <span>Available</span>
            <input type="checkbox" checked={form.availability} onChange={(e) => setForm({ ...form, availability: e.target.checked })} />
          </label>
          <div className="preview-frame">
            {image ? <div className="image-preview"><img src={image} alt="Product preview" /><button type="button" onClick={() => setImage('')}>Remove</button></div> : <div className="preview-empty">Add one product image</div>}
          </div>
          <p className="muted">Use one clear image for the pizza, snack, chips, drink, or dessert. It will be fitted neatly inside the menu card.</p>
          {error ? <p className="form-error">{error}</p> : null}
          <button className="primary-button" type="submit">{editingId ? 'Update product' : 'Save product'}</button>
          {editingId ? <button className="ghost-button" type="button" onClick={resetForm}>Cancel edit</button> : null}
        </form>

        <div className="admin-list-card">
          <h2>Existing products</h2>
          <div className="stack-list">
            {products.map((product) => (
              <article key={product.id} className="feed-card">
                <img className="thumb" src={productImages(product)[0]} alt={product.name} loading="lazy" />
                <div className="stack-copy">
                  <strong>{product.name}</strong>
                  <p>{product.category}</p>
                  <small>${product.price} · {product.availability ? 'Available' : 'Hidden'}</small>
                  {product.createdBy && <small className="muted">Added by admin {product.createdBy}</small>}
                  {product.updatedBy && product.updatedBy !== product.createdBy && <small className="muted">Last updated by admin {product.updatedBy}</small>}
                </div>
                <div className="stack-actions">
                  <button className="ghost-button small" onClick={() => editProduct(product)}>Edit</button>
                  <button className="ghost-button small" onClick={() => removeProduct(product.id)}>Delete</button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
