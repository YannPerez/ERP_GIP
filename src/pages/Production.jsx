import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  CalendarClock, Play, CheckCircle2, Clock, AlertTriangle, Zap,
  ChevronLeft, ChevronRight, Factory, ArrowRight
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { useViewMode } from '../context/ViewModeContext';
import VariantBadge from '../components/VariantBadge';

const pageV = { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0, transition: { duration: 0.4 } }, exit: { opacity: 0, y: -8 } };
const fadeUp = { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0, transition: { duration: 0.4 } } };
const stagger = { animate: { transition: { staggerChildren: 0.06 } } };

const statutConfig = {
  termine: { label: 'Termine', bgColor: 'bg-vert-sauge-light', textColor: 'text-vert-sauge', borderColor: 'border-vert-sauge/25', icon: CheckCircle2 },
  en_cours: { label: 'En cours', bgColor: 'bg-bleu-info-light', textColor: 'text-bleu-info', borderColor: 'border-bleu-info/30', icon: Play },
  planifie: { label: 'Planifie', bgColor: 'bg-white', textColor: 'text-gris-ardoise', borderColor: 'border-gris-clair/50', icon: Clock },
};

/* ===== BENTO GRID CALENDAR ===== */
function BentoCalendar() {
  const { planningProduction } = useData();

  return (
    <motion.div variants={fadeUp} className="card p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-bleu-info/8 flex items-center justify-center"><CalendarClock className="w-4.5 h-4.5 text-bleu-info" /></div>
          <div>
            <h3 className="text-[15px] font-semibold text-bleu-profond">Planning Hebdomadaire</h3>
            <p className="text-[11px] text-gris-ardoise">Make-to-Stock - 1 parfum par jour</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="btn-secondary !p-2 !rounded-lg"><ChevronLeft className="w-4 h-4" /></button>
          <span className="text-[13px] font-semibold text-bleu-profond px-3">Sem. 11 - Mars 2026</span>
          <button className="btn-secondary !p-2 !rounded-lg"><ChevronRight className="w-4 h-4" /></button>
        </div>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-3 gap-3 mb-3">
        {planningProduction.slice(0, 3).map(jour => (
          <BentoCell key={jour.jour} jour={jour} />
        ))}
      </div>
      <div className="grid grid-cols-2 gap-3">
        {planningProduction.slice(3).map(jour => (
          <BentoCell key={jour.jour} jour={jour} />
        ))}
      </div>

      {/* Weekly recap */}
      <div className="mt-5 pt-4 border-t border-gris-clair/40 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div>
            <p className="label">Produit</p>
            <p className="text-xl font-light text-vert-sauge mt-0.5">{planningProduction.filter(j => j.statut === 'termine').reduce((a, j) => a + j.objectif_kg, 0)} <span className="text-sm text-gris-ardoise">kg</span></p>
          </div>
          <div className="w-px h-8 bg-gris-clair/50" />
          <div>
            <p className="label">Restant</p>
            <p className="text-xl font-light text-bleu-profond mt-0.5">{planningProduction.filter(j => j.statut !== 'termine').reduce((a, j) => a + j.objectif_kg, 0)} <span className="text-sm text-gris-ardoise">kg</span></p>
          </div>
          <div className="w-px h-8 bg-gris-clair/50" />
          <div>
            <p className="label">Total semaine</p>
            <p className="text-xl font-light text-bleu-profond mt-0.5">{planningProduction.reduce((a, j) => a + j.objectif_kg, 0)} <span className="text-sm text-gris-ardoise">kg</span></p>
          </div>
        </div>
        <div className="text-right">
          <p className="label">Capacite max</p>
          <p className="text-xl font-light text-or-brosse mt-0.5">200 <span className="text-sm text-gris-ardoise">kg/jour</span></p>
        </div>
      </div>
    </motion.div>
  );
}

