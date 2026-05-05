// ============================================================
// Maison Rullier Hub — Données & Modèles (80 Tonnes)
// ============================================================

export const NOMENCLATURES = {
  "Nature": { "Farine de blé T55": 0.75, "Œufs frais plein air": 0.35, "Sel de Savoie": 0.01 },
  "Nature Bio": { "Farine de blé T55 Bio": 0.75, "Œufs frais plein air": 0.35, "Sel de Savoie": 0.01 },
  "Sarrasin": { "Farine de sarrasin": 0.75, "Œufs frais plein air": 0.35, "Sel de Savoie": 0.01 },
  "Sarrasin Bio": { "Farine de sarrasin Bio": 0.75, "Œufs frais plein air": 0.35, "Sel de Savoie": 0.01 },
  "Méli-Mélo": { "Farine de blé T55": 0.375, "Farine de sarrasin": 0.375, "Œufs frais plein air": 0.35, "Sel de Savoie": 0.01 },
  "Méli-Mélo Bio": { "Farine de blé T55 Bio": 0.375, "Farine de sarrasin Bio": 0.375, "Œufs frais plein air": 0.35, "Sel de Savoie": 0.01 },
  "Noisette": { "Farine de blé T55": 0.75, "Œufs frais plein air": 0.35, "Sel de Savoie": 0.01, "Noisettes du Piémont": 0.01 },
  "Noix": { "Farine de blé T55": 0.75, "Œufs frais plein air": 0.35, "Sel de Savoie": 0.01, "Cerneaux de noix AOP": 0.01 },
  "Chanterelles": { "Farine de blé T55": 0.75, "Œufs frais plein air": 0.35, "Sel de Savoie": 0.01, "Chanterelles déshydratées": 0.01 },
  "Cèpes": { "Farine de blé T55": 0.75, "Œufs frais plein air": 0.35, "Sel de Savoie": 0.01, "Cèpes déshydratés": 0.01 },
  "Châtaigne Bio": { "Farine de blé T55 Bio": 0.75, "Œufs frais plein air": 0.35, "Sel de Savoie": 0.01, "Farine de châtaigne": 0.01 },
  "Ail des Ours Bio": { "Farine de blé T55 Bio": 0.75, "Œufs frais plein air": 0.35, "Sel de Savoie": 0.01, "Ail des ours": 0.01 }
};

export const KPI_BASE = {
  ca_annuel: 0,
  ca_objectif: 760000,
  tonnage_annuel: 0,
  tonnage_objectif: 80,
  repartition_ca: { particuliers: 40, restauration: 60 }
};

