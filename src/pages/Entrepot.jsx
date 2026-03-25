import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Wheat, Egg, AlertTriangle, ShieldAlert, Package, Box, ChevronDown, ChevronUp,
  CheckCircle2, AlertCircle, Info
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { useViewMode } from '../context/ViewModeContext';
import VariantBadge from '../components/VariantBadge';

const pageV = { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0, transition: { duration: 0.4 } }, exit: { opacity: 0, y: -8 } };
const fadeUp = { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0, transition: { duration: 0.4 } } };
const stagger = { animate: { transition: { staggerChildren: 0.06 } } };

function StockBar({ current, max, critical }) {
  const pct = Math.min((current / max) * 100, 100);
  const isLow = current <= critical;
  const isCrit = current <= critical * 0.7;
  return (
    <div className="w-full">
      <div className="flex justify-between text-[11px] mb-1">
        <span className={`font-semibold ${isCrit ? 'text-rouge-alerte' : isLow ? 'text-orange-terreux' : 'text-bleu-profond'}`}>{current} kg</span>
        <span className="text-gris-ardoise">Securite : {critical} kg</span>
      </div>
      <div className="progress-bar relative">
        <div className="progress-bar-fill" style={{ width: `${pct}%`, background: isCrit ? '#DC3545' : isLow ? '#C2703E' : '#6B8F71' }} />
        <div className="absolute top-0 bottom-0 w-px bg-rouge-alerte/40" style={{ left: `${(critical / max) * 100}%` }} />
      </div>
    </div>
  );
}