/* ===== COMPACT PLANNING ===== */
function CompactPlanning() {
  const { planningProduction } = useData();

  return (
    <motion.div variants={fadeUp} className="card p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-9 h-9 rounded-xl bg-bleu-info/8 flex items-center justify-center"><CalendarClock className="w-4.5 h-4.5 text-bleu-info" /></div>
        <div><h3 className="text-[15px] font-semibold text-bleu-profond">Planning Express</h3><p className="text-[11px] text-gris-ardoise">Sem. 11</p></div>
      </div>
      <div className="space-y-2">
        {planningProduction.map(jour => {
          const config = statutConfig[jour.statut];
          const Icon = config.icon;
          const isDone = jour.statut === 'termine';
          const isToday = jour.statut === 'en_cours';
          return (
            <div key={jour.jour} className={`flex items-center gap-4 p-3 rounded-xl border transition-all ${isToday ? 'border-bleu-info/30 bg-bleu-info/3' : isDone ? 'border-vert-sauge/20 bg-vert-sauge-light/30' : 'border-gris-clair/40'}`}>
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isToday ? 'bg-bleu-info/10' : isDone ? 'bg-vert-sauge/10' : 'bg-gris-clair/20'}`}>
                <Icon className={`w-4 h-4 ${config.textColor}`} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className={`text-[12px] font-bold ${isToday ? 'text-bleu-info' : 'text-bleu-profond'}`}>{jour.jour}</span>
                  <VariantBadge variante={jour.parfum} couleur={jour.couleur} size="xs" />
                </div>
              </div>
              <div className="text-right">
                <span className="text-[14px] font-semibold text-bleu-profond">{jour.objectif_kg} kg</span>
                <span className={`text-[10px] font-medium block ${config.textColor}`}>{config.label}</span>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

function BentoCell({ jour }) {
  const config = statutConfig[jour.statut];
  const Icon = config.icon;
  const isToday = jour.statut === 'en_cours';
  const isDone = jour.statut === 'termine';
  const produced = isDone ? jour.objectif_kg : isToday ? 65 : 0;
  const pct = (produced / jour.objectif_kg) * 100;

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className={`p-5 rounded-2xl border-2 transition-all ${
        isToday
          ? 'border-bleu-info/40 bg-bleu-info/3 shadow-md shadow-bleu-info/5 ring-1 ring-bleu-info/15'
          : isDone
          ? `${config.borderColor} ${config.bgColor}`
          : `${config.borderColor} bg-white`
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className={`text-[11px] font-bold uppercase tracking-wider ${isToday ? 'text-bleu-info' : 'text-gris-ardoise'}`}>{jour.jour}</p>
          <p className="text-[10px] text-gris-ardoise/60">{jour.date}</p>
        </div>
        <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${isToday ? 'bg-bleu-info/10' : isDone ? 'bg-vert-sauge/10' : 'bg-gris-clair/30'}`}>
          <Icon className={`w-3.5 h-3.5 ${config.textColor}`} />
        </div>
      </div>
      <div className="mb-4"><VariantBadge variante={jour.parfum} couleur={jour.couleur} size="md" /></div>
      <div className="mb-3">
        <div className="flex items-baseline gap-1.5">
          <span className="text-3xl font-light text-bleu-profond tracking-tight">{produced}</span>
          <span className="text-sm text-gris-ardoise">/ {jour.objectif_kg} kg</span>
        </div>
      </div>
      <div className="progress-bar progress-bar-lg">
        <div className="progress-bar-fill" style={{ width: `${pct}%`, background: isDone ? '#6B8F71' : isToday ? '#3B7DD8' : '#E2E8F0' }} />
      </div>
      <div className="mt-3 flex items-center justify-between">
        <span className={`text-[11px] font-semibold ${config.textColor}`}>{config.label}</span>
        {isToday && <span className="text-[10px] text-bleu-info font-semibold">{pct.toFixed(0)}%</span>}
        {isDone && <CheckCircle2 className="w-3.5 h-3.5 text-vert-sauge" />}
      </div>
    </motion.div>
  );
}

/* ===== OF TRIGGERS ===== */
function OFTriggers() {
  const { produitsFinis } = useData();
  const critical = produitsFinis.filter(pf => pf.stock_kg <= pf.seuil_critique_kg);
  const nearCritical = produitsFinis.filter(pf => pf.stock_kg > pf.seuil_critique_kg && pf.stock_kg <= pf.seuil_critique_kg * 1.5);

  return (
    <motion.div variants={fadeUp} className="card p-6">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-9 h-9 rounded-xl bg-orange-terreux/8 flex items-center justify-center"><Zap className="w-4.5 h-4.5 text-orange-terreux" /></div>
        <div>
          <h3 className="text-[15px] font-semibold text-bleu-profond">Declencheur d'OF</h3>
          <p className="text-[11px] text-gris-ardoise">Ordres de fabrication bases sur seuils critiques</p>
        </div>
      </div>

      {critical.length > 0 && (
        <div className="mb-5">
          <p className="label text-rouge-alerte flex items-center gap-2 mb-3"><AlertTriangle className="w-3.5 h-3.5" /> Stock critique - OF requis</p>
          <div className="space-y-3">
            {critical.map(pf => {
              const deficit = pf.seuil_critique_kg - pf.stock_kg;
              const suggestedQty = Math.ceil((pf.seuil_critique_kg * 2 - pf.stock_kg) / 10) * 10;
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
                      <p className="text-2xl font-light text-orange-terreux">{pf.seuil_critique_kg}</p>
                      <p className="text-[10px] text-gris-ardoise uppercase tracking-wider mt-0.5">Seuil critique</p>
                    </div>
                    <div className="text-center p-3 rounded-xl bg-white/80 border border-gris-clair/30">
                      <p className="text-2xl font-light text-vert-sauge">{suggestedQty}</p>
                      <p className="text-[10px] text-gris-ardoise uppercase tracking-wider mt-0.5">Qte suggeree</p>
                    </div>
                  </div>
                  <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }} className="btn-primary btn-primary-lg w-full">
                    <Factory className="w-5 h-5" /> Lancer l'OF - {suggestedQty} kg de {pf.variante}
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
          <p className="label text-orange-terreux flex items-center gap-2 mb-3"><Clock className="w-3.5 h-3.5" /> Surveillance - Proche du seuil</p>
          <div className="space-y-2">
            {nearCritical.map(pf => (
              <div key={pf.id} className="flex items-center justify-between p-3.5 rounded-xl border border-orange-terreux/15 bg-orange-terreux/3">
                <VariantBadge variante={`Crozets ${pf.variante}`} couleur={pf.couleur} />
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="text-[13px] font-semibold text-orange-terreux">{pf.stock_kg} kg</span>
                    <span className="text-[11px] text-gris-ardoise ml-1">/ {pf.seuil_critique_kg}</span>
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
          <p className="text-[11px] text-gris-ardoise mt-1">Aucun OF necessaire pour le moment</p>
        </div>
      )}
    </motion.div>
  );
}

/* ===== STOCK CRITIQUE BANNER ===== */
function StockCritiqueBanner() {
  const { produitsFinis } = useData();
  const criticals = produitsFinis.filter(pf => pf.stock_kg <= pf.seuil_critique_kg);
  if (criticals.length === 0) return null;

  return (
    <motion.div variants={fadeUp} className="glass p-4 rounded-xl border-l-4 border-orange-terreux backdrop-blur-xl bg-orange-terreux/5">
      <div className="flex items-center gap-3">
        <AlertTriangle className="w-4.5 h-4.5 text-orange-terreux flex-shrink-0" />
        <div className="flex-1">
          <p className="text-[13px] font-semibold text-bleu-profond">{criticals.length} produit{criticals.length > 1 ? 's' : ''} sous seuil critique</p>
          <p className="text-[11px] text-gris-ardoise">{criticals.map(p => p.variante).join(', ')} - OF recommande</p>
        </div>
        <ArrowRight className="w-4 h-4 text-orange-terreux" />
      </div>
    </motion.div>
  );
}

/* ===== MAIN ===== */
export default function Production() {
  const { planningProduction, produitsFinis } = useData();
  const { isCompact } = useViewMode();

  const totalWeek = planningProduction.reduce((a, j) => a + j.objectif_kg, 0);
  const done = planningProduction.filter(j => j.statut === 'termine').length;
  const critical = produitsFinis.filter(p => p.stock_kg <= p.seuil_critique_kg).length;

  return (
    <motion.div variants={pageV} initial="initial" animate="animate" exit="exit">
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
            <p className="text-[10px] text-gris-ardoise uppercase tracking-wider">jours planifies</p>
          </div>
          <div className="card p-4 text-center card-interactive">
            <CheckCircle2 className="w-5 h-5 text-vert-sauge mx-auto mb-2" />
            <p className="text-2xl font-light text-vert-sauge">{done}</p>
            <p className="text-[10px] text-gris-ardoise uppercase tracking-wider">OF termines</p>
          </div>
          <div className="card p-4 text-center card-interactive">
            <AlertTriangle className="w-5 h-5 text-rouge-alerte mx-auto mb-2" />
            <p className={`text-2xl font-light ${critical > 0 ? 'text-rouge-alerte' : 'text-vert-sauge'}`}>{critical}</p>
            <p className="text-[10px] text-gris-ardoise uppercase tracking-wider">OF a lancer</p>
          </div>
        </motion.div>

        <StockCritiqueBanner />
        {isCompact ? <CompactPlanning /> : <BentoCalendar />}
        {!isCompact && <OFTriggers />}
      </motion.div>
    </motion.div>
  );
}
