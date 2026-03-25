import { useState, useCallback, useEffect } from 'react';
import {
  matierespremieres as defaultMP,
  produitsFinis as defaultPF,
  emballages as defaultEmb,
  clients as defaultClients,
  commandes as defaultCommandes,
  productionMensuelle as defaultProdMens,
  planningProduction as defaultPlanning,
  kpiDirection as defaultKPI,
  transporteurs as defaultTransporteurs,
} from '../data';

const STORAGE_KEY = 'rullier-hub-data';

const defaultData = {
  matierespremieres: defaultMP,
  produitsFinis: defaultPF,
  emballages: defaultEmb,
  clients: defaultClients,
  commandes: defaultCommandes,
  planningProduction: defaultPlanning,
  transporteurs: defaultTransporteurs,
};

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.warn('Erreur lecture localStorage:', e);
  }
  return null;
}

function saveToStorage(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.warn('Erreur ecriture localStorage:', e);
  }
}

function computeKPI(data) {
  const { commandes, produitsFinis } = data;

  const ca_annuel = commandes.reduce((a, c) => a + (c.montant || 0), 0);
  const tonnage_annuel = data.productionMensuelle.reduce((a, m) => a + m.tonnage, 0);
  const commandes_en_cours = commandes.filter(c => c.statut !== 'livree').length;
  const alertes_stock = produitsFinis.filter(p => p.stock_kg < p.seuil_critique_kg).length;

  return {
    ca_annuel: ca_annuel || defaultKPI.ca_annuel,
    ca_objectif: defaultKPI.ca_objectif,
    tonnage_annuel: Math.round(tonnage_annuel * 10) / 10,
    tonnage_objectif: defaultKPI.tonnage_objectif,
    commandes_en_cours,
    alertes_stock,
    repartition_ca: defaultKPI.repartition_ca,
  };
}

export default function useLocalData() {
  const [data, setData] = useState(() => {
    const stored = loadFromStorage();
    if (stored) {
      delete stored.productionMensuelle; // never use cached version
      return stored;
    }
    return { ...defaultData };
  });

  useEffect(() => {
    saveToStorage(data);
  }, [data]);

  // productionMensuelle is always fresh (rolling 12 months from current date)
  const dataWithProd = { ...data, productionMensuelle: defaultProdMens };
  const kpiDirection = computeKPI(dataWithProd);

  // --- Generic CRUD helpers ---
  const updateCollection = useCallback((key, updater) => {
    setData(prev => {
      const updated = { ...prev, [key]: updater(prev[key]) };
      return updated;
    });
  }, []);

  const addItem = useCallback((key, item) => {
    updateCollection(key, (arr) => {
      const maxId = arr.reduce((m, i) => {
        const id = typeof i.id === 'number' ? i.id : 0;
        return Math.max(m, id);
      }, 0);
      return [...arr, { ...item, id: typeof arr[0]?.id === 'string' ? item.id : maxId + 1 }];
    });
  }, [updateCollection]);

  const updateItem = useCallback((key, id, updates) => {
    updateCollection(key, (arr) =>
      arr.map(item => (item.id === id ? { ...item, ...updates } : item))
    );
  }, [updateCollection]);

  const deleteItem = useCallback((key, id) => {
    updateCollection(key, (arr) => arr.filter(item => item.id !== id));
  }, [updateCollection]);

  const resetToDefaults = useCallback(() => {
    setData({ ...defaultData });
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return {
    // Collections
    matierespremieres: data.matierespremieres,
    produitsFinis: data.produitsFinis,
    emballages: data.emballages,
    clients: data.clients,
    commandes: data.commandes,
    productionMensuelle: defaultProdMens, // always fresh, never cached
    planningProduction: data.planningProduction,
    transporteurs: data.transporteurs,
    kpiDirection,

    // CRUD
    addItem,
    updateItem,
    deleteItem,

    // Reset
    resetToDefaults,
  };
}
