import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CalendarClock, ChevronLeft, ChevronRight, Leaf, History, Calendar, X, CheckCircle2, TrendingDown, TrendingUp } from 'lucide-react';
import { useData } from '../context/DataContext';

const pageV = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, y: -8 },
};

const JOURS = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
const MOIS  = ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'];

const OBJECTIF_KG = 320;

function saisieStyle(kg) {
  if (kg >= OBJECTIF_KG * 0.95) return { bg: 'bg-vert-sauge/15', text: 'text-vert-sauge', icon: 'text-vert-sauge' };
  if (kg >= OBJECTIF_KG * 0.90) return { bg: 'bg-or-brosse/15',  text: 'text-or-brosse',  icon: 'text-or-brosse'  };
  return                                { bg: 'bg-rouge-alerte/12', text: 'text-rouge-alerte', icon: 'text-rouge-alerte' };
}

function darken(hex, factor = 0.5) {
  const r = Math.round(parseInt(hex.slice(1, 3), 16) * factor);
  const g = Math.round(parseInt(hex.slice(3, 5), 16) * factor);
  const b = Math.round(parseInt(hex.slice(5, 7), 16) * factor);
  return `rgb(${r},${g},${b})`;
}

function addMonths(year, month, delta) {
  const d = new Date(year, month + delta, 1);
  return { year: d.getFullYear(), month: d.getMonth() };
}
function sameMonth(y1, m1, y2, m2) { return y1 === y2 && m1 === m2; }
function isBefore(y1, m1, y2, m2) {
  return y1 < y2 || (y1 === y2 && m1 < m2);
}

