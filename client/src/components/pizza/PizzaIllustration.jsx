import React from 'react';

export function PizzaIllustration({ base = true, sauce = true, cheese = true, vegetables = [] }) {
  return (
    <div className="pizza-stage" aria-label="Live pizza preview">
      <div className="pizza-steam" />
      <div className="pizza-shadow" />
      <div className={`pizza-base ${base ? 'visible' : ''}`} />
      <div className={`pizza-sauce ${sauce ? 'visible' : ''}`} />
      <div className={`pizza-cheese ${cheese ? 'visible' : ''}`} />
      {vegetables.map((item, index) => (
        <span key={`${item.id}-${index}`} className={`pizza-topping topping-${item.id}`}>
          {item.symbol}
        </span>
      ))}
    </div>
  );
}