export const DEMO_DATA = {
  matierespremieres: [
    { id: 1, nom: "Farine de blé T55", categorie: "Farine", stock_kg: 820, seuil_kg: 500, prix_kg: 0.85, allergene: false },
    { id: 2, nom: "Farine de blé T55 Bio", categorie: "Farine", stock_kg: 400, seuil_kg: 200, prix_kg: 1.25, allergene: false },
    { id: 3, nom: "Farine de sarrasin", categorie: "Farine", stock_kg: 340, seuil_kg: 200, prix_kg: 1.45, allergene: false },
    { id: 4, nom: "Farine de sarrasin Bio", categorie: "Farine", stock_kg: 150, seuil_kg: 80, prix_kg: 1.95, allergene: false },
    { id: 5, nom: "Œufs frais plein air", categorie: "Œufs", stock_kg: 90, seuil_kg: 50, prix_kg: 4.20, allergene: false },
    { id: 6, nom: "Cerneaux de noix AOP", categorie: "Fruits secs", stock_kg: 45, seuil_kg: 30, prix_kg: 12.00, allergene: true },
    { id: 7, nom: "Noisettes du Piémont", categorie: "Fruits secs", stock_kg: 28, seuil_kg: 20, prix_kg: 15.50, allergene: true },
    { id: 8, nom: "Cèpes déshydratés", categorie: "Champignons", stock_kg: 18, seuil_kg: 10, prix_kg: 45.00, allergene: false },
    { id: 9, nom: "Chanterelles déshydratées", categorie: "Champignons", stock_kg: 12, seuil_kg: 8, prix_kg: 55.00, allergene: false },
    { id: 10, nom: "Farine de châtaigne", categorie: "Farine", stock_kg: 85, seuil_kg: 50, prix_kg: 4.80, allergene: false },
    { id: 11, nom: "Ail des ours", categorie: "Aromate", stock_kg: 15, seuil_kg: 10, prix_kg: 28.00, allergene: false },
    { id: 12, nom: "Sel de Savoie", categorie: "Condiment", stock_kg: 150, seuil_kg: 50, prix_kg: 0.60, allergene: false }
  ],
  produitsFinis: [
    { id: 1, variante: "Nature", stock_kg: 4500, objectif_t: 22, prix_kg: 8.5, couleur: "#8B6F47", bio: false },
    { id: 2, variante: "Sarrasin", stock_kg: 2100, objectif_t: 12, prix_kg: 9.5, couleur: "#6B4C2A", bio: false },
    { id: 3, variante: "Méli-Mélo", stock_kg: 1200, objectif_t: 8, prix_kg: 10.0, couleur: "#C47D3B", bio: false },
    { id: 4, variante: "Noisette", stock_kg: 900, objectif_t: 8, prix_kg: 11.5, couleur: "#CD853F", bio: false, allergene: true },
    { id: 5, variante: "Noix", stock_kg: 1100, objectif_t: 8, prix_kg: 11.0, couleur: "#A0522D", bio: false, allergene: true },
    { id: 6, variante: "Chanterelles", stock_kg: 600, objectif_t: 4, prix_kg: 13.0, couleur: "#E8A830", bio: false },
    { id: 7, variante: "Cèpes", stock_kg: 700, objectif_t: 4, prix_kg: 12.0, couleur: "#7C6840", bio: false },
    { id: 8, variante: "Nature Bio", stock_kg: 800, objectif_t: 4, prix_kg: 10.5, couleur: "#6A9B5E", bio: true },
    { id: 9, variante: "Sarrasin Bio", stock_kg: 400, objectif_t: 2, prix_kg: 11.5, couleur: "#4A7A3A", bio: true },
    { id: 10, variante: "Méli-Mélo Bio", stock_kg: 300, objectif_t: 2, prix_kg: 12.0, couleur: "#5C8F4E", bio: true },
    { id: 11, variante: "Châtaigne Bio", stock_kg: 500, objectif_t: 2, prix_kg: 12.5, couleur: "#8B4513", bio: true },
    { id: 12, variante: "Ail des Ours Bio", stock_kg: 600, objectif_t: 4, prix_kg: 13.0, couleur: "#3D7A40", bio: true }
  ],
  emballages: [
    { id: 1, nom: "Cartons recyclables 400g", stock_unites: 2400, seuil_critique: 500, type: "carton", format: "400g" },
    { id: 2, nom: "Sacs kraft 5kg", stock_unites: 450, seuil_critique: 100, type: "sac", format: "5kg" },
    { id: 3, nom: "Film plastique alimentaire", stock_metres: 1200, seuil_critique: 300, type: "film", format: "rouleau" },
    { id: 4, nom: "Étiquettes Maison Rullier", stock_unites: 8500, seuil_critique: 2000, type: "etiquette", format: "unitaire" }
  ],
  clients: [
    { id: 1, nom: "Épicerie Fine Le Chalet Blanc", type: "epicerie_fine", ville: "Annecy", ca_annuel: 24500 },
    { id: 2, nom: "Hôtel Le Grand Bornand Palace", type: "hotel_prestige", ville: "Le Grand Bornand", ca_annuel: 58000 },
    { id: 3, nom: "Restaurant d'Altitude La Folie Douce", type: "restaurant_altitude", ville: "Courchevel", ca_annuel: 110000 },
    { id: 4, nom: "La Maison Savoyarde", type: "epicerie_fine", ville: "Chambéry", ca_annuel: 18000 },
    { id: 5, nom: "Hôtel Alp'Azur", type: "hotel_prestige", ville: "Megève", ca_annuel: 62000 },
    { id: 6, nom: "Restaurant L'Alpage Doré", type: "restauration", ville: "Méribel", ca_annuel: 35000 },
    { id: 7, nom: "Épicerie des Cimes", type: "epicerie_fine", ville: "Chamonix", ca_annuel: 22000 },
    { id: 8, nom: "Le Panoramic (Restaurant d'Hôtel)", type: "restaurant_hotel", ville: "Val Thorens", ca_annuel: 78000 }
  ],
  commandes: [
    { id: "CMD-2026-0142", client_nom: "Station Courchevel", date: "2026-03-12", montant: 830, statut: "en_preparation", format: "5kg", produits: [{ variante: "Nature", qte_kg: 50 }, { variante: "Méli-Mélo", qte_kg: 30 }] },
    { id: "CMD-2026-0141", client_nom: "Le Chalet Blanc", date: "2026-03-11", montant: 198, statut: "expediee", format: "400g", produits: [{ variante: "Nature", qte_kg: 8 }, { variante: "Sarrasin", qte_kg: 8 }, { variante: "Cèpes", qte_kg: 4 }] }
  ],
  planningProduction: [
    { jour: "Lundi", date: "2026-03-09", parfum: "Nature", objectif_kg: 390, statut: "termine", couleur: "#8B6F47" },
    { jour: "Mardi", date: "2026-03-10", parfum: "Sarrasin", objectif_kg: 350, statut: "termine", couleur: "#6B4C2A" },
    { jour: "Mercredi", date: "2026-03-11", parfum: "Méli-Mélo", objectif_kg: 390, statut: "termine", couleur: "#C47D3B" },
    { jour: "Jeudi", date: "2026-03-12", parfum: "Cèpes", objectif_kg: 300, statut: "en_cours", couleur: "#7C6840" },
    { jour: "Vendredi", date: "2026-03-13", parfum: "Nature Bio", objectif_kg: 390, statut: "planifie", couleur: "#6A9B5E" }
  ],
  transporteurs: [
    { id: 1, nom: "Chauffeurs Internes", type: "interne", vehicules: 2, zone: "Savoie / Haute-Savoie", disponible: true },
    { id: 2, nom: "Transport Frais Express (TFE)", type: "sous_traitant", zone: "France Entière", tarif_base: 45, disponible: true }
  ]
};

