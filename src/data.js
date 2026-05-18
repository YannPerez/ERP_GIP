// ============================================================
// Maison Rullier Hub — Données & Modèles (80 Tonnes)
// ============================================================

export const NOMENCLATURES = {
  "Nature": { "Farine de blé T55": 0.75, "Œufs frais plein air": 0.35, "Sel": 0.01 },
  "Nature Bio": { "Farine de blé T55 Bio": 0.75, "Œufs frais plein air": 0.35, "Sel": 0.01 },
  "Sarrasin": { "Farine de sarrasin": 0.75, "Œufs frais plein air": 0.35, "Sel": 0.01 },
  "Sarrasin Bio": { "Farine de sarrasin Bio": 0.75, "Œufs frais plein air": 0.35, "Sel": 0.01 },
  "Méli-Mélo": { "Farine de blé T55": 0.375, "Farine de sarrasin": 0.375, "Œufs frais plein air": 0.35, "Sel": 0.01 },
  "Méli-Mélo Bio": { "Farine de blé T55 Bio": 0.375, "Farine de sarrasin Bio": 0.375, "Œufs frais plein air": 0.35, "Sel": 0.01 },
  "Noisette": { "Farine de blé T55": 0.75, "Œufs frais plein air": 0.35, "Sel": 0.01, "Noisettes du Piémont": 0.01 },
  "Noix": { "Farine de blé T55": 0.75, "Œufs frais plein air": 0.35, "Sel": 0.01, "Cerneaux de noix AOP": 0.01 },
  "Chanterelles": { "Farine de blé T55": 0.75, "Œufs frais plein air": 0.35, "Sel": 0.01, "Chanterelles déshydratées": 0.01 },
  "Cèpes": { "Farine de blé T55": 0.75, "Œufs frais plein air": 0.35, "Sel": 0.01, "Cèpes déshydratés": 0.01 },
  "Châtaigne Bio": { "Farine de blé T55 Bio": 0.75, "Œufs frais plein air": 0.35, "Sel": 0.01, "Farine de châtaigne": 0.01 },
  "Ail des Ours Bio": { "Farine de blé T55 Bio": 0.75, "Œufs frais plein air": 0.35, "Sel": 0.01, "Ail des ours": 0.01 }
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
    { id: 1, nom: "Farine de blé T55", categorie: "Farine", stock_actuel_kg: 820, stock_securite_kg: 500, prix_kg: 0.85, allergene: false },
    { id: 2, nom: "Farine de blé T55 Bio", categorie: "Farine", stock_actuel_kg: 400, stock_securite_kg: 200, prix_kg: 1.25, allergene: false },
    { id: 3, nom: "Farine de sarrasin", categorie: "Farine", stock_actuel_kg: 340, stock_securite_kg: 200, prix_kg: 1.45, allergene: false },
    { id: 4, nom: "Farine de sarrasin Bio", categorie: "Farine", stock_actuel_kg: 150, stock_securite_kg: 80, prix_kg: 1.95, allergene: false },
    { id: 5, nom: "Œufs frais plein air", categorie: "Œufs", stock_actuel_kg: 90, stock_securite_kg: 50, prix_kg: 4.20, allergene: false },
    { id: 6, nom: "Cerneaux de noix AOP", categorie: "Fruits secs", stock_actuel_kg: 45, stock_securite_kg: 30, prix_kg: 12.00, allergene: true, type_allergene: "Fruits à coque" },
    { id: 7, nom: "Noisettes du Piémont", categorie: "Fruits secs", stock_actuel_kg: 28, stock_securite_kg: 20, prix_kg: 15.50, allergene: true, type_allergene: "Fruits à coque" },
    { id: 8, nom: "Cèpes déshydratés", categorie: "Champignons", stock_actuel_kg: 18, stock_securite_kg: 10, prix_kg: 45.00, allergene: false },
    { id: 9, nom: "Chanterelles déshydratées", categorie: "Champignons", stock_actuel_kg: 12, stock_securite_kg: 8, prix_kg: 55.00, allergene: false },
    { id: 10, nom: "Farine de châtaigne", categorie: "Farine", stock_actuel_kg: 85, stock_securite_kg: 50, prix_kg: 4.80, allergene: false },
    { id: 11, nom: "Ail des ours", categorie: "Aromate", stock_actuel_kg: 15, stock_securite_kg: 10, prix_kg: 28.00, allergene: false },
    { id: 12, nom: "Sel", categorie: "Condiment", stock_actuel_kg: 150, stock_securite_kg: 50, prix_kg: 0.60, allergene: false }
  ],
  produitsFinis: [
    { id: 1, variante: "Nature", stock_kg: 4500, seuil_critique_kg: 1833, objectif_t: 22, prix_kg: 8.5, prix_vente_kg: 8.5, couleur: "#8B6F47", bio: false },
    { id: 2, variante: "Sarrasin", stock_kg: 2100, seuil_critique_kg: 1000, objectif_t: 12, prix_kg: 9.5, prix_vente_kg: 9.5, couleur: "#6B4C2A", bio: false },
    { id: 3, variante: "Méli-Mélo", stock_kg: 1200, seuil_critique_kg: 667, objectif_t: 8, prix_kg: 10.0, prix_vente_kg: 10.0, couleur: "#C47D3B", bio: false },
    { id: 4, variante: "Noisette", stock_kg: 900, seuil_critique_kg: 667, objectif_t: 8, prix_kg: 11.5, prix_vente_kg: 11.5, couleur: "#CD853F", bio: false, allergene: true },
    { id: 5, variante: "Noix", stock_kg: 1100, seuil_critique_kg: 667, objectif_t: 8, prix_kg: 11.0, prix_vente_kg: 11.0, couleur: "#A0522D", bio: false, allergene: true },
    { id: 6, variante: "Chanterelles", stock_kg: 600, seuil_critique_kg: 333, objectif_t: 4, prix_kg: 13.0, prix_vente_kg: 13.0, couleur: "#E8A830", bio: false },
    { id: 7, variante: "Cèpes", stock_kg: 700, seuil_critique_kg: 333, objectif_t: 4, prix_kg: 12.0, prix_vente_kg: 12.0, couleur: "#7C6840", bio: false },
    { id: 8, variante: "Nature Bio", stock_kg: 800, seuil_critique_kg: 333, objectif_t: 4, prix_kg: 10.5, prix_vente_kg: 10.5, couleur: "#6A9B5E", bio: true },
    { id: 9, variante: "Sarrasin Bio", stock_kg: 400, seuil_critique_kg: 167, objectif_t: 2, prix_kg: 11.5, prix_vente_kg: 11.5, couleur: "#4A7A3A", bio: true },
    { id: 10, variante: "Méli-Mélo Bio", stock_kg: 300, seuil_critique_kg: 167, objectif_t: 2, prix_kg: 12.0, prix_vente_kg: 12.0, couleur: "#5C8F4E", bio: true },
    { id: 11, variante: "Châtaigne Bio", stock_kg: 500, seuil_critique_kg: 167, objectif_t: 2, prix_kg: 12.5, prix_vente_kg: 12.5, couleur: "#8B4513", bio: true },
    { id: 12, variante: "Ail des Ours Bio", stock_kg: 600, seuil_critique_kg: 333, objectif_t: 4, prix_kg: 13.0, prix_vente_kg: 13.0, couleur: "#3D7A40", bio: true }
  ],
  emballages: [
    { id: 1, nom: "Sacs plastique 5kg", stock_unites: 1250, seuil_critique: 300, type: "sac", format: "5kg" },
    { id: 2, nom: "Film plastique alimentaire", stock_metres: 1200, seuil_critique: 300, type: "film", format: "rouleau" },
    { id: 3, nom: "Étiquettes Maison Rullier", stock_unites: 8500, seuil_critique: 2000, type: "etiquette", format: "unitaire" }
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
    { id: "CMD-2026-0142", client_nom: "Restaurant La Folie Douce", date: "2026-03-12", montant: 830, statut: "en_preparation", format: "5kg", produits: [{ variante: "Nature", qte_kg: 50 }, { variante: "Méli-Mélo", qte_kg: 30 }] },
    { id: "CMD-2026-0141", client_nom: "Le Chalet Blanc", date: "2026-03-11", montant: 198, statut: "expediee", format: "400g", produits: [{ variante: "Nature", qte_kg: 8 }, { variante: "Sarrasin", qte_kg: 8 }, { variante: "Cèpes", qte_kg: 4 }] }
  ],
  planningProduction: [
    { jour: "Lundi", date: "2026-03-09", parfum: "Nature", objectif_kg: 310, produit_kg: 310, statut: "termine", couleur: "#8B6F47" },
    { jour: "Mardi", date: "2026-03-10", parfum: "Sarrasin", objectif_kg: 290, produit_kg: 285, statut: "termine", couleur: "#6B4C2A" },
    { jour: "Mercredi", date: "2026-03-11", parfum: "Méli-Mélo", objectif_kg: 315, produit_kg: 315, statut: "termine", couleur: "#C47D3B" },
    { jour: "Jeudi", date: "2026-03-12", parfum: "Cèpes", objectif_kg: 250, produit_kg: null, statut: "planifie", couleur: "#7C6840" },
    { jour: "Vendredi", date: "2026-03-13", parfum: "Nature Bio", objectif_kg: 300, produit_kg: null, statut: "planifie", couleur: "#6A9B5E" }
  ],
  transporteurs: [
    { id: 1, nom: "Chauffeurs Internes", type: "interne", vehicules: 2, zone: "Savoie / Haute-Savoie", disponible: true },
    { id: 2, nom: "Transport Frais Express (TFE)", type: "sous_traitant", zone: "France Entière", tarif_base: 45, disponible: true }
  ]
};

