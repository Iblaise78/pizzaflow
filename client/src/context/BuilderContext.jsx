import React, { createContext, useContext, useMemo, useState } from 'react';
import { menuOptions } from '../services/mockData.js';

const BuilderContext = createContext(null);

const savedDraft = JSON.parse(localStorage.getItem('pizzaflow-builder') || 'null');

const defaultDraft = {
  category: savedDraft?.category || menuOptions.categories[0],
  size: savedDraft?.size || menuOptions.sizes[1],
  base: savedDraft?.base || null,
  sauce: savedDraft?.sauce || null,
  cheese: savedDraft?.cheese || null,
  vegetables: savedDraft?.vegetables || [],
  toppings: savedDraft?.toppings || [menuOptions.toppings[0], menuOptions.toppings[15]],
  drinks: savedDraft?.drinks || [],
  sides: savedDraft?.sides || [],
  desserts: savedDraft?.desserts || [],
  quantity: savedDraft?.quantity || 1
};

export function BuilderProvider({ children }) {
  const [draft, setDraft] = useState(defaultDraft);

  const updateDraft = (patch) => {
    setDraft((current) => {
      const next = { ...current, ...patch };
      localStorage.setItem('pizzaflow-builder', JSON.stringify(next));
      return next;
    });
  };

  const resetDraft = () => {
    const next = defaultDraft;
    setDraft(next);
    localStorage.setItem('pizzaflow-builder', JSON.stringify(next));
  };

  const value = useMemo(() => ({ draft, updateDraft, resetDraft }), [draft]);
  return <BuilderContext.Provider value={value}>{children}</BuilderContext.Provider>;
}

export const useBuilder = () => {
  const context = useContext(BuilderContext);
  if (!context) {
    throw new Error('useBuilder must be used inside BuilderProvider');
  }
  return context;
};