/* ── Modal saisie journalière ── */
function SaisieModal({ cell, onClose, onSave }) {
  const { plan, day, year, month, existing } = cell;
  const [kg, setKg] = useState(existing != null ? String(existing) : '');
  const OBJECTIF = OBJECTIF_KG;

  function handleSave() {
    const val = parseFloat(kg);
    if (!isNaN(val) && val >= 0) {
      const mm = String(month + 1).padStart(2, '0');
      const dd = String(day).padStart(2, '0');
      onSave(`${year}-${mm}-${dd}`, val);
      onClose();
    }
  }

  const val = parseFloat(kg);
  const isValid = !isNaN(val) && val >= 0;
  const diff = isValid ? val - OBJECTIF : null;
  const perfColor = !isValid ? null : saisieStyle(val).text;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(4px)' }}
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 8 }}
        transition={{ duration: 0.2 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gris-clair/50">
          <div>
            <p className="text-xs font-semibold text-gris-ardoise uppercase tracking-widest">
              {MOIS[month]} {year}
            </p>
            <h3 className="text-lg font-bold text-bleu-profond">
              {day < 10 ? `0${day}` : day} {MOIS[month].slice(0, 3).toLowerCase()}.
            </h3>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-lg hover:bg-gris-fond flex items-center justify-center text-gris-ardoise">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 flex flex-col gap-5">
          {/* Saveur planifiée */}
          {plan && (
            <div>
              <p className="text-[11px] font-semibold text-gris-ardoise uppercase tracking-widest mb-2">Saveur planifiée</p>
              <div className="flex items-center gap-3">
                <div
                  className="flex-1 py-2.5 rounded-xl flex items-center justify-center gap-2"
                  style={{ backgroundColor: `${plan.couleur}25`, border: `2px solid ${plan.couleur}60` }}
                >
                  <span className="font-bold text-sm" style={{ color: darken(plan.couleur, 0.52) }}>
                    {plan.nom}
                  </span>
                  {plan.bio && <Leaf className="w-4 h-4 text-vert-sauge" />}
                </div>
              </div>
            </div>
          )}

          {/* Saisie kg */}
          <div>
            <p className="text-[11px] font-semibold text-gris-ardoise uppercase tracking-widest mb-2">Production réalisée</p>
            <div className="relative">
              <input
                type="number"
                min="0"
                max="9999"
                step="1"
                value={kg}
                onChange={e => setKg(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSave()}
                autoFocus
                placeholder="0"
                className="w-full text-3xl font-light text-bleu-profond border-2 border-gris-clair rounded-xl px-4 py-3 pr-14 focus:outline-none focus:border-bleu-profond/40 transition-colors"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gris-ardoise font-medium">kg</span>
            </div>

            {/* Comparaison objectif */}
            {diff !== null && (
              <div className={`flex items-center gap-1.5 mt-2 text-[12px] font-semibold ${perfColor}`}>
                {diff >= 0
                  ? <TrendingUp className="w-3.5 h-3.5" />
                  : <TrendingDown className="w-3.5 h-3.5" />}
                {diff >= 0 ? '+' : ''}{diff} kg vs objectif ({OBJECTIF} kg/j)
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-1">
            <button onClick={onClose} className="btn-secondary flex-1">Annuler</button>
            <button
              onClick={handleSave}
              disabled={!isValid}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-bleu-profond text-white font-semibold text-sm hover:bg-bleu-profond/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <CheckCircle2 className="w-4 h-4" />
              Enregistrer
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function Production() {
  const { planningProduction, saisieProduction, setSaisieJour } = useData();
  const [modalCell, setModalCell] = useState(null);

  const now     = new Date();
  const todayY  = now.getFullYear();
  const todayM  = now.getMonth();
  const todayD  = now.getDate();

  const minDate = addMonths(todayY, todayM, -4);
  const maxDate = addMonths(todayY, todayM,  3);

  const [year,  setYear]  = useState(todayY);
  const [month, setMonth] = useState(todayM);

  function prevMonth() {
    if (sameMonth(year, month, minDate.year, minDate.month)) return;
    const p = addMonths(year, month, -1);
    setYear(p.year); setMonth(p.month);
  }
  function nextMonth() {
    if (sameMonth(year, month, maxDate.year, maxDate.month)) return;
    const n = addMonths(year, month, 1);
    setYear(n.year); setMonth(n.month);
  }

  const isCurrent = sameMonth(year, month, todayY, todayM);
  const isPast    = isBefore(year, month, todayY, todayM);
  const isFuture  = !isCurrent && !isPast;
  const canPrev   = !sameMonth(year, month, minDate.year, minDate.month);
  const canNext   = !sameMonth(year, month, maxDate.year, maxDate.month);

  const firstCol    = (new Date(year, month, 1).getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells = [];
  for (let i = 0; i < firstCol; i++) cells.push(null);
  for (let day = 1; day <= daysInMonth; day++) {
    const mm      = String(month + 1).padStart(2, '0');
    const dd      = String(day).padStart(2, '0');
    const dateStr = `${year}-${mm}-${dd}`;
    const plan    = planningProduction.find(p => p.date === dateStr);
    const col     = (new Date(year, month, day).getDay() + 6) % 7;
    const isPastDay = isPast || (isCurrent && day < todayD);
    cells.push({
      day, plan, dateStr,
      isWeekend: col >= 5,
      isToday: isCurrent && day === todayD,
      isPastDay,
      saisie: saisieProduction[dateStr],
    });
  }

  function openModal(cell) {
    if (cell.isWeekend) return;
    setModalCell({ ...cell, year, month });
  }

  return (
    <motion.div variants={pageV} initial="initial" animate="animate" exit="exit" className="h-full">
      <div className="card p-6 h-full flex flex-col">

        {/* ── En-tête ── */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-bleu-info/8 flex items-center justify-center">
              <CalendarClock className="w-5 h-5 text-bleu-info" />
            </div>
            <div>
              <h3 className="text-[15px] font-semibold text-bleu-profond">Planning de Production</h3>
              <p className="text-[11px] text-gris-ardoise flex items-center gap-1.5 mt-0.5">
                {isPast    && <><History  className="w-3 h-3" /> Production réalisée — cliquer pour saisir</>}
                {isCurrent && 'Cliquer sur un jour pour saisir la production'}
                {isFuture  && <><Calendar className="w-3 h-3 text-bleu-info" /><span className="text-bleu-info">Production planifiée</span></>}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {!isCurrent && (
              <button
                onClick={() => { setYear(todayY); setMonth(todayM); }}
                className="btn-secondary text-[12px] px-3 py-1.5"
              >
                Aujourd'hui
              </button>
            )}
            <div className="flex items-center bg-gris-fond border border-gris-clair/60 rounded-xl overflow-hidden">
              <button
                onClick={prevMonth}
                disabled={!canPrev}
                className="p-2.5 hover:bg-white transition-colors text-gris-ardoise disabled:opacity-25 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="font-semibold text-bleu-profond text-sm min-w-[152px] text-center px-1">
                {MOIS[month]} {year}
              </span>
              <button
                onClick={nextMonth}
                disabled={!canNext}
                className="p-2.5 hover:bg-white transition-colors text-gris-ardoise disabled:opacity-25 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* ── Calendrier ── */}
        <div className="flex-1 flex flex-col min-h-0">
          <div className="grid grid-cols-7 gap-1.5 mb-2">
            {JOURS.map(j => (
              <div
                key={j}
                className={`text-center font-bold text-[10px] tracking-widest uppercase ${
                  j === 'Sam' || j === 'Dim' ? 'text-gris-clair' : 'text-gris-ardoise'
                }`}
              >
                {j}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2" style={{ gridAutoRows: '110px' }}>
            {cells.map((cell, idx) => {
              if (!cell) return <div key={`e-${idx}`} />;
              const { day, plan, isWeekend, isToday, isPastDay, saisie } = cell;
              const clickable = !isWeekend;

              return (
                <div
                  key={`d-${day}`}
                  onClick={() => clickable && openModal(cell)}
                  className={`p-2.5 rounded-2xl flex flex-col transition-all ${
                    isWeekend
                      ? 'bg-gris-clair/25 border-2 border-transparent'
                      : isToday
                      ? 'border-2 border-or-brosse bg-or-brosse/8 shadow-lg cursor-pointer hover:shadow-xl'
                      : isPastDay
                      ? 'border-2 border-gris-clair bg-gris-fond shadow-sm cursor-pointer hover:border-bleu-profond/30 hover:shadow-md'
                      : 'border-2 border-bleu-profond/12 bg-white shadow-sm cursor-pointer hover:shadow-md hover:border-bleu-profond/25'
                  }`}
                >
                  {/* Numéro */}
                  <span className={`text-sm font-bold leading-none mb-2 text-center ${
                    isWeekend ? 'text-gris-ardoise/30'
                    : isToday  ? 'text-or-brosse'
                    : isPastDay ? 'text-gris-ardoise'
                    : 'text-bleu-profond'
                  }`}>
                    {day}
                  </span>

                  {/* Production du jour */}
                  {plan && !isWeekend && (
                    <div className="flex-1 flex flex-col gap-1 min-h-0">
                      {/* Chip saveur */}
                      <div
                        className="flex-1 flex items-center justify-center rounded-xl"
                        style={{
                          backgroundColor: `${plan.couleur}30`,
                          border: `2px solid ${plan.couleur}70`,
                        }}
                      >
                        <span
                          className="text-[13px] font-black text-center leading-tight px-1"
                          style={{ color: darken(plan.couleur, 0.52) }}
                        >
                          {plan.nom}
                        </span>
                      </div>

                      {/* Badge BIO */}
                      {plan.bio && (
                        <div className="flex items-center justify-center gap-1.5 py-1.5 rounded-xl bg-vert-sauge/20 border border-vert-sauge/40">
                          <Leaf className="w-4 h-4 text-vert-sauge flex-shrink-0" />
                          <span className="text-[12px] font-extrabold text-vert-sauge uppercase tracking-widest">
                            Bio
                          </span>
                        </div>
                      )}

                      {/* Saisie réalisée */}
                      {saisie != null && (() => { const s = saisieStyle(saisie); return (
                        <div className={`flex items-center justify-center gap-1 py-0.5 rounded-lg ${s.bg}`}>
                          <CheckCircle2 className={`w-3 h-3 ${s.icon}`} />
                          <span className={`text-[10px] font-bold ${s.text}`}>{saisie} kg</span>
                        </div>
                      ); })()}
                    </div>
                  )}

                  {/* Jour sans plan mais cliquable (passé ou futur ouvert) */}
                  {!plan && !isWeekend && saisie != null && (() => { const s = saisieStyle(saisie); return (
                    <div className="flex-1 flex items-end">
                      <div className={`w-full flex items-center justify-center gap-1 py-0.5 rounded-lg ${s.bg}`}>
                        <CheckCircle2 className={`w-3 h-3 ${s.icon}`} />
                        <span className={`text-[10px] font-bold ${s.text}`}>{saisie} kg</span>
                      </div>
                    </div>
                  ); })()}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Modal ── */}
      <AnimatePresence>
        {modalCell && (
          <SaisieModal
            cell={modalCell}
            onClose={() => setModalCell(null)}
            onSave={setSaisieJour}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
