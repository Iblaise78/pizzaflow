import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBuilder } from '../context/BuilderContext.jsx';
import { useCart } from '../context/CartContext.jsx';
import { menuOptions } from '../services/mockData.js';
import { PizzaIllustration } from '../components/pizza/PizzaIllustration.jsx';
import baseImage from '../assets/zuzi99-pizza-3010062.jpg';
import baseImageTwo from '../assets/tamas-pap-XLmhRnV8yuc-unsplash.jpg';
import baseImageThree from '../assets/shayan-ramesht-exSEmuA7R7k-unsplash.jpg';
import sauceImage from '../assets/fatima-akram-uU0Anw-8Vsg-unsplash.jpg';
import sauceImageTwo from '../assets/mahyar-motebassem-pGA4zHvpo5E-unsplash.jpg';
import sauceImageThree from '../assets/pablo-pacheco-D3Mag4BKqns-unsplash.jpg';
import cheeseImage from '../assets/klara-kulikova-jvWZYnxBDlQ-unsplash.jpg';
import cheeseImageTwo from '../assets/klara-kulikova-RsiNFKMvqtg-unsplash.jpg';
import cheeseImageThree from '../assets/dinesh-lunked-pxmBc2lDiMU-unsplash.jpg';
import gardenImage from '../assets/pranjall-kumar-sejqj6Eaqe8-unsplash.jpg';
import gardenImageTwo from '../assets/tommao-wang-brC9jqsAxmU-unsplash.jpg';
import gardenImageThree from '../assets/shourav-sheikh-Q9VEWorDhaY-unsplash.jpg';

const steps = [
  { label: 'The base', key: 'base', items: menuOptions.bases },
  { label: 'The sauce', key: 'sauce', items: menuOptions.sauces },
  { label: 'The cheese', key: 'cheese', items: menuOptions.cheeses },
  { label: 'The garden', key: 'vegetables', items: menuOptions.vegetables, multiple: true }
];

const stepImages = [
  [baseImage, baseImageTwo, baseImageThree],
  [sauceImage, sauceImageTwo, sauceImageThree],
  [cheeseImage, cheeseImageTwo, cheeseImageThree],
  [gardenImage, gardenImageTwo, gardenImageThree]
];

export function BuilderPage() {
  const { draft, updateDraft } = useBuilder();
  const { addItem } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const active = steps[step];
  const selected = draft[active.key];
  const ready = Boolean(draft.base && draft.sauce && draft.cheese);

  const total = useMemo(() => {
    if (!draft.base || !draft.sauce || !draft.cheese) return 0;
    const vegetablesTotal = (draft.vegetables || []).reduce((sum, item) => sum + Number(item.price || 0), 0);
    return (draft.base.price + draft.sauce.price + draft.cheese.price + vegetablesTotal) * (draft.size?.multiplier || 1);
  }, [draft]);

  const choose = (item) => {
    if (active.multiple) {
      const current = draft.vegetables || [];
      const exists = current.some((entry) => entry.id === item.id);
      updateDraft({ vegetables: exists ? current.filter((entry) => entry.id !== item.id) : [...current, item] });
    } else {
      updateDraft({ [active.key]: item });
    }
  };

  const canContinue = active.multiple ? true : Boolean(selected);
  const next = () => {
    if (!canContinue) return;
    if (step < steps.length - 1) setStep((current) => current + 1);
    else if (ready) {
      addItem({
        title: `${draft.category?.name || 'Custom pizza'} - ${draft.size?.name || 'Medium'}`,
        category: draft.category,
        size: draft.size,
        base: draft.base,
        sauce: draft.sauce,
        cheese: draft.cheese,
        vegetables: draft.vegetables || [],
        toppings: draft.toppings || [],
        quantity: draft.quantity || 1,
        total
      });
      navigate('/cart');
    }
  };

  const summaryValue = (key, fallback = 'Not chosen') => {
    const value = draft[key];
    if (Array.isArray(value)) return value.length ? value.map((item) => item.name).join(', ') : 'None';
    return value?.name || fallback;
  };

  return (
    <div className="forno-builder">
      <section className="builder-workspace">
        <div className="builder-page-title"><span className="eyebrow">Forno Nero / build yours</span><h1>Build your pizza</h1></div>
        <nav className="builder-tabs" aria-label="Pizza builder steps">
          {steps.map((item, index) => <button key={item.key} type="button" className={index === step ? 'builder-tab active' : 'builder-tab'} onClick={() => setStep(index)}><b>{index + 1}</b><span>{item.label}</span></button>)}
        </nav>
        <div className="builder-section-title"><div><span className="eyebrow">{active.multiple ? 'Choose as many as you like' : 'Pick one'}</span><h2>{active.label}</h2></div><span className="builder-step-count">0{step + 1} / 04</span></div>
        <div className="builder-choice-grid">
          {active.items.map((item, itemIndex) => {
            const isSelected = active.multiple ? (selected || []).some((entry) => entry.id === item.id) : selected?.id === item.id;
            return <button key={item.id} type="button" className={isSelected ? 'builder-choice selected' : 'builder-choice'} onClick={() => choose(item)}><img className="builder-choice-image" src={stepImages[step][itemIndex % stepImages[step].length]} alt="" /><span><strong>{item.name}</strong><small>{item.description || (active.multiple ? 'Fresh, prepared for the oven' : 'House recipe, made to order')}</small></span><b>${Number(item.price || 0).toFixed(2)}</b></button>;
          })}
        </div>
        <div className="builder-controls"><button type="button" className="builder-back" disabled={step === 0} onClick={() => setStep((current) => Math.max(0, current - 1))}>‹ &nbsp; Back</button><button type="button" className="builder-next" disabled={!canContinue || (step === 3 && !ready)} onClick={next}>{step === 3 ? 'Add to cart' : 'Next'} <span>›</span></button></div>
      </section>

      <aside className="forno-order-summary">
        <div className="summary-visual"><PizzaIllustration base={Boolean(draft.base)} sauce={Boolean(draft.sauce)} cheese={Boolean(draft.cheese)} vegetables={(draft.vegetables || []).map((item) => ({ id: item.id, symbol: item.symbol }))} /></div>
        <span className="eyebrow">Order summary</span>
        <div className="forno-summary-row"><span>Base</span><strong>{summaryValue('base')}</strong></div>
        <div className="forno-summary-row"><span>Sauce</span><strong>{summaryValue('sauce')}</strong></div>
        <div className="forno-summary-row"><span>Cheese</span><strong>{summaryValue('cheese')}</strong></div>
        <div className="forno-summary-row"><span>Vegetables</span><strong>{summaryValue('vegetables')}</strong></div>
        <div className="forno-total"><span>Total</span><strong>${total.toFixed(2)}</strong></div>
        <button type="button" className="primary-button wide" disabled={!ready} onClick={() => { setStep(3); }}>Pay and send to kitchen</button>
        <small className="summary-note">You can review your address and payment method next.</small>
      </aside>
    </div>
  );
}
