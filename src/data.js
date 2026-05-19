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

export const DASHBOARD_KPIS = {
  ca_mois: 68450,
  evolution_ca: "+12%",
  commandes_en_cours: 12,
  alertes_stock: 3,
  production_jour: 320
};

export const DEMO_DATA = {
  matierespremieres: [
    { id: 1,  nom: "Farine Blé",               quantite: 2200, unite: "kg", seuil: 700, statut: "OK"       },
    { id: 2,  nom: "Farine Blé Bio",            quantite: 480,  unite: "kg", seuil: 160, statut: "OK"       },
    { id: 3,  nom: "Farine Sarrasin",           quantite: 700,  unite: "kg", seuil: 230, statut: "OK"       },
    { id: 4,  nom: "Farine Sarrasin Bio",       quantite: 40,   unite: "kg", seuil: 50,  statut: "Critique" },
    { id: 5,  nom: "Œufs liquides",             quantite: 500,  unite: "L",  seuil: 250, statut: "OK"       },
    { id: 6,  nom: "Sel",                       quantite: 180,  unite: "kg", seuil: 60,  statut: "OK"       },
    { id: 7,  nom: "Noisette",                  quantite: 12,   unite: "kg", seuil: 5,   statut: "OK"       },
    { id: 8,  nom: "Cerneaux de noix AOP",      quantite: 11,   unite: "kg", seuil: 5,   statut: "OK"       },
    { id: 9,  nom: "Chanterelles déshydratées", quantite: 6,    unite: "kg", seuil: 4,   statut: "Moyen"    },
    { id: 10, nom: "Cèpes déshydratés",         quantite: 9,    unite: "kg", seuil: 4,   statut: "OK"       },
    { id: 11, nom: "Ail des ours",              quantite: 5,    unite: "kg", seuil: 3,   statut: "Moyen"    }
  ],
  produitsFinis: [
    { id: 1, nom: "Nature", couleur: "#D4C5B0", bio: false, allergene: false, quantite_kg: 4500, seuil_kg: 1833, prix_kg: 8.5 },
    { id: 2, nom: "Nature Bio", couleur: "#D4C5B0", bio: true, allergene: false, quantite_kg: 800, seuil_kg: 333, prix_kg: 10.5 },
    { id: 3, nom: "Sarrasin", couleur: "#9B59B6", bio: false, allergene: false, quantite_kg: 2100, seuil_kg: 1000, prix_kg: 9.5 },
    { id: 4, nom: "Sarrasin Bio", couleur: "#9B59B6", bio: true, allergene: false, quantite_kg: 400, seuil_kg: 167, prix_kg: 11.5 },
    { id: 5, nom: "Méli-Mélo", couleur: "#FF8C42", bio: false, allergene: false, quantite_kg: 1200, seuil_kg: 667, prix_kg: 10.0 },
    { id: 6, nom: "Méli-Mélo Bio", couleur: "#FF8C42", bio: true, allergene: false, quantite_kg: 300, seuil_kg: 167, prix_kg: 12.0 },
    { id: 7, nom: "Noisette", couleur: "#FF6B6B", bio: false, allergene: true, quantite_kg: 900, seuil_kg: 667, prix_kg: 11.5 },
    { id: 8, nom: "Noix", couleur: "#6F4E37", bio: false, allergene: true, quantite_kg: 1100, seuil_kg: 667, prix_kg: 11.0 },
    { id: 9, nom: "Chanterelles", couleur: "#FFD93D", bio: false, allergene: false, quantite_kg: 600, seuil_kg: 333, prix_kg: 13.0 },
    { id: 10, nom: "Cèpes", couleur: "#3498DB", bio: false, allergene: false, quantite_kg: 700, seuil_kg: 333, prix_kg: 12.0 },
    { id: 11, nom: "Châtaigne Bio", couleur: "#E74C3C", bio: true, allergene: false, quantite_kg: 500, seuil_kg: 167, prix_kg: 12.5 },
    { id: 12, nom: "Ail des Ours Bio", couleur: "#2ECC71", bio: true, allergene: false, quantite_kg: 600, seuil_kg: 333, prix_kg: 13.0 }
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
    { id: "CMD-2026-0201", date: "2026-05-18", client: "Restaurant La Folie Douce", produits: [{ nom: "Nature", couleur: "#D4C5B0", qte: 50 }, { nom: "Méli-Mélo", couleur: "#FF8C42", qte: 30 }], format: "5kg", montant: 830, transport: "TFE", statut: "En préparation" },
    { id: "CMD-2026-0202", date: "2026-05-17", client: "Épicerie Fine Le Chalet Blanc", produits: [{ nom: "Nature Bio", couleur: "#D4C5B0", qte: 20 }, { nom: "Châtaigne Bio", couleur: "#E74C3C", qte: 15 }], format: "400g", montant: 420, transport: "Colissimo", statut: "Expédiée" },
    { id: "CMD-2026-0203", date: "2026-05-16", client: "Hôtel Le Grand Bornand", produits: [{ nom: "Noix", couleur: "#6F4E37", qte: 100 }], format: "5kg", montant: 1100, transport: "Interne", statut: "Livrée" },
    { id: "CMD-2026-0204", date: "2026-05-15", client: "Biocoop Les Cimes", produits: [{ nom: "Ail des Ours Bio", couleur: "#2ECC71", qte: 40 }, { nom: "Sarrasin Bio", couleur: "#9B59B6", qte: 40 }], format: "400g", montant: 980, transport: "TFE", statut: "Livrée" },
    { id: "CMD-2026-0205", date: "2026-05-19", client: "Restaurant L'Alpage Doré", produits: [{ nom: "Cèpes", couleur: "#3498DB", qte: 60 }], format: "5kg", montant: 720, transport: "TFE", statut: "En préparation" },
    { id: "CMD-2026-0206", date: "2026-05-14", client: "La Maison Savoyarde", produits: [{ nom: "Sarrasin", couleur: "#9B59B6", qte: 25 }, { nom: "Nature", couleur: "#D4C5B0", qte: 25 }], format: "400g", montant: 450, transport: "Colissimo", statut: "Livrée" },
    { id: "CMD-2026-0207", date: "2026-05-18", client: "Le Panoramic", produits: [{ nom: "Noisette", couleur: "#FF6B6B", qte: 80 }], format: "5kg", montant: 920, transport: "Interne", statut: "En préparation" },
    { id: "CMD-2026-0208", date: "2026-05-13", client: "Épicerie des Cimes", produits: [{ nom: "Méli-Mélo Bio", couleur: "#FF8C42", qte: 30 }], format: "400g", montant: 360, transport: "Colissimo", statut: "Expédiée" }
  ],
  planningProduction: (() => {
    // Cycle de 40 jours ouvrés basé sur les objectifs tonnage réels (80 T/an)
    // Nature 11× (22T), Sarrasin 6× (12T), Méli-Mélo 4× (8T),
    // Noisette 4× (8T), Noix 4× (8T), Chanterelles 2× (4T),
    // Cèpes 2× (4T), Nature Bio 2× (4T), Ail des Ours Bio 2× (4T),
    // Sarrasin Bio 1× (2T), Méli-Mélo Bio 1× (2T), Châtaigne Bio 1× (2T)
    const flavors = [
      { nom: "Nature",           couleur: "#D4C5B0", bio: false }, //  1
      { nom: "Sarrasin",         couleur: "#9B59B6", bio: false }, //  2
      { nom: "Méli-Mélo",        couleur: "#FF8C42", bio: false }, //  3
      { nom: "Nature",           couleur: "#D4C5B0", bio: false }, //  4
      { nom: "Noisette",         couleur: "#FF6B6B", bio: false }, //  5
      { nom: "Noix",             couleur: "#6F4E37", bio: false }, //  6
      { nom: "Nature",           couleur: "#D4C5B0", bio: false }, //  7
      { nom: "Sarrasin",         couleur: "#9B59B6", bio: false }, //  8
      { nom: "Chanterelles",     couleur: "#FFD93D", bio: false }, //  9
      { nom: "Nature",           couleur: "#D4C5B0", bio: false }, // 10
      { nom: "Méli-Mélo",        couleur: "#FF8C42", bio: false }, // 11
      { nom: "Cèpes",            couleur: "#3498DB", bio: false }, // 12
      { nom: "Nature",           couleur: "#D4C5B0", bio: false }, // 13
      { nom: "Sarrasin",         couleur: "#9B59B6", bio: false }, // 14
      { nom: "Noisette",         couleur: "#FF6B6B", bio: false }, // 15
      { nom: "Nature",           couleur: "#D4C5B0", bio: false }, // 16
      { nom: "Noix",             couleur: "#6F4E37", bio: false }, // 17
      { nom: "Nature Bio",       couleur: "#D4C5B0", bio: true  }, // 18
      { nom: "Nature",           couleur: "#D4C5B0", bio: false }, // 19
      { nom: "Sarrasin",         couleur: "#9B59B6", bio: false }, // 20
      { nom: "Méli-Mélo",        couleur: "#FF8C42", bio: false }, // 21
      { nom: "Nature",           couleur: "#D4C5B0", bio: false }, // 22
      { nom: "Ail des Ours Bio", couleur: "#2ECC71", bio: true  }, // 23
      { nom: "Noisette",         couleur: "#FF6B6B", bio: false }, // 24
      { nom: "Nature",           couleur: "#D4C5B0", bio: false }, // 25
      { nom: "Sarrasin",         couleur: "#9B59B6", bio: false }, // 26
      { nom: "Noix",             couleur: "#6F4E37", bio: false }, // 27
      { nom: "Nature",           couleur: "#D4C5B0", bio: false }, // 28
      { nom: "Chanterelles",     couleur: "#FFD93D", bio: false }, // 29
      { nom: "Sarrasin Bio",     couleur: "#9B59B6", bio: true  }, // 30
      { nom: "Nature",           couleur: "#D4C5B0", bio: false }, // 31
      { nom: "Sarrasin",         couleur: "#9B59B6", bio: false }, // 32
      { nom: "Méli-Mélo",        couleur: "#FF8C42", bio: false }, // 33
      { nom: "Cèpes",            couleur: "#3498DB", bio: false }, // 34
      { nom: "Noisette",         couleur: "#FF6B6B", bio: false }, // 35
      { nom: "Méli-Mélo Bio",    couleur: "#FF8C42", bio: true  }, // 36
      { nom: "Noix",             couleur: "#6F4E37", bio: false }, // 37
      { nom: "Nature Bio",       couleur: "#D4C5B0", bio: true  }, // 38
      { nom: "Ail des Ours Bio", couleur: "#2ECC71", bio: true  }, // 39
      { nom: "Châtaigne Bio",    couleur: "#E74C3C", bio: true  }, // 40
    ];
    const result = [];
    let idx = 0;
    const cur = new Date(2026, 0, 1);   // 1 jan 2026
    const end = new Date(2026, 11, 31); // 31 déc 2026
    while (cur <= end) {
      const dow = cur.getDay(); // 0=dim, 6=sam → weekend
      if (dow !== 0 && dow !== 6) {
        const f = flavors[idx % flavors.length];
        const y = cur.getFullYear();
        const m = String(cur.getMonth() + 1).padStart(2, '0');
        const d = String(cur.getDate()).padStart(2, '0');
        result.push({ date: `${y}-${m}-${d}`, nom: f.nom, couleur: f.couleur, bio: f.bio });
        idx++;
      }
      cur.setDate(cur.getDate() + 1);
    }
    return result;
  })(),
  saisieProduction: {},
  transporteurs: [
    { id: 1, nom: "Chauffeurs Internes", type: "interne", vehicules: 2, zone: "Savoie / Haute-Savoie", disponible: true },
    { id: 2, nom: "Transport Frais Express (TFE)", type: "sous_traitant", zone: "France Entière", tarif_base: 45, disponible: true },
    { id: 3, nom: "Colissimo", type: "postal", zone: "France Entière", tarif_base: 12, disponible: true }
  ]
};

export const EMPTY_DATA = {
  matierespremieres: DEMO_DATA.matierespremieres.map(mp => ({ ...mp, quantite: 0 })),
  produitsFinis: DEMO_DATA.produitsFinis.map(pf => ({ ...pf, quantite_kg: 0 })),
  emballages: DEMO_DATA.emballages.map(e => ({ ...e, stock_unites: 0, stock_metres: 0 })),
  clients: DEMO_DATA.clients.map(c => ({ ...c, ca_annuel: 0 })),
  commandes: [],
  planningProduction: [],
  saisieProduction: {}
};

const MOIS_LABELS = ["Jan", "Fév", "Mar", "Avr", "Mai", "Jun", "Jul", "Août", "Sep", "Oct", "Nov", "Déc"];
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
