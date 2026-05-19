import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, Wheat, Settings, Leaf, ShieldAlert, AlertCircle, CheckCircle2, ChevronLeft } from 'lucide-react';
import { useData } from '../context/DataContext';

const pageV = { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0, transition: { duration: 0.4 } }, exit: { opacity: 0, y: -8 } };
const fadeUp = { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0, transition: { duration: 0.35 } } };

function BackButton({ onBack, label }) {
  return (
    <button
      onClick={onBack}
      className="flex items-center gap-2 px-5 py-2.5 mb-6 rounded-xl border border-gris-clair bg-white text-bleu-profond font-semibold text-sm hover:bg-gris-fond hover:border-bleu-profond/25 transition-all shadow-sm w-fit"
    >
      <ChevronLeft className="w-5 h-5" />
      {label || 'Retour'}
    </button>
  );
}

/* ===== HOME : 2 gros boutons ===== */
function EntrepotHome({ onNavigate }) {
  return (
    <motion.div variants={fadeUp} initial="initial" animate="animate" className="flex flex-col items-center justify-center gap-8 h-full py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full max-w-2xl mx-auto">
        <button
          onClick={() => onNavigate('pf')}
          className="group flex flex-col items-center justify-center gap-7 py-20 px-10 rounded-3xl border-2 border-or-brosse/20 bg-gradient-to-br from-or-brosse/5 to-or-brosse/10 hover:from-or-brosse/10 hover:to-or-brosse/18 hover:border-or-brosse/45 transition-all"
        >
          <div className="w-28 h-28 rounded-2xl bg-or-brosse/15 flex items-center justify-center group-hover:scale-105 transition-transform shadow-sm">
            <Package className="w-14 h-14 text-or-brosse" />
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-bleu-profond">Produits Finis</p>
            <p className="text-sm text-gris-ardoise mt-1.5">12 variétés de crozets</p>
          </div>
        </button>

        <button
          onClick={() => onNavigate('mp')}
          className="group flex flex-col items-center justify-center gap-7 py-20 px-10 rounded-3xl border-2 border-vert-sauge/20 bg-gradient-to-br from-vert-sauge/5 to-vert-sauge/10 hover:from-vert-sauge/10 hover:to-vert-sauge/18 hover:border-vert-sauge/45 transition-all"
        >
          <div className="w-28 h-28 rounded-2xl bg-vert-sauge/15 flex items-center justify-center group-hover:scale-105 transition-transform shadow-sm">
            <Wheat className="w-14 h-14 text-vert-sauge" />
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-bleu-profond">Matières Premières</p>
            <p className="text-sm text-gris-ardoise mt-1.5">11 ingrédients</p>
          </div>
        </button>
      </div>

      <button
        onClick={() => onNavigate('reglages')}
        className="flex items-center gap-2 px-8 py-3 rounded-xl border border-gris-clair/70 text-gris-ardoise hover:text-bleu-profond hover:border-bleu-profond/25 hover:bg-gris-fond/60 transition-all text-sm font-medium"
      >
        <Settings className="w-4 h-4" />
        Réglages
      </button>
    </motion.div>
  );
}