function AllergeneAlert() {
  const { matierespremieres } = useData();
  const allergenes = matierespremieres.filter(m => m.allergene);
  if (allergenes.length === 0) return null;
  return (
    <motion.div variants={fadeUp} className="card p-5 border-l-4 border-rouge-alerte overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-r from-rouge-alerte/3 to-transparent pointer-events-none" />
      <div className="relative flex items-start gap-3">
        <div className="w-9 h-9 rounded-xl bg-rouge-alerte-light flex items-center justify-center flex-shrink-0">
          <ShieldAlert className="w-4.5 h-4.5 text-rouge-alerte" />
        </div>
        <div className="flex-1">
          <h4 className="text-xs font-bold text-rouge-alerte uppercase tracking-wider">Zone Allergenes - Stockage Separe</h4>
          <p className="text-[11px] text-gris-ardoise mt-1 mb-3">Isolement obligatoire des variantes contenant des fruits a coque.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {allergenes.map(mp => (
              <div key={mp.id} className="flex items-center gap-2 p-2.5 rounded-lg bg-rouge-alerte/4 border border-rouge-alerte/10">
                <AlertTriangle className="w-3.5 h-3.5 text-orange-terreux flex-shrink-0" />
                <div>
                  <p className="text-[13px] font-medium text-bleu-profond">{mp.nom}</p>
                  <p className="text-[10px] text-rouge-alerte font-semibold">{mp.type_allergene}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function MPSection({ compact }) {
  const { matierespremieres } = useData();
  const [open, setOpen] = useState(true);
  const getIcon = (cat) => cat === 'Farine' ? <Wheat className="w-4 h-4" /> : cat === 'Oeufs' ? <Egg className="w-4 h-4" /> : <Package className="w-4 h-4" />;

  return (
    <motion.div variants={fadeUp} className="card p-6">
      <button onClick={() => setOpen(!open)} className="flex items-center justify-between w-full mb-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-or-brosse/8 flex items-center justify-center"><Wheat className="w-4.5 h-4.5 text-or-brosse" /></div>
          <div className="text-left">
            <h3 className="text-[15px] font-semibold text-bleu-profond">Matieres Premieres</h3>
            <p className="text-[11px] text-gris-ardoise">{matierespremieres.length} references</p>
          </div>
        </div>
        {open ? <ChevronUp className="w-4 h-4 text-gris-ardoise" /> : <ChevronDown className="w-4 h-4 text-gris-ardoise" />}
      </button>
      {open && (
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead><tr>
              <th>Ingredient</th>
              {!compact && <th>Categorie</th>}
              {!compact && <th>Fournisseur</th>}
              <th className="min-w-[180px]">Stock</th>
              <th>Statut</th>
            </tr></thead>
            <tbody>
              {matierespremieres.map(mp => {
                const isLow = mp.stock_actuel_kg <= mp.stock_securite_kg;
                const isCrit = mp.stock_actuel_kg <= mp.stock_securite_kg * 0.7;
                return (
                  <tr key={mp.id}>
                    <td>
                      <div className="flex items-center gap-2">
                        {getIcon(mp.categorie)}
                        <div>
                          <p className="text-[13px] font-medium text-bleu-profond">{mp.nom}</p>
                          {mp.flux_tendu && <span className="text-[9px] text-bleu-info font-semibold uppercase tracking-wider">Flux tendu</span>}
                          {mp.allergene && <span className="text-[9px] text-rouge-alerte font-semibold uppercase tracking-wider ml-1">&#9888; {mp.type_allergene}</span>}
                        </div>
                      </div>
                    </td>
                    {!compact && <td className="text-[13px] text-gris-ardoise">{mp.categorie}</td>}
                    {!compact && <td className="text-[13px] text-gris-ardoise">{mp.fournisseur}</td>}
                    <td><StockBar current={mp.stock_actuel_kg} max={mp.stock_securite_kg * 2.5} critical={mp.stock_securite_kg} /></td>
                    <td>
                      <span className={`badge ${isCrit ? 'badge-danger' : isLow ? 'badge-warning' : 'badge-success'}`}>
                        {isCrit ? <AlertCircle className="w-3 h-3" /> : isLow ? <AlertTriangle className="w-3 h-3" /> : <CheckCircle2 className="w-3 h-3" />}
                        {isCrit ? 'Critique' : isLow ? 'Bas' : 'OK'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </motion.div>
  );
}

function PFSection({ compact }) {
  const { produitsFinis } = useData();

  if (compact) {
    return (
      <motion.div variants={fadeUp} className="card p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-9 h-9 rounded-xl bg-bleu-info/8 flex items-center justify-center"><Package className="w-4.5 h-4.5 text-bleu-info" /></div>
          <div><h3 className="text-[15px] font-semibold text-bleu-profond">Produits Finis</h3><p className="text-[11px] text-gris-ardoise">Inventaire rapide</p></div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {produitsFinis.map(pf => {
            const isCrit = pf.stock_kg < pf.seuil_critique_kg;
            return (
              <div key={pf.id} className={`p-3 rounded-xl border text-center ${isCrit ? 'border-rouge-alerte/25 bg-rouge-alerte/3' : 'border-gris-clair/50 bg-white'}`}>
                <div className="w-3 h-3 rounded-full mx-auto mb-2" style={{ backgroundColor: pf.couleur }} />
                <p className="text-[12px] font-medium text-bleu-profond">{pf.variante}</p>
                <p className={`text-lg font-light mt-1 ${isCrit ? 'text-rouge-alerte' : 'text-bleu-profond'}`}>{pf.stock_kg}<span className="text-[10px] text-gris-ardoise"> kg</span></p>
              </div>
            );
          })}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div variants={fadeUp} className="card p-6">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-9 h-9 rounded-xl bg-bleu-info/8 flex items-center justify-center"><Package className="w-4.5 h-4.5 text-bleu-info" /></div>
        <div><h3 className="text-[15px] font-semibold text-bleu-profond">Produits Finis</h3><p className="text-[11px] text-gris-ardoise">Inventaire par variante</p></div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {produitsFinis.map(pf => {
          const pct = (pf.stock_kg / (pf.seuil_critique_kg * 3)) * 100;
          const isCrit = pf.stock_kg < pf.seuil_critique_kg;
          return (
            <div key={pf.id} className={`p-4 rounded-xl border transition-all hover:shadow-sm ${isCrit ? 'border-rouge-alerte/25 bg-rouge-alerte/3' : 'border-gris-clair/50 bg-white'}`}>
              <div className="flex items-center justify-between mb-3">
                <VariantBadge variante={pf.variante} couleur={pf.couleur} />
                {pf.allergene && <span className="badge badge-danger text-[9px]">Allergene</span>}
                {isCrit && !pf.allergene && <span className="badge badge-danger text-[9px]">Critique</span>}
              </div>
              <p className="text-2xl font-light text-bleu-profond">{pf.stock_kg} <span className="text-sm text-gris-ardoise">kg</span></p>
              <p className="text-[11px] text-gris-ardoise mt-0.5">Seuil {pf.seuil_critique_kg} kg - {pf.prix_vente_kg}&euro;/kg</p>
              <div className="mt-3 progress-bar">
                <div className="progress-bar-fill" style={{ width: `${Math.min(pct, 100)}%`, background: isCrit ? '#DC3545' : pf.couleur }} />
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

function EmballageSection() {
  const { emballages } = useData();
  return (
    <motion.div variants={fadeUp} className="card p-6">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-9 h-9 rounded-xl bg-gris-ardoise/8 flex items-center justify-center"><Box className="w-4.5 h-4.5 text-gris-ardoise" /></div>
        <div><h3 className="text-[15px] font-semibold text-bleu-profond">Emballages</h3><p className="text-[11px] text-gris-ardoise">Cartons & films</p></div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {emballages.map(emb => {
          const stock = emb.stock_unites || emb.stock_metres;
          const seuil = emb.seuil_critique;
          const unite = emb.stock_unites ? 'u.' : 'm';
          const pct = (stock / (seuil * 5)) * 100;
          return (
            <div key={emb.id} className="p-4 rounded-xl border border-gris-clair/50 bg-white">
              <p className="text-[13px] font-semibold text-bleu-profond mb-1">{emb.nom}</p>
              <p className="text-xl font-light text-bleu-profond">{stock.toLocaleString('fr-FR')} <span className="text-sm text-gris-ardoise">{unite}</span></p>
              <p className="text-[11px] text-gris-ardoise">Seuil {seuil.toLocaleString('fr-FR')} {unite}</p>
              <div className="mt-2 progress-bar"><div className="progress-bar-fill" style={{ width: `${Math.min(pct, 100)}%`, background: stock <= seuil ? '#C2703E' : '#94A3B8' }} /></div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

export default function Entrepot() {
  const { isCompact } = useViewMode();

  return (
    <motion.div variants={pageV} initial="initial" animate="animate" exit="exit">
      <motion.div variants={stagger} initial="initial" animate="animate" className="space-y-6">
        {!isCompact && (
          <motion.div variants={fadeUp} className="card p-4 flex items-center gap-3 border-l-4 border-bleu-info">
            <Info className="w-4 h-4 text-bleu-info flex-shrink-0" />
            <p className="text-[13px] text-gris-ardoise"><span className="font-semibold text-bleu-profond">Suivi temps reel.</span> Stocks mis a jour apres chaque OF et expedition.</p>
          </motion.div>
        )}
        {!isCompact && <AllergeneAlert />}
        <MPSection compact={isCompact} />
        <PFSection compact={isCompact} />
        {!isCompact && <EmballageSection />}
      </motion.div>
    </motion.div>
  );
}