// Deep copy and zero out stocks
export const EMPTY_DATA = {
  matierespremieres: DEMO_DATA.matierespremieres.map(mp => ({ ...mp, stock_kg: 0 })),
  produitsFinis: DEMO_DATA.produitsFinis.map(pf => ({ ...pf, stock_kg: 0 })),
  emballages: DEMO_DATA.emballages.map(e => ({ ...e, stock_unites: 0, stock_metres: 0 })),
  clients: DEMO_DATA.clients.map(c => ({ ...c, ca_annuel: 0 })),
  commandes: [],
  planningProduction: [],
  transporteurs: DEMO_DATA.transporteurs
};

const MOIS_LABELS = ["Jan", "Fév", "Mar", "Avr", "Mai", "Jun", "Jul", "Aoû", "Sep", "Oct", "Nov", "Déc"];
// Tonnage saisonnier 80T: Hiver (Nov-Fév) ~ 8T/mois, Été (Mar-Oct) ~ 6T/mois
const TONNAGE_BASE = [8.0, 8.0, 6.0, 6.0, 6.0, 6.0, 6.0, 6.0, 6.0, 6.0, 8.0, 8.0];

// CA Saisonnalité : 50% du CA annuel (760k) est réalisé en Nov/Déc, soit 190k/mois. 
// Le reste (380k) est lissé sur 10 mois (38k/mois).
const CA_BASE = [38000, 38000, 38000, 38000, 38000, 38000, 38000, 38000, 38000, 38000, 190000, 190000];

export function generateProductionMensuelle(isDemo) {
  if (!isDemo) return MOIS_LABELS.map(m => ({ mois: m, tonnage: 0, ca: 0 }));
  const now = new Date();
  const currentMonth = now.getMonth();
  const result = [];
  for (let i = 11; i >= 0; i--) {
    let m = currentMonth - i;
    if (m < 0) m += 12;
    result.push({ mois: MOIS_LABELS[m], tonnage: TONNAGE_BASE[m], ca: CA_BASE[m] });
  }
  return result;
}