/* ===== PRODUITS FINIS ===== */
function TabProduitsFinis({ onBack }) {
  const { produitsFinis } = useData();

  return (
    <motion.div variants={fadeUp} initial="initial" animate="animate">
      <BackButton onBack={onBack} label="Entrepôt" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {produitsFinis.map(pf => {
          const pct = Math.min((pf.quantite_kg / (pf.seuil_kg * 3)) * 100, 100);
          const isCrit = pf.quantite_kg <= pf.seuil_kg;
          const barColor = pct < 30 ? '#DC3545' : pct < 70 ? '#F59E0B' : pf.couleur;

          return (
            <div
              key={pf.id}
              className={`rounded-xl border overflow-hidden bg-white hover:shadow-sm transition-all ${
                isCrit ? 'border-rouge-alerte/30' : 'border-gris-clair/50'
              }`}
            >
              {/* Bande colorée en haut */}
              <div className="h-2" style={{ backgroundColor: pf.couleur }} />

              {/* Bandeau BIO pleine largeur */}
              {pf.bio && (
                <div className="flex items-center justify-center gap-2.5 py-3 bg-vert-sauge/12 border-b border-vert-sauge/20">
                  <Leaf className="w-5 h-5 text-vert-sauge" />
                  <span className="text-base font-bold text-vert-sauge uppercase tracking-widest">Agriculture Biologique</span>
                </div>
              )}

              <div className="p-4">
                {/* En-tête : pastille + nom + badge allergène */}
                <div className="flex items-center gap-2.5 mb-3">
                  <div
                    className="w-7 h-7 rounded-full flex-shrink-0 shadow-sm border-2 border-white ring-1 ring-black/8"
                    style={{ backgroundColor: pf.couleur }}
                  />
                  <h4 className="font-semibold text-bleu-profond text-[13px] flex-1 leading-tight">{pf.nom}</h4>
                  {pf.allergene && (
                    <span className="flex items-center gap-1 text-[9px] font-bold text-rouge-alerte bg-rouge-alerte/10 px-1.5 py-0.5 rounded-sm uppercase tracking-wider flex-shrink-0">
                      <ShieldAlert className="w-2.5 h-2.5" /> Allergène
                    </span>
                  )}
                </div>

                {/* Quantité */}
                <p className={`text-2xl font-light mb-1 ${isCrit ? 'text-rouge-alerte' : 'text-bleu-profond'}`}>
                  {pf.quantite_kg.toLocaleString('fr-FR')}{' '}
                  <span className="text-sm text-gris-ardoise">kg</span>
                </p>
                <p className="text-[11px] text-gris-ardoise mb-3">
                  Seuil : {pf.seuil_kg.toLocaleString('fr-FR')} kg
                </p>

                {/* Barre de progression */}
                <div className="progress-bar">
                  <div
                    className="progress-bar-fill"
                    style={{ width: `${pct}%`, backgroundColor: barColor }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

/* ===== MATIÈRES PREMIÈRES ===== */
function TabMatieresPremieres({ onBack }) {
  const { matierespremieres } = useData();

  return (
    <motion.div variants={fadeUp} initial="initial" animate="animate">
      <BackButton onBack={onBack} label="Entrepôt" />
      <div className="card p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="data-table w-full">
            <thead>
              <tr>
                <th>Ingrédient</th>
                <th>Quantité</th>
                <th>Niveau de stock</th>
                <th>Seuil critique</th>
                <th>Statut</th>
              </tr>
            </thead>
            <tbody>
              {matierespremieres.map(mp => {
                const isCrit = mp.statut === 'Critique';
                const isWarn = mp.statut === 'Moyen';
                const hasBar = mp.seuil > 0 && typeof mp.quantite === 'number';
                const max = mp.seuil * 3;
                const pct = hasBar ? Math.min((mp.quantite / max) * 100, 100) : 0;
                const seuilPct = 33.33; // seuil / (seuil*3)
                const barColor = isCrit ? '#DC3545' : isWarn ? '#F59E0B' : '#6B8F71';

                return (
                  <tr key={mp.id}>
                    <td className="font-medium text-bleu-profond text-[13px]">{mp.nom}</td>
                    <td>
                      <span className="text-[13px] font-semibold text-bleu-profond">
                        {typeof mp.quantite === 'number' ? mp.quantite.toLocaleString('fr-FR') : mp.quantite}
                      </span>
                      <span className="text-[11px] text-gris-ardoise ml-1">{mp.unite}</span>
                    </td>
                    <td style={{ minWidth: '160px' }}>
                      {hasBar ? (
                        <div className="relative h-2.5 rounded-full" style={{ backgroundColor: 'rgba(226,232,240,0.7)' }}>
                          {/* Remplissage */}
                          <div
                            className="absolute top-0 left-0 h-full rounded-full transition-all duration-500"
                            style={{ width: `${pct}%`, backgroundColor: barColor }}
                          />
                          {/* Marqueur seuil critique — rouge */}
                          <div
                            className="absolute top-[-3px] bottom-[-3px] w-[2px] rounded-full z-10"
                            style={{ left: `${seuilPct}%`, backgroundColor: '#DC3545' }}
                          />
                          {/* Marqueur seuil moyen — orange (2× seuil = 66,67 %) */}
                          <div
                            className="absolute top-[-3px] bottom-[-3px] w-[2px] rounded-full z-10"
                            style={{ left: '66.67%', backgroundColor: '#F59E0B' }}
                          />
                        </div>
                      ) : (
                        <span className="text-[11px] text-gris-ardoise italic">—</span>
                      )}
                    </td>
                    <td className="text-[12px] text-gris-ardoise">
                      {mp.seuil > 0
                        ? `${mp.seuil.toLocaleString('fr-FR')} ${mp.unite !== 'Stock suffisant' ? mp.unite : ''}`
                        : '—'}
                    </td>
                    <td>
                      <span className={`badge ${isCrit ? 'badge-danger' : isWarn ? 'badge-warning' : 'badge-success'}`}>
                        {isCrit || isWarn
                          ? <AlertCircle className="w-3 h-3" />
                          : <CheckCircle2 className="w-3 h-3" />}
                        {mp.statut}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}

/* ===== RÉGLAGES ===== */
function TabReglages({ onBack }) {
  return (
    <motion.div variants={fadeUp} initial="initial" animate="animate">
      <BackButton onBack={onBack} label="Entrepôt" />
      <div className="card p-12 flex flex-col items-center justify-center text-center border-dashed">
        <div className="w-16 h-16 bg-or-brosse/10 rounded-full flex items-center justify-center mb-4">
          <Settings className="w-8 h-8 text-or-brosse" />
        </div>
        <h3 className="text-lg font-bold text-bleu-profond mb-2">Réglages de l'entrepôt</h3>
        <p className="text-sm text-gris-ardoise max-w-md">
          Fonctionnalité à venir — configuration des seuils d'alerte et gestion des fournisseurs.
        </p>
      </div>
    </motion.div>
  );
}

/* ===== MAIN ===== */
export default function Entrepot() {
  const [view, setView] = useState('home');

  return (
    <motion.div variants={pageV} initial="initial" animate="animate" exit="exit" className="h-full">
      <AnimatePresence mode="wait">
        {view === 'home' && <EntrepotHome key="home" onNavigate={setView} />}
        {view === 'pf' && <TabProduitsFinis key="pf" onBack={() => setView('home')} />}
        {view === 'mp' && <TabMatieresPremieres key="mp" onBack={() => setView('home')} />}
        {view === 'reglages' && <TabReglages key="reglages" onBack={() => setView('home')} />}
      </AnimatePresence>
    </motion.div>
  );
}
