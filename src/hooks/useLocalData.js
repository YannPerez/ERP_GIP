import { useState, useCallback, useEffect } from 'react';
import { DEMO_DATA, EMPTY_DATA, KPI_BASE, generateProductionMensuelle } from '../data';

const STORAGE_KEY = 'rullier-hub-data-v2';

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
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [localData, setLocalData] = useState(() => {
    const stored = loadFromStorage();
    if (stored) return stored;
    return { ...EMPTY_DATA };
  });

  useEffect(() => {
    saveToStorage(localData);
  }, [localData]);

  const activeData = isDemoMode ? DEMO_DATA : localData;
  const productionMensuelle = generateProductionMensuelle(isDemoMode);
  const kpiDirection = computeKPI(activeData, isDemoMode, productionMensuelle);

  // --- Generic CRUD helpers (only affect localData) ---
  const updateCollection = useCallback((key, updater) => {
    if (isDemoMode) return; // Read-only in demo mode
    setLocalData(prev => ({ ...prev, [key]: updater(prev[key]) }));
  }, [isDemoMode]);

  const addItem = useCallback((key, item) => {
    updateCollection(key, (arr) => {
      const maxId = arr.reduce((m, i) => Math.max(m, typeof i.id === 'number' ? i.id : 0), 0);
      return [...arr, { ...item, id: typeof arr[0]?.id === 'string' ? item.id : maxId + 1 }];
    });
  }, [updateCollection]);

  const updateItem = useCallback((key, id, updates) => {
    updateCollection(key, (arr) => arr.map(item => (item.id === id ? { ...item, ...updates } : item)));
  }, [updateCollection]);

  const deleteItem = useCallback((key, id) => {
    updateCollection(key, (arr) => arr.filter(item => item.id !== id));
  }, [updateCollection]);

  const resetToDefaults = useCallback(() => {
    setLocalData({ ...EMPTY_DATA });
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return {
    isDemoMode,
    setIsDemoMode,
    // Collections
    matierespremieres: activeData.matierespremieres,
    produitsFinis: activeData.produitsFinis,
    emballages: activeData.emballages || [],
    clients: activeData.clients || [],
    commandes: activeData.commandes,
    productionMensuelle,
    planningProduction: activeData.planningProduction || [],
    transporteurs: activeData.transporteurs || [],
    kpiDirection,

    // CRUD
    addItem,
    updateItem,
    deleteItem,
    resetToDefaults,
  };
}