// Deep copy and zero out stocks
export const EMPTY_DATA = {
  matierespremieres: DEMO_DATA.matierespremieres.map(mp => ({ ...mp, stock_actuel_kg: 0 })),
  produitsFinis: DEMO_DATA.produitsFinis.map(pf => ({ ...pf, stock_kg: 0 })),
  emballages: DEMO_DATA.emballages.map(e => ({ ...e, stock_unites: 0, stock_metres: 0 })),
  clients: DEMO_DATA.clients.map(c => ({ ...c, ca_annuel: 0 })),
  commandes: [],
  planningProduction: [],
  transporteurs: DEMO_DATA.transporteurs
};

const MOIS_LABELS = ["Jan", "Fév", "Mar", "Avr", "Mai", "Jun", "Jul", "Aoû", "Sep", "Oct", "Nov", "Déc"];
// === PRODUCTION (Temps de travail annualisé) ===
// Objectif 80T/an lissé selon la capacité de production (35h de base)
// - Hiver (4 mois : Oct-Jan) : 40h/sem -> 114% de capa -> 7.68 T/mois
// - Été (8 mois : Fév-Sep)   : 32h/sem -> 91.5% de capa -> 6.16 T/mois
// ─────────────────────────────────────────────────────────────────────
// Ordre (index 0=Jan ... 11=Déc) :
const TONNAGE_BASE = [7.68, 6.16, 6.16, 6.16, 6.16, 6.16, 6.16, 6.16, 6.16, 7.68, 7.68, 7.68];

// === VENTES & CA (Saisonnalité réelle demande) ===
// Source: Stats de vente Crozets ex 24-25.xlsx x 2 (pour objectif 80T)
// Le stockage massif absorbe l'écart entre la prod stable et le pic de ventes hivernal.
const VENTES_BASE = [7.22, 8.96, 4.56, 2.21, 2.14, 3.33, 3.49, 2.49, 3.06, 5.41, 5.49, 9.38];
const CA_BASE = VENTES_BASE.map(t => Math.round(t * 1000 * 9.2));

export function generateProductionMensuelle(isDemo) {
  if (!isDemo) return MOIS_LABELS.map(m => ({ mois: m, tonnage: 0, ca: 0 }));
  return MOIS_LABELS.map((m, index) => ({
    mois: m,
    tonnage: TONNAGE_BASE[index],
    ca: CA_BASE[index]
  }));
}
