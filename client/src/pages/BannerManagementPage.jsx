import React, { useEffect, useState } from 'react';
import { api } from '../services/api.js';
import { bannerSeed } from '../services/mockData.js';

const blankBanner = {
  title: '',
  subtitle: '',
  imageUrl: '',
  ctaLabel: 'Explore',
  ctaHref: '/builder',
  isActive: true
};

export function BannerManagementPage() {
  const [banners, setBanners] = useState(bannerSeed);
  const [form, setForm] = useState(blankBanner);
  const [editingId, setEditingId] = useState(null);
  const [preview, setPreview] = useState('');

  const refresh = async () => {
    try {
      setBanners(await api.banners());
    } catch {
      setBanners(bannerSeed);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  const submit = async (event) => {
    event.preventDefault();
    if (!preview && !form.imageUrl) {
      return;
    }
    const payload = { ...form, imageUrl: preview || form.imageUrl };
    if (editingId) {
      await api.updateBanner(editingId, payload);
    } else {
      await api.createBanner(payload);
    }
    setForm(blankBanner);
    setPreview('');
    setEditingId(null);
    await refresh();
  };

  const editBanner = (banner) => {
    setEditingId(banner.id);
    setForm(banner);
    setPreview(banner.imageUrl);
  };

  const removeBanner = async (id) => {
    await api.deleteBanner(id);
    await refresh();
  };

  const onFile = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setPreview(String(reader.result));
    reader.readAsDataURL(file);
  };

  return (
    <section className="admin-page">
      <div className="section-head compact">
        <div>
          <span className="eyebrow">Banners</span>
          <h1>Manage promotional media</h1>
        </div>
      </div>

      <div className="product-admin-grid">
        <form className="editor-card" onSubmit={submit}>
          <h2>{editingId ? 'Edit banner' : 'Create banner'}</h2>
          <label className="field-label">Title<input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required /></label>
          <label className="field-label">Subtitle<textarea rows="3" value={form.subtitle} onChange={(e) => setForm({ ...form, subtitle: e.target.value })} required /></label>
          <label className="field-label">Image URL<input value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} /></label>
          <label className="field-label">Or upload image<input type="file" accept="image/*" onChange={(e) => onFile(e.target.files?.[0])} /></label>
          <label className="field-label">CTA label<input value={form.ctaLabel} onChange={(e) => setForm({ ...form, ctaLabel: e.target.value })} /></label>
          <label className="field-label">CTA href<input value={form.ctaHref} onChange={(e) => setForm({ ...form, ctaHref: e.target.value })} /></label>
          <label className="setting-row">
            <span>Active</span>
            <input type="checkbox" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} />
          </label>
          <div className="preview-frame">
            {preview || form.imageUrl ? <img src={preview || form.imageUrl} alt="Preview" /> : <div className="preview-empty">Banner preview</div>}
          </div>
          <p className="muted">Provide a URL or upload an image file before saving.</p>
          <button className="primary-button" type="submit">{editingId ? 'Update banner' : 'Save banner'}</button>
          {editingId ? <button className="ghost-button" type="button" onClick={() => { setEditingId(null); setForm(blankBanner); setPreview(''); }}>Cancel edit</button> : null}
        </form>

        <div className="admin-list-card">
          <h2>Existing banners</h2>
          <div className="stack-list">
            {banners.map((banner) => (
              <article key={banner.id} className="feed-card">
                <img className="thumb" src={banner.imageUrl || '/media/zuzi99-pizza-3010062.jpg'} onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = '/media/zuzi99-pizza-3010062.jpg'; }} alt={banner.title} loading="lazy" />
                <div className="stack-copy">
                  <strong>{banner.title}</strong>
                  <p>{banner.subtitle}</p>
                  {banner.updatedBy && <small className="muted">Last updated by {banner.updatedBy}</small>}
                </div>
                <div className="stack-actions">
                  <button className="ghost-button small" onClick={() => editBanner(banner)}>Edit</button>
                  <button className="ghost-button small" onClick={() => removeBanner(banner.id)}>Delete</button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
