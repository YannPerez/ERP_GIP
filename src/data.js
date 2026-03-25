// ============================================================
// Maison Rullier Hub — Données fictives Supabase-ready
// Structure prête pour migration vers tables Supabase
// ============================================================

// --- MATIÈRES PREMIÈRES ---
export const matierespremieres = [
  {
    id: 1,
    nom: "Farine de blé T55",
    categorie: "Farine",
    stock_actuel_kg: 820,
    stock_securite_kg: 500,
    unite: "kg",
    fournisseur: "Moulin de Savoie",
    dernier_approvisionnement: "2026-03-08",
    prix_kg: 0.85,
    allergene: false,
  },
  {
    id: 2,
    nom: "Farine de sarrasin",
    categorie: "Farine",
    stock_actuel_kg: 340,
    stock_securite_kg: 200,
    unite: "kg",
    fournisseur: "Moulin de Savoie",
    dernier_approvisionnement: "2026-03-05",
    prix_kg: 1.45,
    allergene: false,
  },
  {
    id: 3,
    nom: "Œufs frais plein air",
    categorie: "Œufs",
    stock_actuel_kg: 90,
    stock_securite_kg: 50,
    unite: "kg",
    fournisseur: "Ferme du Lac d'Annecy",
    dernier_approvisionnement: "2026-03-11",
    prix_kg: 4.20,
    allergene: false,
    flux_tendu: true,
  },
  {
    id: 4,
    nom: "Beurre AOP Savoie",
    categorie: "Beurre",
    stock_actuel_kg: 120,
    stock_securite_kg: 80,
    unite: "kg",
    fournisseur: "Coopérative Laitière Beaufort",
    dernier_approvisionnement: "2026-03-09",
    prix_kg: 7.50,
    allergene: false,
  },
  {
    id: 5,
    nom: "Cerneaux de noix AOP Grenoble",
    categorie: "Fruits secs",
    stock_actuel_kg: 45,
    stock_securite_kg: 30,
    unite: "kg",
    fournisseur: "Vergers de l'Isère",
    dernier_approvisionnement: "2026-03-01",
    prix_kg: 12.00,
    allergene: true,
    type_allergene: "Noix",
  },
  {
    id: 6,
    nom: "Noisettes du Piémont",
    categorie: "Fruits secs",
    stock_actuel_kg: 28,
    stock_securite_kg: 20,
    unite: "kg",
    fournisseur: "Import Piémont Italia",
    dernier_approvisionnement: "2026-02-25",
    prix_kg: 15.50,
    allergene: true,
    type_allergene: "Noisettes",
  },
  {
    id: 7,
    nom: "Cèpes déshydratés",
    categorie: "Champignons",
    stock_actuel_kg: 18,
    stock_securite_kg: 10,
    unite: "kg",
    fournisseur: "Champignons des Alpes",
    dernier_approvisionnement: "2026-02-28",
    prix_kg: 45.00,
    allergene: false,
  },
  {
    id: 8,
    nom: "Beaufort AOP 12 mois",
    categorie: "Fromage",
    stock_actuel_kg: 65,
    stock_securite_kg: 40,
    unite: "kg",
    fournisseur: "Fromagerie du Beaufortain",
    dernier_approvisionnement: "2026-03-07",
    prix_kg: 22.00,
    allergene: false,
  },
  {
    id: 9,
    nom: "Sel de Savoie",
    categorie: "Condiment",
    stock_actuel_kg: 150,
    stock_securite_kg: 50,
    unite: "kg",
    fournisseur: "Salines de Tarentaise",
    dernier_approvisionnement: "2026-02-15",
    prix_kg: 0.60,
    allergene: false,
  },
];

// --- PRODUITS FINIS ---
export const produitsFinis = [
  { id: 1, nom: "Crozets Nature", variante: "Nature", stock_kg: 480, seuil_critique_kg: 200, prix_vente_kg: 8.50, couleur: "#8B6F47" },
  { id: 2, nom: "Crozets Sarrasin", variante: "Sarrasin", stock_kg: 320, seuil_critique_kg: 150, prix_vente_kg: 9.50, couleur: "#6B4C2A" },
  { id: 3, nom: "Crozets aux Cèpes", variante: "Cèpes", stock_kg: 85, seuil_critique_kg: 100, prix_vente_kg: 12.00, couleur: "#7C6840" },
  { id: 4, nom: "Crozets aux Noix", variante: "Noix", stock_kg: 145, seuil_critique_kg: 80, prix_vente_kg: 11.00, couleur: "#A0522D", allergene: true },
  { id: 5, nom: "Crozets Noisettes", variante: "Noisettes", stock_kg: 110, seuil_critique_kg: 70, prix_vente_kg: 11.50, couleur: "#CD853F", allergene: true },
  { id: 6, nom: "Crozets au Beaufort", variante: "Beaufort", stock_kg: 260, seuil_critique_kg: 120, prix_vente_kg: 13.50, couleur: "#DAA520" },
];

