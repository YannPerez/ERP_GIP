import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CalendarClock, CheckCircle2, Clock, AlertTriangle, Zap,
  ChevronLeft, ChevronRight, Factory, ArrowRight, PackagePlus, X
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { useViewMode } from '../context/ViewModeContext';
import VariantBadge from '../components/VariantBadge';
import { NOMENCLATURES } from '../data';

const pageV = { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0, transition: { duration: 0.4 } }, exit: { opacity: 0, y: -8 } };
const fadeUp = { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0, transition: { duration: 0.4 } } };
const stagger = { animate: { transition: { staggerChildren: 0.06 } } };

const statutConfig = {
  termine: { label: 'Terminé', bgColor: 'bg-vert-sauge-light', textColor: 'text-vert-sauge', borderColor: 'border-vert-sauge/25', icon: CheckCircle2 },
  planifie: { label: 'Planifié', bgColor: 'bg-white', textColor: 'text-gris-ardoise', borderColor: 'border-gris-clair/50', icon: Clock },
};

/* ===== MODAL SAISIE PRODUCTION ===== */
function SaisieProductionModal({ jour, onClose, onSubmit }) {
  const [kg, setKg] = useState(jour.objectif_kg);

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-bleu-profond/30 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        className="card p-6 w-full max-w-md shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-vert-sauge/10 flex items-center justify-center">
              <PackagePlus className="w-4.5 h-4.5 text-vert-sauge" />
            </div>
            <div>
              <h3 className="text-[15px] font-semibold text-bleu-profond">Saisie Production</h3>
              <p className="text-[11px] text-gris-ardoise">{jour.jour} — <span className="font-medium text-bleu-profond">{jour.parfum}</span></p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gris-fond transition-colors">
            <X className="w-4 h-4 text-gris-ardoise" />
          </button>
        </div>

        {/* Objectif */}
        <div className="p-3 rounded-xl bg-gris-fond border border-gris-clair/50 mb-5">
          <p className="text-[11px] text-gris-ardoise">Objectif du jour</p>
          <p className="text-2xl font-light text-bleu-profond">{jour.objectif_kg} <span className="text-sm text-gris-ardoise">kg</span></p>
        </div>

        {/* Input */}
        <div className="mb-5">
          <label className="label block mb-2">Quantité réellement produite (kg)</label>
          <input
            type="number"
            min="0"
            max={jour.objectif_kg * 1.2}
            value={kg}
            onChange={e => setKg(Number(e.target.value))}
            className="input text-2xl font-light text-center w-full"
            autoFocus
          />
          {kg > 0 && (
            <p className={`text-[12px] mt-2 text-center font-medium ${kg >= jour.objectif_kg ? 'text-vert-sauge' : 'text-orange-terreux'}`}>
              {kg >= jour.objectif_kg
                ? `✓ Objectif atteint (+${kg - jour.objectif_kg} kg)`
                : `⚠ Écart : -${jour.objectif_kg - kg} kg par rapport à l'objectif`}
            </p>
          )}
        </div>

        {/* Nomenclature reminder */}
        {NOMENCLATURES[jour.parfum] && (
          <div className="mb-5 p-3 rounded-xl bg-gris-fond border border-gris-clair/50">
            <p className="text-[10px] uppercase font-semibold text-gris-ardoise mb-2">MP consommées (estimé)</p>
            <div className="grid grid-cols-2 gap-1.5">
              {Object.entries(NOMENCLATURES[jour.parfum]).map(([ing, ratio]) => (
                <div key={ing} className="flex justify-between text-xs">
                  <span className="text-gris-ardoise truncate mr-2">{ing}</span>
                  <span className="font-semibold text-bleu-profond flex-shrink-0">{Math.round(kg * ratio)} kg</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3">
          <button onClick={onClose} className="btn-secondary flex-1">Annuler</button>
          <motion.button
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            onClick={() => onSubmit(jour.jour, kg)}
            className="btn-primary flex-1"
          >
            <CheckCircle2 className="w-4 h-4" /> Valider {kg} kg
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ===== BENTO CELL ===== */
function BentoCell({ jour, onSaisie }) {
  const config = statutConfig[jour.statut] || statutConfig.planifie;
  const Icon = config.icon;
  const isDone = jour.statut === 'termine';
  const produced = jour.produit_kg ?? 0;
  const pct = isDone ? (produced / jour.objectif_kg) * 100 : 0;

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className={`p-5 rounded-2xl border-2 transition-all ${
        isDone
          ? `${config.borderColor} ${config.bgColor}`
          : `${config.borderColor} bg-white`
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className={`text-[11px] font-bold uppercase tracking-wider ${isDone ? 'text-vert-sauge' : 'text-gris-ardoise'}`}>{jour.jour}</p>
          <p className="text-[10px] text-gris-ardoise/60">{jour.date}</p>
        </div>
        <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${isDone ? 'bg-vert-sauge/10' : 'bg-gris-clair/30'}`}>
          <Icon className={`w-3.5 h-3.5 ${config.textColor}`} />
        </div>
      </div>
      <div className="mb-4"><VariantBadge variante={jour.parfum} couleur={jour.couleur} size="md" /></div>
      <div className="mb-3">
        <div className="flex items-baseline gap-1.5">
          <span className="text-3xl font-light text-bleu-profond tracking-tight">{isDone ? produced : jour.objectif_kg}</span>
          {isDone && <span className="text-sm text-gris-ardoise">/ {jour.objectif_kg} kg</span>}
          {!isDone && <span className="text-sm text-gris-ardoise">kg objectif</span>}
        </div>
      </div>
      {isDone ? (
        <>
          <div className="progress-bar progress-bar-lg">
            <div className="progress-bar-fill" style={{ width: `${Math.min(pct, 100)}%`, background: '#6B8F71' }} />
          </div>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-[11px] font-semibold text-vert-sauge">Terminé</span>
            <CheckCircle2 className="w-3.5 h-3.5 text-vert-sauge" />
          </div>
        </>
      ) : (
        <motion.button
          whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
          onClick={() => onSaisie(jour)}
          className="w-full mt-2 py-2 px-3 rounded-xl border-2 border-dashed border-gris-clair/70 hover:border-vert-sauge/40 hover:bg-vert-sauge/3 transition-all text-[12px] font-semibold text-gris-ardoise hover:text-vert-sauge flex items-center justify-center gap-2"
        >
          <PackagePlus className="w-3.5 h-3.5" /> Saisir production
        </motion.button>
      )}
    </motion.div>
  );
}

/* ===== BENTO GRID CALENDAR ===== */
function BentoCalendar({ onSaisie }) {
  const { planningProduction } = useData();

  return (
    <motion.div variants={fadeUp} className="card p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-bleu-info/8 flex items-center justify-center"><CalendarClock className="w-4.5 h-4.5 text-bleu-info" /></div>
          <div>
            <h3 className="text-[15px] font-semibold text-bleu-profond">Planning Hebdomadaire</h3>
            <p className="text-[11px] text-gris-ardoise">Make-to-Stock — 1 parfum par jour</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="btn-secondary !p-2 !rounded-lg"><ChevronLeft className="w-4 h-4" /></button>
          <span className="text-[13px] font-semibold text-bleu-profond px-3">Sem. 11 — Mars 2026</span>
          <button className="btn-secondary !p-2 !rounded-lg"><ChevronRight className="w-4 h-4" /></button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-3">
        {planningProduction.slice(0, 3).map(jour => (
          <BentoCell key={jour.jour} jour={jour} onSaisie={onSaisie} />
        ))}
      </div>
      <div className="grid grid-cols-2 gap-3">
        {planningProduction.slice(3).map(jour => (
          <BentoCell key={jour.jour} jour={jour} onSaisie={onSaisie} />
        ))}
      </div>

      {/* Weekly recap */}
      <div className="mt-5 pt-4 border-t border-gris-clair/40 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div>
            <p className="label">Produit</p>
            <p className="text-xl font-light text-vert-sauge mt-0.5">
              {planningProduction.filter(j => j.statut === 'termine').reduce((a, j) => a + (j.produit_kg || j.objectif_kg), 0)} <span className="text-sm text-gris-ardoise">kg</span>
            </p>
          </div>
          <div className="w-px h-8 bg-gris-clair/50" />
          <div>
            <p className="label">Restant</p>
            <p className="text-xl font-light text-bleu-profond mt-0.5">
              {planningProduction.filter(j => j.statut !== 'termine').reduce((a, j) => a + j.objectif_kg, 0)} <span className="text-sm text-gris-ardoise">kg</span>
            </p>
          </div>
          <div className="w-px h-8 bg-gris-clair/50" />
          <div>
            <p className="label">Total semaine</p>
            <p className="text-xl font-light text-bleu-profond mt-0.5">
              {planningProduction.reduce((a, j) => a + j.objectif_kg, 0)} <span className="text-sm text-gris-ardoise">kg</span>
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="label">Capacité max</p>
          <p className="text-xl font-light text-or-brosse mt-0.5">
            {[9, 10, 11, 0].includes(new Date().getMonth()) ? '397' : '318'} <span className="text-sm text-gris-ardoise">kg/jour</span>
          </p>
          <p className="text-[10px] text-gris-ardoise mt-1">
            {[9, 10, 11, 0].includes(new Date().getMonth()) ? 'Hiver (40h/sem) - 114%' : 'Été (32h/sem) - 91.5%'}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

/* ===== COMPACT PLANNING ===== */
function CompactPlanning({ onSaisie }) {
  const { planningProduction } = useData();
  return (
    <motion.div variants={fadeUp} className="card p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-9 h-9 rounded-xl bg-bleu-info/8 flex items-center justify-center"><CalendarClock className="w-4.5 h-4.5 text-bleu-info" /></div>
        <div><h3 className="text-[15px] font-semibold text-bleu-profond">Planning Express</h3><p className="text-[11px] text-gris-ardoise">Sem. 11</p></div>
      </div>
      <div className="space-y-2">
        {planningProduction.map(jour => {
          const config = statutConfig[jour.statut] || statutConfig.planifie;
          const Icon = config.icon;
          const isDone = jour.statut === 'termine';
          return (
            <div key={jour.jour} className={`flex items-center gap-4 p-3 rounded-xl border transition-all ${isDone ? 'border-vert-sauge/20 bg-vert-sauge-light/30' : 'border-gris-clair/40'}`}>
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isDone ? 'bg-vert-sauge/10' : 'bg-gris-clair/20'}`}>
                <Icon className={`w-4 h-4 ${config.textColor}`} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-[12px] font-bold text-bleu-profond">{jour.jour}</span>
                  <VariantBadge variante={jour.parfum} couleur={jour.couleur} size="xs" />
                </div>
              </div>
              <div className="text-right flex items-center gap-2">
                {isDone
                  ? <span className="text-[14px] font-semibold text-vert-sauge">{jour.produit_kg ?? jour.objectif_kg} kg</span>
                  : <button onClick={() => onSaisie(jour)} className="btn-secondary text-[11px] !py-1.5 !px-3 flex items-center gap-1"><PackagePlus className="w-3 h-3" /> Saisir</button>
                }
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

/* ===== OF TRIGGERS ===== */
function OFTriggers() {
  const { produitsFinis } = useData();
  const getSeuil = (pf) => pf.seuil_critique_kg || Math.round((pf.objectif_t || 0) * 1000 / 12);
  const critical = produitsFinis.filter(pf => pf.stock_kg <= getSeuil(pf));
  const nearCritical = produitsFinis.filter(pf => pf.stock_kg > getSeuil(pf) && pf.stock_kg <= getSeuil(pf) * 1.5);

  return (
    <motion.div variants={fadeUp} className="card p-6">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-9 h-9 rounded-xl bg-orange-terreux/8 flex items-center justify-center"><Zap className="w-4.5 h-4.5 text-orange-terreux" /></div>
        <div>
          <h3 className="text-[15px] font-semibold text-bleu-profond">Déclencheur d'OF</h3>
          <p className="text-[11px] text-gris-ardoise">Ordres de fabrication basés sur seuils critiques</p>
        </div>
      </div>

      {critical.length > 0 && (
        <div className="mb-5">
          <p className="label text-rouge-alerte flex items-center gap-2 mb-3"><AlertTriangle className="w-3.5 h-3.5" /> Stock critique — OF requis</p>
          <div className="space-y-3">
            {critical.map(pf => {
              const seuil = getSeuil(pf);
              const deficit = seuil - pf.stock_kg;
              const suggestedQty = Math.ceil(((seuil * 2) - pf.stock_kg) / 10) * 10;
              return (
                <div key={pf.id} className="p-5 rounded-2xl border-2 border-rouge-alerte/20 bg-rouge-alerte/2">
                  <div className="flex items-center justify-between mb-3">
                    <VariantBadge variante={`Crozets ${pf.variante}`} couleur={pf.couleur} size="md" />
                    <span className="badge badge-danger"><AlertTriangle className="w-3 h-3" /> -{deficit} kg</span>
                  </div>
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="text-center p-3 rounded-xl bg-white/80 border border-gris-clair/30">
                      <p className="text-2xl font-light text-rouge-alerte">{pf.stock_kg}</p>
                      <p className="text-[10px] text-gris-ardoise uppercase tracking-wider mt-0.5">Stock actuel</p>
                    </div>
                    <div className="text-center p-3 rounded-xl bg-white/80 border border-gris-clair/30">
                      <p className="text-2xl font-light text-orange-terreux">{seuil}</p>
                      <p className="text-[10px] text-gris-ardoise uppercase tracking-wider mt-0.5">Seuil critique</p>
                    </div>
                    <div className="text-center p-3 rounded-xl bg-white/80 border border-gris-clair/30">
                      <p className="text-2xl font-light text-vert-sauge">{suggestedQty}</p>
                      <p className="text-[10px] text-gris-ardoise uppercase tracking-wider mt-0.5">Qté suggérée</p>
                    </div>
                  </div>
                  {NOMENCLATURES[pf.variante] && (
                    <div className="mb-4 p-3 rounded-xl bg-gris-fond border border-gris-clair/50">
                      <p className="text-[10px] uppercase font-semibold text-gris-ardoise mb-2">Besoins Matières Premières (Pour {suggestedQty} kg)</p>
                      <div className="grid grid-cols-2 gap-2">
                        {Object.entries(NOMENCLATURES[pf.variante]).map(([ing, ratio]) => (
                          <div key={ing} className="flex justify-between text-xs">
                            <span className="text-bleu-profond">{ing}</span>
                            <span className="font-medium text-gris-ardoise">{Math.round(suggestedQty * ratio)} kg</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }} className="btn-primary btn-primary-lg w-full">
                    <Factory className="w-5 h-5" /> Lancer l'OF — {suggestedQty} kg de {pf.variante}
                    <ArrowRight className="w-4 h-4 ml-auto" />
                  </motion.button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {nearCritical.length > 0 && (
        <div>
          <p className="label text-orange-terreux flex items-center gap-2 mb-3"><Clock className="w-3.5 h-3.5" /> Surveillance — Proche du seuil</p>
          <div className="space-y-2">
            {nearCritical.map(pf => (
              <div key={pf.id} className="flex items-center justify-between p-3.5 rounded-xl border border-orange-terreux/15 bg-orange-terreux/3">
                <VariantBadge variante={`Crozets ${pf.variante}`} couleur={pf.couleur} />
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="text-[13px] font-semibold text-orange-terreux">{pf.stock_kg} kg</span>
                    <span className="text-[11px] text-gris-ardoise ml-1">/ {getSeuil(pf)}</span>
                  </div>
                  <button className="btn-secondary text-[11px] !py-1.5 !px-3">Planifier OF</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {critical.length === 0 && nearCritical.length === 0 && (
        <div className="text-center py-10">
          <CheckCircle2 className="w-12 h-12 text-vert-sauge mx-auto mb-3 opacity-70" />
          <p className="text-[13px] font-medium text-bleu-profond">Tous les stocks sont nominaux</p>
          <p className="text-[11px] text-gris-ardoise mt-1">Aucun OF nécessaire pour le moment</p>
        </div>
      )}
    </motion.div>
  );
}

/* ===== MAIN ===== */
export default function Production() {
  const { planningProduction, produitsFinis, updateItem } = useData();
  const { isCompact } = useViewMode();
  const [saisieModal, setSaisieModal] = useState(null);

  const totalWeek = planningProduction.reduce((a, j) => a + j.objectif_kg, 0);
  const done = planningProduction.filter(j => j.statut === 'termine').length;
  const getSeuil = (pf) => pf.seuil_critique_kg || Math.round((pf.objectif_t || 0) * 1000 / 12);
  const critical = produitsFinis.filter(p => p.stock_kg <= getSeuil(p)).length;

  const handleSaisie = (jour) => setSaisieModal(jour);

  const handleSubmitSaisie = (jourNom, kg) => {
    updateItem('planningProduction', jourNom, { produit_kg: kg, statut: 'termine' });
    setSaisieModal(null);
  };

  return (
    <motion.div variants={pageV} initial="initial" animate="animate" exit="exit">
      <AnimatePresence>
        {saisieModal && (
          <SaisieProductionModal
            jour={saisieModal}
            onClose={() => setSaisieModal(null)}
            onSubmit={handleSubmitSaisie}
          />
        )}
      </AnimatePresence>

      <motion.div variants={stagger} initial="initial" animate="animate" className="space-y-6">
        {/* Stats row */}
        <motion.div variants={fadeUp} className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="card p-4 text-center card-interactive">
            <Factory className="w-5 h-5 text-or-brosse mx-auto mb-2" />
            <p className="text-2xl font-light text-bleu-profond">{totalWeek}</p>
            <p className="text-[10px] text-gris-ardoise uppercase tracking-wider">kg cette semaine</p>
          </div>
          <div className="card p-4 text-center card-interactive">
            <CalendarClock className="w-5 h-5 text-bleu-info mx-auto mb-2" />
            <p className="text-2xl font-light text-bleu-profond">{planningProduction.length}</p>
            <p className="text-[10px] text-gris-ardoise uppercase tracking-wider">jours planifiés</p>
          </div>
          <div className="card p-4 text-center card-interactive">
            <CheckCircle2 className="w-5 h-5 text-vert-sauge mx-auto mb-2" />
            <p className="text-2xl font-light text-vert-sauge">{done}</p>
            <p className="text-[10px] text-gris-ardoise uppercase tracking-wider">jours terminés</p>
          </div>
          <div className="card p-4 text-center card-interactive">
            <AlertTriangle className="w-5 h-5 text-rouge-alerte mx-auto mb-2" />
            <p className={`text-2xl font-light ${critical > 0 ? 'text-rouge-alerte' : 'text-vert-sauge'}`}>{critical}</p>
            <p className="text-[10px] text-gris-ardoise uppercase tracking-wider">OF à lancer</p>
          </div>
        </motion.div>

        {isCompact
          ? <CompactPlanning onSaisie={handleSaisie} />
          : <BentoCalendar onSaisie={handleSaisie} />
        }
        {!isCompact && <OFTriggers />}
      </motion.div>
    </motion.div>
  );
}
