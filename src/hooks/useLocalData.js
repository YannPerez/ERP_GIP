import { useState, useCallback, useEffect } from 'react';
import { DEMO_DATA, EMPTY_DATA, KPI_BASE, generateProductionMensuelle } from '../data';

const STORAGE_KEY = 'rullier-hub-data-v8';

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

function computeKPI(data, isDemo, productionMensuelle) {
  const { commandes, produitsFinis } = data;

  const ca_annuel = productionMensuelle.reduce((a, m) => a + m.ca, 0);
  const tonnage_annuel = productionMensuelle.reduce((a, m) => a + m.tonnage, 0);
  const commandes_en_cours = commandes.filter(c => c.statut !== 'livree').length;
  // Use a realistic target for alerts. If stock is < objectif_t * 1000 / 12 (1 month of stock)
  const alertes_stock = produitsFinis.filter(p => p.stock_kg < (p.objectif_t * 1000 / 12)).length;

  return {
    ...KPI_BASE,
    ca_annuel,
    tonnage_annuel: Math.round(tonnage_annuel * 10) / 10,
    commandes_en_cours,
    alertes_stock,
  };
}

export default function useLocalData() {
  const [localData, setLocalData] = useState(() => {
    const stored = loadFromStorage();
    if (stored) return stored;
    return { ...DEMO_DATA };
  });

  useEffect(() => {
    saveToStorage(localData);
  }, [localData]);

  const productionMensuelle = generateProductionMensuelle(true);
  const kpiDirection = computeKPI(localData, true, productionMensuelle);

  // --- Generic CRUD helpers (affect localData initialized as DEMO_DATA) ---
  const updateCollection = useCallback((key, updater) => {
    setLocalData(prev => ({ ...prev, [key]: updater(prev[key]) }));
  }, []);

  const addItem = useCallback((key, item) => {
    updateCollection(key, (arr) => {
      const maxId = arr.reduce((m, i) => Math.max(m, typeof i.id === 'number' ? i.id : 0), 0);
      return [...arr, { ...item, id: typeof arr[0]?.id === 'string' ? item.id : maxId + 1 }];
    });
  }, [updateCollection]);

  const updateItem = useCallback((key, id, updates) => {
    updateCollection(key, (arr) =>
      arr.map(item => (item.id === id || item.jour === id ? { ...item, ...updates } : item))
    );
  }, [updateCollection]);

  const deleteItem = useCallback((key, id) => {
    updateCollection(key, (arr) => arr.filter(item => item.id !== id));
  }, [updateCollection]);

  const setSaisieJour = useCallback((dateStr, kg) => {
    setLocalData(prev => ({
      ...prev,
      saisieProduction: { ...prev.saisieProduction, [dateStr]: kg }
    }));
  }, []);

  const resetToDefaults = useCallback(() => {
    setLocalData({ ...DEMO_DATA });
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return {
    // Collections
    matierespremieres: localData.matierespremieres,
    produitsFinis: localData.produitsFinis,
    emballages: localData.emballages || [],
    clients: localData.clients || [],
    commandes: localData.commandes,
    productionMensuelle,
    planningProduction: localData.planningProduction || [],
    saisieProduction: localData.saisieProduction || {},
    transporteurs: localData.transporteurs || [],
    kpiDirection,

    // CRUD
    addItem,
    updateItem,
    deleteItem,
    setSaisieJour,
    resetToDefaults,
  };
}