// --- EMBALLAGES ---
export const emballages = [
  { id: 1, nom: "Cartons recyclables 400g", stock_unites: 2400, seuil_critique: 500, type: "carton", format: "400g" },
  { id: 2, nom: "Sacs kraft 5kg", stock_unites: 450, seuil_critique: 100, type: "sac", format: "5kg" },
  { id: 3, nom: "Film plastique alimentaire", stock_metres: 1200, seuil_critique: 300, type: "film", format: "rouleau" },
  { id: 4, nom: "Étiquettes Maison Rullier", stock_unites: 8500, seuil_critique: 2000, type: "etiquette", format: "unitaire" },
];

// --- CLIENTS ---
export const clients = [
  { id: 1, nom: "Épicerie Fine Le Chalet Blanc", type: "epicerie_fine", ville: "Annecy", format_commande: "400g", ca_annuel: 12500, contact: "M. Durand", email: "contact@chaletblanc.fr" },
  { id: 2, nom: "Hôtel Le Grand Bornand Palace", type: "hotel_prestige", ville: "Le Grand Bornand", format_commande: "5kg", ca_annuel: 28000, contact: "Chef Moreau", email: "cuisine@gbpalace.fr" },
  { id: 3, nom: "Station Courchevel - Les 3 Vallées", type: "station_ski", ville: "Courchevel", format_commande: "5kg", ca_annuel: 45000, contact: "Mme Lefèvre", email: "appro@courchevel-resto.fr" },
  { id: 4, nom: "La Maison Savoyarde", type: "epicerie_fine", ville: "Chambéry", format_commande: "400g", ca_annuel: 8200, contact: "M. Bertrand", email: "commandes@maisonsavoyarde.fr" },
  { id: 5, nom: "Hôtel Alp'Azur", type: "hotel_prestige", ville: "Megève", format_commande: "5kg", ca_annuel: 35000, contact: "Chef Bonnard", email: "chef@alpazur-megeve.fr" },
  { id: 6, nom: "Restaurant L'Alpage Doré", type: "restauration", ville: "Méribel", format_commande: "5kg", ca_annuel: 18500, contact: "M. Favre", email: "alpagedore@orange.fr" },
  { id: 7, nom: "Épicerie des Cimes", type: "epicerie_fine", ville: "Chamonix", format_commande: "400g", ca_annuel: 15200, contact: "Mme Tissot", email: "epiceriedescimes@gmail.com" },
  { id: 8, nom: "Val Thorens Restauration", type: "station_ski", ville: "Val Thorens", format_commande: "5kg", ca_annuel: 52000, contact: "M. Gaillard", email: "logistique@valtho-resto.fr" },
];

// --- COMMANDES ---
export const commandes = [
  { id: "CMD-2026-0142", client_id: 3, client_nom: "Station Courchevel", date: "2026-03-12", produits: [{ variante: "Nature", qte_kg: 50 }, { variante: "Beaufort", qte_kg: 30 }], format: "5kg", statut: "en_preparation", transporteur: "interne", montant: 830 },
  { id: "CMD-2026-0141", client_id: 1, client_nom: "Le Chalet Blanc", date: "2026-03-11", produits: [{ variante: "Nature", qte_kg: 8 }, { variante: "Sarrasin", qte_kg: 8 }, { variante: "Cèpes", qte_kg: 4 }], format: "400g", statut: "expediee", transporteur: "TFE", montant: 198 },
  { id: "CMD-2026-0140", client_id: 5, client_nom: "Hôtel Alp'Azur", date: "2026-03-10", produits: [{ variante: "Beaufort", qte_kg: 40 }, { variante: "Nature", qte_kg: 25 }], format: "5kg", statut: "livree", transporteur: "interne", montant: 752.5 },
  { id: "CMD-2026-0139", client_id: 8, client_nom: "Val Thorens Restauration", date: "2026-03-10", produits: [{ variante: "Nature", qte_kg: 80 }, { variante: "Sarrasin", qte_kg: 40 }], format: "5kg", statut: "en_preparation", transporteur: "TFE", montant: 1060 },
  { id: "CMD-2026-0138", client_id: 7, client_nom: "Épicerie des Cimes", date: "2026-03-09", produits: [{ variante: "Noix", qte_kg: 6 }, { variante: "Noisettes", qte_kg: 6 }], format: "400g", statut: "expediee", transporteur: "interne", montant: 135 },
  { id: "CMD-2026-0137", client_id: 2, client_nom: "Grand Bornand Palace", date: "2026-03-08", produits: [{ variante: "Nature", qte_kg: 30 }, { variante: "Cèpes", qte_kg: 15 }], format: "5kg", statut: "livree", transporteur: "interne", montant: 435 },
  { id: "CMD-2026-0136", client_id: 4, client_nom: "La Maison Savoyarde", date: "2026-03-07", produits: [{ variante: "Nature", qte_kg: 10 }, { variante: "Beaufort", qte_kg: 5 }], format: "400g", statut: "livree", transporteur: "TFE", montant: 152.5 },
  { id: "CMD-2026-0135", client_id: 6, client_nom: "L'Alpage Doré", date: "2026-03-06", produits: [{ variante: "Sarrasin", qte_kg: 20 }, { variante: "Noix", qte_kg: 10 }], format: "5kg", statut: "livree", transporteur: "interne", montant: 300 },
];

// --- PRODUCTION MENSUELLE (rolling 12 mois, finit au mois courant) ---
const MOIS_LABELS = ["Jan", "Fév", "Mar", "Avr", "Mai", "Jun", "Jul", "Aoû", "Sep", "Oct", "Nov", "Déc"];
// Tonnage saisonnier par mois (index 0=Jan) — pic Nov/Déc
const TONNAGE_BASE = [2.2, 2.0, 2.5, 2.3, 2.8, 2.5, 3.0, 2.8, 3.2, 4.0, 6.5, 6.2];
const PRIX_MOYEN_KG = 8.5;

function generateProductionMensuelle() {
  const now = new Date();
  const currentMonth = now.getMonth(); // 0-indexed
  const currentYear = now.getFullYear();
  const result = [];

  for (let i = 11; i >= 0; i--) {
    let m = currentMonth - i;
    let y = currentYear;
    if (m < 0) { m += 12; y -= 1; }
    const tonnage = TONNAGE_BASE[m];
    const yearShort = String(y).slice(-2);
    result.push({
      mois: `${MOIS_LABELS[m]} ${yearShort}`,
      tonnage,
      ca: Math.round(tonnage * 1000 * PRIX_MOYEN_KG),
    });
  }
  return result;
}

export const productionMensuelle = generateProductionMensuelle();

// --- PLANNING DE PRODUCTION (semaine courante) ---
export const planningProduction = [
  { jour: "Lundi", date: "2026-03-09", parfum: "Nature", objectif_kg: 180, statut: "termine", couleur: "#8B6F47" },
  { jour: "Mardi", date: "2026-03-10", parfum: "Sarrasin", objectif_kg: 150, statut: "termine", couleur: "#6B4C2A" },
  { jour: "Mercredi", date: "2026-03-11", parfum: "Beaufort", objectif_kg: 120, statut: "termine", couleur: "#DAA520" },
  { jour: "Jeudi", date: "2026-03-12", parfum: "Cèpes", objectif_kg: 100, statut: "en_cours", couleur: "#7C6840" },
  { jour: "Vendredi", date: "2026-03-13", parfum: "Nature", objectif_kg: 180, statut: "planifie", couleur: "#8B6F47" },
];

// --- KPI DIRECTION ---
export const kpiDirection = {
  ca_annuel: 340000,
  ca_objectif: 380000,
  tonnage_annuel: 34.8,
  tonnage_objectif: 40,
  commandes_en_cours: 4,
  alertes_stock: 1,
  repartition_ca: {
    particuliers: 40,
    restauration: 60,
  },
};

// --- TRANSPORTEURS ---
export const transporteurs = [
  { id: 1, nom: "Chauffeurs Internes", type: "interne", vehicules: 2, zone: "Savoie / Haute-Savoie", disponible: true },
  { id: 2, nom: "Transport Frais Express (TFE)", type: "sous_traitant", zone: "France Entière", tarif_base: 45, disponible: true },
];
